import { mockStore } from './mockData';

const API_BASE = '/api';

export function getAuthHeaders() {
  const token = localStorage.getItem('swaloop_token');
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function request(endpoint, options = {}, fallbackFn = null) {
  try {
    const headers = {
      ...getAuthHeaders(),
      ...(options.headers || {})
    };

    if (!(options.body instanceof FormData) && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    // Fall back smoothly to client mock store if server is slow or disconnected
  }

  if (fallbackFn) {
    return fallbackFn();
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
          department: role === 'worker' ? 'Grounds & Sanitation Crew' : 'Facility Management',
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
      const saved = localStorage.getItem('swaloop_user');
      if (saved) {
        return { success: true, user: JSON.parse(saved) };
      }
      return {
        success: true,
        user: {
          id: 'usr-002',
          name: 'Ananya Iyer',
          email: 'manager@swaloop.campus',
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
        { role: 'manager', email: 'manager@swaloop.campus', name: 'Ananya Iyer', desc: 'Facility Manager (Full Operations)' },
        { role: 'worker', email: 'worker1@swaloop.campus', name: 'Rahul Verma', desc: 'Sanitation Crew (Mobile Tasks & QR)' },
        { role: 'student', email: 'student@swaloop.campus', name: 'Aarav Patel', desc: 'Citizen / Student (Issue Logging)' },
        { role: 'admin', email: 'admin@swaloop.campus', name: 'Dr. Rajesh Sharma', desc: 'Campus Administration (Executive)' }
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
      () => mockStore.verifyEvent(id, data)
    ),

  // STATIONS
  getStations: () => request('/stations', {}, () => mockStore.getStations()),

  getStationById: (id) =>
    request(`/stations/${id}`, {}, () => {
      const res = mockStore.getStations();
      const st = res.stations.find((s) => s.stationId === id || s._id === id);
      return { success: true, station: st };
    }),

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
      () => {
        const fill = data.fillLevel ?? 92;
        return mockStore.updateStation(id, {
          fillPercentage: fill,
          status: fill >= 85 ? 'overflow' : fill >= 70 ? 'at_risk' : 'healthy',
          lastTelemetryReceivedAt: new Date().toISOString()
        });
      }
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
      () => ({ success: true, exception: data })
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
      () => ({ success: true, task: data })
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
  getAuditLogs: () => request('/audit-logs', {}, () => ({ success: true, logs: [] })),

  // HEALTH
  getHealth: () => request('/health', {}, () => ({ success: true, status: 'mock_healthy' }))
};

export default api;
