import dataStore from '../services/dataStore.js';

export async function getTasks(req, res) {
  try {
    const { workerId, status, priority, myTasksOnly } = req.query;

    const filterWorkerId = myTasksOnly === 'true' && req.user ? (req.user._id || req.user.id) : workerId;
    const tasks = await dataStore.getTasks({ workerId: filterWorkerId, status, priority });

    return res.json({
      success: true,
      count: tasks.length,
      tasks
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve collection tasks.'
    });
  }
}

export async function getTaskById(req, res) {
  try {
    const { id } = req.params;
    const task = await dataStore.getTaskById(id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found.' });
    }

    const station = await dataStore.getStationById(task.stationId);
    let event = null;
    if (task.eventId) {
      event = await dataStore.getEventById(task.eventId);
    }

    return res.json({
      success: true,
      task,
      station,
      event
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to load task details.'
    });
  }
}

export async function createTask(req, res) {
  try {
    const {
      stationId,
      location,
      wasteType = 'Dry Waste',
      priority = 'MEDIUM',
      reason = 'Operational dispatch',
      assignedWorkerId,
      assignedWorkerName,
      dueMinutes = 60,
      eventId
    } = req.body;

    const dueTime = new Date(Date.now() + dueMinutes * 60000);

    const task = await dataStore.createTask({
      stationId,
      location,
      wasteType,
      priority,
      reason,
      eventId: eventId || null,
      assignedWorker: {
        userId: assignedWorkerId || req.user?._id || 'usr-003',
        name: assignedWorkerName || 'Rahul Verma',
        phone: '+91 98765 43210'
      },
      status: 'PENDING',
      dueTime
    });

    return res.status(201).json({
      success: true,
      message: 'Collection task dispatched successfully.',
      task
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create collection task.'
    });
  }
}

export async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { action, qrCodeScanned, proofPhoto, notes } = req.body;

    const task = await dataStore.getTaskById(id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found.' });
    }

    const updates = {};
    const now = new Date();

    if (action === 'START') {
      updates.status = 'IN_PROGRESS';
      updates.startedAt = now;

      // Update related event if any
      if (task.eventId) {
        await dataStore.updateEvent(task.eventId, {
          status: 'IN_PROGRESS',
          collectionStatus: 'in_progress'
        });
      }
    } else if (action === 'COMPLETE') {
      updates.status = 'COMPLETED';
      updates.completedAt = now;
      if (proofPhoto) updates.proofPhoto = proofPhoto;
      if (notes) updates.notes = notes;

      if (qrCodeScanned) {
        updates.verification = {
          type: 'QR_CODE',
          verifiedAt: now,
          qrCodeScanned
        };
      }

      // Also reset station fill level upon collection
      const station = await dataStore.getStationById(task.stationId);
      if (station) {
        await dataStore.updateStation(task.stationId, {
          fillLevel: Math.floor(10 + Math.random() * 15),
          weightKg: 3.5,
          status: 'healthy',
          lastCollection: now
        });
      }

      // Update related event to RESOLVED
      if (task.eventId) {
        const event = await dataStore.getEventById(task.eventId);
        if (event) {
          const timeline = [...event.timeline];
          const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          timeline.push({
            timestamp: now,
            timeString: timeStr,
            action: 'Collection completed',
            description: `Worker ${req.user?.name || task.assignedWorker?.name} completed task #${task.taskId}.`,
            actor: req.user?.name || task.assignedWorker?.name || 'Sanitation Worker',
            icon: 'check-circle'
          });
          timeline.push({
            timestamp: new Date(now.getTime() + 1000),
            timeString: timeStr,
            action: 'Event resolved',
            description: 'Verified loop complete. Bin normalized.',
            actor: 'EcoNest Loop Engine',
            icon: 'shield-check'
          });

          await dataStore.updateEvent(task.eventId, {
            status: 'RESOLVED',
            collectionStatus: 'completed',
            verificationStatus: 'qr_verified',
            proof: {
              photoUrl: proofPhoto || event.proof?.photoUrl || '',
              notes: notes || 'Verified collection via task worker.',
              uploadedAt: now
            },
            timeline,
            resolvedAt: now
          });

          if (event.exceptionId) {
            await dataStore.updateException(event.exceptionId, {
              status: 'RESOLVED',
              resolution: {
                notes: 'Resolved via completed collection task.',
                resolvedAt: now,
                resolvedBy: req.user?.name || task.assignedWorker?.name || 'Worker',
                proofPhoto: proofPhoto || ''
              }
            });
          }
        }
      }
    }

    const updatedTask = await dataStore.updateTask(id, updates);

    return res.json({
      success: true,
      message: `Task ${action === 'START' ? 'started' : action === 'COMPLETE' ? 'completed and loop verified' : 'updated'}.`,
      task: updatedTask
    });
  } catch (err) {
    console.error('Task update error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to update collection task.'
    });
  }
}
