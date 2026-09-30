import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

const DEFAULT_USER = {
  id: 'usr-002',
  name: 'Ananya Iyer',
  email: 'manager@swaloop.campus',
  role: 'manager',
  department: 'Facility Management & Operations',
  campus: 'Main Smart Campus'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('swaloop_user');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return DEFAULT_USER;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadSession() {
      const token = localStorage.getItem('swaloop_token');
      const savedUser = localStorage.getItem('swaloop_user');
      if (!token || !savedUser) {
        localStorage.setItem('swaloop_user', JSON.stringify(DEFAULT_USER));
        localStorage.setItem('swaloop_token', 'demo_active_token');
      }
      try {
        const res = await api.getMe();
        if (res.user) {
          setUser(res.user);
          localStorage.setItem('swaloop_user', JSON.stringify(res.user));
        }
      } catch (_) {}
    }
    loadSession();
  }, []);

  async function autoLoginDemo(role = 'manager') {
    try {
      const emailMap = {
        manager: 'manager@swaloop.campus',
        worker: 'worker1@swaloop.campus',
        student: 'student@swaloop.campus',
        admin: 'admin@swaloop.campus'
      };
      const res = await api.login(emailMap[role] || 'manager@swaloop.campus', `${role}123`);
      if (res.success && res.token) {
        localStorage.setItem('swaloop_token', res.token);
        localStorage.setItem('swaloop_user', JSON.stringify(res.user));
        setUser(res.user);
      }
    } catch (err) {
      console.warn('Auto demo login skipped:', err.message);
    }
  }

  async function login(email, password) {
    const res = await api.login(email, password);
    if (res.success && res.token) {
      localStorage.setItem('swaloop_token', res.token);
      localStorage.setItem('swaloop_user', JSON.stringify(res.user));
      setUser(res.user);
      return res.user;
    }
    throw new Error(res.message || 'Login failed');
  }

  function logout() {
    localStorage.removeItem('swaloop_token');
    localStorage.removeItem('swaloop_user');
    setUser(null);
  }

  async function switchDemoRole(role) {
    const roleProfiles = {
      manager: {
        id: 'usr-002',
        name: 'Ananya Iyer',
        email: 'manager@swaloop.campus',
        role: 'manager',
        department: 'Facility Management & Operations',
        campus: 'Main Smart Campus'
      },
      worker: {
        id: 'usr-003',
        name: 'Rahul Verma',
        email: 'worker1@swaloop.campus',
        role: 'worker',
        department: 'Sanitation & Grounds Crew #3',
        campus: 'Main Smart Campus'
      },
      student: {
        id: 'usr-006',
        name: 'Aarav Patel',
        email: 'student@swaloop.campus',
        role: 'student',
        department: 'Computer Science & Engineering',
        campus: 'Main Smart Campus'
      },
      admin: {
        id: 'usr-001',
        name: 'Dr. Rajesh Sharma',
        email: 'admin@swaloop.campus',
        role: 'admin',
        department: 'Campus Administration & ESG Directorate',
        campus: 'Main Smart Campus'
      }
    };

    const targetUser = roleProfiles[role] || roleProfiles.manager;
    setUser(targetUser);
    localStorage.setItem('swaloop_user', JSON.stringify(targetUser));
    localStorage.setItem('swaloop_token', `demo_token_${role}`);

    try {
      await autoLoginDemo(role);
    } catch (_) {}
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, switchDemoRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
