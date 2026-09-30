# SwaLoop — Every waste event. One verified loop.

> **Autonomous Smart Campus Waste Management, AI Stream Classification, and Verified Sanitation Governance Platform**  
> Designed for Universities, Smart Campuses, Healthcare Complexes, and Municipal Institutions.  
> Aligned with **NAAC Criterion 7.1.3** (Institutional Values & Social Responsibilities) and **AICTE / UGC Green Campus Directives**.

---

## 📌 Executive Summary

Traditional institutional waste management suffers from a **broken chain of custody**: bins overflow without warning, workers upload unverified photos from across campus, contamination destroys recyclable streams, and administrators lack verifiable audit data for green accreditations.

**SwaLoop** transforms campus waste management from passive disposal into an **immutable, 6-stage closed operational loop**:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   THE SWALOOP LOOP                                     │
│                                                                                        │
│   [01] DETECT  ──►  [02] CLASSIFY  ──►  [03] VERIFY  ──►  [04] ACT  ──►  [05] PROVE  ──► [06] MEASURE  │
│    Ultrasonic        Vision AI           Station QR        Worker         Photo Proof     Institutional │
│   Depth Sensor      Stream Sort         Token Match       Task SLA       Audit Lock       ESG / NAAC    │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

Every single waste event generates a cryptographic **Waste Event Passport**, and operations are driven by an automated **Exception Engine** that flags anomalies in real time.

---

## 🌟 The Two Defining Innovations

### 1. The Waste Event Passport
Unlike generic ticket trackers, every waste event in SwaLoop produces an audited digital passport containing:
- **Unique Event ID**: e.g., `#WS-10482`
- **Location Coordinates**: Station ID, zone, building name, and indoor/outdoor geolocation
- **AI Classification**: Primary stream (`Dry Recyclable`, `Wet Organic`, `Sanitary / Biomedical`, `Hazardous`, `E-Waste`) with confidence scores
- **Contamination Severity**: Automated detection of grease, liquid residue, or cross-stream hazards
- **Operational Directive**: Prescribed corrective procedure (e.g., bin evacuation, heavy liner replacement, chemical disinfection)
- **Assigned Field Crew**: Target worker with dynamic SLA window countdown
- **Physical Verification**: On-site validation via high-contrast station QR cryptographic token (defeats GPS spoofing)
- **Photographic Audit**: Before and after photographic proof sealed to the event record
- **Immutable Lifecycle Timeline**: Timestamped audit trail tracking detection, classification, dispatch, verification, and closure

### 2. The Exception Engine
Rather than drowning campus facility managers in raw telemetry, the Exception Engine monitors live streams and surfaces actionable operational exceptions:
1. **Station Overflow (>85% - 90%)**: Ultrasonic depth sensors detect capacity breach before physical spillage.
2. **Stream Contamination**: AI vision identifies hazardous or wet items placed inside dry/paper hoppers.
3. **SLA Breach / Missed Pickup**: Assigned worker has not verified on-site presence within the allotted time.
4. **Sanitation Overdue**: High-traffic dining or sanitary bins past their mandated disinfection window.
5. **Sensor Telemetry Drop**: Missing heartbeat ping or sudden battery voltage plunge across IoT nodes.
6. **Spatial Hotspot Anomaly**: Continuous sorting mistakes in a specific campus zone triggering targeted educational notices.
7. **Generation Surge**: Sudden volume spikes exceeding 250% of the historical time-of-day baseline.

---

## 🏛️ Comprehensive Feature Matrix

### 1. Architectural Public Showcase & Landing Page (`/` or `/home`)
- **7-Section Responsive Showcase**:
  - **Hero Console**: Live interactive event passport preview (`#WS-10482`), interactive QR verification trigger, and real-time campus telemetry counters.
  - **The 4 Operational Gaps**: Visual breakdown of why sensor-only and photo-only approaches fail.
  - **The 6-Stage Closed Loop**: Dynamic step selector explaining the mechanics of each operational stage.
  - **Waste Event Passport**: Obsidian dark-mode architectural preview with cryptographic SHA-256 integrity hash.
  - **The Exception Engine**: Interactive exception triage rules and priority dispatch matrix.
  - **Physical & Hardware Architecture**: Interactive vector micro-consoles illustrating:
    - *ESP32 & Ultrasonic Depth Sensors* (40 kHz sonar pulse wave, dual TX/RX transducers, fill calculation).
    - *Cryptographic Station QR Tokens* (active laser scan line, geo-fence sealed, anti-spoofing).
    - *Mobile Field Crew Console* (tactile PWA, offline sync, camera audit proof).
  - **Enterprise Governance & Accreditation**: NAAC Criterion 7.1.3 metrics, AICTE Green Campus benchmarking, and ESG reporting.

### 2. Four Tailored Role-Based Dashboards (`/dashboard`)
Switch seamlessly between 4 distinct campus roles via the top 1-click role switcher:

- **👔 Facility Manager**:
  - Global campus KPI overview: Loop Integrity Rate (98.4%), Active Exceptions, Dispatched Volume, Crew Utilization.
  - Interactive Recharts: Hourly Waste Activity vs AI Classification, Stream Category Distribution.
  - Live Event Passports table with instant modal inspection.
  - Real-time exception alert ticker with emergency crew dispatch buttons.

- **👷 Field Crew / Sanitation Worker**:
  - Mobile-first, tactile field operations console.
  - Active route assignments (e.g., 5 stations across Academic Core & Cafeteria).
  - **Tactile Priority Action Ticket** (`DISPATCH #TSK-101`):
    - Real-time step progress (`1. Route Started` → `2. QR Verified` → `3. Pickup Complete`).
    - One-tap "Scan & Validate Station QR" simulator.
    - One-tap "Upload Photo Proof & Close Loop" action.
  - Hazardous Material Certification status badge (Level 2 BioTech/Lab clearance).
  - Quick turnaround SLA adherence tracker.

- **🎓 Student / Citizen / Faculty**:
  - Citizen engagement and reporting portal.
  - Quick incident reporting button with instant photo upload.
  - Live status tracking of reported issues across campus.
  - Green Campus Eco-Points leaderboard and badges.
  - Interactive waste segregation guide with disposal best practices.

- **🏛️ Campus Administrator**:
  - High-level governance, institutional audit trails, and compliance metrics.
  - Station hardware fleet health status (online, offline, battery levels).
  - User and sanitation crew management directory.
  - NAAC 7.1.3 audit preparation scorecards and data export logs.

### 3. AI Waste Classification & Vision Studio (`/classifier`)
- Dual-mode AI classification: **Google Gemini 1.5 Flash Vision API** + **Calibrated Deterministic Offline Neural Fallback**.
- Accepts image uploads, drag-and-drop, sample image selector, or live device camera input.
- Real-time vision inference provides:
  - Recommended Waste Stream (`Dry Recyclable`, `Wet Compostable`, `Sanitary / Medical`, `E-Waste / Hazardous`).
  - AI Confidence percentage (e.g., 94.2%).
  - Contamination Risk Assessment (Low, Medium, High) with identified contaminants (e.g., residual food grease).
  - Estimated decomposition timeframe (e.g., 450 years for PET plastic).
  - Regulatory handling directive and safety precautions.
  - **1-Click "Log Waste Event Passport"** button to automatically generate a trackable event in the campus ledger.

### 4. Waste Event Passports Central Ledger (`/events`)
- Complete audit ledger of all campus waste events with status filtering (`All`, `Reported`, `Classified`, `Dispatched`, `QR Verified`, `Resolved`).
- Stream category filters (`Dry`, `Wet`, `Sanitary`, `Hazardous`, `E-Waste`).
- Instant search by Event ID, station, or reporting user.
- **Deep Event Passport Modal (`EventPassportModal`)**:
  - Full cryptographic verification passport view.
  - Station telemetry snapshot at time of event.
  - AI confidence breakdown.
  - Interactive Before & After photographic evidence comparison.
  - Immutable chronological audit timeline.
  - Direct operator triggers: "Simulate Physical QR Scan" and "Upload Verified Photo Proof".

### 5. Smart Station Fleet Management (`/stations`)
- Complete inventory of 12 pre-configured smart campus stations (Academic Blocks, Central Library, Dining Halls, Research Labs, Sports Complex, Hostels).
- Live ultrasonic depth sensor telemetry (Fill level percentage, volume in liters, ping latency).
- Station hardware status: Battery voltage (%), Wi-Fi / LoRa connectivity, and last heartbeat timestamp.
- Capacity breakdown across 4 waste streams per station.
- **Station QR Code Generator**: Generates and displays cryptographic QR identity tokens for physical printing and station hopper affixation.

### 6. Interactive Geospatial Campus Map (`/map`)
- Geospatial mapping powered by **Leaflet**.
- Realistic campus coordinates plotted with color-coded status pins:
  - 🟢 Green: Fill Level < 50% (Normal).
  - 🟡 Amber: Fill Level 50% - 80% (Warning).
  - 🔴 Red: Fill Level > 80% (Critical / Action Required).
- Clickable station markers revealing mini-telemetry cards and quick dispatch triggers.
- Active collection routes overlay showing field crew transit paths.

### 7. Collection Task Queue & Routing (`/collection`)
- Task management console for field operations.
- Dynamic route generation prioritizing stations with critical fill levels or open contamination exceptions.
- SLA countdown timers tracking collection response times.
- Task status workflow (`Pending` → `In Progress` → `QR Verified` → `Completed`).

### 8. Sanitation & Disinfection Cycles (`/sanitation`)
- Preventive sanitation scheduling for smart campus restrooms, dining aprons, and biomedical bins.
- Mandatory audit intervals (e.g., 2-hour dining hall disinfection cycles).
- Sanitation checklist tracking (chemical disinfectant used, liner replaced, odor neutralizing spray applied).

### 9. Real-Time Exception Alert Center (`/exceptions`)
- Central triage desk for campus facility supervisors.
- Filter by exception severity (`Critical`, `High`, `Medium`, `Low`) and type (`Overflow`, `Contamination`, `SLA Breach`, `Sensor Drop`).
- Automated SLA breach timers warning supervisors before compliance lapses.
- Resolution workflows: Emergency crew reassignment, supervisor override, and resolution logging.

### 10. Institutional Analytics & Diversion KPIs (`/analytics`)
- **Landfill Diversion Rate**: Percentage of waste diverted to composting and certified recycling partners.
- **Segregation Fidelity Index**: Mathematical score measuring how cleanly waste streams are separated at the source.
- **Loop Turnaround Velocity**: Average minutes taken from initial detection to verified photo closure.
- **Station Throughput Benchmarks**: Volumetric rankings identifying high-volume campus hotspots.

### 11. NAAC 7.1.3 & ESG Institutional Report Generator (`/reports`)
- One-click executive report generation specifically formatted for:
  - **NAAC Criterion 7.1.3**: Institutional Values and Social Responsibilities (Facilities for Alternate Sources of Energy & Waste Management).
  - **AICTE Clean & Green Campus Awards**.
  - **ISO 14001 Environmental Management System Compliance**.
- Generates structured operational summaries, volumetric breakdowns, compliance percentages, and exportable audit tables.

### 12. Student & Citizen Reporting Portal (`/student-report`)
- Frictionless, mobile-optimized incident reporting interface.
- Allows students and faculty to report overflowing bins, improper dumping, or damaged infrastructure in under 30 seconds.
- Geolocation tagging, photo upload, and instant ticket generation.
- Real-time ticket tracking dashboard showing operational progress.

---

## 💻 Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 19, Vite 8, React Router v7 |
| **Styling & UI Tokens** | Tailwind CSS v4, Custom CSS Design System, High-Contrast Blueprint Theme |
| **Icons & Visuals** | Lucide React (100% SVG, strictly zero emojis), Interactive Vector Micro-Consoles |
| **Data Visualization** | Recharts (Responsive bar charts, pie charts, telemetry curves) |
| **Geospatial GIS** | Leaflet, React Leaflet |
| **Backend Runtime** | Node.js, Express.js (ES Modules) |
| **Authentication & Security** | JSON Web Tokens (JWT), bcryptjs password hashing, Role-Based Access Control (RBAC) |
| **File & Image Uploads** | Multer with disk storage & validation |
| **Database Architecture** | Dual-Mode: MongoDB Atlas (Mongoose) + High-Fidelity Resilient In-Memory Campus Store fallback |
| **Artificial Intelligence** | Google Gemini 1.5 Flash Vision API + Calibrated Deterministic Rule/Neural Fallback |
| **IoT & Telemetry Simulation**| ESP32 Arduino C++ firmware + Node.js Headless Sensor Telemetry Simulator |

---

## 📂 Project Structure

```text
swaloop/
├── client/                             # React 19 + Vite Frontend Application
│   ├── src/
│   │   ├── components/                 # Reusable UI Components
│   │   │   ├── EventTimeline.jsx       # Timestamped immutable event lifecycle
│   │   │   ├── LoopBanner.jsx          # 6-stage operational loop visual banner
│   │   │   ├── Navbar.jsx              # Single-line, sticky high-contrast navigation bar
│   │   │   ├── NotificationDrawer.jsx  # Real-time alert notifications drawer
│   │   │   ├── PageHeader.jsx          # Standardized operational header
│   │   │   ├── Sidebar.jsx             # High-contrast navigation sidebar
│   │   │   └── StatusBadge.jsx         # Status and severity pills
│   │   ├── pages/                      # 12 Core Platform Pages
│   │   │   ├── HomePage.jsx            # 7-section architectural product landing page
│   │   │   ├── DashboardPage.jsx       # 4-role tailored operational dashboard
│   │   │   ├── EventsPage.jsx          # Waste Event Passports central ledger
│   │   │   ├── EventPassportModal.jsx  # Deep inspection modal for event passports
│   │   │   ├── StationsPage.jsx        # Smart station fleet & telemetry monitor
│   │   │   ├── OperationsMapPage.jsx   # Interactive Leaflet campus GIS map
│   │   │   ├── ClassifierPage.jsx      # AI vision waste classification studio
│   │   │   ├── CollectionPage.jsx      # Field crew dispatch and route execution
│   │   │   ├── SanitationPage.jsx      # Scheduled disinfection & audit cycles
│   │   │   ├── ExceptionsPage.jsx      # Exception Engine triage & SLA enforcement
│   │   │   ├── AnalyticsPage.jsx       # Institutional KPIs & diversion analytics
│   │   │   ├── ReportsPage.jsx         # NAAC Criterion 7.1.3 report generator
│   │   │   ├── StudentReportPage.jsx   # Student & citizen issue reporting portal
│   │   │   └── LoginPage.jsx           # Auth portal with 1-click demo role switcher
│   │   ├── layouts/                    # AppLayout container with navbar & sidebar
│   │   ├── hooks/                      # useAuth authentication & role context
│   │   ├── services/                   # api.js REST client & mockData.js fallback
│   │   ├── App.jsx                     # Top-level client router
│   │   ├── index.css                   # High-contrast typography & color tokens
│   │   └── main.jsx                    # React DOM entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                             # Node.js + Express Backend Engine
│   ├── controllers/                    # Business logic controllers
│   │   ├── authController.js           # JWT login, session validation & demo credentials
│   │   ├── dashboardController.js      # Aggregated KPIs, charts & role data
│   │   ├── wasteEventController.js     # Event passport creation, verification & audit
│   │   ├── stationController.js        # Station fleet telemetry & simulation
│   │   ├── exceptionController.js      # Exception Engine triage & escalation
│   │   ├── taskController.js           # Collection task dispatching & SLAs
│   │   ├── sanitationController.js     # Disinfection schedule management
│   │   ├── aiController.js             # Gemini 1.5 Flash Vision interface & report generator
│   │   ├── analyticsController.js      # Quality score, diversion rate & benchmarks
│   │   └── notificationController.js   # Real-time notification broadcaster
│   ├── models/                         # Mongoose data schemas (when MongoDB is active)
│   │   ├── User.js                     # User entity with RBAC roles
│   │   ├── WasteEvent.js               # Waste Event Passport schema
│   │   ├── WasteStation.js             # Smart station hardware schema
│   │   ├── Exception.js                # Operational exception schema
│   │   └── Task.js                     # Field collection task schema
│   ├── middleware/                     # JWT authentication, RBAC & Multer upload
│   ├── routes/                         # REST API endpoint definitions (api.js)
│   ├── services/                       # dataStore.js (Dual-mode MongoDB / In-memory store)
│   │   └── geminiService.js            # Gemini 1.5 Flash Vision integration
│   ├── seed/                           # Realistic Indian smart campus seed dataset
│   ├── server.js                       # Express server entry point (Port 5000)
│   └── package.json
│
├── iot/                                # Hardware Firmware & Telemetry Simulation
│   ├── esp32/                          # Arduino C++ sketch for ESP32 + HC-SR04
│   │   └── swaloop_esp32.ino
│   └── sensor-simulation/              # Headless Node.js sensor telemetry generator
│       └── simulateSensors.js
│
├── docs/                               # Architecture blueprints, API specs & demo guides
├── .env.example                        # Environment variables template
├── package.json                        # Root orchestration script
└── README.md                           # Master Project Documentation
```

---

## ⚡ Quick Start & Installation

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- *Optional*: MongoDB Atlas connection string (if omitted, the system seamlessly uses the built-in resilient in-memory store)
- *Optional*: Google Gemini API key (if omitted, the system automatically uses the calibrated offline vision engine)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/swaloop.git
cd swaloop
```

### 2. Install All Dependencies
```bash
npm run install:all
```
*(This automatically runs `npm install` across the root, `server/`, and `client/` directories).*

### 3. Configure Environment Variables
Create a `.env` file in the `server/` directory:
```bash
cp .env.example server/.env
```
Default parameters in `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/swaloop
JWT_SECRET=swaloop_super_secret_jwt_key_2026_verified_loop
GEMINI_API_KEY=your_gemini_api_key_here
CLIENT_URL=http://localhost:5173
DEMO_MODE=true
```

### 4. Run Development Servers
Open two terminal windows:

**Terminal 1 — Backend API Server (Port 5000):**
```bash
cd server
npm run dev
```

**Terminal 2 — Frontend Client (Port 5173):**
```bash
cd client
npm run dev
```

Visit **`http://localhost:5173`** in your browser.

---

## 🔑 Pre-Configured Demo Accounts & Roles

SwaLoop includes **Zero-Dependency 1-Click Role Switching**. You can switch roles instantaneously using the role selector pill bar on the dashboard or log in with these pre-seeded accounts:

| Role | Person / Title | Email | Password | Primary Capabilities |
|---|---|---|---|---|
| **Facility Manager** | Ananya Iyer | `manager@swaloop.campus` | `manager123` | Complete operations overview, live telemetry, exception triage, and crew dispatch. |
| **Field Crew** | Rahul Verma | `worker1@swaloop.campus` | `worker123` | Mobile-first console, route task execution, QR station validation, photo proof upload. |
| **Student / Citizen** | Aarav Patel | `student@swaloop.campus` | `student123` | Issue reporting, tracking ticket statuses, eco-leaderboard, waste sorting guide. |
| **Campus Admin** | Dr. Rajesh Sharma | `admin@swaloop.campus` | `admin123` | Hardware fleet monitor, governance logs, NAAC 7.1.3 accreditation audit generator. |

---

## 📡 REST API Reference

The backend exposes a REST API at `http://localhost:5000/api`:

### Authentication & Sessions
- `POST /api/auth/login` — Authenticate user and issue JWT token.
- `GET /api/auth/me` — Retrieve current authenticated profile and assigned role.
- `GET /api/auth/demo-accounts` — Fetch list of pre-configured demo personas.

### Dashboard & Analytics
- `GET /api/dashboard` — Fetch role-tailored dashboard metrics, charts, and recent events.
- `GET /api/analytics` — Detailed institutional metrics (diversion rate, segregation score, turnaround).

### Waste Event Passports
- `GET /api/waste-events` — Query all event passports with filters (`status`, `category`, `station`).
- `POST /api/waste-events` — Create a new waste event (accepts multipart image).
- `GET /api/waste-events/:id` — Fetch complete passport details, telemetry, and timeline.
- `POST /api/waste-events/:id/verify` — Submit physical QR code and photo proof to seal loop.
- `PATCH /api/waste-events/:id/status` — Update event lifecycle state.

### Smart Stations & Hardware Fleet
- `GET /api/stations` — List all 12 smart campus stations with fill levels and hardware health.
- `GET /api/stations/:id` — Fetch station specifics, historical fill curves, and QR identity token.
- `POST /api/stations/:id/simulate` — Ingest ultrasonic sensor telemetry data.

### Exception Engine
- `GET /api/exceptions` — Query active operational exceptions filtered by severity.
- `POST /api/exceptions` — Trigger manual or simulated exception.
- `PATCH /api/exceptions/:id` — Update exception status (`Investigating`, `Dispatched`, `Resolved`).

### Tasks & Sanitation
- `GET /api/tasks` — Fetch field crew collection tasks and active routes.
- `PATCH /api/tasks/:id` — Update task status and record worker timestamps.
- `GET /api/sanitation` — Retrieve scheduled facility sanitation checklists.

### AI Vision & Reports
- `POST /api/ai/classify` — Submit waste photo for AI stream classification & contamination analysis.
- `POST /api/reports/generate` — Generate structured NAAC / ESG governance report.

### System Health
- `GET /api/health` — Check server status, database mode, and AI service availability.

---

## 🛠️ Hardware & IoT Subsystem

### 1. Ultrasonic Fill Telemetry (ESP32)
Located in `iot/esp32/swaloop_esp32.ino`:
- Uses the **HC-SR04 ultrasonic distance sensor** installed inside station hopper lids.
- Emits 40 kHz ultrasound bursts; calculates bin fill level by measuring echo return delay:
  $$\text{Fill \%} = \frac{\text{Station Height} - \text{Measured Distance}}{\text{Station Height}} \times 100$$
- Transmits telemetry packages over Wi-Fi / LoRa to `POST /api/stations/:id/simulate`.
- Low-power deep sleep cycles ensure multi-month battery operation.

### 2. Cryptographic Station QR Tokens
- Each physical bin hopper is permanently marked with an encrypted QR identity token (`STATION-WS-XXX`).
- Sanitation workers must physically scan this token with their mobile device camera at the bin location.
- The system verifies the station token against the server's cryptographic registry, eliminating remote click-farming and GPS spoofing.

### 3. Headless Telemetry Simulator
Located in `iot/sensor-simulation/simulateSensors.js`:
- Generates realistic campus waste accumulation curves for all 12 stations based on time-of-day traffic (e.g., cafeteria spikes during 12:30–14:30 lunch hours).
- Run it headless to simulate live IoT telemetry:
  ```bash
  cd iot/sensor-simulation
  node simulateSensors.js
  ```

---

## 🧪 5-Minute Judge / Evaluator Walkthrough

Follow this 6-step script during evaluations or hackathon demos:

1. **Explore the Landing Page (`/`)**:
   - Inspect the interactive hero preview ticket (`#WS-10482`). Click **"Simulate Field Crew QR Scan"** to watch the status seal live from *Pending* to *✓ QR & Photo Sealed*.
   - Scroll to Section 6 to view the interactive vector micro-consoles for the ESP32 Ultrasonic Sensor and Station QR Scanner.
2. **Access the Operations Dashboard (`/dashboard`)**:
   - Click **"Go to Platform"** in the navigation bar.
   - Use the top role switcher to toggle between **Facility Manager**, **Field Crew**, **Student / Citizen**, and **Campus Admin**.
3. **Execute a Real Collection Loop as Field Crew**:
   - Switch to **"Field Crew"** role.
   - Find the active **Priority Action Ticket** (`DISPATCH #TSK-101`).
   - Click **"Scan & Validate Station QR"** → Notice Stage 2 turns green.
   - Click **"Upload Verified Photo Proof & Close Loop"** → Notice Stage 3 turns green and the loop officially seals!
4. **Test the AI Waste Classifier (`/classifier`)**:
   - Navigate to the **AI Classifier** tab.
   - Click on one of the sample waste images (e.g., plastic bottle or food container) or upload a photo.
   - Click **"Analyze Stream & Detect Contamination"**.
   - Review the stream classification, confidence score, decomposition time, and contamination diagnosis.
   - Click **"Log Event Passport to Campus Ledger"** to see it instantly registered.
5. **Inspect the Central Passport Ledger (`/events`)**:
   - Click on any event row to open the **Event Passport Modal**.
   - Review the before/after photo evidence, station telemetry, and immutable timeline.
6. **Audit Campus GIS Map & NAAC Report (`/map` & `/reports`)**:
   - Open the **Campus Map** to see the 12 live stations color-coded by fill level.
   - Open **Reports** to see the automated **NAAC Criterion 7.1.3 Institutional Briefing** ready for export.

---

## 🔒 Security, Integrity & Resilience

- **Zero-Dependency Resilience**: If MongoDB is unavailable or unconfigured, SwaLoop automatically transitions to its internal high-fidelity campus repository (`dataStore.js`), guaranteeing 100% demo uptime.
- **Fail-Safe AI Inference**: If the external Gemini API quota is reached or network is unavailable, the system automatically uses its local calibrated neural classifier.
- **Role-Based Access Control (RBAC)**: All sensitive routes and dispatch actions are strictly enforced via JWT claims.
- **Strict Accessibility & Contrast**: The UI is built using high-contrast slate palettes (`#0B0F19`, `#CBD5E1`), crisp borders, and official Lucide SVG icons.

---

## 📄 License

This project is licensed under the **MIT License**.  
Developed for Smart Campus Waste & Sanitation Governance.
