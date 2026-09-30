import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import WasteStation from '../models/WasteStation.js';
import WasteEvent from '../models/WasteEvent.js';
import CollectionTask from '../models/CollectionTask.js';
import SanitationTask from '../models/SanitationTask.js';
import Exception from '../models/Exception.js';
import Notification from '../models/Notification.js';
import {
  SEED_USERS,
  SEED_STATIONS,
  SEED_EVENTS,
  SEED_EXCEPTIONS,
  SEED_TASKS,
  SEED_SANITATION,
  SEED_NOTIFICATIONS
} from './seedData.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/econest';

async function seed() {
  try {
    console.log('Connecting to MongoDB for seeding...');
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('Clearing existing collections...');

    await Promise.all([
      User.deleteMany({}),
      WasteStation.deleteMany({}),
      WasteEvent.deleteMany({}),
      CollectionTask.deleteMany({}),
      SanitationTask.deleteMany({}),
      Exception.deleteMany({}),
      Notification.deleteMany({})
    ]);

    console.log('Inserting seed records...');
    await User.insertMany(SEED_USERS);
    await WasteStation.insertMany(SEED_STATIONS);
    await WasteEvent.insertMany(SEED_EVENTS);
    await CollectionTask.insertMany(SEED_TASKS);
    await SanitationTask.insertMany(SEED_SANITATION);
    await Exception.insertMany(SEED_EXCEPTIONS);
    await Notification.insertMany(SEED_NOTIFICATIONS);

    console.log('✓ Successfully seeded EcoNest database with realistic campus operational data.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding encountered an issue:', err.message);
    process.exit(1);
  }
}

seed();
