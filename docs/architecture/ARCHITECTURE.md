# EcoNest Architecture Blueprint

> **"Every waste event. One verified loop."**

## 1. System Overview

EcoNest is an enterprise campus waste and sanitation management platform engineered to resolve the operational disconnect between waste generation, classification, collection, and verification.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        THE ECONEST LOOP                                │
│                                                                        │
│   DETECT ──► CLASSIFY ──► VERIFY ──► ACT ──► PROVE ──► MEASURE         │
│  (Sensor/    (Gemini AI/  (Physical   (Task    (Photo    (Closed-Loop  │
│   Citizen)    Fallback)    QR Token)   SLA)    Audit)    Analytics)    │
└────────────────────────────────────────────────────────────────────────┘
```

## 2. Core Innovations

### Innovation 1: Waste Event Passport
Instead of treating dustbins as passive buckets with counters, every waste interaction creates an immutable structured record containing:
- **Event Identifier**: `#WS-10482`
- **Location**: Specific station, block, and coordinates
- **AI Classification**: Categorization (Dry, Wet, Sanitary, Special Care) with confidence tiers
- **Contamination Diagnostics**: Detection of cross-stream mismatches (e.g. food grease in dry hopper)
- **Field Assignment**: Dispatched sanitation worker and SLA window
- **QR Identity Token**: Physical proof of presence on-site
- **Photographic Audit**: Uploaded verification image
- **Immutable Timeline**: Sequential timestamped log of each lifecycle stage

### Innovation 2: The Exception Engine
Rather than presenting raw statistical dashboards, EcoNest operates on an **Exception-First** paradigm:
1. **Overflow**: Station fill exceeds configured threshold (e.g. >90%)
2. **Contamination**: Vision AI detects cross-stream placement
3. **Missed Collection**: Task exceeds allotted SLA window
4. **Sanitation Overdue**: Disinfection cycle lapses past scheduled time
5. **Sensor Offline**: Telemetry heartbeat interrupted
6. **Repeated Segregation Error**: Spatial hotspot producing continuous sorting mistakes
7. **Unusual Waste Generation**: Significant surge above historical campus baseline

---

## 3. Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide React, Leaflet, Recharts, React Router
- **Backend**: Node.js, Express.js, JWT, bcryptjs, Multer, Mongoose
- **Database**: Dual-mode (MongoDB Atlas + resilient In-Memory seed repository fallback)
- **AI Engine**: Google Gemini 1.5 Flash (Vision & Operational Synthesis) + Calibrated Deterministic Fallback
- **IoT & Hardware Simulation**: ESP32 ultrasonic distance telemetry (HTTP / JSON REST) + QR identity validation

---

## 4. Security & Privacy by Design

- **RBAC**: Strict role boundaries (Admin, Facility Manager, Sanitation Worker, Student)
- **Audit Logs**: Every login, event creation, exception update, and loop verification is logged
- **Privacy**: Zero facial recognition; minimal student profile data; all uploaded images sanitized for metadata.
