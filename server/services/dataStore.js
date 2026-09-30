import mongoose from 'mongoose';
import User from '../models/User.js';
import WasteStation from '../models/WasteStation.js';
import WasteEvent from '../models/WasteEvent.js';
import CollectionTask from '../models/CollectionTask.js';
import SanitationTask from '../models/SanitationTask.js';
import Exception from '../models/Exception.js';
import Notification from '../models/Notification.js';
import AuditLog from '../models/AuditLog.js';
import {
  SEED_USERS,
  SEED_STATIONS,
  SEED_EVENTS,
  SEED_EXCEPTIONS,
  SEED_TASKS,
  SEED_SANITATION,
  SEED_NOTIFICATIONS
} from '../seed/seedData.js';

class DataStore {
  constructor() {
    this.isMongoConnected = false;
    this.memoryStore = {
      users: JSON.parse(JSON.stringify(SEED_USERS)),
      stations: JSON.parse(JSON.stringify(SEED_STATIONS)),
      events: JSON.parse(JSON.stringify(SEED_EVENTS)),
      exceptions: JSON.parse(JSON.stringify(SEED_EXCEPTIONS)),
      tasks: JSON.parse(JSON.stringify(SEED_TASKS)),
      sanitation: JSON.parse(JSON.stringify(SEED_SANITATION)),
      notifications: JSON.parse(JSON.stringify(SEED_NOTIFICATIONS)),
      auditLogs: []
    };
  }

  setMongoStatus(status) {
    this.isMongoConnected = status;
  }

  // USERS
  async findUserByEmail(email) {
    if (this.isMongoConnected) {
      try {
        return await User.findOne({ email: email.toLowerCase().trim() });
      } catch (err) {
        console.warn('MongoDB query failed, falling back to memoryStore:', err.message);
      }
    }
    return this.memoryStore.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim()) || null;
  }

  async findUserById(id) {
    if (this.isMongoConnected) {
      try {
        return await User.findById(id);
      } catch (err) {
        console.warn('MongoDB query failed, falling back to memoryStore:', err.message);
      }
    }
    return this.memoryStore.users.find(u => u._id === id || u.id === id) || null;
  }

  async getUsers() {
    if (this.isMongoConnected) {
      try {
        return await User.find().select('-password');
      } catch (err) {
        console.warn('MongoDB query failed, falling back to memoryStore:', err.message);
      }
    }
    return this.memoryStore.users.map(({ password, ...rest }) => rest);
  }

  // STATIONS
  async getStations() {
    if (this.isMongoConnected) {
      try {
        return await WasteStation.find().sort({ stationId: 1 });
      } catch (err) {
        console.warn('MongoDB query failed, falling back to memoryStore:', err.message);
      }
    }
    return this.memoryStore.stations;
  }

  async getStationById(stationId) {
    if (this.isMongoConnected) {
      try {
        return await WasteStation.findOne({ stationId });
      } catch (err) {
        console.warn('MongoDB query failed, falling back to memoryStore:', err.message);
      }
    }
    return this.memoryStore.stations.find(s => s.stationId === stationId) || null;
  }

  async updateStation(stationId, updates) {
    if (this.isMongoConnected) {
      try {
        return await WasteStation.findOneAndUpdate({ stationId }, updates, { new: true });
      } catch (err) {
        console.warn('MongoDB query failed, falling back to memoryStore:', err.message);
      }
    }
    const idx = this.memoryStore.stations.findIndex(s => s.stationId === stationId);
    if (idx !== -1) {
      this.memoryStore.stations[idx] = { ...this.memoryStore.stations[idx], ...updates };
      return this.memoryStore.stations[idx];
    }
    return null;
  }

  // EVENTS
  async getEvents({ limit = 50, category, status, stationId, search } = {}) {
    if (this.isMongoConnected) {
      try {
        const query = {};
        if (category && category !== 'all') query.wasteCategory = category;
        if (status && status !== 'all') query.status = status;
        if (stationId && stationId !== 'all') query.stationId = stationId;
        if (search) {
          query.$or = [
            { eventId: { $regex: search, $options: 'i' } },
            { location: { $regex: search, $options: 'i' } },
            { stationName: { $regex: search, $options: 'i' } }
          ];
        }
        return await WasteEvent.find(query).sort({ createdAt: -1 }).limit(Number(limit));
      } catch (err) {
        console.warn('MongoDB query failed, falling back to memoryStore:', err.message);
      }
    }
    let list = [...this.memoryStore.events];
    if (category && category !== 'all') {
      list = list.filter(e => e.wasteCategory === category);
    }
    if (status && status !== 'all') {
      list = list.filter(e => e.status === status);
    }
    if (stationId && stationId !== 'all') {
      list = list.filter(e => e.stationId === stationId);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(e => 
        e.eventId?.toLowerCase().includes(q) ||
        e.location?.toLowerCase().includes(q) ||
        e.stationName?.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return list.slice(0, Number(limit));
  }

  async getEventById(eventId) {
    if (this.isMongoConnected) {
      try {
        return await WasteEvent.findOne({ eventId });
      } catch (err) {
        console.warn('MongoDB query failed, falling back to memoryStore:', err.message);
      }
    }
    return this.memoryStore.events.find(e => e.eventId === eventId) || null;
  }

  async createEvent(eventData) {
    const eventId = eventData.eventId || `WS-${Math.floor(10000 + Math.random() * 90000)}`;
    const fullEvent = {
      ...eventData,
      eventId,
      createdAt: new Date(),
      status: eventData.status || 'OPEN',
      timeline: eventData.timeline || [
        {
          timestamp: new Date(),
          timeString: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action: 'Waste reported',
          description: `Event registered at ${eventData.location}.`,
          actor: eventData.reporter?.name || 'Operator',
          icon: 'camera'
        }
      ]
    };

    if (this.isMongoConnected) {
      try {
        const doc = new WasteEvent(fullEvent);
        return await doc.save();
      } catch (err) {
        console.warn('MongoDB query failed, falling back to memoryStore:', err.message);
      }
    }
    this.memoryStore.events.unshift(fullEvent);
    return fullEvent;
  }

  async updateEvent(eventId, updates) {
    if (this.isMongoConnected) {
      try {
        return await WasteEvent.findOneAndUpdate({ eventId }, updates, { new: true });
      } catch (err) {
        console.warn('MongoDB query failed, falling back to memoryStore:', err.message);
      }
    }
    const idx = this.memoryStore.events.findIndex(e => e.eventId === eventId);
    if (idx !== -1) {
      this.memoryStore.events[idx] = { ...this.memoryStore.events[idx], ...updates };
      return this.memoryStore.events[idx];
    }
    return null;
  }

  // EXCEPTIONS
  async getExceptions({ status, severity, limit = 50 } = {}) {
    if (this.isMongoConnected) {
      try {
        const query = {};
        if (status && status !== 'all') query.status = status;
        if (severity && severity !== 'all') query.severity = severity;
        return await Exception.find(query).sort({ createdAt: -1 }).limit(Number(limit));
      } catch (err) {
        console.warn('MongoDB query failed, falling back to memoryStore:', err.message);
      }
    }
    let list = [...this.memoryStore.exceptions];
    if (status && status !== 'all') list = list.filter(e => e.status === status);
    if (severity && severity !== 'all') list = list.filter(e => e.severity === severity);
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return list.slice(0, Number(limit));
  }

  async createException(expData) {
    const exceptionId = expData.exceptionId || `EXP-${Math.floor(100 + Math.random() * 900)}`;
    const fullExp = {
      ...expData,
      exceptionId,
      status: expData.status || 'OPEN',
      createdAt: new Date()
    };

    if (this.isMongoConnected) {
      try {
        const doc = new Exception(fullExp);
        return await doc.save();
      } catch (err) {
        console.warn('MongoDB query failed, falling back to memoryStore:', err.message);
      }
    }
    this.memoryStore.exceptions.unshift(fullExp);
    return fullExp;
  }

  async updateException(exceptionId, updates) {
    if (this.isMongoConnected) {
      try {
        return await Exception.findOneAndUpdate({ exceptionId }, updates, { new: true });
      } catch (err) {
        console.warn('MongoDB query failed, falling back to memoryStore:', err.message);
      }
    }
    const idx = this.memoryStore.exceptions.findIndex(e => e.exceptionId === exceptionId);
    if (idx !== -1) {
      this.memoryStore.exceptions[idx] = { ...this.memoryStore.exceptions[idx], ...updates };
      return this.memoryStore.exceptions[idx];
    }
    return null;
  }

  // TASKS
  async getTasks({ workerId, status, priority } = {}) {
    if (this.isMongoConnected) {
      try {
        const query = {};
        if (workerId) query['assignedWorker.userId'] = workerId;
        if (status && status !== 'all') query.status = status;
        if (priority && priority !== 'all') query.priority = priority;
        return await CollectionTask.find(query).sort({ dueTime: 1 });
      } catch (err) {
        console.warn('MongoDB query failed, falling back to memoryStore:', err.message);
      }
    }
    let list = [...this.memoryStore.tasks];
    if (workerId) list = list.filter(t => t.assignedWorker?.userId === workerId);
    if (status && status !== 'all') list = list.filter(t => t.status === status);
    if (priority && priority !== 'all') list = list.filter(t => t.priority === priority);
    return list;
  }

  async getTaskById(taskId) {
    if (this.isMongoConnected) {
      try {
        return await CollectionTask.findOne({ taskId });
      } catch (err) {
        console.warn('MongoDB query failed, falling back to memoryStore:', err.message);
      }
    }
    return this.memoryStore.tasks.find(t => t.taskId === taskId) || null;
  }

  async createTask(taskData) {
    const taskId = taskData.taskId || `TSK-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullTask = {
      ...taskData,
      taskId,
      status: taskData.status || 'PENDING',
      createdAt: new Date()
    };
    if (this.isMongoConnected) {
      try {
        const doc = new CollectionTask(fullTask);
        return await doc.save();
      } catch (err) {
        console.warn('MongoDB query failed, falling back to memoryStore:', err.message);
      }
    }
    this.memoryStore.tasks.unshift(fullTask);
    return fullTask;
  }

  async updateTask(taskId, updates) {
    if (this.isMongoConnected) {
      try {
        return await CollectionTask.findOneAndUpdate({ taskId }, updates, { new: true });
      } catch (err) {
        console.warn('MongoDB query failed, falling back to memoryStore:', err.message);
      }
    }
    const idx = this.memoryStore.tasks.findIndex(t => t.taskId === taskId);
    if (idx !== -1) {
      this.memoryStore.tasks[idx] = { ...this.memoryStore.tasks[idx], ...updates };
      return this.memoryStore.tasks[idx];
    }
    return null;
  }

  // SANITATION
  async getSanitationTasks({ workerId, status } = {}) {
    if (this.isMongoConnected) {
      try {
        const query = {};
        if (workerId) query['assignedWorker.userId'] = workerId;
        if (status && status !== 'all') query.status = status;
        return await SanitationTask.find(query).sort({ scheduledTime: 1 });
      } catch (err) {
        console.warn('MongoDB query failed, falling back to memoryStore:', err.message);
      }
    }
    let list = [...this.memoryStore.sanitation];
    if (workerId) list = list.filter(s => s.assignedWorker?.userId === workerId);
    if (status && status !== 'all') list = list.filter(s => s.status === status);
    return list;
  }

  async updateSanitationTask(taskId, updates) {
    if (this.isMongoConnected) {
      try {
        return await SanitationTask.findOneAndUpdate({ taskId }, updates, { new: true });
      } catch (err) {
        console.warn('MongoDB query failed, falling back to memoryStore:', err.message);
      }
    }
    const idx = this.memoryStore.sanitation.findIndex(s => s.taskId === taskId);
    if (idx !== -1) {
      this.memoryStore.sanitation[idx] = { ...this.memoryStore.sanitation[idx], ...updates };
      return this.memoryStore.sanitation[idx];
    }
    return null;
  }

  // NOTIFICATIONS
  async getNotifications() {
    if (this.isMongoConnected) {
      try {
        return await Notification.find().sort({ createdAt: -1 }).limit(20);
      } catch (err) {
        console.warn('MongoDB query failed, falling back to memoryStore:', err.message);
      }
    }
    return this.memoryStore.notifications;
  }

  async markNotificationRead(id) {
    if (this.isMongoConnected) {
      try {
        return await Notification.findOneAndUpdate({ notificationId: id }, { read: true }, { new: true });
      } catch (err) {
        console.warn('MongoDB query failed, falling back to memoryStore:', err.message);
      }
    }
    const n = this.memoryStore.notifications.find(item => item.notificationId === id);
    if (n) n.read = true;
    return n;
  }

  async addNotification(notif) {
    const full = {
      ...notif,
      notificationId: notif.notificationId || `NOTIF-${Date.now()}`,
      createdAt: new Date(),
      read: false
    };
    if (this.isMongoConnected) {
      try {
        const doc = new Notification(full);
        return await doc.save();
      } catch (err) {
        console.warn('MongoDB query failed, falling back to memoryStore:', err.message);
      }
    }
    this.memoryStore.notifications.unshift(full);
    return full;
  }

  // AUDIT LOGS
  async addAuditLog(entry) {
    const full = {
      ...entry,
      timestamp: new Date()
    };
    if (this.isMongoConnected) {
      try {
        const doc = new AuditLog(full);
        return await doc.save();
      } catch (err) {
        console.warn('MongoDB query failed, falling back to memoryStore:', err.message);
      }
    }
    this.memoryStore.auditLogs.unshift(full);
    return full;
  }

  async getAuditLogs(limit = 25) {
    if (this.isMongoConnected) {
      try {
        return await AuditLog.find().sort({ timestamp: -1 }).limit(limit);
      } catch (err) {
        console.warn('MongoDB query failed, falling back to memoryStore:', err.message);
      }
    }
    return this.memoryStore.auditLogs.slice(0, limit);
  }
}

export const dataStore = new DataStore();
export default dataStore;
