import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  MapPin,
  ArrowUpRight,
  Filter,
  RefreshCw,
  Eye,
  UserCheck,
  Check,
  Truck,
  QrCode,
  Camera,
  Play,
  ShieldCheck,
  Award,
  Sparkles,
  Clock,
  ArrowRight,
  Upload,
  Leaf,
  Building2,
  Radio,
  Sliders,
  FileCheck2,
  Calendar,
  Send,
  Briefcase,
  HardHat,
  GraduationCap,
  Landmark
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import StatusBadge from '../components/StatusBadge';
import LoopBanner from '../components/LoopBanner';
import EventPassportModal from './EventPassportModal';

export default function DashboardPage() {
  const { user, switchDemoRole } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  // Worker-specific interactive demo states
  const [workerTaskState, setWorkerTaskState] = useState({
    status: 'IN_PROGRESS',
    qrVerified: false,
    proofUploaded: false
  });
  const [workerSimModal, setWorkerSimModal] = useState(false);

  // Student-specific interactive demo states
  const [studentQuickIssue, setStudentQuickIssue] = useState('');
  const [studentLoggedSuccess, setStudentLoggedSuccess] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, [user?.role]);

  async function loadDashboard() {
    setLoading(true);
    try {
      const res = await api.getDashboard();
      if (res.success) {
        setData(res);
      }
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleQuickResolve(exceptionId) {
    setActionLoading(exceptionId);
    try {
      await api.updateException(exceptionId, {
        status: 'RESOLVED',
        resolutionNotes: `Quick-resolved by ${user?.name || 'Operations'} on dashboard.`
      });
      await loadDashboard();
    } catch (err) {
      alert('Failed to resolve exception: ' + err.message);
    } finally {
      setActionLoading(null);
    }
  }

  const { header, kpis, requiresAttention, charts, recentEvents } = data || {};

  return (
    <div className="space-y-6">
      {/* 1-CLICK OPERATIONAL ROLE SWITCHER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white rounded-2xl p-4 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-4 border border-slate-700/80">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white">Active Operational Role:</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-wider">
                {user?.role || 'manager'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Logged in as <strong className="text-slate-100">{user?.name}</strong> • {user?.department}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-700/60 overflow-x-auto">
          <span className="text-[11px] font-semibold text-slate-400 px-2.5 hidden sm:inline shrink-0">
            Switch Dashboard:
          </span>
          {[
            { id: 'manager', label: 'Facility Manager', icon: Briefcase },
            { id: 'worker', label: 'Field Crew', icon: HardHat },
            { id: 'student', label: 'Student / Citizen', icon: GraduationCap },
            { id: 'admin', label: 'Campus Admin', icon: Landmark }
          ].map(r => {
            const RoleIcon = r.icon;
            return (
              <button
                key={r.id}
                onClick={() => switchDemoRole(r.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                  user?.role === r.id
                    ? 'bg-emerald-500 text-slate-950 shadow-sm font-extrabold scale-102'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <RoleIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* RENDER TAILORED DASHBOARD BASED ON USER ROLE */}
      {user?.role === 'worker' ? (
        /* ============================================================== */
        /* 1. FIELD WORKER OPERATIONS CONSOLE                             */
        /* ============================================================== */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>On-Duty Shift 07:00 – 15:00</span> • <span>Zone: Academic Core & Dining</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
                Field Operations Console — Rahul Verma
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Execute assigned waste collection routes, scan station QR codes, and log verified photo proof.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/collection"
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Full Collection Queue</span>
              </Link>
            </div>
          </div>

          <LoopBanner activeStep="act" />

          {/* Worker KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="op-card p-4">
              <div className="text-xs font-semibold text-slate-500">Assigned Route Tasks</div>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">5 Stations</div>
              <div className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                <span>3 Pending</span> • <span>2 Completed</span>
              </div>
            </div>

            <div className="op-card p-4">
              <div className="text-xs font-semibold text-slate-500">QR Verification Rate</div>
              <div className="text-2xl font-extrabold text-emerald-600 mt-1">98.4%</div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">100% SLA compliance</div>
            </div>

            <div className="op-card p-4">
              <div className="text-xs font-semibold text-slate-500">Average Turnaround</div>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">14.2 min</div>
              <div className="text-[11px] text-emerald-600 font-medium mt-1">↓ 6.8 min faster than target</div>
            </div>

            <div className="op-card p-4">
              <div className="text-xs font-semibold text-slate-500">Hazardous Cert Status</div>
              <div className="text-2xl font-extrabold text-blue-600 mt-1">Level 2 Certified</div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">Authorized for BioTech & Labs</div>
            </div>
          </div>

          {/* ACTIVE DISPATCH TASK CARD (TACTILE ACTION HERO) */}
          <div className="bg-white rounded-2xl border-2 border-emerald-500/50 p-6 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 font-mono text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Priority Action Ticket
            </div>

            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest">
                DISPATCH #TSK-101 • CRITICAL PRIORITY
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                Central Library Atrium (WS-001) — 92% Fill Breach
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Ultrasonic sensors detected peak paper volume. Evacuate 80kg Dry Paper bin and replace heavy gauge liner before spillage occurs on east entrance corridor.
              </p>

              {/* Progress Indicators */}
              <div className="grid grid-cols-3 gap-2 my-4 text-center text-xs">
                <div className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 ${workerTaskState.status === 'IN_PROGRESS' || workerTaskState.status === 'COMPLETED' ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                  <span>1. Route Started</span>
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </div>
                <div className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 ${workerTaskState.qrVerified ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                  <span>2. QR Verified</span>
                  {workerTaskState.qrVerified && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                </div>
                <div className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 ${workerTaskState.status === 'COMPLETED' ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                  <span>3. Pickup Complete</span>
                  {workerTaskState.status === 'COMPLETED' && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                </div>
              </div>

              {/* Big Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {!workerTaskState.qrVerified ? (
                  <button
                    onClick={() => {
                      setWorkerTaskState(prev => ({ ...prev, qrVerified: true }));
                      alert('Station QR [WS-001-DRY-AUTH] Successfully Validated! Location coordinates confirmed via GPS.');
                    }}
                    className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Scan & Validate Station QR</span>
                  </button>
                ) : workerTaskState.status !== 'COMPLETED' ? (
                  <button
                    onClick={() => {
                      setWorkerTaskState(prev => ({ ...prev, status: 'COMPLETED' }));
                      alert('Collection Loop Completed! 14.2 kg paper logged and tamper-proof verification seal recorded.');
                    }}
                    className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Attach Photo Proof & Mark Complete</span>
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs border border-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Task Fully Verified & Resolved in Ledger</span>
                  </div>
                )}

                <button
                  onClick={() => navigate('/stations')}
                  className="px-4 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>View GIS Navigation Pin</span>
                </button>
              </div>
            </div>
          </div>

          {/* Assigned Shift Route Queue */}
          <div className="op-card p-5 space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Today's Remaining Route Clearance Queue</h3>
            <div className="space-y-2.5">
              {[
                { id: 'WS-004', name: 'Block A Cafeteria Food Court', stream: 'Wet Organic & Packaging', fill: 88, status: 'PENDING', time: '13:30' },
                { id: 'WS-011', name: 'BioTech Greenhouse Wing', stream: 'Bio-Plant Cultures', fill: 76, status: 'PENDING', time: '14:15' },
                { id: 'WS-006', name: 'Olympic Sports Pavilion', stream: 'Dry Recyclables', fill: 30, status: 'COMPLETED', time: '10:45' }
              ].map(st => (
                <div key={st.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${st.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-800'}`}>
                      {st.id.split('-')[1]}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900">{st.name}</div>
                      <div className="text-[11px] text-slate-500 font-medium">Stream: {st.stream} • Estimated Fill: {st.fill}%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-medium text-slate-500">ETA: {st.time}</span>
                    <StatusBadge status={st.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : user?.role === 'student' ? (
        /* ============================================================== */
        /* 2. STUDENT / CITIZEN ACTION & CLEANLINESS PORTAL                */
        /* ============================================================== */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Campus Green Stewardship Index</span> • <span>Rank #4 on Campus Leaderboard</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
                Citizen Cleanliness Portal — Aarav Patel
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Log overflowing dustbins, report contamination, track your reports, and earn Green Karma points.
              </p>
            </div>

            <Link
              to="/student-report"
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Report Waste Spillage</span>
            </Link>
          </div>

          <LoopBanner activeStep="detect" />

          {/* Student Stats & Karma */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="op-card p-4">
              <div className="text-xs font-semibold text-slate-500">Green Karma Points</div>
              <div className="text-2xl font-extrabold text-amber-600 mt-1">280 Pts</div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">Top 5% in CSE Department</div>
            </div>

            <div className="op-card p-4">
              <div className="text-xs font-semibold text-slate-500">Issues Reported</div>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">4 Incidents</div>
              <div className="text-[11px] text-emerald-600 font-medium mt-1">100% verified & resolved</div>
            </div>

            <div className="op-card p-4">
              <div className="text-xs font-semibold text-slate-500">Waste Diverted By You</div>
              <div className="text-2xl font-extrabold text-emerald-600 mt-1">18.4 kg</div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">Paper & beverage cans</div>
            </div>

            <div className="op-card p-4">
              <div className="text-xs font-semibold text-slate-500">Campus Green Rank</div>
              <div className="text-2xl font-extrabold text-purple-600 mt-1">#4 Champion</div>
              <div className="text-[11px] text-purple-700 font-medium mt-1">Badge: Zero Contamination</div>
            </div>
          </div>

          {/* Quick Issue Reporter Hero Box */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/90 rounded-2xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Notice a full dustbin or spillage on campus? Log it in 15 seconds.</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={studentQuickIssue}
                onChange={e => setStudentQuickIssue(e.target.value)}
                placeholder="e.g. Overfull blue bin outside Central Library coffee shop..."
                className="flex-1 px-4 py-2 text-xs rounded-xl bg-white border border-amber-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 text-slate-900"
              />
              <button
                onClick={() => {
                  if (!studentQuickIssue.trim()) return;
                  setStudentLoggedSuccess(true);
                  setStudentQuickIssue('');
                  setTimeout(() => setStudentLoggedSuccess(false), 5000);
                }}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Quick Alert</span>
              </button>
            </div>
            {studentLoggedSuccess && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Event Passport #WS-10483 instantiated! Crew #3 dispatched to location. +25 Green Karma awarded!</span>
              </div>
            )}
          </div>

          {/* My Reported Issues Tracker */}
          <div className="op-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900">My Logged Campus Waste Passports</h3>
              <span className="text-xs text-slate-500 font-medium">All events verified by kiosk QR</span>
            </div>

            <div className="space-y-3">
              {[
                { id: '#WS-10482', location: 'Block A Cafeteria Food Court', issue: 'Food residue mixed in paper bin', status: 'VERIFIED', time: '22 mins ago', resolver: 'Rahul Verma' },
                { id: '#WS-10480', location: 'North Parking Bay', issue: 'Motor oil bottle leak on pavement', status: 'ACTION_REQUIRED', time: '1 hour ago', resolver: 'Hazardous Crew' },
                { id: '#WS-10477', location: 'Hostel 4 Quadrangle', issue: 'Organic compost bin overflowing', status: 'VERIFIED', time: '3 hours ago', resolver: 'Suresh Kumar' }
              ].map(ev => (
                <div key={ev.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-slate-900">{ev.id}</span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs font-semibold text-slate-800">{ev.location}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{ev.issue}</p>
                    <div className="text-[11px] text-slate-400 mt-1">Logged {ev.time} • Assigned to {ev.resolver}</div>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <StatusBadge status={ev.status} />
                    <button
                      onClick={() => setSelectedEventId(ev.id)}
                      className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 hover:bg-slate-100 font-semibold text-slate-700"
                    >
                      View Passport
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : user?.role === 'admin' ? (
        /* ============================================================== */
        /* 3. CAMPUS ADMINISTRATOR / ESG EXECUTIVE GOVERNANCE             */
        /* ============================================================== */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-purple-600" />
                <span>Institutional Governance Suite</span> • <span>NAAC Green Campus Criteria 7.1.3 Compliant</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
                Executive ESG & Regulatory Governance — Dr. Rajesh Sharma
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Institute-wide sanitation audit certification, zero-discrepancy waste diversion records, and municipal compliance.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/reports"
                className="px-3.5 py-1.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Executive ESG Briefing</span>
              </Link>
            </div>
          </div>

          <LoopBanner activeStep="measure" />

          {/* Executive ESG KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="op-card p-4">
              <div className="text-xs font-semibold text-slate-500">Overall Campus ESG Index</div>
              <div className="text-2xl font-extrabold text-purple-600 mt-1">88 / 100</div>
              <div className="text-[11px] text-purple-700 font-medium mt-1">Grade A+ Institution</div>
            </div>

            <div className="op-card p-4">
              <div className="text-xs font-semibold text-slate-500">Audited Diversion Rate</div>
              <div className="text-2xl font-extrabold text-emerald-600 mt-1">68.4%</div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">Target: &gt; 65% (Achieved)</div>
            </div>

            <div className="op-card p-4">
              <div className="text-xs font-semibold text-slate-500">Zero-Discrepancy SLA</div>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">99.8%</div>
              <div className="text-[11px] text-emerald-600 font-medium mt-1">Tamper-evident QR hashes</div>
            </div>

            <div className="op-card p-4">
              <div className="text-xs font-semibold text-slate-500">Monthly Cost Efficiency</div>
              <div className="text-2xl font-extrabold text-blue-600 mt-1">₹1,42,800</div>
              <div className="text-[11px] text-blue-700 font-medium mt-1">Logistics savings from telemetry</div>
            </div>
          </div>

          {/* Multi-Zone Regulatory Audit Performance Matrix */}
          <div className="op-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Campus Zone Regulatory Compliance Scorecard</h3>
                <p className="text-xs text-slate-500">Statutory municipal audit tracking across all 5 institute zones</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold font-mono">
                100% AUDIT READY
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-semibold">
                    <th className="py-2.5 px-3">Campus Zone</th>
                    <th className="py-2.5 px-3">Stations</th>
                    <th className="py-2.5 px-3">Segregation Quality</th>
                    <th className="py-2.5 px-3">Diversion Rate</th>
                    <th className="py-2.5 px-3">Sanitation Audit</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {[
                    { zone: 'Academic Core (Library & CSE)', stations: '4 Active', quality: '94%', diversion: '74%', audit: '96/100', grade: 'Grade A+' },
                    { zone: 'Food & Dining (Cafeteria)', stations: '2 Active', quality: '78%', diversion: '62%', audit: '82/100', grade: 'Attention Req.' },
                    { zone: 'Residential Hostels', stations: '2 Active', quality: '86%', diversion: '68%', audit: '90/100', grade: 'Grade A' },
                    { zone: 'Sports & Wellness', stations: '2 Active', quality: '92%', diversion: '70%', audit: '94/100', grade: 'Grade A' },
                    { zone: 'BioTech & Cleanroom Labs', stations: '2 Active', quality: '98%', diversion: '65%', audit: '99/100', grade: 'Grade A+' }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="py-3 px-3 font-bold text-slate-900">{row.zone}</td>
                      <td className="py-3 px-3 text-slate-600">{row.stations}</td>
                      <td className="py-3 px-3 font-semibold text-emerald-700">{row.quality}</td>
                      <td className="py-3 px-3 text-slate-700">{row.diversion}</td>
                      <td className="py-3 px-3 font-mono font-semibold text-purple-700">{row.audit}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.grade.includes('A+') ? 'bg-purple-50 text-purple-700 border border-purple-200' : row.grade.includes('Attention') ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                          {row.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* ============================================================== */
        /* 4. FACILITY MANAGER OPERATIONS COMMAND CENTER (DEFAULT)        */
        /* ============================================================== */
        <div className="space-y-6">
          {/* Header section (Section 12) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {header?.workspace || 'Campus Operations'} • {header?.date}
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1">
                {header?.greeting || 'Good morning, Facility Team'}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={loadDashboard}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Sync Metrics</span>
              </button>
            </div>
          </div>

          <LoopBanner activeStep="measure" />

          {/* Section 13: 4 Compact KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="op-card p-4 border-slate-300">
              <div className="text-xs font-bold text-slate-700">Total Waste Events Today</div>
              <div className="text-2xl font-extrabold text-slate-950 mt-1">
                {typeof kpis?.wasteEvents === 'object' && kpis.wasteEvents !== null
                  ? kpis.wasteEvents.value
                  : typeof kpis?.totalEventsToday === 'number'
                  ? kpis.totalEventsToday.toLocaleString()
                  : '1,284'}
              </div>
              <div className="text-[11px] text-emerald-700 font-bold mt-1">
                {typeof kpis?.wasteEvents === 'object' && kpis.wasteEvents?.delta
                  ? `${kpis.wasteEvents.delta} ${kpis.wasteEvents.subtext || ''}`
                  : '↑ 8.4% vs last week'}
              </div>
            </div>

            <div className="op-card p-4 border-slate-300">
              <div className="text-xs font-bold text-slate-700">Avg AI Vision Confidence</div>
              <div className="text-2xl font-extrabold text-slate-950 mt-1">
                {typeof kpis?.segregationQuality === 'object' && kpis.segregationQuality !== null
                  ? kpis.segregationQuality.value
                  : kpis?.avgConfidence
                  ? `${kpis.avgConfidence}%`
                  : '94.6%'}
              </div>
              <div className="text-[11px] text-slate-600 font-semibold mt-1">Across 12 smart stations</div>
            </div>

            <div className="op-card p-4 border-slate-300">
              <div className="text-xs font-bold text-slate-700">Open Exceptions</div>
              <div className="text-2xl font-extrabold text-rose-700 mt-1">
                {typeof kpis?.openExceptions === 'object' && kpis.openExceptions !== null
                  ? kpis.openExceptions.value
                  : kpis?.openExceptions || 4}
              </div>
              <div className="text-[11px] text-slate-600 font-semibold mt-1">
                {typeof kpis?.openExceptions === 'object' && kpis.openExceptions?.subtext
                  ? kpis.openExceptions.subtext
                  : '1 Critical • 2 High priority'}
              </div>
            </div>

            <div className="op-card p-4 border-slate-300">
              <div className="text-xs font-bold text-slate-700">Campus Waste Quality Score</div>
              <div className="text-2xl font-extrabold text-emerald-700 mt-1">
                {typeof kpis?.qualityScore === 'object' && kpis.qualityScore !== null
                  ? kpis.qualityScore.value
                  : kpis?.qualityScore || 82} / 100
              </div>
              <div className="text-[11px] text-emerald-800 font-bold mt-1">↑ 4 points MoM gain</div>
            </div>
          </div>

          {/* Section 14: Exception Engine "Requires Attention" */}
          <div className="op-card p-5 space-y-4 border-slate-300">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h2 className="text-base font-extrabold text-slate-950">Requires Attention Right Now</h2>
              </div>
              <Link to="/exceptions" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
                <span>View Exception Queue</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(requiresAttention || []).slice(0, 4).map(item => (
                <div key={item._id || item.exceptionId} className="p-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition-colors flex items-start justify-between gap-3 shadow-2xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-xs text-slate-950">{item.title}</span>
                      <StatusBadge status={item.severity} />
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed line-clamp-2">{item.description}</p>
                    <div className="text-[10.5px] text-slate-600 font-mono font-medium">Location: {item.stationName}</div>
                  </div>
                  <button
                    onClick={() => handleQuickResolve(item.exceptionId || item._id)}
                    disabled={actionLoading === (item.exceptionId || item._id)}
                    className="shrink-0 px-2.5 py-1 text-xs font-bold rounded-lg bg-white border border-slate-300 text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 transition-colors shadow-2xs"
                  >
                    Resolve
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="op-card p-5 space-y-3">
              <h3 className="font-bold text-sm text-slate-900">24-Hour Event Throughput</h3>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={
                    charts?.hourlyEvents ||
                    (charts?.dailyActivity ? charts.dailyActivity.map(d => ({ time: d.day, events: d.events })) : [
                      { time: '08:00', events: 18 },
                      { time: '10:00', events: 42 },
                      { time: '12:00', events: 88 },
                      { time: '14:00', events: 64 },
                      { time: '16:00', events: 51 },
                      { time: '18:00', events: 35 },
                      { time: '20:00', events: 19 }
                    ])
                  }>
                    <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} />
                    <YAxis stroke="#94A3B8" fontSize={11} />
                    <Tooltip />
                    <Bar dataKey="events" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="op-card p-5 space-y-3">
              <h3 className="font-bold text-sm text-slate-900">Waste Streams Composition</h3>
              <div className="h-60 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={
                        charts?.wasteByCategory ||
                        charts?.categoryDistribution || [
                          { name: 'Dry Waste', value: 52, color: '#2563EB' },
                          { name: 'Wet Waste', value: 32, color: '#16A34A' },
                          { name: 'Sanitary Waste', value: 11, color: '#D97706' },
                          { name: 'Special Care', value: 5, color: '#DC2626' }
                        ]
                      }
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {(charts?.wasteByCategory || charts?.categoryDistribution || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color || ['#2563EB', '#16A34A', '#D97706', '#DC2626'][index % 4]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Waste Events Ledger */}
          <div className="op-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900">Recent Waste Event Passports</h3>
              <Link to="/events" className="text-xs font-semibold text-emerald-700 hover:underline">
                View Full Ledger →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                    <th className="py-2 px-3">Passport ID</th>
                    <th className="py-2 px-3">Station & Location</th>
                    <th className="py-2 px-3">Stream</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3">Verification Score</th>
                    <th className="py-2 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(recentEvents || []).map(ev => (
                    <tr key={ev._id || ev.eventId} className="hover:bg-slate-50/80">
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">{ev.eventId}</td>
                      <td className="py-3 px-3 font-medium text-slate-700">{ev.stationName || ev.location}</td>
                      <td className="py-3 px-3">
                        <span className="capitalize px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-600">
                          {ev.category || ev.wasteCategory || 'Dry Waste'}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <StatusBadge status={ev.status} />
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-emerald-700">
                        {ev.verificationScore !== undefined ? `${ev.verificationScore}%` : `${ev.confidence || 92}%`}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => setSelectedEventId(ev.eventId)}
                          className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 hover:bg-slate-100 font-semibold text-slate-700"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* EVENT PASSPORT MODAL (SHARED ACROSS ALL ROLES) */}
      {selectedEventId && (
        <EventPassportModal
          eventId={selectedEventId}
          onClose={() => setSelectedEventId(null)}
          onEventUpdated={loadDashboard}
        />
      )}
    </div>
  );
}
