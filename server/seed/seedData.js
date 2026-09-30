import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
const hashPassword = (pw) => bcrypt.hashSync(pw, salt);

export const SEED_USERS = [
  {
    _id: 'usr-001',
    name: 'Dr. Rajesh Sharma',
    email: 'admin@econest.campus',
    password: hashPassword('admin123'),
    rawPassword: 'admin123',
    role: 'admin',
    department: 'Campus Administration',
    campus: 'Main Smart Campus',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    status: 'active'
  },
  {
    _id: 'usr-002',
    name: 'Ananya Iyer',
    email: 'manager@econest.campus',
    password: hashPassword('manager123'),
    rawPassword: 'manager123',
    role: 'manager',
    department: 'Facility Management & Operations',
    campus: 'Main Smart Campus',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'active'
  },
  {
    _id: 'usr-003',
    name: 'Rahul Verma',
    email: 'worker1@econest.campus',
    password: hashPassword('worker123'),
    rawPassword: 'worker123',
    role: 'worker',
    phone: '+91 98765 43210',
    department: 'Sanitation & Grounds Crew',
    campus: 'Main Smart Campus',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'active'
  },
  {
    _id: 'usr-004',
    name: 'Suresh Kumar',
    email: 'worker2@econest.campus',
    password: hashPassword('worker123'),
    rawPassword: 'worker123',
    role: 'worker',
    phone: '+91 98765 43211',
    department: 'Sanitation & Grounds Crew',
    campus: 'Main Smart Campus',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'active'
  },
  {
    _id: 'usr-005',
    name: 'Pooja Devi',
    email: 'worker3@econest.campus',
    password: hashPassword('worker123'),
    rawPassword: 'worker123',
    role: 'worker',
    phone: '+91 98765 43212',
    department: 'Sanitation & Grounds Crew',
    campus: 'Main Smart Campus',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    status: 'active'
  },
  {
    _id: 'usr-006',
    name: 'Aarav Patel',
    email: 'student@econest.campus',
    password: hashPassword('student123'),
    rawPassword: 'student123',
    role: 'student',
    phone: '+91 98765 11001',
    department: 'Computer Science & Engineering',
    campus: 'Main Smart Campus',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    status: 'active'
  },
  {
    _id: 'usr-007',
    name: 'Neha Sen',
    email: 'student2@econest.campus',
    password: hashPassword('student123'),
    rawPassword: 'student123',
    role: 'student',
    phone: '+91 98765 11002',
    department: 'Environmental Science',
    campus: 'Main Smart Campus',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    status: 'active'
  },
  {
    _id: 'usr-008',
    name: 'Rohan Mehta',
    email: 'student3@econest.campus',
    password: hashPassword('student123'),
    rawPassword: 'student123',
    role: 'student',
    phone: '+91 98765 11003',
    department: 'Mechanical Engineering',
    campus: 'Main Smart Campus',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    status: 'active'
  },
  {
    _id: 'usr-009',
    name: 'Sneha Joshi',
    email: 'student4@econest.campus',
    password: hashPassword('student123'),
    rawPassword: 'student123',
    role: 'student',
    phone: '+91 98765 11004',
    department: 'Biotechnology',
    campus: 'Main Smart Campus',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    status: 'active'
  },
  {
    _id: 'usr-010',
    name: 'Vikram Rao',
    email: 'student5@econest.campus',
    password: hashPassword('student123'),
    rawPassword: 'student123',
    role: 'student',
    phone: '+91 98765 11005',
    department: 'Electronics & Communication',
    campus: 'Main Smart Campus',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    status: 'active'
  }
];

export const SEED_STATIONS = [
  {
    stationId: 'WS-001',
    name: 'Main Gate Reception Station',
    zone: 'Perimeter & Entry',
    location: {
      name: 'Main Gate Plaza',
      coordinates: { lat: 28.5452, lng: 77.1926 },
      block: 'Main Gate',
      floor: 'Ground Plaza'
    },
    streams: ['dry', 'wet', 'sanitary', 'special'],
    fillLevel: 42,
    weightKg: 8.5,
    batteryLevel: 94,
    sensorStatus: 'online',
    status: 'healthy',
    capacityLiters: 150,
    lastCollection: new Date(Date.now() - 3 * 3600000),
    nextRecommendedCollection: new Date(Date.now() + 5 * 3600000),
    lastSanitation: new Date(Date.now() - 6 * 3600000),
    qrCode: 'ECONEST-QR-WS-001',
    assignedWorker: { userId: 'usr-003', name: 'Rahul Verma' }
  },
  {
    stationId: 'WS-002',
    name: 'Central Library Station',
    zone: 'Central Academic Zone',
    location: {
      name: 'Library Atrium',
      coordinates: { lat: 28.5461, lng: 77.1938 },
      block: 'Central Library',
      floor: 'Level 1 Atrium'
    },
    streams: ['dry', 'wet', 'sanitary'],
    fillLevel: 68,
    weightKg: 14.2,
    batteryLevel: 89,
    sensorStatus: 'online',
    status: 'healthy',
    capacityLiters: 120,
    lastCollection: new Date(Date.now() - 4 * 3600000),
    nextRecommendedCollection: new Date(Date.now() + 2 * 3600000),
    lastSanitation: new Date(Date.now() - 4 * 3600000),
    qrCode: 'ECONEST-QR-WS-002',
    assignedWorker: { userId: 'usr-004', name: 'Suresh Kumar' }
  },
  {
    stationId: 'WS-003',
    name: 'Academic Block A Lobby',
    zone: 'Central Academic Zone',
    location: {
      name: 'Academic Block A Ground',
      coordinates: { lat: 28.5469, lng: 77.1945 },
      block: 'Academic Block A',
      floor: 'Ground Floor'
    },
    streams: ['dry', 'wet', 'sanitary', 'special'],
    fillLevel: 55,
    weightKg: 11.4,
    batteryLevel: 91,
    sensorStatus: 'online',
    status: 'healthy',
    capacityLiters: 120,
    lastCollection: new Date(Date.now() - 2 * 3600000),
    nextRecommendedCollection: new Date(Date.now() + 4 * 3600000),
    lastSanitation: new Date(Date.now() - 5 * 3600000),
    qrCode: 'ECONEST-QR-WS-003',
    assignedWorker: { userId: 'usr-003', name: 'Rahul Verma' }
  },
  {
    stationId: 'WS-004',
    name: 'Block A Cafeteria Station',
    zone: 'Food & Student Dining',
    location: {
      name: 'Block A Cafeteria',
      coordinates: { lat: 28.5474, lng: 77.1951 },
      block: 'Block A Cafeteria Annex',
      floor: 'Ground Dining'
    },
    streams: ['dry', 'wet'],
    fillLevel: 92,
    weightKg: 28.6,
    batteryLevel: 82,
    sensorStatus: 'online',
    status: 'overflow',
    capacityLiters: 180,
    lastCollection: new Date(Date.now() - 5 * 3600000),
    nextRecommendedCollection: new Date(Date.now() - 30 * 60000), // overdue!
    lastSanitation: new Date(Date.now() - 3 * 3600000),
    qrCode: 'ECONEST-QR-WS-004',
    assignedWorker: { userId: 'usr-003', name: 'Rahul Verma' }
  },
  {
    stationId: 'WS-005',
    name: 'Academic Block B Computing Hub',
    zone: 'Central Academic Zone',
    location: {
      name: 'Block B Labs Courtyard',
      coordinates: { lat: 28.5463, lng: 77.1962 },
      block: 'Academic Block B',
      floor: 'Floor 2 corridor'
    },
    streams: ['dry', 'wet', 'special'],
    fillLevel: 78,
    weightKg: 16.1,
    batteryLevel: 87,
    sensorStatus: 'online',
    status: 'at_risk',
    capacityLiters: 120,
    lastCollection: new Date(Date.now() - 5 * 3600000),
    nextRecommendedCollection: new Date(Date.now() + 1 * 3600000),
    lastSanitation: new Date(Date.now() - 7 * 3600000),
    qrCode: 'ECONEST-QR-WS-005',
    assignedWorker: { userId: 'usr-005', name: 'Pooja Devi' }
  },
  {
    stationId: 'WS-006',
    name: 'Hostel A Dining & Courtyard',
    zone: 'Residential Quarters',
    location: {
      name: 'Hostel A North Wing',
      coordinates: { lat: 28.5485, lng: 77.1932 },
      block: 'Hostel Block A',
      floor: 'Mess Exit'
    },
    streams: ['dry', 'wet', 'sanitary'],
    fillLevel: 61,
    weightKg: 13.8,
    batteryLevel: 79,
    sensorStatus: 'online',
    status: 'healthy',
    capacityLiters: 140,
    lastCollection: new Date(Date.now() - 3 * 3600000),
    nextRecommendedCollection: new Date(Date.now() + 3 * 3600000),
    lastSanitation: new Date(Date.now() - 2 * 3600000),
    qrCode: 'ECONEST-QR-WS-006',
    assignedWorker: { userId: 'usr-004', name: 'Suresh Kumar' }
  },
  {
    stationId: 'WS-007',
    name: 'Hostel B Quadrangle Hub',
    zone: 'Residential Quarters',
    location: {
      name: 'Hostel B Courtyard',
      coordinates: { lat: 28.5492, lng: 77.1943 },
      block: 'Hostel Block B',
      floor: 'Ground Courtyard'
    },
    streams: ['dry', 'wet', 'sanitary'],
    fillLevel: 84,
    weightKg: 19.4,
    batteryLevel: 85,
    sensorStatus: 'online',
    status: 'at_risk',
    capacityLiters: 140,
    lastCollection: new Date(Date.now() - 6 * 3600000),
    nextRecommendedCollection: new Date(Date.now() - 10 * 60000),
    lastSanitation: new Date(Date.now() - 8 * 3600000),
    qrCode: 'ECONEST-QR-WS-007',
    assignedWorker: { userId: 'usr-005', name: 'Pooja Devi' }
  },
  {
    stationId: 'WS-008',
    name: 'Sports Complex Arena Station',
    zone: 'Recreation & Athletics',
    location: {
      name: 'Sports Complex Grounds',
      coordinates: { lat: 28.5445, lng: 77.1975 },
      block: 'Sports Arena',
      floor: 'Main Entrance'
    },
    streams: ['dry', 'wet', 'special'],
    fillLevel: 35,
    weightKg: 7.2,
    batteryLevel: 98,
    sensorStatus: 'online',
    status: 'healthy',
    capacityLiters: 150,
    lastCollection: new Date(Date.now() - 6 * 3600000),
    nextRecommendedCollection: new Date(Date.now() + 6 * 3600000),
    lastSanitation: new Date(Date.now() - 10 * 3600000),
    qrCode: 'ECONEST-QR-WS-008',
    assignedWorker: { userId: 'usr-004', name: 'Suresh Kumar' }
  },
  {
    stationId: 'WS-009',
    name: 'North Parking Transit Bay',
    zone: 'Perimeter & Transit',
    location: {
      name: 'North Parking Lot 2',
      coordinates: { lat: 28.5499, lng: 77.1921 },
      block: 'North Parking Bay',
      floor: 'Ground Transit'
    },
    streams: ['dry', 'wet'],
    fillLevel: 48,
    weightKg: 9.7,
    batteryLevel: 14,
    sensorStatus: 'offline',
    status: 'offline',
    capacityLiters: 120,
    lastCollection: new Date(Date.now() - 7 * 3600000),
    nextRecommendedCollection: new Date(Date.now() + 3 * 3600000),
    lastSanitation: new Date(Date.now() - 9 * 3600000),
    qrCode: 'ECONEST-QR-WS-009',
    assignedWorker: { userId: 'usr-003', name: 'Rahul Verma' }
  },
  {
    stationId: 'WS-010',
    name: 'Central Administration Block',
    zone: 'Administrative Zone',
    location: {
      name: 'Admin Block Portico',
      coordinates: { lat: 28.5458, lng: 77.1915 },
      block: 'Administration Wing',
      floor: 'Ground Reception'
    },
    streams: ['dry', 'wet', 'sanitary'],
    fillLevel: 32,
    weightKg: 6.4,
    batteryLevel: 96,
    sensorStatus: 'online',
    status: 'healthy',
    capacityLiters: 120,
    lastCollection: new Date(Date.now() - 1 * 3600000),
    nextRecommendedCollection: new Date(Date.now() + 7 * 3600000),
    lastSanitation: new Date(Date.now() - 2 * 3600000),
    qrCode: 'ECONEST-QR-WS-010',
    assignedWorker: { userId: 'usr-004', name: 'Suresh Kumar' }
  },
  {
    stationId: 'WS-011',
    name: 'Innovation & Incubation Wing',
    zone: 'Research & Labs',
    location: {
      name: 'Tech Incubator Foyer',
      coordinates: { lat: 28.5471, lng: 77.1972 },
      block: 'Innovation Centre',
      floor: 'Ground Lobby'
    },
    streams: ['dry', 'wet', 'special'],
    fillLevel: 51,
    weightKg: 10.9,
    batteryLevel: 92,
    sensorStatus: 'online',
    status: 'healthy',
    capacityLiters: 120,
    lastCollection: new Date(Date.now() - 2 * 3600000),
    nextRecommendedCollection: new Date(Date.now() + 4 * 3600000),
    lastSanitation: new Date(Date.now() - 4 * 3600000),
    qrCode: 'ECONEST-QR-WS-011',
    assignedWorker: { userId: 'usr-005', name: 'Pooja Devi' }
  },
  {
    stationId: 'WS-012',
    name: 'Student Activity Center (SAC)',
    zone: 'Student Life & Recreation',
    location: {
      name: 'SAC Plaza Entrance',
      coordinates: { lat: 28.5466, lng: 77.1931 },
      block: 'SAC Building',
      floor: 'Ground Amphitheatre'
    },
    streams: ['dry', 'wet', 'sanitary', 'special'],
    fillLevel: 81,
    weightKg: 17.5,
    batteryLevel: 88,
    sensorStatus: 'online',
    status: 'at_risk',
    capacityLiters: 150,
    lastCollection: new Date(Date.now() - 4 * 3600000),
    nextRecommendedCollection: new Date(Date.now() + 1 * 3600000),
    lastSanitation: new Date(Date.now() - 5 * 3600000),
    qrCode: 'ECONEST-QR-WS-012',
    assignedWorker: { userId: 'usr-003', name: 'Rahul Verma' }
  }
];

export const SEED_EXCEPTIONS = [
  {
    exceptionId: 'EXP-101',
    type: 'OVERFLOW',
    severity: 'CRITICAL',
    location: 'Block A Cafeteria',
    stationId: 'WS-004',
    relatedEventId: 'WS-10482',
    description: 'Station capacity exceeded 92%. Immediate clearance required to avoid ground spillage.',
    status: 'IN_PROGRESS',
    assignedTo: { userId: 'usr-003', name: 'Rahul Verma' },
    createdAt: new Date(Date.now() - 8 * 60000)
  },
  {
    exceptionId: 'EXP-102',
    type: 'SANITATION_OVERDUE',
    severity: 'WARNING',
    location: 'Hostel Block B Courtyard',
    stationId: 'WS-007',
    relatedEventId: 'WS-10480',
    description: 'Scheduled sanitization cycle is 24 minutes past target deadline.',
    status: 'ASSIGNED',
    assignedTo: { userId: 'usr-005', name: 'Pooja Devi' },
    createdAt: new Date(Date.now() - 24 * 60000)
  },
  {
    exceptionId: 'EXP-103',
    type: 'REPEATED_SEGREGATION_ERROR',
    severity: 'ATTENTION',
    location: 'Block A Cafeteria Annex',
    stationId: 'WS-004',
    relatedEventId: 'WS-10479',
    description: 'Repeated dry-waste contamination: Food residue and curry cups deposited in plastic hopper.',
    status: 'OPEN',
    assignedTo: { userId: 'usr-002', name: 'Ananya Iyer' },
    createdAt: new Date(Date.now() - 42 * 60000)
  },
  {
    exceptionId: 'EXP-104',
    type: 'SENSOR_OFFLINE',
    severity: 'CRITICAL',
    location: 'North Parking Lot 2',
    stationId: 'WS-009',
    relatedEventId: null,
    description: 'Telemetry heartbeat lost for 95 minutes. Ultrasonic distance module uncommunicative.',
    status: 'OPEN',
    assignedTo: { userId: 'usr-001', name: 'Dr. Rajesh Sharma' },
    createdAt: new Date(Date.now() - 95 * 60000)
  },
  {
    exceptionId: 'EXP-105',
    type: 'CONTAMINATION',
    severity: 'WARNING',
    location: 'Central Library Atrium',
    stationId: 'WS-002',
    relatedEventId: 'WS-10475',
    description: 'Used sanitary hygiene packet found in paper recycling bin.',
    status: 'RESOLVED',
    assignedTo: { userId: 'usr-004', name: 'Suresh Kumar' },
    resolution: {
      notes: 'Segregated with safety tongs and sanitized the bin receptacle.',
      resolvedAt: new Date(Date.now() - 15 * 60000),
      resolvedBy: 'Suresh Kumar',
      proofPhoto: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80'
    },
    createdAt: new Date(Date.now() - 120 * 60000)
  },
  {
    exceptionId: 'EXP-106',
    type: 'MISSED_COLLECTION',
    severity: 'WARNING',
    location: 'Hostel Block A North Wing',
    stationId: 'WS-006',
    relatedEventId: 'WS-10468',
    description: 'Morning collection cycle was skipped due to temporary maintenance lock.',
    status: 'RESOLVED',
    assignedTo: { userId: 'usr-004', name: 'Suresh Kumar' },
    resolution: {
      notes: 'Lock removed, cleared 14kg of sorted recyclables.',
      resolvedAt: new Date(Date.now() - 45 * 60000),
      resolvedBy: 'Suresh Kumar'
    },
    createdAt: new Date(Date.now() - 180 * 60000)
  },
  {
    exceptionId: 'EXP-107',
    type: 'UNUSUAL_WASTE_GENERATION',
    severity: 'ATTENTION',
    location: 'Student Activity Center Plaza',
    stationId: 'WS-012',
    relatedEventId: 'WS-10470',
    description: 'Waste surge (+140% above baseline) detected following cultural club rehearsal.',
    status: 'ASSIGNED',
    assignedTo: { userId: 'usr-003', name: 'Rahul Verma' },
    createdAt: new Date(Date.now() - 65 * 60000)
  },
  {
    exceptionId: 'EXP-108',
    type: 'CONTAMINATION',
    severity: 'ATTENTION',
    location: 'Academic Block B Computing Hub',
    stationId: 'WS-005',
    relatedEventId: 'WS-10462',
    description: 'Lithium coin cells detected in wet organic bin.',
    status: 'RESOLVED',
    assignedTo: { userId: 'usr-005', name: 'Pooja Devi' },
    resolution: {
      notes: 'Extracted batteries to e-waste container; notified department admin.',
      resolvedAt: new Date(Date.now() - 30 * 60000),
      resolvedBy: 'Pooja Devi'
    },
    createdAt: new Date(Date.now() - 210 * 60000)
  },
  {
    exceptionId: 'EXP-109',
    type: 'OVERFLOW',
    severity: 'WARNING',
    location: 'Academic Block B Computing Hub',
    stationId: 'WS-005',
    relatedEventId: null,
    description: 'Fill level reached 78% during mid-day lecture interchange.',
    status: 'OPEN',
    assignedTo: { userId: 'usr-005', name: 'Pooja Devi' },
    createdAt: new Date(Date.now() - 35 * 60000)
  },
  {
    exceptionId: 'EXP-110',
    type: 'REPEATED_SEGREGATION_ERROR',
    severity: 'ATTENTION',
    location: 'Hostel Block B Quadrangle',
    stationId: 'WS-007',
    relatedEventId: null,
    description: 'Recurring non-biodegradable food packaging disposed in wet compost bin.',
    status: 'OPEN',
    assignedTo: { userId: 'usr-002', name: 'Ananya Iyer' },
    createdAt: new Date(Date.now() - 90 * 60000)
  }
];

export const SEED_TASKS = [
  {
    taskId: 'TSK-1048',
    eventId: 'WS-10482',
    stationId: 'WS-004',
    location: 'Block A Cafeteria',
    wasteType: 'Dry Waste',
    priority: 'HIGH',
    reason: 'Station reached 92% capacity with detected contamination.',
    assignedWorker: {
      userId: 'usr-003',
      name: 'Rahul Verma',
      phone: '+91 98765 43210'
    },
    status: 'IN_PROGRESS',
    dueTime: new Date(Date.now() + 25 * 60000),
    startedAt: new Date(Date.now() - 15 * 60000),
    completedAt: null,
    verification: {
      type: 'QR_CODE',
      verifiedAt: null,
      qrCodeScanned: ''
    },
    notes: 'Prioritize segregating contaminated food wraps before bulk bag sealing.'
  },
  {
    taskId: 'TSK-1049',
    eventId: 'WS-10480',
    stationId: 'WS-007',
    location: 'Hostel Block B Courtyard',
    wasteType: 'Wet Waste',
    priority: 'HIGH',
    reason: 'Fill level reached 84%; kitchen mess runoff prevention.',
    assignedWorker: {
      userId: 'usr-005',
      name: 'Pooja Devi',
      phone: '+91 98765 43212'
    },
    status: 'PENDING',
    dueTime: new Date(Date.now() + 45 * 60000),
    startedAt: null,
    completedAt: null,
    verification: { type: 'QR_CODE', verifiedAt: null, qrCodeScanned: '' },
    notes: 'Transfer to decentralized organic composting pit behind Hostel B.'
  },
  {
    taskId: 'TSK-1050',
    eventId: 'WS-10475',
    stationId: 'WS-002',
    location: 'Central Library Atrium',
    wasteType: 'Dry Waste',
    priority: 'MEDIUM',
    reason: 'Routine library paper and cardboard clearing.',
    assignedWorker: {
      userId: 'usr-004',
      name: 'Suresh Kumar',
      phone: '+91 98765 43211'
    },
    status: 'COMPLETED',
    dueTime: new Date(Date.now() - 30 * 60000),
    startedAt: new Date(Date.now() - 55 * 60000),
    completedAt: new Date(Date.now() - 15 * 60000),
    verification: {
      type: 'QR_CODE',
      verifiedAt: new Date(Date.now() - 16 * 60000),
      qrCodeScanned: 'ECONEST-QR-WS-002'
    },
    proofPhoto: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
    notes: 'Baled 18kg clean paper waste for recycling partner pickup.'
  },
  {
    taskId: 'TSK-1051',
    eventId: null,
    stationId: 'WS-012',
    location: 'Student Activity Center',
    wasteType: 'All Streams',
    priority: 'MEDIUM',
    reason: 'Post-event clearing following campus tech symposium.',
    assignedWorker: {
      userId: 'usr-003',
      name: 'Rahul Verma',
      phone: '+91 98765 43210'
    },
    status: 'PENDING',
    dueTime: new Date(Date.now() + 90 * 60000),
    startedAt: null,
    completedAt: null,
    verification: { type: 'QR_CODE', verifiedAt: null, qrCodeScanned: '' },
    notes: 'Bring separate dry waste sacks for event banners and plastic cups.'
  },
  {
    taskId: 'TSK-1052',
    eventId: null,
    stationId: 'WS-005',
    location: 'Academic Block B Computing Hub',
    wasteType: 'Special Care Waste',
    priority: 'HIGH',
    reason: 'Periodic e-waste and battery clearing from hardware labs.',
    assignedWorker: {
      userId: 'usr-005',
      name: 'Pooja Devi',
      phone: '+91 98765 43212'
    },
    status: 'PENDING',
    dueTime: new Date(Date.now() + 120 * 60000),
    startedAt: null,
    completedAt: null,
    verification: { type: 'QR_CODE', verifiedAt: null, qrCodeScanned: '' },
    notes: 'Use antistatic collection container for lab batteries.'
  }
];

export const SEED_SANITATION = [
  {
    taskId: 'SAN-301',
    stationId: 'WS-001',
    location: 'Main Gate Plaza',
    scheduledTime: new Date(Date.now() - 4 * 3600000),
    dueTime: new Date(Date.now() - 3 * 3600000),
    priority: 'MEDIUM',
    assignedWorker: { userId: 'usr-003', name: 'Rahul Verma' },
    status: 'COMPLETED',
    completedAt: new Date(Date.now() - 3 * 3600000),
    proofPhoto: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80',
    verificationStatus: 'VERIFIED',
    checklist: [
      { item: 'Surface disinfectant wipe-down', completed: true },
      { item: 'Sensor aperture cleaned', completed: true },
      { item: 'Liner replacement', completed: true },
      { item: 'Ground deodorization', completed: true }
    ],
    notes: 'Cleaned and disinfected all four bin compartments.'
  },
  {
    taskId: 'SAN-302',
    stationId: 'WS-004',
    location: 'Block A Cafeteria',
    scheduledTime: new Date(Date.now() - 2 * 3600000),
    dueTime: new Date(Date.now() - 1 * 3600000),
    priority: 'HIGH',
    assignedWorker: { userId: 'usr-003', name: 'Rahul Verma' },
    status: 'COMPLETED',
    completedAt: new Date(Date.now() - 1 * 3600000),
    proofPhoto: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80',
    verificationStatus: 'VERIFIED',
    checklist: [
      { item: 'Organic odor neutralizer applied', completed: true },
      { item: 'Chute degreasing', completed: true },
      { item: 'Pest deterrent checked', completed: true }
    ],
    notes: 'Completed post-lunch rush sanitization cycle.'
  },
  {
    taskId: 'SAN-303',
    stationId: 'WS-007',
    location: 'Hostel Block B Courtyard',
    scheduledTime: new Date(Date.now() - 60 * 60000),
    dueTime: new Date(Date.now() - 20 * 60000),
    priority: 'CRITICAL',
    assignedWorker: { userId: 'usr-005', name: 'Pooja Devi' },
    status: 'OVERDUE',
    completedAt: null,
    proofPhoto: '',
    verificationStatus: 'PENDING',
    checklist: [
      { item: 'Moisture barrier check', completed: false },
      { item: 'Exterior washing', completed: false },
      { item: 'Bleach disinfectant treatment', completed: false }
    ],
    notes: 'Worker notified via operational notification drawer.'
  },
  {
    taskId: 'SAN-304',
    stationId: 'WS-008',
    location: 'Sports Complex Arena',
    scheduledTime: new Date(Date.now() + 60 * 60000),
    dueTime: new Date(Date.now() + 120 * 60000),
    priority: 'MEDIUM',
    assignedWorker: { userId: 'usr-004', name: 'Suresh Kumar' },
    status: 'SCHEDULED',
    completedAt: null,
    proofPhoto: '',
    verificationStatus: 'PENDING',
    checklist: [
      { item: 'Gym drink spill wipe', completed: false },
      { item: 'Recycle liner renewal', completed: false }
    ],
    notes: 'Pre-evening athletic meet sanitize pass.'
  }
];

export const SEED_EVENTS = [
  {
    eventId: 'WS-10482',
    stationId: 'WS-004',
    stationName: 'Block A Cafeteria Station',
    location: 'Block A Cafeteria',
    wasteCategory: 'dry',
    aiClassification: {
      detectedCategory: 'Dry Waste',
      confidence: 0.94,
      confidenceTier: 'High',
      explanation: 'PET beverage containers and cardboard packaging detected. Food residue on paper wrappers flagged as contamination.',
      rawTags: ['plastic_bottle', 'takeout_box', 'soda_can', 'food_grease'],
      source: 'gemini'
    },
    contaminationStatus: {
      detected: true,
      severity: 'Medium',
      detectedItems: ['Curry gravy residue on carton', 'Unrinsed milkshake cup'],
      notes: 'Remove food-contaminated packaging and separate into wet waste stream before recycling bag closure.',
      expectedStream: 'dry'
    },
    requiredAction: 'Remove food-contaminated packaging. Dispatch priority collection.',
    reporter: {
      userId: 'usr-006',
      name: 'Aarav Patel',
      role: 'student'
    },
    assignedWorker: {
      userId: 'usr-003',
      name: 'Rahul Verma',
      phone: '+91 98765 43210'
    },
    collectionStatus: 'in_progress',
    verificationStatus: 'qr_verified',
    proof: {
      photoUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
      notes: 'Station QR scanned on site. In-progress sorting by worker.',
      uploadedAt: new Date(Date.now() - 10 * 60000)
    },
    exceptionId: 'EXP-101',
    status: 'IN_PROGRESS',
    timeline: [
      {
        timestamp: new Date(Date.now() - 50 * 60000),
        timeString: '10:32 AM',
        action: 'Waste reported',
        description: 'Student scanned station QR and logged bin overflow with photo.',
        actor: 'Aarav Patel (Student)',
        icon: 'camera'
      },
      {
        timestamp: new Date(Date.now() - 49 * 60000),
        timeString: '10:33 AM',
        action: 'AI classification completed',
        description: 'Detected Dry Waste (94% confidence). High plastic and paper packaging volume.',
        actor: 'Gemini Vision AI Engine',
        icon: 'cpu'
      },
      {
        timestamp: new Date(Date.now() - 48 * 60000),
        timeString: '10:34 AM',
        action: 'Contamination detected',
        description: 'Medium severity gravy staining on dry cardboards identified. Action triggered.',
        actor: 'Exception Engine',
        icon: 'alert-triangle'
      },
      {
        timestamp: new Date(Date.now() - 46 * 60000),
        timeString: '10:36 AM',
        action: 'Task assigned',
        description: 'Assigned to Rahul Verma (Sanitation Worker) with High Priority flag.',
        actor: 'Ananya Iyer (Facility Manager)',
        icon: 'user-check'
      },
      {
        timestamp: new Date(Date.now() - 31 * 60000),
        timeString: '10:51 AM',
        action: 'Worker started task',
        description: 'Rahul Verma arrived at Block A Cafeteria and checked in.',
        actor: 'Rahul Verma',
        icon: 'play'
      },
      {
        timestamp: new Date(Date.now() - 15 * 60000),
        timeString: '11:04 AM',
        action: 'QR verification completed',
        description: 'Physical station QR token ECONEST-QR-WS-004 validated successfully.',
        actor: 'Rahul Verma',
        icon: 'qr-code'
      }
    ],
    qrCodeToken: 'ECONEST-QR-WS-004',
    createdAt: new Date(Date.now() - 50 * 60000)
  },
  {
    eventId: 'WS-10481',
    stationId: 'WS-002',
    stationName: 'Central Library Station',
    location: 'Central Library Atrium',
    wasteCategory: 'dry',
    aiClassification: {
      detectedCategory: 'Dry Waste',
      confidence: 0.98,
      confidenceTier: 'High',
      explanation: 'Office printing paper, spiral binding covers, clean notebooks.',
      rawTags: ['paper', 'notebook', 'cardboard'],
      source: 'gemini'
    },
    contaminationStatus: {
      detected: false,
      severity: 'None',
      detectedItems: [],
      notes: 'Pure clean paper stream. Ideal segregation quality.',
      expectedStream: 'dry'
    },
    requiredAction: 'Routine collection and baling.',
    reporter: { userId: 'usr-007', name: 'Neha Sen', role: 'student' },
    assignedWorker: { userId: 'usr-004', name: 'Suresh Kumar', phone: '+91 98765 43211' },
    collectionStatus: 'completed',
    verificationStatus: 'qr_verified',
    proof: {
      photoUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
      notes: 'Sorted into paper compactor bags.',
      uploadedAt: new Date(Date.now() - 25 * 60000)
    },
    status: 'RESOLVED',
    timeline: [
      {
        timestamp: new Date(Date.now() - 120 * 60000),
        timeString: '09:15 AM',
        action: 'Waste reported',
        description: 'Scheduled campus morning audit pass.',
        actor: 'System Sensor',
        icon: 'activity'
      },
      {
        timestamp: new Date(Date.now() - 118 * 60000),
        timeString: '09:17 AM',
        action: 'AI classification completed',
        description: 'Dry Waste classified with 98% confidence. No contamination found.',
        actor: 'Gemini Vision AI Engine',
        icon: 'cpu'
      },
      {
        timestamp: new Date(Date.now() - 60 * 60000),
        timeString: '10:15 AM',
        action: 'Collection completed',
        description: '14kg clean paper transferred to recycling depot.',
        actor: 'Suresh Kumar',
        icon: 'check-circle'
      },
      {
        timestamp: new Date(Date.now() - 25 * 60000),
        timeString: '10:50 AM',
        action: 'Event resolved',
        description: 'Station reset to normal healthy operating threshold.',
        actor: 'EcoNest Loop Engine',
        icon: 'shield-check'
      }
    ],
    createdAt: new Date(Date.now() - 120 * 60000),
    resolvedAt: new Date(Date.now() - 25 * 60000)
  },
  {
    eventId: 'WS-10480',
    stationId: 'WS-007',
    stationName: 'Hostel B Quadrangle Hub',
    location: 'Hostel Block B Courtyard',
    wasteCategory: 'wet',
    aiClassification: {
      detectedCategory: 'Wet Waste',
      confidence: 0.91,
      confidenceTier: 'High',
      explanation: 'Fruit peels, vegetable waste, cooked grains from hostel pantry.',
      rawTags: ['organic', 'food_scraps', 'vegetable'],
      source: 'gemini'
    },
    contaminationStatus: {
      detected: true,
      severity: 'Low',
      detectedItems: ['Single plastic spoon in wet bin'],
      notes: 'Tongs used to extract cutlery.',
      expectedStream: 'wet'
    },
    requiredAction: 'Sort minor cutlery and divert to campus vermicompost bed.',
    reporter: { userId: 'usr-008', name: 'Rohan Mehta', role: 'student' },
    assignedWorker: { userId: 'usr-005', name: 'Pooja Devi', phone: '+91 98765 43212' },
    collectionStatus: 'pending',
    verificationStatus: 'unverified',
    proof: { photoUrl: '', notes: '' },
    exceptionId: 'EXP-102',
    status: 'ASSIGNED',
    timeline: [
      {
        timestamp: new Date(Date.now() - 90 * 60000),
        timeString: '09:45 AM',
        action: 'Waste reported',
        description: 'Hostel rep flagged high wet waste volume before morning cleanup.',
        actor: 'Rohan Mehta (Student)',
        icon: 'flag'
      },
      {
        timestamp: new Date(Date.now() - 88 * 60000),
        timeString: '09:47 AM',
        action: 'AI classification completed',
        description: 'Wet organic waste verified with 91% confidence.',
        actor: 'Gemini Vision AI Engine',
        icon: 'cpu'
      },
      {
        timestamp: new Date(Date.now() - 75 * 60000),
        timeString: '10:00 AM',
        action: 'Task assigned',
        description: 'Assigned to Pooja Devi for compost processing.',
        actor: 'Ananya Iyer',
        icon: 'user-check'
      }
    ],
    createdAt: new Date(Date.now() - 90 * 60000)
  },
  {
    eventId: 'WS-10479',
    stationId: 'WS-005',
    stationName: 'Academic Block B Computing Hub',
    location: 'Academic Block B',
    wasteCategory: 'special',
    aiClassification: {
      detectedCategory: 'Special Care Waste',
      confidence: 0.89,
      confidenceTier: 'High',
      explanation: 'Damaged Li-Po drone batteries, soldered breadboard scraps, wire clippings.',
      rawTags: ['electronics', 'battery', 'hazardous'],
      source: 'gemini'
    },
    contaminationStatus: {
      detected: false,
      severity: 'None',
      detectedItems: [],
      notes: 'Accurate segregation in e-waste drop box.',
      expectedStream: 'special'
    },
    requiredAction: 'Safe e-waste container sealing and transfer to university tech recycling partner.',
    reporter: { userId: 'usr-009', name: 'Sneha Joshi', role: 'student' },
    assignedWorker: { userId: 'usr-005', name: 'Pooja Devi', phone: '+91 98765 43212' },
    collectionStatus: 'pending',
    verificationStatus: 'unverified',
    proof: { photoUrl: '', notes: '' },
    status: 'OPEN',
    timeline: [
      {
        timestamp: new Date(Date.now() - 140 * 60000),
        timeString: '08:55 AM',
        action: 'Waste reported',
        description: 'Robotics lab teaching assistant deposited retired lithium batteries.',
        actor: 'Sneha Joshi',
        icon: 'battery-charging'
      },
      {
        timestamp: new Date(Date.now() - 138 * 60000),
        timeString: '08:57 AM',
        action: 'AI classification completed',
        description: 'Hazardous electronic components detected. Special protocol enabled.',
        actor: 'Gemini Vision AI Engine',
        icon: 'cpu'
      }
    ],
    createdAt: new Date(Date.now() - 140 * 60000)
  },
  {
    eventId: 'WS-10478',
    stationId: 'WS-003',
    stationName: 'Academic Block A Lobby',
    location: 'Academic Block A',
    wasteCategory: 'sanitary',
    aiClassification: {
      detectedCategory: 'Sanitary Waste',
      confidence: 0.93,
      confidenceTier: 'High',
      explanation: 'Disinfectant paper towels, face masks, used sanitary hygiene materials.',
      rawTags: ['tissue', 'medical_mask', 'hygiene'],
      source: 'gemini'
    },
    contaminationStatus: {
      detected: false,
      severity: 'None',
      detectedItems: [],
      notes: 'Proper sanitary disposal lined bag verified.',
      expectedStream: 'sanitary'
    },
    requiredAction: 'Incinerator-ready bag seal and autoclave transfer.',
    reporter: { userId: 'usr-002', name: 'Ananya Iyer', role: 'manager' },
    assignedWorker: { userId: 'usr-003', name: 'Rahul Verma', phone: '+91 98765 43210' },
    collectionStatus: 'completed',
    verificationStatus: 'qr_verified',
    proof: {
      photoUrl: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=600&auto=format&fit=crop&q=80',
      notes: 'Red-coded biocontainment liner installed and recorded.',
      uploadedAt: new Date(Date.now() - 80 * 60000)
    },
    status: 'RESOLVED',
    timeline: [
      {
        timestamp: new Date(Date.now() - 200 * 60000),
        timeString: '07:50 AM',
        action: 'Waste reported',
        description: 'Early morning restroom sanitation audit check.',
        actor: 'Ananya Iyer',
        icon: 'check-square'
      },
      {
        timestamp: new Date(Date.now() - 195 * 60000),
        timeString: '07:55 AM',
        action: 'AI classification completed',
        description: 'Sanitary stream verified.',
        actor: 'Gemini Vision AI Engine',
        icon: 'cpu'
      },
      {
        timestamp: new Date(Date.now() - 80 * 60000),
        timeString: '09:50 AM',
        action: 'Event resolved',
        description: 'Disposed in certified medical sanitation incinerator.',
        actor: 'Rahul Verma',
        icon: 'shield-check'
      }
    ],
    createdAt: new Date(Date.now() - 200 * 60000),
    resolvedAt: new Date(Date.now() - 80 * 60000)
  }
];

// Generate 25 additional realistic events to reach 30+ events
const categories = ['dry', 'wet', 'sanitary', 'special'];
const catNames = {
  dry: 'Dry Waste',
  wet: 'Wet Waste',
  sanitary: 'Sanitary Waste',
  special: 'Special Care Waste'
};

for (let i = 1; i <= 26; i++) {
  const num = 10477 - i;
  const station = SEED_STATIONS[i % SEED_STATIONS.length];
  const cat = categories[i % categories.length];
  const isResolved = i > 6;
  const isContaminated = i % 4 === 0;
  const conf = 0.88 + ((i % 11) * 0.01);
  const worker = SEED_USERS[2 + (i % 3)];
  const reporter = SEED_USERS[5 + (i % 5)];
  const hoursAgo = 2 + (i * 1.5);

  SEED_EVENTS.push({
    eventId: `WS-${num}`,
    stationId: station.stationId,
    stationName: station.name,
    location: station.location.name,
    wasteCategory: cat,
    aiClassification: {
      detectedCategory: catNames[cat],
      confidence: parseFloat(conf.toFixed(2)),
      confidenceTier: conf > 0.9 ? 'High' : 'Medium',
      explanation: `System identified ${catNames[cat]} constituents matching campus disposal standards.`,
      rawTags: [cat, 'campus_stream'],
      source: 'gemini'
    },
    contaminationStatus: {
      detected: isContaminated,
      severity: isContaminated ? (i % 8 === 0 ? 'Medium' : 'Low') : 'None',
      detectedItems: isContaminated ? ['Cross-stream misplaced wrap'] : [],
      notes: isContaminated ? 'Minor segregation mismatch detected by sensor.' : 'Good segregation compliance.',
      expectedStream: cat
    },
    requiredAction: isContaminated ? 'Re-segregate before loading onto transfer vehicle.' : 'Standard pickup according to campus route.',
    reporter: {
      userId: reporter._id,
      name: reporter.name,
      role: reporter.role
    },
    assignedWorker: {
      userId: worker._id,
      name: worker.name,
      phone: worker.phone || '+91 98765 00000'
    },
    collectionStatus: isResolved ? 'completed' : (i < 3 ? 'in_progress' : 'pending'),
    verificationStatus: isResolved ? 'qr_verified' : (i < 3 ? 'manual_verified' : 'unverified'),
    proof: {
      photoUrl: isResolved ? 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80' : '',
      notes: isResolved ? 'Collection and station sanitization documented.' : '',
      uploadedAt: isResolved ? new Date(Date.now() - (hoursAgo - 1) * 3600000) : null
    },
    exceptionId: isContaminated && !isResolved ? `EXP-${200 + i}` : null,
    status: isResolved ? 'RESOLVED' : (i < 3 ? 'IN_PROGRESS' : 'ASSIGNED'),
    timeline: [
      {
        timestamp: new Date(Date.now() - hoursAgo * 3600000),
        timeString: `${8 + (i % 8)}:${(10 + (i * 7)) % 60 < 10 ? '0' : ''}${(10 + (i * 7)) % 60} AM`,
        action: 'Waste reported',
        description: `Logged at ${station.location.name}.`,
        actor: reporter.name,
        icon: 'camera'
      },
      {
        timestamp: new Date(Date.now() - (hoursAgo - 0.1) * 3600000),
        timeString: `${8 + (i % 8)}:${(15 + (i * 7)) % 60 < 10 ? '0' : ''}${(15 + (i * 7)) % 60} AM`,
        action: 'AI classification completed',
        description: `Verified ${catNames[cat]} with ${(conf * 100).toFixed(0)}% confidence.`,
        actor: 'Gemini Vision AI Engine',
        icon: 'cpu'
      },
      ...(isResolved ? [
        {
          timestamp: new Date(Date.now() - (hoursAgo - 0.8) * 3600000),
          timeString: `${9 + (i % 8)}:10 AM`,
          action: 'Collection completed',
          description: `Disposed by ${worker.name}. QR token verified.`,
          actor: worker.name,
          icon: 'check-circle'
        },
        {
          timestamp: new Date(Date.now() - (hoursAgo - 1) * 3600000),
          timeString: `${9 + (i % 8)}:15 AM`,
          action: 'Event resolved',
          description: 'Verified loop closed and metrics archived.',
          actor: 'EcoNest Loop Engine',
          icon: 'shield-check'
        }
      ] : [])
    ],
    qrCodeToken: station.qrCode,
    createdAt: new Date(Date.now() - hoursAgo * 3600000),
    resolvedAt: isResolved ? new Date(Date.now() - (hoursAgo - 1) * 3600000) : null
  });
}

export const SEED_NOTIFICATIONS = [
  {
    notificationId: 'NOTIF-001',
    severity: 'CRITICAL',
    title: 'Station Overflow Risk',
    message: 'WS-004 (Block A Cafeteria) reached 92% capacity. Collection dispatch urgent.',
    location: 'Block A Cafeteria',
    relatedId: 'WS-004',
    relatedType: 'station',
    read: false,
    createdAt: new Date(Date.now() - 8 * 60000)
  },
  {
    notificationId: 'NOTIF-002',
    severity: 'WARNING',
    title: 'Sanitation Task Overdue',
    message: 'Sanitation routine SAN-303 at Hostel Block B is 24 minutes overdue.',
    location: 'Hostel Block B Courtyard',
    relatedId: 'SAN-303',
    relatedType: 'sanitation',
    read: false,
    createdAt: new Date(Date.now() - 24 * 60000)
  },
  {
    notificationId: 'NOTIF-003',
    severity: 'ATTENTION',
    title: 'Contamination Alert Flagged',
    message: 'Medium dry-waste food contamination identified at Block A Cafeteria by AI Inspector.',
    location: 'Block A Cafeteria',
    relatedId: 'WS-10482',
    relatedType: 'event',
    read: false,
    createdAt: new Date(Date.now() - 48 * 60000)
  },
  {
    notificationId: 'NOTIF-004',
    severity: 'CRITICAL',
    title: 'IoT Sensor Offline',
    message: 'North Parking Transit Bay telemetry heartbeat lost. Inspection required.',
    location: 'North Parking Lot 2',
    relatedId: 'WS-009',
    relatedType: 'station',
    read: true,
    createdAt: new Date(Date.now() - 95 * 60000)
  },
  {
    notificationId: 'NOTIF-005',
    severity: 'RESOLVED',
    title: 'Collection Completed',
    message: 'Rahul Verma completed QR-verified dry waste clearance at Academic Block A.',
    location: 'Academic Block A Ground',
    relatedId: 'WS-10478',
    relatedType: 'event',
    read: true,
    createdAt: new Date(Date.now() - 80 * 60000)
  }
];
