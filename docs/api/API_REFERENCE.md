# EcoNest REST API Reference

Base URL: `http://localhost:5000/api`

## Authentication & RBAC

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/auth/login` | Authenticate user via email & password | Public |
| `GET` | `/auth/me` | Fetch active profile session | Bearer JWT |
| `GET` | `/auth/demo-accounts` | List 1-click evaluation personas | Public |

## Dashboard & Analytics

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/dashboard` | KPIs, Requires Attention items, and recent events | Public / Auth |
| `GET` | `/analytics` | Quality Score (82/100), volume trends, hotspots | Public / Auth |
| `GET` | `/notifications` | Unread notifications drawer list | Public / Auth |
| `PATCH` | `/notifications/:id/read` | Mark specific notification as read | Public / Auth |

## Waste Events & Passport Ledger

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/waste-events` | Filtered list of waste events (search, category, status) | Public / Auth |
| `GET` | `/waste-events/:id` | Full Waste Event Passport with vertical timeline | Public / Auth |
| `POST` | `/waste-events` | Create waste event (supports image upload) | Public / Auth |
| `POST` | `/waste-events/:id/verify` | Validate station physical QR code | Public / Auth |
| `PATCH` | `/waste-events/:id/status` | Advance lifecycle status (ASSIGNED, IN_PROGRESS, RESOLVED) | Public / Auth |

## Waste Stations & Telemetry

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/stations` | Full station fleet with GPS and overflow prediction | Public / Auth |
| `GET` | `/stations/:id` | Single station detail and recent history | Public / Auth |
| `PATCH` | `/stations/:id` | Update station configuration | Manager / Admin |
| `POST` | `/stations/:id/simulate` | Trigger simulated IoT sensor update | Public / Auth |

## Exception Engine & Operations

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/exceptions` | List active anomalies (OVERFLOW, CONTAMINATION, etc.) | Public / Auth |
| `POST` | `/exceptions` | Log new exception directive | Public / Auth |
| `PATCH` | `/exceptions/:id` | Assign crew or resolve exception with notes | Public / Auth |
| `GET` | `/tasks` | Collection tasks queue (worker and manager views) | Public / Auth |
| `PATCH` | `/tasks/:id` | Start/Complete collection task with QR/photo proof | Worker / Manager |
| `GET` | `/sanitation` | Campus sanitation schedule and checklist progress | Public / Auth |
| `PATCH` | `/sanitation/:id` | Complete sanitation cycle with checklist items | Worker / Manager |

## AI Assistant & Synthesizer

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/ai/classify` | Inspect waste image with Gemini Vision or Fallback | Public / Auth |
| `POST` | `/reports/generate` | Generate Daily / Weekly / Quality AI operational reports | Public / Auth |
