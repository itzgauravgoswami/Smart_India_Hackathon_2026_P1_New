import dataStore from '../services/dataStore.js';

export async function getSanitationSchedule(req, res) {
  try {
    const { workerId, status } = req.query;
    const tasks = await dataStore.getSanitationTasks({ workerId, status });
    return res.json({
      success: true,
      tasks
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve sanitation schedule.'
    });
  }
}

export async function updateSanitationTask(req, res) {
  try {
    const { id } = req.params;
    const { status, proofPhoto, checklist, notes } = req.body;

    const updates = {};
    if (status) updates.status = status;
    if (proofPhoto) updates.proofPhoto = proofPhoto;
    if (checklist) updates.checklist = checklist;
    if (notes) updates.notes = notes;

    if (status === 'COMPLETED') {
      updates.completedAt = new Date();
      updates.verificationStatus = 'VERIFIED';
    }

    const updated = await dataStore.updateSanitationTask(id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Sanitation task not found.' });
    }

    return res.json({
      success: true,
      message: 'Sanitation task updated successfully.',
      task: updated
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update sanitation task.'
    });
  }
}
