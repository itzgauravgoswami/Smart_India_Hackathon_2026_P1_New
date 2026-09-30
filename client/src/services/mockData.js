// Comprehensive Campus Operational Mock Store
// Provides 100% resilient dummy data and stateful offline operations for SwaLoop

const STORAGE_KEY = 'swaloop_mock_db_v2';

export const INITIAL_STATIONS = [
  {
    _id: 'stn-001',
    stationId: 'WS-001',
    name: 'Central Library Atrium',
    zone: 'Academic Core',
    locationDescription: 'Ground Floor Main Entrance Lobby, East Wing',
    lat: 28.5458,
    lng: 77.1926,
    status: 'overflow',
    fillPercentage: 92,
    batteryPercentage: 88,
    lastTelemetryReceivedAt: new Date(Date.now() - 3 * 60000).toISOString(),
    hardware: { firmwareVersion: 'v2.4.1', signalDbm: -64, ultrasonicStatus: 'OK' },
    bins: [
      { type: 'DRY_RECYCLABLE', fillLevel: 92, maxCapacityKg: 80, currentLoadKg: 73.6 },
      { type: 'WET_ORGANIC', fillLevel: 45, maxCapacityKg: 60, currentLoadKg: 27.0 },
      { type: 'SANITARY', fillLevel: 15, maxCapacityKg: 30, currentLoadKg: 4.5 }
    ]
  },
  {
    _id: 'stn-002',
    stationId: 'WS-002',
    name: 'Tech Tower Innovation Hub',
    zone: 'Academic Core',
    locationDescription: 'Corridor connecting CSE labs and Server Room',
    lat: 28.5469,
    lng: 77.1938,
    status: 'healthy',
    fillPercentage: 68,
    batteryPercentage: 94,
    lastTelemetryReceivedAt: new Date(Date.now() - 5 * 60000).toISOString(),
    hardware: { firmwareVersion: 'v2.4.1', signalDbm: -58, ultrasonicStatus: 'OK' },
    bins: [
      { type: 'DRY_RECYCLABLE', fillLevel: 68, maxCapacityKg: 80, currentLoadKg: 54.4 },
      { type: 'WET_ORGANIC', fillLevel: 32, maxCapacityKg: 60, currentLoadKg: 19.2 },
      { type: 'E_WASTE', fillLevel: 40, maxCapacityKg: 40, currentLoadKg: 16.0 }
    ]
  },
  {
    _id: 'stn-003',
    stationId: 'WS-003',
    name: 'Science Block B Entrance',
    zone: 'Academic Core',
    locationDescription: 'Portico entrance facing central lawn',
    lat: 28.5475,
    lng: 77.1952,
    status: 'healthy',
    fillPercentage: 45,
    batteryPercentage: 76,
    lastTelemetryReceivedAt: new Date(Date.now() - 2 * 60000).toISOString(),
    hardware: { firmwareVersion: 'v2.4.0', signalDbm: -72, ultrasonicStatus: 'OK' },
    bins: [
      { type: 'DRY_RECYCLABLE', fillLevel: 45, maxCapacityKg: 80, currentLoadKg: 36.0 },
      { type: 'WET_ORGANIC', fillLevel: 30, maxCapacityKg: 60, currentLoadKg: 18.0 }
    ]
  },
  {
    _id: 'stn-004',
    stationId: 'WS-004',
    name: 'Block A Cafeteria Food Court',
    zone: 'Food & Dining',
    locationDescription: 'Tray return conveyor belt and outdoor seating exit',
    lat: 28.5445,
    lng: 77.1915,
    status: 'at_risk',
    fillPercentage: 88,
    batteryPercentage: 91,
    lastTelemetryReceivedAt: new Date(Date.now() - 1 * 60000).toISOString(),
    hardware: { firmwareVersion: 'v2.4.1', signalDbm: -60, ultrasonicStatus: 'OK' },
    bins: [
      { type: 'WET_ORGANIC', fillLevel: 88, maxCapacityKg: 120, currentLoadKg: 105.6 },
      { type: 'DRY_RECYCLABLE', fillLevel: 75, maxCapacityKg: 80, currentLoadKg: 60.0 }
    ]
  },
  {
    _id: 'stn-005',
    stationId: 'WS-005',
    name: 'Student Hostel 4 Quadrangle',
    zone: 'Residential',
    locationDescription: 'Central recreation quad courtyard',
    lat: 28.5432,
    lng: 77.1902,
    status: 'healthy',
    fillPercentage: 54,
    batteryPercentage: 82,
    lastTelemetryReceivedAt: new Date(Date.now() - 8 * 60000).toISOString(),
    hardware: { firmwareVersion: 'v2.4.1', signalDbm: -68, ultrasonicStatus: 'OK' },
    bins: [
      { type: 'DRY_RECYCLABLE', fillLevel: 54, maxCapacityKg: 80, currentLoadKg: 43.2 },
      { type: 'WET_ORGANIC', fillLevel: 40, maxCapacityKg: 60, currentLoadKg: 24.0 }
    ]
  },
  {
    _id: 'stn-006',
    stationId: 'WS-006',
    name: 'Olympic Sports Pavilion',
    zone: 'Sports & Wellness',
    locationDescription: 'Trackside spectator pavilion & gym entrance',
    lat: 28.5488,
    lng: 77.1965,
    status: 'healthy',
    fillPercentage: 30,
    batteryPercentage: 98,
    lastTelemetryReceivedAt: new Date(Date.now() - 12 * 60000).toISOString(),
    hardware: { firmwareVersion: 'v2.4.1', signalDbm: -55, ultrasonicStatus: 'OK' },
    bins: [
      { type: 'DRY_RECYCLABLE', fillLevel: 30, maxCapacityKg: 80, currentLoadKg: 24.0 },
      { type: 'WET_ORGANIC', fillLevel: 20, maxCapacityKg: 60, currentLoadKg: 12.0 }
    ]
  },
  {
    _id: 'stn-007',
    stationId: 'WS-007',
    name: 'Administrative Senate Foyer',
    zone: 'Administration',
    locationDescription: 'Registrar office reception & board room lobby',
    lat: 28.5462,
    lng: 77.1920,
    status: 'healthy',
    fillPercentage: 18,
    batteryPercentage: 99,
    lastTelemetryReceivedAt: new Date(Date.now() - 4 * 60000).toISOString(),
    hardware: { firmwareVersion: 'v2.4.1', signalDbm: -52, ultrasonicStatus: 'OK' },
    bins: [
      { type: 'DRY_RECYCLABLE', fillLevel: 18, maxCapacityKg: 60, currentLoadKg: 10.8 },
      { type: 'WET_ORGANIC', fillLevel: 10, maxCapacityKg: 40, currentLoadKg: 4.0 }
    ]
  },
  {
    _id: 'stn-008',
    stationId: 'WS-008',
    name: 'Nanotech Research Labs',
    zone: 'Academic Core',
    locationDescription: 'Cleanroom Airlock Vestibule, Level 2',
    lat: 28.5471,
    lng: 77.1948,
    status: 'healthy',
    fillPercentage: 62,
    batteryPercentage: 85,
    lastTelemetryReceivedAt: new Date(Date.now() - 6 * 60000).toISOString(),
    hardware: { firmwareVersion: 'v2.4.1', signalDbm: -63, ultrasonicStatus: 'OK' },
    bins: [
      { type: 'HAZARDOUS', fillLevel: 62, maxCapacityKg: 40, currentLoadKg: 24.8 },
      { type: 'DRY_RECYCLABLE', fillLevel: 40, maxCapacityKg: 60, currentLoadKg: 24.0 }
    ]
  },
  {
    _id: 'stn-009',
    stationId: 'WS-009',
    name: 'North Parking Transit Bay',
    zone: 'Logistics',
    locationDescription: 'Electric bus charging bay & delivery depot',
    lat: 28.5495,
    lng: 77.1978,
    status: 'offline',
    fillPercentage: 0,
    batteryPercentage: 12,
    lastTelemetryReceivedAt: new Date(Date.now() - 140 * 60000).toISOString(),
    hardware: { firmwareVersion: 'v2.3.9', signalDbm: -92, ultrasonicStatus: 'POWER_FAULT' },
    bins: [
      { type: 'DRY_RECYCLABLE', fillLevel: 0, maxCapacityKg: 100, currentLoadKg: 0 }
    ]
  },
  {
    _id: 'stn-010',
    stationId: 'WS-010',
    name: 'Grand Auditorium Plaza',
    zone: 'Public Events',
    locationDescription: 'Main stairs plaza fronting campus amphitheatre',
    lat: 28.5452,
    lng: 77.1932,
    status: 'healthy',
    fillPercentage: 42,
    batteryPercentage: 89,
    lastTelemetryReceivedAt: new Date(Date.now() - 15 * 60000).toISOString(),
    hardware: { firmwareVersion: 'v2.4.1', signalDbm: -59, ultrasonicStatus: 'OK' },
    bins: [
      { type: 'DRY_RECYCLABLE', fillLevel: 42, maxCapacityKg: 100, currentLoadKg: 42.0 },
      { type: 'WET_ORGANIC', fillLevel: 35, maxCapacityKg: 80, currentLoadKg: 28.0 }
    ]
  },
  {
    _id: 'stn-011',
    stationId: 'WS-011',
    name: 'BioTech Greenhouse Wing',
    zone: 'Academic Core',
    locationDescription: 'Hydroponics lab exterior corridor',
    lat: 28.5480,
    lng: 77.1958,
    status: 'at_risk',
    fillPercentage: 76,
    batteryPercentage: 87,
    lastTelemetryReceivedAt: new Date(Date.now() - 7 * 60000).toISOString(),
    hardware: { firmwareVersion: 'v2.4.1', signalDbm: -66, ultrasonicStatus: 'OK' },
    bins: [
      { type: 'WET_ORGANIC', fillLevel: 76, maxCapacityKg: 80, currentLoadKg: 60.8 },
      { type: 'HAZARDOUS', fillLevel: 30, maxCapacityKg: 40, currentLoadKg: 12.0 }
    ]
  },
  {
    _id: 'stn-012',
    stationId: 'WS-012',
    name: 'Campus Health & Wellness Center',
    zone: 'Medical',
    locationDescription: 'Emergency triage ambulance drop bay',
    lat: 28.5440,
    lng: 77.1908,
    status: 'healthy',
    fillPercentage: 58,
    batteryPercentage: 95,
    lastTelemetryReceivedAt: new Date(Date.now() - 2 * 60000).toISOString(),
    hardware: { firmwareVersion: 'v2.4.1', signalDbm: -56, ultrasonicStatus: 'OK' },
    bins: [
      { type: 'HAZARDOUS', fillLevel: 58, maxCapacityKg: 50, currentLoadKg: 29.0 },
      { type: 'DRY_RECYCLABLE', fillLevel: 35, maxCapacityKg: 60, currentLoadKg: 21.0 }
    ]
  }
];

export const INITIAL_EVENTS = [
  {
    _id: 'evt-10482',
    eventId: '#WS-10482',
    timestamp: new Date(Date.now() - 22 * 60000).toISOString(),
    stationId: 'WS-004',
    stationName: 'Block A Cafeteria Food Court',
    location: 'Block A Cafeteria Food Court',
    category: 'dry',
    primaryCategory: 'DRY_RECYCLABLE',
    wasteStream: 'dry',
    status: 'VERIFIED',
    fillAtCapture: 88,
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
    verificationMethod: 'QR Scan + Worker Photo',
    verifiedBy: 'Rahul Verma (Crew #3)',
    verificationScore: 94,
    qrCode: 'WS-004-DRY-QR-AUTH',
    aiAnalysis: {
      confidenceScore: 0.94,
      contaminationDetected: true,
      contaminationSeverity: 'MEDIUM',
      detectedItems: ['Curry gravy residue on carton', 'Unrinsed polyethylene cup'],
      recommendedAction: 'Segregate soiled carton into wet organic before dry bin sealing.',
      source: 'gemini_vision'
    },
    timeline: [
      { stage: 'DETECT', title: 'Ultrasonic breach threshold > 75%', time: '14:02:10', status: 'COMPLETED' },
      { stage: 'CLASSIFY', title: 'Gemini Vision AI classified contaminated dry paper', time: '14:02:18', status: 'COMPLETED' },
      { stage: 'VERIFY', title: 'Kiosk QR validated by Rahul Verma', time: '14:08:44', status: 'COMPLETED' },
      { stage: 'ACT', title: 'Bin emptied and separated at source', time: '14:12:02', status: 'COMPLETED' },
      { stage: 'PROVE', title: 'Post-collection verification photo logged', time: '14:14:15', status: 'COMPLETED' },
      { stage: 'MEASURE', title: '6.4 kg diverted to organic composting', time: '14:15:00', status: 'COMPLETED' }
    ]
  },
  {
    _id: 'evt-10481',
    eventId: '#WS-10481',
    timestamp: new Date(Date.now() - 48 * 60000).toISOString(),
    stationId: 'WS-001',
    stationName: 'Central Library Atrium',
    location: 'Central Library Atrium',
    category: 'dry',
    primaryCategory: 'DRY_RECYCLABLE',
    wasteStream: 'dry',
    status: 'VERIFIED',
    fillAtCapture: 92,
    imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&auto=format&fit=crop&q=80',
    verificationMethod: 'Automated Sensor + Crew Check',
    verifiedBy: 'Suresh Kumar (Crew #1)',
    verificationScore: 98,
    qrCode: 'WS-001-DRY-QR-AUTH',
    aiAnalysis: {
      confidenceScore: 0.98,
      contaminationDetected: false,
      contaminationSeverity: 'NONE',
      detectedItems: ['Pristine notebook paper', 'Flattened corrugated box'],
      recommendedAction: 'Direct route to campus paper baling station.',
      source: 'gemini_vision'
    },
    timeline: [
      { stage: 'DETECT', title: 'Ultrasonic volume breach 92%', time: '13:38:05', status: 'COMPLETED' },
      { stage: 'CLASSIFY', title: 'AI classified 98% clean paper pulp', time: '13:38:12', status: 'COMPLETED' },
      { stage: 'VERIFY', title: 'QR station matched with collection cart #2', time: '13:45:00', status: 'COMPLETED' },
      { stage: 'ACT', title: 'Emptied and replaced with heavy gauge liner', time: '13:48:30', status: 'COMPLETED' },
      { stage: 'PROVE', title: 'Photo timestamped with tamper-evident hash', time: '13:49:10', status: 'COMPLETED' },
      { stage: 'MEASURE', title: '14.2 kg logged to recycling index', time: '13:50:00', status: 'COMPLETED' }
    ]
  },
  {
    _id: 'evt-10480',
    eventId: '#WS-10480',
    timestamp: new Date(Date.now() - 75 * 60000).toISOString(),
    stationId: 'WS-009',
    stationName: 'North Parking Transit Bay',
    location: 'North Parking Transit Bay',
    category: 'dry',
    primaryCategory: 'DRY_RECYCLABLE',
    wasteStream: 'dry',
    status: 'ACTION_REQUIRED',
    fillAtCapture: 85,
    imageUrl: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=600&auto=format&fit=crop&q=80',
    verificationMethod: 'Pending Crew Dispatch',
    verifiedBy: 'Unassigned',
    verificationScore: 65,
    qrCode: 'WS-009-DRY-QR-AUTH',
    aiAnalysis: {
      confidenceScore: 0.88,
      contaminationDetected: true,
      contaminationSeverity: 'HIGH',
      detectedItems: ['Discarded motor oil canister', 'Soiled industrial rags'],
      recommendedAction: 'Hazardous materials crew required. Do not mix with general recyclables.',
      source: 'gemini_vision'
    },
    timeline: [
      { stage: 'DETECT', title: 'Sensor heartbeat dropped; student logged spillage', time: '13:10:00', status: 'COMPLETED' },
      { stage: 'CLASSIFY', title: 'AI flagged potential oil contaminant', time: '13:10:20', status: 'COMPLETED' },
      { stage: 'VERIFY', title: 'Awaiting hazardous certified verification', time: '13:15:00', status: 'IN_PROGRESS' },
      { stage: 'ACT', title: 'Dispatch task generated for Hazardous Unit', time: '13:16:00', status: 'PENDING' }
    ]
  },
  {
    _id: 'evt-10479',
    eventId: '#WS-10479',
    timestamp: new Date(Date.now() - 110 * 60000).toISOString(),
    stationId: 'WS-002',
    stationName: 'Tech Tower Innovation Hub',
    location: 'Tech Tower Innovation Hub',
    category: 'e_waste',
    primaryCategory: 'E_WASTE',
    wasteStream: 'e_waste',
    status: 'VERIFIED',
    fillAtCapture: 40,
    imageUrl: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=600&auto=format&fit=crop&q=80',
    verificationMethod: 'Lab Tech RFID Scan',
    verifiedBy: 'Pooja Devi (Crew #2)',
    verificationScore: 99,
    qrCode: 'WS-002-EW-QR-AUTH',
    aiAnalysis: {
      confidenceScore: 0.99,
      contaminationDetected: false,
      contaminationSeverity: 'NONE',
      detectedItems: ['Lithium-ion pouch batteries', 'Printed circuit board offcuts'],
      recommendedAction: 'Transfer to designated fire-rated campus battery lockbox.',
      source: 'gemini_vision'
    },
    timeline: [
      { stage: 'DETECT', title: 'Smart bin deposit slot opened', time: '12:35:10', status: 'COMPLETED' },
      { stage: 'CLASSIFY', title: 'Classified E-Waste Grade A with battery warning', time: '12:35:15', status: 'COMPLETED' },
      { stage: 'VERIFY', title: 'RFID logged by Lab Assistant', time: '12:40:00', status: 'COMPLETED' },
      { stage: 'ACT', title: 'Secured inside antistatic bin bag', time: '12:45:00', status: 'COMPLETED' },
      { stage: 'PROVE', title: 'Serial numbered QR tag attached', time: '12:46:00', status: 'COMPLETED' },
      { stage: 'MEASURE', title: '3.8 kg high-grade recovered e-waste logged', time: '12:47:00', status: 'COMPLETED' }
    ]
  },
  {
    _id: 'evt-10478',
    eventId: '#WS-10478',
    timestamp: new Date(Date.now() - 145 * 60000).toISOString(),
    stationId: 'WS-008',
    stationName: 'Nanotech Research Labs',
    location: 'Nanotech Research Labs',
    category: 'hazardous',
    primaryCategory: 'HAZARDOUS',
    wasteStream: 'hazardous',
    status: 'VERIFIED',
    fillAtCapture: 62,
    imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&auto=format&fit=crop&q=80',
    verificationMethod: 'Authorized Safety Officer Scan',
    verifiedBy: 'Dr. Rajesh Sharma',
    verificationScore: 100,
    qrCode: 'WS-008-HAZ-QR-AUTH',
    aiAnalysis: {
      confidenceScore: 0.97,
      contaminationDetected: false,
      contaminationSeverity: 'NONE',
      detectedItems: ['Nitrile gloves', 'Autoclaved culture tubes'],
      recommendedAction: 'Incineration bag double sealed with chemical indicator.',
      source: 'gemini_vision'
    },
    timeline: [
      { stage: 'DETECT', title: 'Cleanroom Airlock container breach 60%', time: '12:00:00', status: 'COMPLETED' },
      { stage: 'CLASSIFY', title: 'Classified biohazardous PPE', time: '12:00:15', status: 'COMPLETED' },
      { stage: 'VERIFY', title: 'Dual verification with Safety Officer pass', time: '12:10:00', status: 'COMPLETED' },
      { stage: 'ACT', title: 'Evacuated into yellow biohazard bin', time: '12:15:00', status: 'COMPLETED' },
      { stage: 'PROVE', title: 'Destruction manifest signed', time: '12:18:00', status: 'COMPLETED' },
      { stage: 'MEASURE', title: '8.1 kg logged to hazardous compliance ledger', time: '12:20:00', status: 'COMPLETED' }
    ]
  },
  {
    _id: 'evt-10477',
    eventId: '#WS-10477',
    timestamp: new Date(Date.now() - 180 * 60000).toISOString(),
    stationId: 'WS-005',
    stationName: 'Student Hostel 4 Quadrangle',
    location: 'Student Hostel 4 Quadrangle',
    category: 'wet',
    primaryCategory: 'WET_ORGANIC',
    wasteStream: 'wet',
    status: 'VERIFIED',
    fillAtCapture: 40,
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
    verificationMethod: 'Hostel Steward Verification',
    verifiedBy: 'Rahul Verma (Crew #3)',
    verificationScore: 92,
    qrCode: 'WS-005-WET-QR-AUTH',
    aiAnalysis: {
      confidenceScore: 0.93,
      contaminationDetected: false,
      contaminationSeverity: 'NONE',
      detectedItems: ['Fruit peels', 'Coffee grounds', 'Tea leaves'],
      recommendedAction: 'Direct compost pit transfer.',
      source: 'gemini_vision'
    },
    timeline: [
      { stage: 'DETECT', title: 'Morning breakfast peak fill 40%', time: '11:15:00', status: 'COMPLETED' },
      { stage: 'CLASSIFY', title: 'Classified compostable organic stream', time: '11:15:10', status: 'COMPLETED' },
      { stage: 'VERIFY', title: 'Hostel QR validation', time: '11:25:00', status: 'COMPLETED' },
      { stage: 'ACT', title: 'Loaded into campus aerated composter', time: '11:35:00', status: 'COMPLETED' },
      { stage: 'PROVE', title: 'Weighbridge slip attached', time: '11:38:00', status: 'COMPLETED' },
      { stage: 'MEASURE', title: '18.4 kg added to campus organic mulch', time: '11:40:00', status: 'COMPLETED' }
    ]
  }
];

export const INITIAL_EXCEPTIONS = [
  {
    _id: 'exp-901',
    exceptionId: 'EX-901',
    title: 'Fill Level Breach: Central Library Atrium',
    description: 'Dry waste bin fill reached 92%, exceeding 80% SLA threshold. High overflow spillage probability within 25 minutes.',
    type: 'OVERFLOW',
    severity: 'CRITICAL',
    stationId: 'WS-001',
    stationName: 'Central Library Atrium',
    status: 'ASSIGNED',
    assignedTo: { userId: 'usr-003', name: 'Rahul Verma' },
    createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
    resolutionNotes: ''
  },
  {
    _id: 'exp-902',
    exceptionId: 'EX-902',
    title: 'Severe Food Contamination in Recyclable Stream',
    description: 'Post-lunch rush generated curry oils and gravy cartons inside Dry Blue Bin. Risk of ruining entire 80kg batch.',
    type: 'CONTAMINATION',
    severity: 'HIGH',
    stationId: 'WS-004',
    stationName: 'Block A Cafeteria Food Court',
    status: 'OPEN',
    assignedTo: null,
    createdAt: new Date(Date.now() - 40 * 60000).toISOString(),
    resolutionNotes: ''
  },
  {
    _id: 'exp-903',
    exceptionId: 'EX-903',
    title: 'Ultrasonic Telemetry Offline / Power Dropout',
    description: 'Station WS-009 battery dropped below 12%. No ping received in 140 minutes. Manual inspection required.',
    type: 'SENSOR_FAULT',
    severity: 'MEDIUM',
    stationId: 'WS-009',
    stationName: 'North Parking Transit Bay',
    status: 'OPEN',
    assignedTo: null,
    createdAt: new Date(Date.now() - 95 * 60000).toISOString(),
    resolutionNotes: ''
  },
  {
    _id: 'exp-904',
    exceptionId: 'EX-904',
    title: 'Student Spillage Report: Drink Cups on Pavement',
    description: 'Citizen report logged via kiosk QR outside Tech Tower. Cups and straws overflowing onto walking path.',
    type: 'SPILLAGE',
    severity: 'MEDIUM',
    stationId: 'WS-002',
    stationName: 'Tech Tower Innovation Hub',
    status: 'RESOLVED',
    assignedTo: { userId: 'usr-004', name: 'Suresh Kumar' },
    createdAt: new Date(Date.now() - 150 * 60000).toISOString(),
    resolutionNotes: 'Swept, disinfected, and bin liner refreshed. Completed at 12:45.'
  },
  {
    _id: 'exp-905',
    exceptionId: 'EX-905',
    title: 'Missed Scheduled Evacuation Cycle',
    description: 'Auditorium Plaza was scheduled for 11:00 sweep prior to university lecture. Cycle was delayed by 45 minutes.',
    type: 'MISSED_COLLECTION',
    severity: 'LOW',
    stationId: 'WS-010',
    stationName: 'Grand Auditorium Plaza',
    status: 'RESOLVED',
    assignedTo: { userId: 'usr-005', name: 'Pooja Devi' },
    createdAt: new Date(Date.now() - 210 * 60000).toISOString(),
    resolutionNotes: 'Completed delay clearance. Buffer reset.'
  }
];

export const INITIAL_TASKS = [
  {
    _id: 'tsk-101',
    taskId: 'TSK-101',
    title: 'Emergency Evacuation: Central Library Atrium',
    stationId: 'WS-001',
    stationName: 'Central Library Atrium',
    location: 'Central Library Atrium, East Wing Entrance',
    wasteType: 'Dry Recyclables (Paper)',
    reason: 'Fill level breached 92%. Heavy student volume during exam preparation.',
    zone: 'Academic Core',
    priority: 'CRITICAL',
    status: 'IN_PROGRESS',
    assignedWorker: { id: 'usr-003', name: 'Rahul Verma', phone: '+91 98765 43210' },
    targetCompletion: new Date(Date.now() + 20 * 60000).toISOString(),
    notes: 'Prioritize Dry Paper bin; student exam week has doubled paper volume.',
    qrValidated: false,
    proofPhoto: null
  },
  {
    _id: 'tsk-102',
    taskId: 'TSK-102',
    title: 'Post-Lunch Waste Clearance: Cafeteria Food Court',
    stationId: 'WS-004',
    stationName: 'Block A Cafeteria Food Court',
    location: 'Block A Cafeteria Tray Return & Service Bay',
    wasteType: 'Wet Organic & Food Packaging',
    reason: 'Post-lunch rush generated high volume. Risk of grease contamination.',
    zone: 'Food & Dining',
    priority: 'HIGH',
    status: 'PENDING',
    assignedWorker: { id: 'usr-004', name: 'Suresh Kumar', phone: '+91 98765 43211' },
    targetCompletion: new Date(Date.now() + 45 * 60000).toISOString(),
    notes: 'Segregate contaminated cartons before compacting.',
    qrValidated: false,
    proofPhoto: null
  },
  {
    _id: 'tsk-103',
    taskId: 'TSK-103',
    title: 'Routine Morning Perimeter Sweep',
    stationId: 'WS-006',
    stationName: 'Olympic Sports Pavilion',
    location: 'Olympic Sports Pavilion Trackside',
    wasteType: 'General Dry Recyclables',
    reason: 'Morning athletic training waste evacuation.',
    zone: 'Sports & Wellness',
    priority: 'MEDIUM',
    status: 'COMPLETED',
    assignedWorker: { id: 'usr-005', name: 'Pooja Devi', phone: '+91 98765 43212' },
    targetCompletion: new Date(Date.now() - 30 * 60000).toISOString(),
    notes: 'All track bins emptied and scrubbed.',
    qrValidated: true,
    proofPhoto: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80'
  },
  {
    _id: 'tsk-104',
    taskId: 'TSK-104',
    title: 'Hazardous Waste Evacuation: BioTech Lab Annex',
    stationId: 'WS-011',
    stationName: 'BioTech Greenhouse Wing',
    location: 'BioTech Greenhouse Wing, Level 1 Corridor',
    wasteType: 'Bio-Hazardous Plant Cultures',
    reason: 'Experiment termination cycle waste disposal.',
    zone: 'Academic Core',
    priority: 'HIGH',
    status: 'PENDING',
    assignedWorker: { id: 'usr-003', name: 'Rahul Verma', phone: '+91 98765 43210' },
    targetCompletion: new Date(Date.now() + 90 * 60000).toISOString(),
    notes: 'Must wear Level 2 protective gloves and face shield.',
    qrValidated: false,
    proofPhoto: null
  },
  {
    _id: 'tsk-105',
    taskId: 'TSK-105',
    title: 'Battery Lockbox Pickup: Tech Tower',
    stationId: 'WS-002',
    stationName: 'Tech Tower Innovation Hub',
    location: 'Tech Tower Ground Floor Hardware Lab',
    wasteType: 'Lithium-Ion E-Waste Cells',
    reason: 'Robotics lab battery cell clearance.',
    zone: 'Academic Core',
    priority: 'MEDIUM',
    status: 'PENDING',
    assignedWorker: { id: 'usr-004', name: 'Suresh Kumar', phone: '+91 98765 43211' },
    targetCompletion: new Date(Date.now() + 120 * 60000).toISOString(),
    notes: 'Transfer 3.8kg lithium-ion battery offcuts to campus depot.',
    qrValidated: false,
    proofPhoto: null
  }
];

export const INITIAL_SANITATION = [
  {
    _id: 'san-201',
    taskId: 'SAN-201',
    zoneName: 'Central Academic Washrooms & Corridors',
    location: 'Central Library & Admin Wings',
    assignedCrew: 'Rahul Verma & Crew #3',
    frequency: 'Every 2 Hours',
    lastSanitizedAt: new Date(Date.now() - 45 * 60000).toISOString(),
    status: 'IN_PROGRESS',
    complianceScore: 92,
    checklist: [
      { id: 'c1', label: 'Waste bins sanitized with quaternary disinfectant', completed: true },
      { id: 'c2', label: 'Liner replaced and tied with tamper seal', completed: true },
      { id: 'c3', label: 'Surface odor neutralizing agent sprayed', completed: true },
      { id: 'c4', label: 'Hand dryers and sanitizer dispensers refilled', completed: false }
    ],
    proofPhoto: null
  },
  {
    _id: 'san-202',
    taskId: 'SAN-202',
    zoneName: 'Block A Cafeteria Dumpster Apron',
    location: 'Cafeteria Service Yard',
    assignedCrew: 'Suresh Kumar & Crew #1',
    frequency: 'Every 3 Hours',
    lastSanitizedAt: new Date(Date.now() - 110 * 60000).toISOString(),
    status: 'COMPLETED',
    complianceScore: 78,
    checklist: [
      { id: 'c1', label: 'Grease trap and floor apron power-washed', completed: true },
      { id: 'c2', label: 'Organic waste lids tightly sealed to avoid birds', completed: true },
      { id: 'c3', label: 'Fly and pest control misting deployed', completed: true },
      { id: 'c4', label: 'Drainage channel cleared of food solids', completed: false }
    ],
    proofPhoto: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80'
  },
  {
    _id: 'san-203',
    taskId: 'SAN-203',
    zoneName: 'BioTech & Science Cleanroom Waste Bays',
    location: 'Nanotech & BioTech Level 2',
    assignedCrew: 'Pooja Devi & Bio-Crew',
    frequency: 'Every 4 Hours',
    lastSanitizedAt: new Date(Date.now() - 30 * 60000).toISOString(),
    status: 'COMPLETED',
    complianceScore: 98,
    checklist: [
      { id: 'c1', label: 'Secondary containment tubs wiped with 70% ethanol', completed: true },
      { id: 'c2', label: 'Autoclave disposal bags sealed with indicator tape', completed: true },
      { id: 'c3', label: 'Spill response kit restocked and inspected', completed: true },
      { id: 'c4', label: 'Logbook countersigned by Lab Manager', completed: true }
    ],
    proofPhoto: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&auto=format&fit=crop&q=80'
  },
  {
    _id: 'san-204',
    taskId: 'SAN-204',
    zoneName: 'Sports Complex Shower & Locker Waste Areas',
    location: 'Olympic Sports Pavilion',
    assignedCrew: 'Sanitation Evening Shift',
    frequency: 'Daily 18:00',
    lastSanitizedAt: new Date(Date.now() - 300 * 60000).toISOString(),
    status: 'PENDING',
    complianceScore: 85,
    checklist: [
      { id: 'c1', label: 'Towels and dry recyclable bins emptied', completed: true },
      { id: 'c2', label: 'Shower tile floor scrubbed with anti-fungal rinse', completed: true },
      { id: 'c3', label: 'Trash receptacles steam sanitized', completed: false }
    ],
    proofPhoto: null
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    _id: 'notif-1',
    title: 'Overflow Critical: Central Library Atrium',
    message: 'WS-001 has breached 92% capacity. Dispatching Rahul Verma.',
    type: 'OVERFLOW',
    read: false,
    createdAt: new Date(Date.now() - 5 * 60000).toISOString()
  },
  {
    _id: 'notif-2',
    title: 'Contamination Breach: Cafeteria Food Court',
    message: 'Medium contamination detected in Dry Recyclables at WS-004.',
    type: 'CONTAMINATION',
    read: false,
    createdAt: new Date(Date.now() - 25 * 60000).toISOString()
  },
  {
    _id: 'notif-3',
    title: 'Daily Verification SLA: 99.8%',
    message: 'All 12 campus nodes operational. Zero unverified disposal events.',
    type: 'SYSTEM',
    read: true,
    createdAt: new Date(Date.now() - 120 * 60000).toISOString()
  }
];

// Helper to get or initialize persistent mock database in localStorage
function getDb() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (_) {}

  const initialDb = {
    stations: INITIAL_STATIONS,
    events: INITIAL_EVENTS,
    exceptions: INITIAL_EXCEPTIONS,
    tasks: INITIAL_TASKS,
    sanitation: INITIAL_SANITATION,
    notifications: INITIAL_NOTIFICATIONS
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDb));
  } catch (_) {}

  return initialDb;
}

function saveDb(db) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch (_) {}
}

export const mockStore = {
  getStations: () => {
    const db = getDb();
    const stations = db.stations;
    const summary = {
      total: stations.length,
      healthy: stations.filter(s => s.status === 'healthy').length,
      atRisk: stations.filter(s => s.status === 'at_risk').length,
      overflow: stations.filter(s => s.status === 'overflow').length,
      offline: stations.filter(s => s.status === 'offline').length
    };
    return { success: true, count: stations.length, stations, summary };
  },

  updateStation: (id, updates) => {
    const db = getDb();
    const idx = db.stations.findIndex(s => s.stationId === id || s._id === id);
    if (idx !== -1) {
      db.stations[idx] = { ...db.stations[idx], ...updates };
      saveDb(db);
      return { success: true, station: db.stations[idx] };
    }
    return { success: false, message: 'Station not found' };
  },

  getEvents: (params = {}) => {
    const db = getDb();
    let events = [...db.events];
    if (params.category && params.category !== 'all') {
      events = events.filter(e => e.category === params.category || e.wasteStream === params.category);
    }
    if (params.status && params.status !== 'all') {
      events = events.filter(e => e.status === params.status);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      events = events.filter(e =>
        e.eventId.toLowerCase().includes(q) ||
        e.stationName.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q)
      );
    }
    return { success: true, count: events.length, events };
  },

  getEventById: (id) => {
    const db = getDb();
    const event = db.events.find(e => e.eventId === id || e._id === id);
    if (event) {
      return { success: true, event };
    }
    return { success: false, message: 'Event not found' };
  },

  createEvent: (data) => {
    const db = getDb();
    const newId = `#WS-${Math.floor(10000 + Math.random() * 90000)}`;
    const newEvent = {
      _id: `evt-${Date.now()}`,
      eventId: newId,
      timestamp: new Date().toISOString(),
      stationId: data.stationId || 'WS-004',
      stationName: data.stationId === 'WS-001' ? 'Central Library Atrium' : (data.location || 'Block A Cafeteria Food Court'),
      location: data.location || 'Campus Smart Station',
      category: data.wasteCategory || 'dry',
      primaryCategory: data.wasteCategory === 'wet' ? 'WET_ORGANIC' : 'DRY_RECYCLABLE',
      wasteStream: data.wasteCategory || 'dry',
      status: 'VERIFIED',
      fillAtCapture: 85,
      imageUrl: data.imagePreview || 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
      verificationMethod: 'Citizen Mobile Log + Auto AI QR Verification',
      verifiedBy: 'Campus AI Governance Engine',
      verificationScore: 96,
      qrCode: `${data.stationId || 'WS-004'}-AUTO-QR`,
      aiAnalysis: {
        confidenceScore: 0.95,
        contaminationDetected: false,
        contaminationSeverity: 'NONE',
        detectedItems: [data.description || 'Segregated waste deposit logged by student'],
        recommendedAction: 'Verify at next scheduled collection sweep.',
        source: 'gemini_vision'
      },
      timeline: [
        { stage: 'DETECT', title: 'Citizen report logged via portal', time: 'Just now', status: 'COMPLETED' },
        { stage: 'CLASSIFY', title: 'AI classified waste stream', time: 'Just now', status: 'COMPLETED' },
        { stage: 'VERIFY', title: 'Location QR validated against campus GIS map', time: 'Just now', status: 'COMPLETED' },
        { stage: 'ACT', title: 'Task scheduled in collection operations queue', time: 'Just now', status: 'COMPLETED' }
      ]
    };
    db.events.unshift(newEvent);
    saveDb(db);
    return { success: true, event: newEvent };
  },

  verifyEvent: (id, data) => {
    const db = getDb();
    const idx = db.events.findIndex(e => e.eventId === id || e._id === id);
    if (idx !== -1) {
      db.events[idx].status = 'VERIFIED';
      db.events[idx].verificationScore = 98;
      db.events[idx].verifiedBy = data.verifiedBy || 'Dr. Aris Thorne (Facility Manager)';
      saveDb(db);
      return { success: true, event: db.events[idx] };
    }
    return { success: false, message: 'Event not found' };
  },

  getExceptions: (params = {}) => {
    const db = getDb();
    let exceptions = [...db.exceptions];
    if (params.severity && params.severity !== 'all') {
      exceptions = exceptions.filter(e => e.severity === params.severity.toUpperCase());
    }
    if (params.status && params.status !== 'all') {
      exceptions = exceptions.filter(e => e.status === params.status.toUpperCase());
    }
    const counts = {
      total: db.exceptions.length,
      open: db.exceptions.filter(e => e.status === 'OPEN').length,
      assigned: db.exceptions.filter(e => e.status === 'ASSIGNED').length,
      inProgress: db.exceptions.filter(e => e.status === 'IN_PROGRESS').length,
      resolved: db.exceptions.filter(e => e.status === 'RESOLVED').length,
      critical: db.exceptions.filter(e => e.severity === 'CRITICAL' && e.status !== 'RESOLVED').length
    };
    return { success: true, count: exceptions.length, exceptions, counts };
  },

  updateException: (id, updates) => {
    const db = getDb();
    const idx = db.exceptions.findIndex(e => e.exceptionId === id || e._id === id);
    if (idx !== -1) {
      db.exceptions[idx] = { ...db.exceptions[idx], ...updates };
      saveDb(db);
      return { success: true, exception: db.exceptions[idx] };
    }
    return { success: false, message: 'Exception not found' };
  },

  getTasks: (params = {}) => {
    const db = getDb();
    return { success: true, count: db.tasks.length, tasks: db.tasks };
  },

  updateTask: (id, updates) => {
    const db = getDb();
    const idx = db.tasks.findIndex(t => t.taskId === id || t._id === id);
    if (idx !== -1) {
      db.tasks[idx] = { ...db.tasks[idx], ...updates };
      saveDb(db);
      return { success: true, task: db.tasks[idx] };
    }
    return { success: false, message: 'Task not found' };
  },

  getSanitation: () => {
    const db = getDb();
    return { success: true, count: db.sanitation.length, tasks: db.sanitation };
  },

  updateSanitation: (id, updates) => {
    const db = getDb();
    const idx = db.sanitation.findIndex(s => s.taskId === id || s._id === id);
    if (idx !== -1) {
      db.sanitation[idx] = { ...db.sanitation[idx], ...updates };
      saveDb(db);
      return { success: true, task: db.sanitation[idx] };
    }
    return { success: false, message: 'Sanitation record not found' };
  },

  getDashboard: () => {
    const db = getDb();
    return {
      success: true,
      header: {
        greeting: 'Good morning, Operations Directorate',
        date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }),
        workspace: 'Smart Campus Waste Operations',
        campus: 'Main Institute Campus (12 Active Nodes)'
      },
      kpis: {
        totalEventsToday: 1482,
        avgConfidence: 94.6,
        openExceptions: db.exceptions.filter(e => e.status !== 'RESOLVED').length,
        qualityScore: 82,
        divertedKg: 462.8,
        stationsMonitored: 12
      },
      requiresAttention: db.exceptions.filter(e => e.status !== 'RESOLVED').slice(0, 4),
      charts: {
        hourlyEvents: [
          { time: '08:00', events: 34, volume: 18 },
          { time: '10:00', events: 88, volume: 45 },
          { time: '12:00', events: 142, volume: 92 },
          { time: '14:00', events: 198, volume: 140 },
          { time: '16:00', events: 165, volume: 110 },
          { time: '18:00', events: 120, volume: 75 },
          { time: '20:00', events: 65, volume: 40 }
        ],
        wasteByCategory: [
          { name: 'Dry Recyclables', value: 48, color: '#38BDF8' },
          { name: 'Wet Organic', value: 36, color: '#10B981' },
          { name: 'Hazardous', value: 8, color: '#EF4444' },
          { name: 'E-Waste', value: 8, color: '#8B5CF6' }
        ],
        stationFills: db.stations.slice(0, 6).map(s => ({
          name: s.stationId,
          fill: s.fillPercentage
        }))
      },
      recentEvents: db.events.slice(0, 5)
    };
  },

  getAnalytics: (params = {}) => {
    return {
      success: true,
      wasteQualityScore: 82,
      breakdown: {
        segregationFidelity: 86,
        collectionTimeliness: 94,
        sanitationAdherence: 78,
        landfillDiversion: 68
      },
      volumeTrends: [
        { month: 'Apr', volumeKg: 2840, divertedKg: 1930 },
        { month: 'May', volumeKg: 3120, divertedKg: 2180 },
        { month: 'Jun', volumeKg: 2950, divertedKg: 2060 },
        { month: 'Jul', volumeKg: 3450, divertedKg: 2420 },
        { month: 'Aug', volumeKg: 3820, divertedKg: 2710 },
        { month: 'Sep', volumeKg: 4120, divertedKg: 2980 }
      ],
      complianceTrends: [
        { day: 'Mon', compliance: 96 },
        { day: 'Tue', compliance: 94 },
        { day: 'Wed', compliance: 98 },
        { day: 'Thu', compliance: 95 },
        { day: 'Fri', compliance: 99 },
        { day: 'Sat', compliance: 97 },
        { day: 'Sun', compliance: 99.8 }
      ],
      exceptionFrequency: [
        { type: 'Overflow', count: 18 },
        { type: 'Contamination', count: 14 },
        { type: 'Spillage', count: 8 },
        { type: 'Sensor Fault', count: 4 },
        { type: 'Missed Cycle', count: 3 }
      ],
      hotspotLocations: [
        { name: 'Block A Cafeteria', incidents: 14, primaryIssue: 'Food Contamination' },
        { name: 'Central Library Atrium', incidents: 9, primaryIssue: 'Paper Overflow' },
        { name: 'North Parking Bay', incidents: 6, primaryIssue: 'Sensor Signal Drop' }
      ]
    };
  },

  getNotifications: () => {
    const db = getDb();
    const unreadCount = db.notifications.filter(n => !n.read).length;
    return { success: true, count: db.notifications.length, unreadCount, notifications: db.notifications };
  },

  markNotificationRead: (id) => {
    const db = getDb();
    const notif = db.notifications.find(n => n._id === id);
    if (notif) {
      notif.read = true;
      saveDb(db);
    }
    return { success: true };
  },

  generateReport: (reportType = 'Daily Operations', timeframe = 'Last 7 Days') => {
    return {
      success: true,
      report: {
        reportType,
        generatedAt: new Date().toISOString(),
        source: 'deterministic_fallback',
        notice: 'Calibrated Campus Operational Intelligence Engine',
        content: `SwaLoop Campus Operations Report — ${reportType}
Generated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
Timeframe Scope: ${timeframe}

1. EXECUTIVE SUMMARY
Over the specified period, the campus recorded 1,482 verified waste transactions across 12 active IoT smart stations. Total recorded mass was 462.8 kg, with an audited diversion rate of 68.4%.

2. CAMPUS QUALITY SCORE: 82 / 100
• Segregation Fidelity: 86% (Benchmark: > 80%)
• Collection SLA Adherence: 94% (Target: > 90%)
• Sanitation Audit Compliance: 78% (Requires attention in Cafeteria Apron)
• Landfill Diversion Rate: 68% (+4.2% MoM)

3. ACTIVE HOTSPOTS & EXCEPTIONS
• WS-004 (Block A Cafeteria): Medium food contamination persists during 13:00–14:30 lunch hours.
• WS-001 (Central Library): Peak volume reached 92%; evacuated within 16 minutes via QR verified dispatch.
• WS-009 (North Parking): Ultrasonic module experienced power drop; replacement scheduled.

4. ACTION RECOMMENDATIONS
1. Deploy secondary organic composting bins adjacent to tray conveyors at Block A Cafeteria.
2. Maintain QR-verified chain of custody on all hazardous waste clearances at BioTech Annex.
3. Award Monthly Green Stewardship Citation to Central Library Atrium sanitation crew.`
      }
    };
  },

  getDashboard: () => {
    const db = getDb();
    const openExp = (db.exceptions || []).filter(e => e.status !== 'RESOLVED');
    const critExp = openExp.filter(e => e.severity === 'CRITICAL').length;
    return {
      success: true,
      header: {
        greeting: 'Good morning, Facility Team',
        workspace: 'Campus Operations',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      },
      kpis: {
        wasteEvents: { value: '1,482', delta: '+8.4%', subtext: 'vs last week' },
        segregationQuality: { value: '87.4%', delta: '+3.1%', subtext: 'stream accuracy' },
        collectionCompliance: { value: '93.2%', delta: '+1.8%', subtext: 'on-time verified' },
        openExceptions: { value: openExp.length || 4, criticalCount: critExp || 1, subtext: `${critExp || 1} Critical • 2 High priority` },
        wasteStations: { value: '10 / 12', healthy: 10, total: 12, subtext: '10 healthy nodes' },
        qualityScore: 82
      },
      requiresAttention: openExp.slice(0, 4),
      charts: {
        dailyActivity: [
          { day: 'Mon', events: 164, segregated: 148, contaminated: 16 },
          { day: 'Tue', events: 182, segregated: 160, contaminated: 22 },
          { day: 'Wed', events: 195, segregated: 174, contaminated: 21 },
          { day: 'Thu', events: 178, segregated: 156, contaminated: 22 },
          { day: 'Fri', events: 210, segregated: 186, contaminated: 24 },
          { day: 'Sat', events: 188, segregated: 165, contaminated: 23 },
          { day: 'Sun', events: 167, segregated: 149, contaminated: 18 }
        ],
        hourlyEvents: [
          { time: '08:00', events: 18 },
          { time: '10:00', events: 42 },
          { time: '12:00', events: 88 },
          { time: '14:00', events: 64 },
          { time: '16:00', events: 51 },
          { time: '18:00', events: 35 },
          { time: '20:00', events: 19 }
        ],
        wasteByCategory: [
          { name: 'Dry Recyclables', value: 52, color: '#2563EB' },
          { name: 'Wet Organic', value: 32, color: '#16A34A' },
          { name: 'Sanitary Waste', value: 11, color: '#D97706' },
          { name: 'Special Care', value: 5, color: '#DC2626' }
        ],
        categoryDistribution: [
          { name: 'Dry Recyclables', value: 52, color: '#2563EB' },
          { name: 'Wet Organic', value: 32, color: '#16A34A' },
          { name: 'Sanitary Waste', value: 11, color: '#D97706' },
          { name: 'Special Care', value: 5, color: '#DC2626' }
        ]
      },
      recentEvents: (db.events || []).slice(0, 8)
    };
  },

  classifyImage: (formData) => {
    return {
      success: true,
      analysis: {
        category: 'Dry Recyclables',
        wasteStream: 'dry',
        confidence: 0.94,
        confidenceTier: 'High',
        contamination: {
          detected: true,
          severity: 'Medium',
          detectedItems: ['Curry gravy residue on cardboard', 'Unrinsed polyethylene beverage cup'],
          notes: 'Food residue detected on packaging. Contamination alert generated.'
        },
        recommendedStream: 'Dry (Blue Bin)',
        requiredAction: 'Remove food-contaminated packaging and separate into wet waste before dry bag sealing.',
        explanation: 'Detected polyethylene plastic bottle and cardboard container. Surface oil staining observed.',
        source: 'gemini_vision',
        statusNotice: 'AI assists classification and documentation. Human staff make final operational decisions.'
      }
    };
  }
};
