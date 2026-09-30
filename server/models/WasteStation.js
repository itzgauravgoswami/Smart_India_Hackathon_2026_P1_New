import mongoose from 'mongoose';

const wasteStationSchema = new mongoose.Schema({
  stationId: { type: String, required: true, unique: true, index: true }, // e.g. WS-001
  name: { type: String, required: true }, // e.g. Block A Cafeteria Station
  zone: { type: String, default: 'Central Academic Zone' },
  location: {
    name: { type: String, required: true }, // e.g. Block A Cafeteria
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    block: { type: String, default: 'Block A' },
    floor: { type: String, default: 'Ground Floor' }
  },
  streams: [{
    type: String,
    enum: ['dry', 'wet', 'sanitary', 'special']
  }],
  fillLevel: { type: Number, default: 0, min: 0, max: 100 }, // percentage
  weightKg: { type: Number, default: 0 },
  batteryLevel: { type: Number, default: 95 },
  sensorStatus: { 
    type: String, 
    enum: ['online', 'offline', 'warning'], 
    default: 'online' 
  },
  status: { 
    type: String, 
    enum: ['healthy', 'at_risk', 'overflow', 'offline'], 
    default: 'healthy' 
  },
  capacityLiters: { type: Number, default: 120 },
  lastCollection: { type: Date, default: Date.now },
  nextRecommendedCollection: { type: Date, default: () => new Date(Date.now() + 4 * 3600000) },
  lastSanitation: { type: Date, default: Date.now },
  qrCode: { type: String, required: true }, // e.g. SWALOOP-QR-WS-001
  assignedWorker: {
    userId: { type: String, default: '' },
    name: { type: String, default: '' }
  },
  historicalTrends: [{
    timestamp: { type: Date, default: Date.now },
    fillLevel: Number,
    weightKg: Number
  }],
  createdAt: { type: Date, default: Date.now }
});

const WasteStation = mongoose.models.WasteStation || mongoose.model('WasteStation', wasteStationSchema);
export default WasteStation;
