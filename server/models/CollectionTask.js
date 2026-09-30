import mongoose from 'mongoose';

const collectionTaskSchema = new mongoose.Schema({
  taskId: { type: String, required: true, unique: true, index: true }, // e.g. TSK-1048
  eventId: { type: String, default: null },
  stationId: { type: String, required: true },
  location: { type: String, required: true },
  wasteType: { 
    type: String, 
    enum: ['Dry Waste', 'Wet Waste', 'Sanitary Waste', 'Special Care Waste', 'All Streams'], 
    default: 'Dry Waste' 
  },
  priority: { 
    type: String, 
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], 
    default: 'MEDIUM' 
  },
  reason: { type: String, default: 'Scheduled campus collection routine.' },
  assignedWorker: {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, default: '' }
  },
  status: { 
    type: String, 
    enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'OVERDUE'], 
    default: 'PENDING' 
  },
  dueTime: { type: Date, required: true },
  startedAt: { type: Date, default: null },
  completedAt: { type: Date, default: null },
  verification: {
    type: { type: String, enum: ['QR_CODE', 'GEO_TAG', 'MANUAL_DISPATCH'], default: 'QR_CODE' },
    verifiedAt: { type: Date, default: null },
    qrCodeScanned: { type: String, default: '' }
  },
  proofPhoto: { type: String, default: '' },
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const CollectionTask = mongoose.models.CollectionTask || mongoose.model('CollectionTask', collectionTaskSchema);
export default CollectionTask;
