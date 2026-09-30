import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  performedBy: {
    userId: { type: String, default: 'SYSTEM' },
    name: { type: String, default: 'System' },
    role: { type: String, default: 'system' }
  },
  targetType: { type: String, required: true }, // 'event', 'station', 'task', 'exception', 'auth'
  targetId: { type: String, default: '' },
  details: { type: mongoose.Schema.Types.Mixed, default: {} },
  ip: { type: String, default: '127.0.0.1' },
  timestamp: { type: Date, default: Date.now }
});

const AuditLog = mongoose.models.AuditLog || mongoose.model('AuditLog', auditLogSchema);
export default AuditLog;
