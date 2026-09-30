import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

const DEFAULT_USER = {
  id: 'usr-002',
  name: 'Ananya Iyer',
  email: 'manager@econest.campus',
  role: 'manager',
  department: 'Facility Management & Operations',
  campus: 'Main Smart Campus'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('econest_user') || localStorage.getItem('swaloop_user');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return DEFAULT_USER;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadSession() {
      const token = localStorage.getItem('econest_token') || localStorage.getItem('swaloop_token');
      const savedUser = localStorage.getItem('econest_user') || localStorage.getItem('swaloop_user');
      if (!token || !savedUser) {
        localStorage.setItem('econest_user', JSON.stringify(DEFAULT_USER));
        localStorage.setItem('econest_token', 'demo_active_token');
      }
      try {
        const res = await api.getMe();
        if (res.user) {
          setUser(res.user);
          localStorage.setItem('econest_user', JSON.stringify(res.user));
        }
      } catch (_) {}
    }
    loadSession();
  }, []);

  async function autoLoginDemo(role = 'manager') {
    try {
      const emailMap = {
        manager: 'manager@econest.campus',
        worker: 'worker1@econest.campus',
        student: 'student@econest.campus',
        admin: 'admin@econest.campus'
      };
      const res = await api.login(emailMap[role] || 'manager@econest.campus', `${role}123`);
      if (res.success && res.token) {
        localStorage.setItem('econest_token', res.token);
        localStorage.setItem('econest_user', JSON.stringify(res.user));
        setUser(res.user);
      }
    } catch (err) {
      console.warn('Auto demo login skipped:', err.message);
    }
  }

  async function login(email, password) {
    const res = await api.login(email, password);
    if (res.success && res.token) {
      localStorage.setItem('econest_token', res.token);
      localStorage.setItem('econest_user', JSON.stringify(res.user));
      setUser(res.user);
      return res.user;
    }
    throw new Error(res.message || 'Login failed');
  }

  function logout() {
    localStorage.removeItem('econest_token');
    localStorage.removeItem('econest_user');
    localStorage.removeItem('swaloop_token');
    localStorage.removeItem('swaloop_user');
    setUser(null);
  }

  async function switchDemoRole(role) {
    const roleProfiles = {
      manager: {
        id: 'usr-002',
        name: 'Ananya Iyer',
        email: 'manager@econest.campus',
        role: 'manager',
        department: 'Facility Management & Operations',
        campus: 'Main Smart Campus'
      },
      worker: {
        id: 'usr-003',
        name: 'Rahul Verma',
        email: 'worker1@econest.campus',
        role: 'worker',
        department: 'Sanitation & Grounds Crew #3',
        campus: 'Main Smart Campus'
      },
      student: {
        id: 'usr-006',
        name: 'Aarav Patel',
        email: 'student@econest.campus',
        role: 'student',
        department: 'Computer Science & Engineering',
        campus: 'Main Smart Campus'
      },
      admin: {
        id: 'usr-001',
        name: 'Dr. Rajesh Sharma',
        email: 'admin@econest.campus',
        role: 'admin',
        department: 'Campus Administration & ESG Directorate',
        campus: 'Main Smart Campus'
      }
    };

    const targetUser = roleProfiles[role] || roleProfiles.manager;
    setUser(targetUser);
    localStorage.setItem('econest_user', JSON.stringify(targetUser));
    localStorage.setItem('econest_token', `demo_token_${role}`);

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
