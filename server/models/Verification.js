import mongoose from 'mongoose';

const verificationSchema = new mongoose.Schema({
  verificationId: { type: String, required: true, unique: true },
  eventId: { type: String, default: null },
  stationId: { type: String, required: true },
  workerId: { type: String, required: true },
  workerName: { type: String, default: '' },
  type: {
    type: String,
    enum: ['QR_SCAN', 'MANUAL_OVERRIDE', 'GEO_TAG'],
    default: 'QR_SCAN'
  },
  qrPayload: { type: String, required: true },
  verifiedAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['VALID', 'INVALID', 'FLAGGED'],
    default: 'VALID'
  },
  notes: { type: String, default: '' }
});

const Verification = mongoose.models.Verification || mongoose.model('Verification', verificationSchema);
export default Verification;
