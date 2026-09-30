import dataStore from '../services/dataStore.js';

export async function getNotifications(req, res) {
  try {
    const notifications = await dataStore.getNotifications();
    const unreadCount = notifications.filter(n => !n.read).length;

    return res.json({
      success: true,
      unreadCount,
      notifications
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve notifications.'
    });
  }
}

export async function markAsRead(req, res) {
  try {
    const { id } = req.params;
    const updated = await dataStore.markNotificationRead(id);
    return res.json({
      success: true,
      notification: updated
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update notification state.'
    });
  }
}
