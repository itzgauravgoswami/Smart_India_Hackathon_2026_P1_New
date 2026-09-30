import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  notificationId: { type: String, required: true, unique: true },
  severity: {
    type: String,
    enum: ['CRITICAL', 'WARNING', 'ATTENTION', 'INFO', 'RESOLVED'],
    default: 'INFO'
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  location: { type: String, default: '' },
  relatedId: { type: String, default: '' }, // e.g. stationId or eventId
  relatedType: { type: String, default: 'station' },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
export default Notification;
