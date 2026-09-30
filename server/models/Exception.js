import mongoose from 'mongoose';

const exceptionSchema = new mongoose.Schema({
  exceptionId: { type: String, required: true, unique: true, index: true }, // e.g. EXP-2041
  type: {
    type: String,
    enum: [
      'OVERFLOW',
      'CONTAMINATION',
      'MISSED_COLLECTION',
      'SANITATION_OVERDUE',
      'SENSOR_OFFLINE',
      'REPEATED_SEGREGATION_ERROR',
      'UNUSUAL_WASTE_GENERATION'
    ],
    required: true
  },
  severity: {
    type: String,
    enum: ['ATTENTION', 'WARNING', 'CRITICAL'],
    default: 'ATTENTION'
  },
  location: { type: String, required: true },
  stationId: { type: String, required: true },
  relatedEventId: { type: String, default: null },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ['OPEN', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'],
    default: 'OPEN'
  },
  assignedTo: {
    userId: { type: String, default: '' },
    name: { type: String, default: 'Unassigned' }
  },
  resolution: {
    notes: { type: String, default: '' },
    resolvedAt: { type: Date, default: null },
    resolvedBy: { type: String, default: '' },
    proofPhoto: { type: String, default: '' }
  },
  createdAt: { type: Date, default: Date.now }
});

const Exception = mongoose.models.Exception || mongoose.model('Exception', exceptionSchema);
export default Exception;
