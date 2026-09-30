import dataStore from '../services/dataStore.js';

export async function getExceptions(req, res) {
  try {
    const { status, severity, limit = 50 } = req.query;
    const exceptions = await dataStore.getExceptions({ status, severity, limit });

    // Count summary
    const all = await dataStore.getExceptions({ limit: 100 });
    const counts = {
      total: all.length,
      open: all.filter(e => e.status === 'OPEN').length,
      assigned: all.filter(e => e.status === 'ASSIGNED').length,
      inProgress: all.filter(e => e.status === 'IN_PROGRESS').length,
      resolved: all.filter(e => e.status === 'RESOLVED').length,
      critical: all.filter(e => e.severity === 'CRITICAL' && e.status !== 'RESOLVED').length
    };

    return res.json({
      success: true,
      counts,
      exceptions
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve operational exceptions.'
    });
  }
}

export async function createException(req, res) {
  try {
    const { type, severity, location, stationId, description, relatedEventId, assignedTo } = req.body;

    if (!type || !location || !stationId || !description) {
      return res.status(400).json({
        success: false,
        message: 'Missing required exception fields (type, location, stationId, description).'
      });
    }

    const exception = await dataStore.createException({
      type,
      severity: severity || 'ATTENTION',
      location,
      stationId,
      relatedEventId: relatedEventId || null,
      description,
      assignedTo: assignedTo || { userId: '', name: 'Unassigned' }
    });

    await dataStore.addNotification({
      severity: exception.severity,
      title: `${exception.type.replace(/_/g, ' ')} Alert`,
      message: exception.description,
      location: exception.location,
      relatedId: exception.exceptionId,
      relatedType: 'exception'
    });

    return res.status(201).json({
      success: true,
      message: 'Exception logged into Exception Engine.',
      exception
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create exception.'
    });
  }
}

export async function updateException(req, res) {
  try {
    const { id } = req.params;
    const { status, assignedTo, resolutionNotes, proofPhoto } = req.body;

    const updates = {};
    if (status) updates.status = status;
    if (assignedTo) updates.assignedTo = assignedTo;

    if (status === 'RESOLVED') {
      updates.resolution = {
        notes: resolutionNotes || 'Resolved through standard protocol.',
        resolvedAt: new Date(),
        resolvedBy: req.user?.name || 'Operator',
        proofPhoto: proofPhoto || ''
      };
    }

    const updated = await dataStore.updateException(id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Exception not found.' });
    }

    await dataStore.addAuditLog({
      action: 'EXCEPTION_UPDATED',
      performedBy: { userId: req.user?._id || 'SYS', name: req.user?.name || 'Operator', role: req.user?.role || 'manager' },
      targetType: 'exception',
      targetId: id,
      details: { status, assignedTo }
    });

    return res.json({
      success: true,
      message: `Exception ${id} updated.`,
      exception: updated
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update exception.'
    });
  }
}
