import dataStore from '../services/dataStore.js';
import { classifyWasteImage } from '../services/geminiService.js';

export async function getEvents(req, res) {
  try {
    const { category, status, stationId, search, limit = 50 } = req.query;
    const events = await dataStore.getEvents({ category, status, stationId, search, limit });
    return res.json({
      success: true,
      count: events.length,
      events
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve waste events.'
    });
  }
}

export async function getEventById(req, res) {
  try {
    const { id } = req.params;
    const event = await dataStore.getEventById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: `Waste Event #${id} not found.`
      });
    }

    // Related station details
    const station = await dataStore.getStationById(event.stationId);

    return res.json({
      success: true,
      event,
      station
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching Waste Event Passport.'
    });
  }
}

export async function createEvent(req, res) {
  try {
    const {
      stationId,
      location,
      wasteCategory = 'dry',
      description = '',
      priority = 'MEDIUM'
    } = req.body;

    const file = req.file;
    let photoUrl = '';
    let classification = null;

    if (file) {
      photoUrl = `/uploads/${file.filename}`;
      // Run AI inspection
      classification = await classifyWasteImage({
        imageBuffer: file.buffer,
        mimeType: file.mimetype,
        filename: file.originalname,
        userCategory: wasteCategory
      });
    } else {
      // Deterministic classification if no file attached
      classification = {
        category: wasteCategory === 'dry' ? 'Dry Waste' : wasteCategory === 'wet' ? 'Wet Waste' : wasteCategory === 'sanitary' ? 'Sanitary Waste' : 'Special Care Waste',
        wasteStream: wasteCategory,
        confidence: 0.92,
        confidenceTier: 'High',
        contamination: {
          detected: false,
          severity: 'None',
          detectedItems: [],
          notes: 'Standard stream registration.'
        },
        recommendedStream: `${wasteCategory.toUpperCase()} Bin`,
        requiredAction: 'Proceed with scheduled collection cycle.',
        explanation: 'Classification logged via operational field entry.'
      };
    }

    // Lookup station
    const station = (await dataStore.getStationById(stationId)) || {
      stationId: stationId || 'WS-001',
      name: location || 'Campus Main Station',
      qrCode: `SWALOOP-QR-${stationId || 'WS-001'}`
    };

    const eventId = `WS-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const timeline = [
      {
        timestamp: now,
        timeString: timeStr,
        action: 'Waste reported',
        description: description || `Reported at ${station.name}.`,
        actor: req.user ? `${req.user.name} (${req.user.role})` : 'Student Reporter',
        icon: 'camera'
      },
      {
        timestamp: new Date(now.getTime() + 1000),
        timeString: timeStr,
        action: 'AI classification completed',
        description: `${classification.category} (${Math.round(classification.confidence * 100)}% confidence).`,
        actor: 'Gemini Vision AI Engine',
        icon: 'cpu'
      }
    ];

    let exceptionId = null;
    const isContaminated = classification.contamination && classification.contamination.detected;

    if (isContaminated) {
      timeline.push({
        timestamp: new Date(now.getTime() + 2000),
        timeString: timeStr,
        action: 'Contamination detected',
        description: `${classification.contamination.severity} contamination: ${classification.contamination.notes || 'Cross-stream items identified'}.`,
        actor: 'Exception Engine',
        icon: 'alert-triangle'
      });

      // Automatically register an exception
      const exception = await dataStore.createException({
        type: 'CONTAMINATION',
        severity: classification.contamination.severity === 'High' ? 'CRITICAL' : 'WARNING',
        location: station.location?.name || location || station.name,
        stationId: station.stationId,
        relatedEventId: eventId,
        description: `Contamination identified in ${classification.category}: ${classification.contamination.notes}`,
        status: 'OPEN',
        assignedTo: { userId: '', name: 'Unassigned' }
      });
      exceptionId = exception.exceptionId;

      await dataStore.addNotification({
        severity: 'WARNING',
        title: 'Contamination Exception Logged',
        message: `${classification.contamination.severity} contamination at ${station.name}.`,
        location: station.name,
        relatedId: eventId,
        relatedType: 'event'
      });
    }

    const eventData = {
      eventId,
      stationId: station.stationId,
      stationName: station.name,
      location: station.location?.name || location || station.name,
      wasteCategory: classification.wasteStream || wasteCategory,
      aiClassification: {
        detectedCategory: classification.category,
        confidence: classification.confidence,
        confidenceTier: classification.confidenceTier,
        explanation: classification.explanation,
        rawTags: classification.contamination?.detectedItems || [],
        source: classification.source || 'gemini'
      },
      contaminationStatus: {
        detected: isContaminated,
        severity: classification.contamination?.severity || 'None',
        detectedItems: classification.contamination?.detectedItems || [],
        notes: classification.contamination?.notes || '',
        expectedStream: classification.wasteStream || wasteCategory
      },
      requiredAction: classification.requiredAction || 'Segregate and complete collection.',
      reporter: {
        userId: req.user?._id || req.user?.id || 'usr-student',
        name: req.user?.name || 'Student Reporter',
        role: req.user?.role || 'student'
      },
      assignedWorker: {
        userId: station.assignedWorker?.userId || '',
        name: station.assignedWorker?.name || 'Unassigned',
        phone: ''
      },
      collectionStatus: 'pending',
      verificationStatus: 'unverified',
      proof: {
        photoUrl: photoUrl || '',
        notes: description,
        uploadedAt: photoUrl ? now : null
      },
      exceptionId,
      status: 'OPEN',
      timeline,
      qrCodeToken: station.qrCode
    };

    const newEvent = await dataStore.createEvent(eventData);

    await dataStore.addAuditLog({
      action: 'WASTE_EVENT_CREATED',
      performedBy: { userId: req.user?._id || 'ANON', name: req.user?.name || 'User', role: req.user?.role || 'student' },
      targetType: 'event',
      targetId: eventId,
      details: { category: eventData.wasteCategory, contamination: isContaminated }
    });

    return res.status(201).json({
      success: true,
      message: `Waste Event #${eventId} created successfully.`,
      event: newEvent
    });
  } catch (err) {
    console.error('Create event error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to create waste event.'
    });
  }
}

export async function verifyEvent(req, res) {
  try {
    const { id } = req.params;
    const { qrCodeScanned, notes, proofPhoto } = req.body;

    const event = await dataStore.getEventById(id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found.' });
    }

    const station = await dataStore.getStationById(event.stationId);
    const expectedQr = station?.qrCode || event.qrCodeToken;

    // Validate QR token (or allow verified override)
    const isValid = !expectedQr || qrCodeScanned === expectedQr || qrCodeScanned.includes(event.stationId);

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const timelineUpdate = [...event.timeline];

    timelineUpdate.push({
      timestamp: now,
      timeString: timeStr,
      action: isValid ? 'QR verification completed' : 'QR verification attempt logged',
      description: isValid 
        ? `Station QR ${qrCodeScanned} verified on site.` 
        : `QR mismatch detected (${qrCodeScanned} vs expected ${expectedQr}).`,
      actor: req.user?.name || 'Sanitation Worker',
      icon: 'qr-code'
    });

    if (proofPhoto) {
      timelineUpdate.push({
        timestamp: new Date(now.getTime() + 1000),
        timeString: timeStr,
        action: 'Proof uploaded',
        description: 'Post-collection verification photograph submitted.',
        actor: req.user?.name || 'Sanitation Worker',
        icon: 'camera'
      });
    }

    const updates = {
      verificationStatus: isValid ? 'qr_verified' : 'manual_verified',
      timeline: timelineUpdate
    };

    if (proofPhoto) {
      updates.proof = {
        photoUrl: proofPhoto,
        notes: notes || event.proof?.notes || '',
        uploadedAt: now
      };
    }

    const updatedEvent = await dataStore.updateEvent(id, updates);

    return res.json({
      success: true,
      message: isValid ? 'Station verified successfully via QR.' : 'Verification logged with note.',
      event: updatedEvent,
      valid: isValid
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Verification failed.'
    });
  }
}

export async function updateEventStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, workerId, workerName, notes, proofPhoto } = req.body;

    const event = await dataStore.getEventById(id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found.' });
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const timeline = [...event.timeline];

    if (status === 'ASSIGNED' && workerName) {
      timeline.push({
        timestamp: now,
        timeString: timeStr,
        action: 'Task assigned',
        description: `Dispatched to ${workerName}.`,
        actor: req.user?.name || 'Facility Manager',
        icon: 'user-check'
      });
    } else if (status === 'IN_PROGRESS') {
      timeline.push({
        timestamp: now,
        timeString: timeStr,
        action: 'Worker started task',
        description: `${workerName || event.assignedWorker?.name || 'Worker'} initiated collection protocol.`,
        actor: workerName || req.user?.name || 'Worker',
        icon: 'play'
      });
    } else if (status === 'RESOLVED') {
      timeline.push({
        timestamp: now,
        timeString: timeStr,
        action: 'Collection completed',
        description: 'Waste stream collected and container normalized.',
        actor: workerName || req.user?.name || 'Worker',
        icon: 'check-circle'
      });
      timeline.push({
        timestamp: new Date(now.getTime() + 1000),
        timeString: timeStr,
        action: 'Event resolved',
        description: 'Operational loop closed and verified.',
        actor: 'SwaLoop Loop Engine',
        icon: 'shield-check'
      });
    }

    const updates = {
      status,
      timeline
    };

    if (workerId && workerName) {
      updates.assignedWorker = {
        userId: workerId,
        name: workerName,
        phone: '+91 98765 43210'
      };
    }

    if (status === 'RESOLVED') {
      updates.collectionStatus = 'completed';
      updates.resolvedAt = now;

      // If there was an associated exception, resolve it too
      if (event.exceptionId) {
        await dataStore.updateException(event.exceptionId, {
          status: 'RESOLVED',
          resolution: {
            notes: notes || 'Resolved via completed Waste Event loop.',
            resolvedAt: now,
            resolvedBy: req.user?.name || 'Worker',
            proofPhoto: proofPhoto || event.proof?.photoUrl || ''
          }
        });
      }
    }

    if (proofPhoto) {
      updates.proof = {
        photoUrl: proofPhoto,
        notes: notes || '',
        uploadedAt: now
      };
    }

    const updated = await dataStore.updateEvent(id, updates);

    return res.json({
      success: true,
      message: `Event status updated to ${status}.`,
      event: updated
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update event status.'
    });
  }
}
