import bcrypt from 'bcryptjs';
import dataStore from '../services/dataStore.js';
import { generateToken } from '../middleware/auth.js';

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const user = await dataStore.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. User not found on campus directory.'
      });
    }

    // Check password
    let isMatch = false;
    if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      isMatch = password === user.password;
    }

    // Also support quick demo passwords
    if (!isMatch && (password === 'admin123' || password === 'manager123' || password === 'worker123' || password === 'student123')) {
      isMatch = true;
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please verify your password.'
      });
    }

    const token = generateToken(user);
    const { password: _, rawPassword: __, ...safeUser } = user.toObject ? user.toObject() : user;

    await dataStore.addAuditLog({
      action: 'USER_LOGIN',
      performedBy: { userId: user._id || user.id, name: user.name, role: user.role },
      targetType: 'auth',
      targetId: user.email,
      details: { role: user.role }
    });

    return res.json({
      success: true,
      message: `Welcome back, ${user.name}.`,
      token,
      user: safeUser
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({
      success: false,
      message: 'Authentication service encountered an unexpected error.'
    });
  }
}

export async function getMe(req, res) {
  try {
    const user = req.user;
    const { password: _, rawPassword: __, ...safeUser } = user.toObject ? user.toObject() : user;
    return res.json({
      success: true,
      user: safeUser
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve user profile.'
    });
  }
}

export async function getDemoAccounts(req, res) {
  const accounts = [
    {
      role: 'Facility Manager',
      email: 'manager@econest.campus',
      password: 'manager123',
      name: 'Ananya Iyer',
      desc: 'Full operational access, exceptions, dispatcher, stations & analytics.'
    },
    {
      role: 'Sanitation Worker',
      email: 'worker1@econest.campus',
      password: 'worker123',
      name: 'Rahul Verma',
      desc: 'Mobile-first crew view: tasks, station QR verification, proof uploads.'
    },
    {
      role: 'Student',
      email: 'student@econest.campus',
      password: 'student123',
      name: 'Aarav Patel',
      desc: 'Report waste issues, upload photos, AI guidance, track tickets.'
    },
    {
      role: 'Campus Admin',
      email: 'admin@econest.campus',
      password: 'admin123',
      name: 'Dr. Rajesh Sharma',
      desc: 'System governance, user administration, security audit logs.'
    }
  ];

  return res.json({
    success: true,
    accounts
  });
}
