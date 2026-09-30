import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import apiRouter from './routes/api.js';
import dataStore from './services/dataStore.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/swaloop';

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Static uploads directory
const uploadsPath = path.resolve('public/uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
app.use('/uploads', express.static(uploadsPath));

// Routes
app.use('/api', apiRouter);

// Root informational endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'SwaLoop Operations Platform API',
    tagline: 'Every waste event. One verified loop.',
    version: '1.0.0',
    demoMode: true,
    mongoConnected: dataStore.isMongoConnected,
    endpoints: {
      dashboard: '/api/dashboard',
      events: '/api/waste-events',
      stations: '/api/stations',
      exceptions: '/api/exceptions',
      tasks: '/api/tasks',
      sanitation: '/api/sanitation',
      analytics: '/api/analytics',
      notifications: '/api/notifications',
      health: '/api/health'
    }
  });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server exception:', err);
  const status = err.status || 500;
  return res.status(status).json({
    success: false,
    message: err.message || 'An unexpected operational server error occurred.',
    timestamp: new Date()
  });
});

// Start listening immediately
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  SWALOOP OPERATIONS PLATFORM — BACKEND ONLINE`);
  console.log(`  Every waste event. One verified loop.`);
  console.log(`  Port: http://localhost:${PORT}`);
  console.log(`  API Health: http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
  
  // Non-blocking background attempt to connect to MongoDB
  if (process.env.DEMO_MODE === 'true' && !process.env.MONGODB_URI) {
    console.log('✓ SwaLoop is operating in High-Fidelity Zero-Dependency Demo Mode.');
  } else {
    mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 1500,
      connectTimeoutMS: 1500
    }).then(() => {
      dataStore.setMongoStatus(true);
      console.log('✓ Connected to MongoDB database successfully.');
    }).catch(() => {
      dataStore.setMongoStatus(false);
      console.log('ℹ Notice: Local MongoDB not detected. Fallback in-memory campus store active.');
    });
  }
});
