import mongoose from 'mongoose';

const sanitationTaskSchema = new mongoose.Schema({
  taskId: { type: String, required: true, unique: true, index: true }, // e.g. SAN-3021
  stationId: { type: String, required: true },
  location: { type: String, required: true },
  scheduledTime: { type: Date, required: true },
  dueTime: { type: Date, required: true },
  priority: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], default: 'MEDIUM' },
  assignedWorker: {
    userId: { type: String, required: true },
    name: { type: String, required: true }
  },
  status: {
    type: String,
    enum: ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'OVERDUE'],
    default: 'SCHEDULED'
  },
  completedAt: { type: Date, default: null },
  proofPhoto: { type: String, default: '' },
  verificationStatus: { type: String, default: 'PENDING' },
  checklist: [{
    item: { type: String, required: true },
    completed: { type: Boolean, default: false }
  }],
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const SanitationTask = mongoose.models.SanitationTask || mongoose.model('SanitationTask', sanitationTaskSchema);
export default SanitationTask;
