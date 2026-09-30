import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'manager', 'worker', 'student'], 
    default: 'student' 
  },
  phone: { type: String, default: '' },
  avatar: { type: String, default: '' },
  department: { type: String, default: 'Campus Operations' },
  campus: { type: String, default: 'Main Smart Campus' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
