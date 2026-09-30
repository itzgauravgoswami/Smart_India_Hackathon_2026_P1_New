import mongoose from 'mongoose';

const wasteEventSchema = new mongoose.Schema({
  eventId: { type: String, required: true, unique: true, index: true }, // e.g. WS-10482
  stationId: { type: String, required: true },
  stationName: { type: String, required: true },
  location: { type: String, required: true }, // e.g. Block A Cafeteria
  wasteCategory: { 
    type: String, 
    enum: ['dry', 'wet', 'sanitary', 'special', 'unclassified'], 
    default: 'dry' 
  },
  aiClassification: {
    detectedCategory: { type: String, default: 'Dry Waste' },
    confidence: { type: Number, default: 0.94 }, // 0 to 1 (e.g. 0.94 = 94%)
    confidenceTier: { type: String, default: 'High' }, // High, Medium, Low
    explanation: { type: String, default: 'Identified recyclable packaging and plastic containers.' },
    rawTags: [String],
    source: { type: String, enum: ['gemini', 'deterministic_fallback', 'manual'], default: 'gemini' }
  },
  contaminationStatus: {
    detected: { type: Boolean, default: false },
    severity: { type: String, enum: ['None', 'Low', 'Medium', 'High'], default: 'None' },
    detectedItems: [String],
    notes: { type: String, default: '' },
    expectedStream: { type: String, default: 'dry' }
  },
  requiredAction: { type: String, default: 'Standard segregation and timely collection required.' },
  reporter: {
    userId: { type: String, default: 'SYSTEM' },
    name: { type: String, default: 'Automated Station Monitor' },
    role: { type: String, default: 'system' }
  },
  assignedWorker: {
    userId: { type: String, default: '' },
    name: { type: String, default: 'Unassigned' },
    phone: { type: String, default: '' }
  },
  collectionStatus: { 
    type: String, 
    enum: ['pending', 'in_progress', 'completed'], 
    default: 'pending' 
  },
  verificationStatus: { 
    type: String, 
    enum: ['unverified', 'qr_verified', 'manual_verified', 'gps_verified'], 
    default: 'unverified' 
  },
  proof: {
    photoUrl: { type: String, default: '' },
    notes: { type: String, default: '' },
    uploadedAt: { type: Date }
  },
  exceptionId: { type: String, default: null },
  status: { 
    type: String, 
    enum: ['OPEN', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'], 
    default: 'OPEN' 
  },
  timeline: [{
    timestamp: { type: Date, default: Date.now },
    timeString: { type: String }, // e.g. "10:32 AM"
    action: { type: String, required: true },
    description: { type: String },
    actor: { type: String, default: 'System' },
    icon: { type: String, default: 'clock' }
  }],
  qrCodeToken: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date, default: null }
});

const WasteEvent = mongoose.models.WasteEvent || mongoose.model('WasteEvent', wasteEventSchema);
export default WasteEvent;
