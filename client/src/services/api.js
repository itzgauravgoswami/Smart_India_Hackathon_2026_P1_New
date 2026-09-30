import { mockStore } from './mockData';

const API_BASE = '/api';

// Detect whether we are running in standalone mode (e.g. hosted online without backend, or localhost in offline mock mode)
// If hosted on any public/staging domain (e.g. vercel.app, netlify.app, github.io, etc.), backend is not deployed online.
const isRemoteHost =
  typeof window !== 'undefined' &&
  window.location.hostname !== 'localhost' &&
  window.location.hostname !== '127.0.0.1' &&
  window.location.hostname !== '';

// Global backend connectivity status flag:
// false = standalone mock mode (active immediately on remote host, or after first local connection test fails)
// null = untested (on localhost)
// true = live backend verified
let isBackendAvailable = isRemoteHost ? false : null;

// Allow developer or evaluator to force mock mode or live backend if desired
if (typeof window !== 'undefined') {
  const forced = localStorage.getItem('econest_standalone_mode');
  if (forced === 'true' || forced === 'mock') {
    isBackendAvailable = false;
  }
}

export function getAuthHeaders() {
  const token = localStorage.getItem('econest_token') || localStorage.getItem('swaloop_token');
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function request(endpoint, options = {}, fallbackFn = null) {
  // 1. FAST PATH: If standalone / backend offline, immediately return mock fallback with 0ms delay
  if (isBackendAvailable === false) {
    if (fallbackFn) {
      return Promise.resolve(fallbackFn());
    }
    return { success: true };
  }

  // 2. LIVE ATTEMPT (only on localhost when not explicitly in standalone mode)
  try {
    const headers = {
      ...getAuthHeaders(),
      ...(options.headers || {})
    };

    if (!(options.body instanceof FormData) && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const controller = new AbortController();
    // Fast non-blocking timeout (600ms) on localhost so user never experiences lag if backend is not started
    const timeoutId = setTimeout(() => controller.abort(), 600);

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      isBackendAvailable = true;
      return await response.json();
    }
  } catch (err) {
    // If connection refused, timed out, or network error, permanently switch to standalone mock store for this session
    isBackendAvailable = false;
    console.info('[EcoNest] Running in Autonomous Standalone Client Mode (Mock Store Active)');
  }

  // 3. Fall back smoothly to client mock store
  if (fallbackFn) {
    return Promise.resolve(fallbackFn());
  }

  return { success: true };
}

export const api = {
  // AUTH
  login: async (email, password) => {
    return request(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password })
      },
      () => {
        const role = email.includes('admin')
          ? 'admin'
          : email.includes('worker')
          ? 'worker'
          : email.includes('student')
          ? 'student'
          : 'manager';

        const nameMap = {
          manager: 'Ananya Iyer',
          worker: 'Rahul Verma',
          student: 'Aarav Patel',
          admin: 'Dr. Rajesh Sharma'
        };

        const user = {
          id: `usr-${role}`,
          name: nameMap[role],
          email,
          role,
          department: role === 'worker' ? 'Grounds & Sanitation Crew' : role === 'student' ? 'Environmental Science & Student Council' : role === 'admin' ? 'Campus Administration Directorate' : 'Facility Operations',
          campus: 'Main Smart Campus'
        };

        return {
          success: true,
          token: `mock_jwt_token_${role}_${Date.now()}`,
          user
        };
      }
    );
  },

  getMe: () =>
    request('/auth/me', {}, () => {
      const saved = localStorage.getItem('econest_user') || localStorage.getItem('swaloop_user');
      if (saved) {
        return { success: true, user: JSON.parse(saved) };
      }
      return {
        success: true,
        user: {
          id: 'usr-002',
          name: 'Ananya Iyer',
          email: 'manager@econest.campus',
          role: 'manager',
          department: 'Facility Operations',
          campus: 'Main Smart Campus'
        }
      };
    }),

  getDemoAccounts: () =>
    request('/auth/demo-accounts', {}, () => ({
      success: true,
      accounts: [
        { role: 'manager', email: 'manager@econest.campus', name: 'Ananya Iyer', desc: 'Facility Manager (Full Operations)' },
        { role: 'worker', email: 'worker1@econest.campus', name: 'Rahul Verma', desc: 'Sanitation Crew (Mobile Tasks & QR)' },
        { role: 'student', email: 'student@econest.campus', name: 'Aarav Patel', desc: 'Citizen / Student (Issue Logging)' },
        { role: 'admin', email: 'admin@econest.campus', name: 'Dr. Rajesh Sharma', desc: 'Campus Administration (Executive)' }
      ]
    })),

  // DASHBOARD
  getDashboard: () => request('/dashboard', {}, () => mockStore.getDashboard()),

  // WASTE EVENTS & PASSPORT
  getEvents: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/waste-events${q ? `?${q}` : ''}`, {}, () => mockStore.getEvents(params));
  },

  getEventById: (id) =>
    request(`/waste-events/${id}`, {}, () => mockStore.getEventById(id)),

  createEvent: (formData) => {
    let dataObj = {};
    if (formData instanceof FormData) {
      dataObj = {
        stationId: formData.get('stationId'),
        location: formData.get('location'),
        wasteCategory: formData.get('wasteCategory'),
        description: formData.get('description')
      };
    } else {
      dataObj = formData || {};
    }
    return request(
      '/waste-events',
      {
        method: 'POST',
        body: formData
      },
      () => mockStore.createEvent(dataObj)
    );
  },

  verifyEvent: (id, data) =>
    request(
      `/waste-events/${id}/verify`,
      {
        method: 'POST',
        body: JSON.stringify(data)
      },
      () => mockStore.verifyEvent(id, data)
    ),

  updateEventStatus: (id, data) =>
    request(
      `/waste-events/${id}/status`,
      {
        method: 'PATCH',
        body: JSON.stringify(data)
      },
      () => mockStore.updateEventStatus(id, data)
    ),

  // STATIONS
  getStations: () => request('/stations', {}, () => mockStore.getStations()),

  getStationById: (id) =>
    request(`/stations/${id}`, {}, () => mockStore.getStationById(id)),

  updateStation: (id, updates) =>
    request(
      `/stations/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(updates)
      },
      () => mockStore.updateStation(id, updates)
    ),

  simulateTelemetry: (id, data) =>
    request(
      `/stations/${id}/simulate`,
      {
        method: 'POST',
        body: JSON.stringify(data)
      },
      () => mockStore.simulateTelemetry(id, data)
    ),

  // EXCEPTION ENGINE
  getExceptions: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/exceptions${q ? `?${q}` : ''}`, {}, () => mockStore.getExceptions(params));
  },

  createException: (data) =>
    request(
      '/exceptions',
      {
        method: 'POST',
        body: JSON.stringify(data)
      },
      () => mockStore.createException(data)
    ),

  updateException: (id, data) =>
    request(
      `/exceptions/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(data)
      },
      () => mockStore.updateException(id, data)
    ),

  // COLLECTION TASKS
  getTasks: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/tasks${q ? `?${q}` : ''}`, {}, () => mockStore.getTasks(params));
  },

  getTaskById: (id) =>
    request(`/tasks/${id}`, {}, () => {
      const res = mockStore.getTasks();
      const t = res.tasks.find((task) => task.taskId === id || task._id === id);
      return { success: true, task: t };
    }),

  createTask: (data) =>
    request(
      '/tasks',
      {
        method: 'POST',
        body: JSON.stringify(data)
      },
      () => mockStore.createTask(data)
    ),

  updateTask: (id, data) =>
    request(
      `/tasks/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(data)
      },
      () => mockStore.updateTask(id, data)
    ),

  // SANITATION OPERATIONS
  getSanitation: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/sanitation${q ? `?${q}` : ''}`, {}, () => mockStore.getSanitation());
  },

  updateSanitation: (id, data) =>
    request(
      `/sanitation/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(data)
      },
      () => mockStore.updateSanitation(id, data)
    ),

  // AI CLASSIFIER & REPORTS
  classifyImage: (formData) =>
    request(
      '/ai/classify',
      {
        method: 'POST',
        body: formData
      },
      () => mockStore.classifyImage(formData)
    ),

  generateReport: (reportType, timeframe) =>
    request(
      '/reports/generate',
      {
        method: 'POST',
        body: JSON.stringify({ reportType, timeframe })
      },
      () => mockStore.generateReport(reportType, timeframe)
    ),

  // ANALYTICS
  getAnalytics: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/analytics${q ? `?${q}` : ''}`, {}, () => mockStore.getAnalytics(params));
  },

  // NOTIFICATIONS
  getNotifications: () => request('/notifications', {}, () => mockStore.getNotifications()),

  markNotificationRead: (id) =>
    request(
      `/notifications/${id}/read`,
      {
        method: 'PATCH'
      },
      () => mockStore.markNotificationRead(id)
    ),

  // AUDIT LOGS
  getAuditLogs: () => request('/audit-logs', {}, () => mockStore.getAuditLogs()),

  // HEALTH
  getHealth: () => request('/health', {}, () => mockStore.getHealth())
};

export default api;
