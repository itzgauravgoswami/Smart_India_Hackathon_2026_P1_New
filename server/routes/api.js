import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

import * as authController from '../controllers/authController.js';
import * as dashboardController from '../controllers/dashboardController.js';
import * as wasteEventController from '../controllers/wasteEventController.js';
import * as stationController from '../controllers/stationController.js';
import * as exceptionController from '../controllers/exceptionController.js';
import * as taskController from '../controllers/taskController.js';
import * as sanitationController from '../controllers/sanitationController.js';
import * as aiController from '../controllers/aiController.js';
import * as analyticsController from '../controllers/analyticsController.js';
import * as notificationController from '../controllers/notificationController.js';
import dataStore from '../services/dataStore.js';

const router = Router();

// AUTH ROUTES
router.post('/auth/login', authController.login);
router.get('/auth/me', requireAuth, authController.getMe);
router.get('/auth/demo-accounts', authController.getDemoAccounts);

// DASHBOARD
router.get('/dashboard', dashboardController.getDashboardData);

// WASTE EVENTS & PASSPORT
router.get('/waste-events', wasteEventController.getEvents);
router.post('/waste-events', upload.single('image'), wasteEventController.createEvent);
router.get('/waste-events/:id', wasteEventController.getEventById);
router.post('/waste-events/:id/verify', wasteEventController.verifyEvent);
router.patch('/waste-events/:id/status', wasteEventController.updateEventStatus);

// WASTE STATIONS
router.get('/stations', stationController.getStations);
router.get('/stations/:id', stationController.getStationById);
router.patch('/stations/:id', stationController.updateStation);
router.post('/stations/:id/simulate', stationController.simulateTelemetry);

// EXCEPTION ENGINE
router.get('/exceptions', exceptionController.getExceptions);
router.post('/exceptions', exceptionController.createException);
router.patch('/exceptions/:id', exceptionController.updateException);

// COLLECTION OPERATIONS
router.get('/tasks', taskController.getTasks);
router.get('/tasks/:id', taskController.getTaskById);
router.post('/tasks', taskController.createTask);
router.patch('/tasks/:id', taskController.updateTask);

// SANITATION OPERATIONS
router.get('/sanitation', sanitationController.getSanitationSchedule);
router.patch('/sanitation/:id', sanitationController.updateSanitationTask);

// AI ASSISTANT & CLASSIFIER
router.post('/ai/classify', upload.single('image'), aiController.classify);
router.post('/reports/generate', aiController.generateReport);

// ANALYTICS & QUALITY SCORE
router.get('/analytics', analyticsController.getAnalytics);

// NOTIFICATIONS
router.get('/notifications', notificationController.getNotifications);
router.patch('/notifications/:id/read', notificationController.markAsRead);

// AUDIT LOGS (ADMIN / MANAGER)
router.get('/audit-logs', async (req, res) => {
  const logs = await dataStore.getAuditLogs(30);
  res.json({ success: true, logs });
});

// SYSTEM HEALTH / STATUS
router.get('/health', (req, res) => {
  res.json({
    status: 'operational',
    service: 'SwaLoop Core Engine',
    timestamp: new Date(),
    demoMode: true,
    mongoConnected: dataStore.isMongoConnected,
    aiAvailable: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here')
  });
});

export default router;
