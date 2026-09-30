import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Eye,
  QrCode,
  Camera,
  BarChart2,
  TrendingUp,
  AlertTriangle,
  Radio,
  Clock,
  Zap,
  Users,
  Building2,
  ChevronRight,
  Activity,
  Layers,
  Sparkles,
  Smartphone,
  Check,
  ExternalLink,
  Sliders,
  Terminal,
  Play,
  RefreshCw,
  Lock,
  Compass,
  Flame,
  CheckSquare,
  Menu,
  X
} from 'lucide-react';
import LoopBanner from '../components/LoopBanner';
import StatusBadge from '../components/StatusBadge';

function SafeImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  fallbackColor = 'from-slate-800 to-slate-900',
  fallbackIcon: FallbackIcon,
  children
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {hasError || !src ? (
        <div className={`w-full h-full bg-gradient-to-br ${fallbackColor} flex flex-col items-center justify-center p-3 text-center select-none`}>
          {FallbackIcon ? (
            <FallbackIcon className="w-7 h-7 text-white/70 mb-1.5" />
          ) : (
            <Sparkles className="w-6 h-6 text-emerald-400 mb-1.5" />
          )}
          <span className="text-[11px] font-mono text-white/90 font-bold line-clamp-1">{alt}</span>
        </div>
      ) : (
        <>
          {!isLoaded && (
            <div className={`absolute inset-0 bg-gradient-to-br ${fallbackColor} animate-pulse`} />
          )}
          <img
            src={src}
            alt=""
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${imgClassName}`}
          />
        </>
      )}
      {children}
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();

  // Interactive states for Hero & Sections
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroVerified, setHeroVerified] = useState(false);
  const [activeLoopStep, setActiveLoopStep] = useState(0);
  const [activeExceptionTab, setActiveExceptionTab] = useState('OVERFLOW');
  const [simulatedFill, setSimulatedFill] = useState(92);

  const loopSteps = [
    {
      id: 'detect',
      stepNum: '01',
      title: 'Detect',
      subtitle: 'IoT Ultrasonic Telemetry or Citizen Mobile Log',
      desc: 'Smart stations continuously monitor fill level and bin load via ultrasonic distance sensors. When fill threshold breaches 75% or a student scans the kiosk QR to report spillage, an event record is instantiated in the ledger within 10 seconds.',
      actor: 'Ultrasonic Node / Citizen Portal',
      sla: '< 10 seconds latency',
      tag: 'Continuous Heartbeat',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'classify',
      stepNum: '02',
      title: 'Classify',
      subtitle: 'Gemini Vision AI Stream Categorization',
      desc: 'The waste specimen is categorized into Dry, Wet, Sanitary, or Special Care streams. The engine calculates an exact confidence score (e.g. 94%) and identifies any cross-stream contamination (e.g. food grease inside dry paper bins).',
      actor: 'Gemini 1.5 Flash Vision Engine',
      sla: 'Sub-second inference',
      tag: 'Multi-Modal Vision',
      image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&auto=format&fit=crop&q=80',
      color: 'from-indigo-500 to-violet-600',
      textColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    {
      id: 'verify',
      stepNum: '03',
      title: 'Verify',
      subtitle: 'Physical Station QR Cryptographic Validation',
      desc: 'Sanitation crew members must physically scan the station-specific QR token at the bin hopper. SwaLoop validates the physical token against geospatial coordinates, eliminating fraudulent remote sign-offs.',
      actor: 'Field Sanitation Crew',
      sla: 'Zero GPS spoofing',
      tag: 'On-Site Presence Proof',
      image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=600&auto=format&fit=crop&q=80',
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      id: 'act',
      stepNum: '04',
      title: 'Act',
      subtitle: 'Priority Dispatch & Crew SLA Enforcement',
      desc: 'Automated dispatching routes tasks to the nearest available crew member based on urgency tiers. Critical overflows trigger automated 30-minute SLA countdowns with real-time escalation notifications.',
      actor: 'Facility Operations Lead & Crew',
      sla: '30-minute target SLA',
      tag: 'SLA Enforced',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    },
    {
      id: 'prove',
      stepNum: '05',
      title: 'Prove',
      subtitle: 'Post-Collection Photographic Audit',
      desc: 'Upon completing bag collection and chute sanitization, the worker captures a photographic proof image. The image is timestamped, hashed, and attached permanently to the event passport.',
      actor: 'Worker Mobile PWA Camera',
      sla: 'Cryptographic image hash',
      tag: 'Visual Audit Sealed',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
      color: 'from-teal-500 to-emerald-600',
      textColor: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200'
    },
    {
      id: 'measure',
      stepNum: '06',
      title: 'Measure',
      subtitle: 'Closed-Loop Analytics & Quality Index',
      desc: 'The event status transitions to RESOLVED, the station fill resets, and the metrics flow into the Campus Waste Quality Score (82/100), updating compliance velocities and hotspot risk maps in real time.',
      actor: 'Campus Analytics Engine',
      sla: 'Continuous Loop Closure',
      tag: '100% Traceability',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80',
      color: 'from-cyan-500 to-blue-600',
      textColor: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200'
    }
  ];

  const exceptionData = {
    OVERFLOW: {
      title: 'Station Overflow (>90% Capacity)',
      severity: 'CRITICAL',
      trigger: 'Ultrasonic sensor reports fill depth > 90% or student logs ground spillage.',
      impact: 'Pest attraction, litter dispersion, and corridor hygiene infractions.',
      action: 'Automated high-priority dispatch to nearest roving crew with 30-min SLA timer.',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      accentDot: 'bg-rose-500'
    },
    CONTAMINATION: {
      title: 'Stream Contamination Detected',
      severity: 'WARNING',
      trigger: 'Vision AI identifies food gravy residue or oily packaging inside dry paper hopper.',
      impact: 'Destroys batch recyclability and downgrades campus recycling salvage payout.',
      action: 'Prompts worker to segregate soiled packaging before bin baling and logs hotspot notice.',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      accentDot: 'bg-amber-500'
    },
    MISSED_COLLECTION: {
      title: 'Missed Collection SLA Window',
      severity: 'WARNING',
      trigger: 'Scheduled collection window expires without verified station QR scan.',
      impact: 'Station bottle-necking during peak university class interchange periods.',
      action: 'Escalates notification to Facility Operations Manager and re-routes secondary trolley.',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      accentDot: 'bg-amber-500'
    },
    SANITATION_OVERDUE: {
      title: 'Sanitation & Disinfection Overdue',
      severity: 'ATTENTION',
      trigger: 'Bin chute degreasing or organic deodorization exceeds scheduled 6-hour cycle.',
      impact: 'Odor accumulation and hygiene degradation in high foot-traffic corridors.',
      action: 'Prompts crew mobile console with mandatory checklist and disinfectant verification.',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      accentDot: 'bg-blue-500'
    },
    SENSOR_OFFLINE: {
      title: 'Sensor Telemetry Heartbeat Lost',
      severity: 'CRITICAL',
      trigger: 'Zero telemetry packet received for >45 minutes from solar/battery node.',
      impact: 'Blindspot created at monitored station.',
      action: 'Dispatches technician ticket for battery harness inspection and hardware continuity check.',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      accentDot: 'bg-rose-500'
    },
    REPEATED_ERROR: {
      title: 'Repeated Segregation Error Hotspot',
      severity: 'ATTENTION',
      trigger: 'Same location registers >3 consecutive contamination events within 24 hours.',
      impact: 'Systemic student confusion regarding waste sorting at this venue.',
      action: 'Recommends dual-hopper signage redesign and student ambassador awareness table.',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      accentDot: 'bg-purple-500'
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-emerald-500 selection:text-white overflow-x-clip">
      {/* Background Engineering Gridlines with Radial Vignette */}
      <div className="absolute inset-0 bg-grid-slate radial-fade-mask pointer-events-none z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-emerald-100/60 via-teal-50/30 to-transparent blur-3xl pointer-events-none z-0" />

      {/* STICKY BILLION-DOLLAR NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-2xl border-b border-slate-200/80 transition-all shadow-[0_4px_25px_-5px_rgba(15,23,42,0.06)]">
        {/* Top vibrant iridescent glowing laser line */}
        <div className="h-[2.5px] bg-gradient-to-r from-emerald-500 via-teal-400 via-sky-400 via-indigo-500 to-emerald-400 w-full" />
        
        {/* Ambient subtle blur glow behind header */}
        <div className="absolute top-0 left-1/4 right-1/4 h-6 bg-gradient-to-r from-emerald-400/15 via-teal-300/15 to-indigo-400/15 blur-xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-3 relative z-10">
          {/* Left: Brand Identity with glowing ring */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0 mr-1 xl:mr-3">
            <div className="relative">
              {/* Outer ambient glow on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur-xs opacity-40 group-hover:opacity-100 transition duration-300" />
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex items-center justify-center text-white shadow-md border border-slate-800/80 group-hover:scale-105 transition-transform duration-200">
                <svg className="w-4.5 h-4.5" viewBox="0 0 32 32" fill="none">
                  <path d="M11 16C11 13.2386 13.2386 11 16 11C18.7614 11 21 13.2386 21 16C21 18.7614 18.7614 21 16 21C13.5 21 11.5 19.3 11.1 17" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round"/>
                  <circle cx="16" cy="16" r="2.5" fill="#10B981"/>
                  <path d="M20 14L22.5 16.5L25 12" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base text-slate-900 tracking-tight font-sans">SwaLoop</span>
                <span className="inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-gradient-to-r from-emerald-500/10 via-teal-500/15 to-emerald-500/10 text-emerald-800 border border-emerald-500/25 font-bold shadow-2xs">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  VERIFIED
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-tight">Campus OS</p>
            </div>
          </Link>

          {/* Center: Segmented Floating Glass Nav Pill (Single line, strictly no wrapping, zero horizontal overflow) */}
          <nav className="hidden lg:flex items-center gap-0.5 p-1 bg-slate-100/80 border border-slate-200/80 rounded-full backdrop-blur-md shadow-inner whitespace-nowrap shrink-0">
            <a
              href="#overview"
              className="px-2.5 xl:px-3 py-1 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-white hover:shadow-xs transition-all duration-150 whitespace-nowrap inline-flex items-center gap-1.5"
            >
              Overview
            </a>
            <a
              href="#problem"
              className="px-2.5 xl:px-3 py-1 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-white hover:shadow-xs transition-all duration-150 whitespace-nowrap inline-flex items-center gap-1.5"
            >
              Gaps
            </a>
            <a
              href="#loop"
              className="px-2.5 xl:px-3 py-1 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-white hover:shadow-xs transition-all duration-150 whitespace-nowrap inline-flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>The Loop</span>
            </a>
            <a
              href="#passport"
              className="px-2.5 xl:px-3 py-1 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-white hover:shadow-xs transition-all duration-150 whitespace-nowrap inline-flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
              <span>Passport</span>
            </a>
            <a
              href="#exceptions"
              className="px-2.5 xl:px-3 py-1 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-white hover:shadow-xs transition-all duration-150 whitespace-nowrap inline-flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              <span>Exceptions</span>
            </a>
            <a
              href="#iot"
              className="px-2.5 xl:px-3 py-1 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-white hover:shadow-xs transition-all duration-150 whitespace-nowrap inline-flex items-center gap-1.5"
            >
              <span>Hardware</span>
            </a>
            <a
              href="#impact"
              className="px-2.5 xl:px-3 py-1 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-white hover:shadow-xs transition-all duration-150 whitespace-nowrap inline-flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
              <span>Score</span>
            </a>
          </nav>

          {/* Right Action Suite */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Real-time Telemetry Live Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-900 shadow-2xs whitespace-nowrap">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-[11px] tracking-tight">12 Live</span>
            </div>

            {/* Sign In */}
            <Link
              to="/login"
              className="text-xs font-bold text-slate-700 hover:text-slate-950 px-2.5 py-1.5 rounded-xl hover:bg-slate-100 transition-colors whitespace-nowrap"
            >
              Sign In
            </Link>

            {/* High-End Glowing CTA */}
            <button
              onClick={() => navigate('/dashboard')}
              className="relative group overflow-hidden px-3.5 py-2 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 hover:from-slate-900 hover:to-teal-950 text-white font-bold text-xs transition-all duration-300 shadow-[0_4px_16px_-2px_rgba(15,23,42,0.35)] hover:shadow-[0_8px_25px_-2px_rgba(16,185,129,0.4)] flex items-center gap-1.5 border border-slate-700/60 hover:border-emerald-500/50 active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 pointer-events-none" />
              <span>Launch Console</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
            </button>
          </div>
        </div>

        {/* Mobile Flyout Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-2xl px-4 py-4 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <a
                href="#overview"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Overview
              </a>
              <a
                href="#problem"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 transition-colors"
              >
                The Gaps
              </a>
              <a
                href="#loop"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold transition-colors flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                6-Stage Loop
              </a>
              <a
                href="#passport"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-900 font-bold transition-colors flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                Event Passport
              </a>
              <a
                href="#exceptions"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold transition-colors flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Exception Engine
              </a>
              <a
                href="#iot"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Hardware & IoT
              </a>
              <a
                href="#impact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold transition-colors col-span-2 flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Campus Quality Score (82/100)
              </a>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>12 Stations Live</span>
              </div>
              <button
                onClick={() => { setMobileMenuOpen(false); navigate('/dashboard'); }}
                className="flex-1 py-2 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-98"
              >
                <span>Launch Console</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* SECTION 1: HERO & INTERACTIVE PASSPORT SIMULATOR */}
      <section id="overview" className="relative z-10 pt-16 pb-12 sm:pt-24 sm:pb-20 px-4 sm:px-6 max-w-6xl mx-auto text-center space-y-8">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-300 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-extrabold text-slate-950">Autonomous Sanitation Operations</span>
          <span className="text-slate-400">•</span>
          <span className="text-emerald-800 font-bold font-mono text-[11px]">Zero Discrepancy SLA</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 max-w-5xl mx-auto leading-[1.08]">
          Every waste event.<br />
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
            One verified loop.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed font-medium">
          SwaLoop is not another generic "smart dustbin". It is an enterprise operational governance platform for universities, smart campuses, and facilities. From <strong>vision classification</strong> to <strong>physical QR collection</strong> and <strong>photographic proof</strong>.
        </p>

        {/* Dual Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-950 text-white font-bold text-xs sm:text-sm hover:bg-slate-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 active:scale-98"
          >
            <span>Enter Operations Console</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
          <button
            onClick={() => navigate('/classifier')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-all shadow-xs hover:shadow-sm flex items-center justify-center gap-2 active:scale-98"
          >
            <Cpu className="w-4 h-4 text-indigo-700" />
            <span>AI Classifier Workstation</span>
          </button>
        </div>

        {/* Interactive Live Passport Simulator Card */}
        <div className="mt-12 text-left max-w-4xl mx-auto">
          <div className="op-card p-5 sm:p-7 border-slate-300 shadow-2xl bg-white relative overflow-hidden glow-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-950 to-slate-900 text-emerald-400 flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10.5px] font-mono uppercase tracking-widest text-emerald-800 font-extrabold">
                      LIVE EVENT PASSPORT PREVIEW
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-950 font-mono">
                    EVENT #WS-10482 • Block A Cafeteria
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge status={heroVerified ? 'RESOLVED' : 'IN_PROGRESS'} />
                <button
                  onClick={() => setHeroVerified(!heroVerified)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-800 transition-colors flex items-center gap-1.5 shadow-2xs active:scale-98"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
                  <span>{heroVerified ? 'Reset Demo' : 'Simulate QR Verification'}</span>
                </button>
              </div>
            </div>

            {/* Passport Specs Grid with Stream Colors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-300">
                <span className="text-blue-800 text-[11px] block font-bold">Classified Stream</span>
                <span className="font-extrabold text-blue-950 mt-0.5 block text-sm">Dry Waste</span>
                <span className="text-[10px] text-blue-700 font-semibold font-mono">94% AI Confidence</span>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300">
                <span className="text-amber-850 text-[11px] block font-bold">Contamination Alert</span>
                <span className="font-extrabold text-amber-950 mt-0.5 block text-sm">Medium Severity</span>
                <span className="text-[10px] text-amber-800 font-semibold">Food residue detected</span>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300">
                <span className="text-rose-800 text-[11px] block font-bold">Station Telemetry</span>
                <span className="font-mono font-extrabold text-rose-950 mt-0.5 block text-sm">WS-004 (Hopper)</span>
                <span className="text-[10px] text-rose-800 font-semibold">92% Fill Level (Peak)</span>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300">
                <span className="text-emerald-800 text-[11px] block font-bold">Loop Verification</span>
                <span className={`font-extrabold mt-0.5 flex items-center gap-1 text-sm ${heroVerified ? 'text-emerald-950' : 'text-slate-900'}`}>
                  {heroVerified ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>QR & Photo Sealed</span>
                    </>
                  ) : (
                    'Pending Mobile Scan'
                  )}
                </span>
                <span className="text-[10px] text-emerald-800 font-mono font-semibold">SWALOOP-QR-WS-004</span>
              </div>
            </div>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3 items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
              <SafeImage
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80"
                alt="Captured Waste Event Proof"
                className="h-28 rounded-lg border border-slate-300 shadow-2xs group"
                fallbackColor="from-slate-900 to-slate-950"
                fallbackIcon={Camera}
              >
                <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-mono font-bold flex items-center gap-1">
                  <Camera className="w-2.5 h-2.5 text-emerald-400" />
                  <span>AI VISION PROOF</span>
                </div>
                <div className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded bg-amber-500/90 text-slate-950 text-[9px] font-bold">
                  Food Soiling Detected
                </div>
              </SafeImage>
              <div className="md:col-span-2 text-xs space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Automated AI Multi-Modal Optical Inspection Snapshot</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11.5px]">
                  Specimen captured at station hopper. Spectral inspection detected polyethylene plastic cup (unrinsed) and oily takeout carton. Automatic contamination exception dispatched to Rahul Verma (Crew #3).
                </p>
                <div className="text-[10px] text-slate-400 font-mono">
                  SHA-256 Hash: 9e8a7f1...b4c2 • Timestamp: Today 11:02:14 AM IST
                </div>
              </div>
            </div>

            {/* Interactive Timeline Bar */}
            <div className="p-4 bg-slate-900 text-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-md">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-200 font-medium">
                  {heroVerified
                    ? 'Loop Verified & Closed: 11:07 AM Photo Proof Uploaded & Bin Normalized.'
                    : 'Active Directive: Remove food-contaminated packaging before recycling bag closure.'}
                </span>
              </div>

              <button
                onClick={() => navigate('/events?search=WS-10482')}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shrink-0 flex items-center justify-center gap-1.5 active:scale-98"
              >
                <span>Inspect Passport</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Colored KPI Metric Strip */}
        <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
          <div className="op-card p-4 border-l-4 border-l-emerald-500 op-card-hover border-slate-300">
            <span className="text-[11.5px] text-slate-700 font-bold block">Audited Waste Events</span>
            <span className="text-2xl font-extrabold text-slate-950 font-mono mt-0.5 block">1,284 Events</span>
            <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +8.2% vs last week
            </span>
          </div>

          <div className="op-card p-4 border-l-4 border-l-blue-500 op-card-hover border-slate-300">
            <span className="text-[11.5px] text-slate-700 font-bold block">Segregation Quality</span>
            <span className="text-2xl font-extrabold text-slate-950 font-mono mt-0.5 block">87.4%</span>
            <span className="text-[11px] text-blue-700 font-bold flex items-center gap-1 mt-0.5">
              <Check className="w-3.5 h-3.5" /> +3.1% stream purity
            </span>
          </div>

          <div className="op-card p-4 border-l-4 border-l-indigo-500 op-card-hover border-slate-300">
            <span className="text-[11.5px] text-slate-700 font-bold block">Collection Compliance</span>
            <span className="text-2xl font-extrabold text-slate-950 font-mono mt-0.5 block">93.2% SLA</span>
            <span className="text-[11px] text-indigo-700 font-bold flex items-center gap-1 mt-0.5">
              <QrCode className="w-3.5 h-3.5" /> QR timestamp verified
            </span>
          </div>

          <div className="op-card p-4 border-l-4 border-l-amber-500 op-card-hover border-slate-300">
            <span className="text-[11.5px] text-slate-700 font-bold block">Monitored Stations</span>
            <span className="text-2xl font-extrabold text-slate-950 font-mono mt-0.5 block">28 / 32 Healthy</span>
            <span className="text-[11px] text-slate-700 font-bold mt-0.5 block">
              12 Active Smart Nodes
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM — 4 OPERATIONAL VISIBILITY GAPS */}
      <section id="problem" className="relative z-10 py-20 bg-white border-y border-slate-300 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-rose-700 tracking-wider uppercase font-mono">
              THE CAMPUS REALITY
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              Why Traditional Waste Management Fails
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Telling people which bin to use does not guarantee operations happen. Campuses lose thousands in recycling revenue due to four disconnected blindspots:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="op-card overflow-hidden border-t-4 border-t-rose-500 op-card-hover flex flex-col">
              <SafeImage
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80"
                alt="Overflowing waste bin"
                className="h-32 w-full"
                fallbackColor="from-rose-950 via-slate-900 to-slate-950"
                fallbackIcon={AlertTriangle}
              >
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-sm text-[10px] font-mono font-bold text-rose-400">
                  GAP 01
                </span>
              </SafeImage>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Detection Blindspots</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">
                    Bins overflow for hours in dining halls and sports arenas with zero automated notification until students report it.
                  </p>
                </div>
                <div className="pt-2 text-[11px] font-mono text-rose-600 font-semibold border-t border-slate-100">
                  Impact: Spillage & pest hazards
                </div>
              </div>
            </div>

            <div className="op-card overflow-hidden border-t-4 border-t-amber-500 op-card-hover flex flex-col">
              <SafeImage
                src="https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&auto=format&fit=crop&q=80"
                alt="Contaminated recycling batch"
                className="h-32 w-full"
                fallbackColor="from-amber-950 via-slate-900 to-slate-950"
                fallbackIcon={AlertTriangle}
              >
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-sm text-[10px] font-mono font-bold text-amber-400">
                  GAP 02
                </span>
              </SafeImage>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Silent Contamination</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">
                    Oily food containers and unrinsed liquids tossed into dry paper recycling hoppers spoil entire batches.
                  </p>
                </div>
                <div className="pt-2 text-[11px] font-mono text-amber-700 font-semibold border-t border-slate-100">
                  Impact: Diverted to landfill
                </div>
              </div>
            </div>

            <div className="op-card overflow-hidden border-t-4 border-t-blue-500 op-card-hover flex flex-col">
              <SafeImage
                src="https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80"
                alt="Manual paper clipboard log"
                className="h-32 w-full"
                fallbackColor="from-blue-950 via-slate-900 to-slate-950"
                fallbackIcon={Clock}
              >
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-sm text-[10px] font-mono font-bold text-blue-400">
                  GAP 03
                </span>
              </SafeImage>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Unverified Collection</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">
                    Janitorial tasks are signed off on paper clipboard sheets with zero timestamp proof, weight measurement, or validation.
                  </p>
                </div>
                <div className="pt-2 text-[11px] font-mono text-blue-700 font-semibold border-t border-slate-100">
                  Impact: Disputed SLAs & missed tasks
                </div>
              </div>
            </div>

            <div className="op-card overflow-hidden border-t-4 border-t-emerald-500 op-card-hover flex flex-col">
              <SafeImage
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80"
                alt="Sanitation facility disconnect"
                className="h-32 w-full"
                fallbackColor="from-emerald-950 via-slate-900 to-slate-950"
                fallbackIcon={Building2}
              >
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-sm text-[10px] font-mono font-bold text-emerald-400">
                  GAP 04
                </span>
              </SafeImage>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Fragmented Reporting</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">
                    Campus leadership receives lagging monthly estimates instead of real-time alerts, preventing proactive maintenance.
                  </p>
                </div>
                <div className="pt-2 text-[11px] font-mono text-emerald-700 font-semibold border-t border-slate-100">
                  Impact: No closed-loop governance
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE SWA-LOOP OPERATIONAL FRAMEWORK (INTERACTIVE 6 STAGES) */}
      <section id="loop" className="relative z-10 py-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-600 tracking-wider uppercase font-mono">
            OPERATIONAL ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            The SwaLoop 6-Stage Verified Loop
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Every waste event moves through six verifiable stages to guarantee absolute accountability.
          </p>
        </div>

        <LoopBanner activeStep={loopSteps[activeLoopStep].id} />

        {/* Interactive Step Explorer with Color Rings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Step Selector List (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            {loopSteps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setActiveLoopStep(idx)}
                className={`w-full p-4 text-left rounded-xl border transition-all flex items-center justify-between ${
                  activeLoopStep === idx
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-emerald-500/30'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 op-card-hover'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-mono font-bold ${activeLoopStep === idx ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {step.stepNum}
                    </span>
                    <span className={`text-xs font-bold ${activeLoopStep === idx ? 'text-white' : 'text-slate-900'}`}>
                      {step.title}
                    </span>
                  </div>
                  <div className={`text-[11px] truncate mt-0.5 ${activeLoopStep === idx ? 'text-slate-300' : 'text-slate-500'}`}>
                    {step.subtitle}
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 ${activeLoopStep === idx ? 'text-emerald-400' : 'text-slate-400'}`} />
              </button>
            ))}
          </div>

          {/* Active Step Deep-Dive Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="op-card overflow-hidden h-full flex flex-col justify-between border-slate-300 shadow-lg glow-border">
              {/* Photo Preview of the operational stage */}
              <SafeImage
                key={loopSteps[activeLoopStep].id}
                src={loopSteps[activeLoopStep].image}
                alt={loopSteps[activeLoopStep].title}
                className="h-48 sm:h-56 w-full bg-slate-900"
                fallbackColor="from-slate-900 via-slate-950 to-black"
                fallbackIcon={Cpu}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className={`text-[11px] font-mono font-bold px-3 py-1 rounded-full ${loopSteps[activeLoopStep].bgColor} ${loopSteps[activeLoopStep].textColor} border ${loopSteps[activeLoopStep].borderColor} shadow-xs`}>
                    STAGE {activeLoopStep + 1} OF 6
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <span className="text-xs font-mono font-semibold tracking-wide text-slate-200">
                    {loopSteps[activeLoopStep].tag}
                  </span>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {loopSteps[activeLoopStep].sla}
                  </span>
                </div>
              </SafeImage>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {loopSteps[activeLoopStep].title} — {loopSteps[activeLoopStep].subtitle}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2.5">
                    {loopSteps[activeLoopStep].desc}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-semibold">Assigned Actor</span>
                    <span className="font-bold text-slate-800 mt-0.5 block">{loopSteps[activeLoopStep].actor}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-semibold">Verification Guarantee</span>
                    <span className="font-mono font-bold text-emerald-700 mt-0.5 block">Cryptographic Log</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: INNOVATION 1 — THE WASTE EVENT PASSPORT (OBSIDIAN DARK MODE) */}
      <section id="passport" className="relative z-10 py-24 bg-[#0B0F19] text-white px-4 sm:px-6 overflow-hidden">
        {/* Dark Gridlines with Radial Vignette */}
        <div className="absolute inset-0 bg-grid-dark radial-fade-dark pointer-events-none" />

        <div className="relative max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              CORE TECHNICAL INNOVATION #1
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              The Waste Event Passport
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Every single waste interaction becomes an immutable digital passport. What happened, where it happened, AI classification, contamination diagnostics, worker assigned, QR token, and photo proof.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Traceability */}
            <div className="lg:col-span-5 space-y-5 text-xs sm:text-sm text-slate-300">
              <h3 className="text-lg font-bold text-white">
                Cryptographic Traceability for Campus Operations
              </h3>
              <p className="leading-relaxed text-slate-400">
                Rather than storing anonymous tally counts, SwaLoop treats waste as an audited transaction. A complete vertical timeline tracks every milestone with millimeter precision.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Zero Disputed Work:</strong> Workers cannot claim tasks without scanning the physical station QR on site.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Contamination Audits:</strong> Visual grease flags trigger real-time warnings to supervisors.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Closed-Loop Resolution:</strong> Events cannot be marked resolved without photographic evidence.</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigate('/events')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors inline-flex items-center gap-2 shadow-sm active:scale-98"
                >
                  <span>Explore Event Passport Ledger</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: Holographic Passport UI Display */}
            <div className="lg:col-span-7 bg-slate-900/95 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4 shadow-2xl backdrop-blur-md glow-border">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                      OFFICIAL VERIFICATION PASSPORT
                    </span>
                    <h4 className="text-sm font-bold text-white font-mono">
                      RECORD #WS-10482
                    </h4>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  LOOP CLOSED
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[11px] p-3.5 bg-black/40 rounded-xl border border-slate-800 font-mono">
                <div>
                  <span className="text-slate-500 block">Location</span>
                  <span className="text-white font-semibold">Block A Cafeteria</span>
                </div>
                <div>
                  <span className="text-slate-500 block">AI Stream</span>
                  <span className="text-white font-semibold">Dry Waste (94%)</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Contamination</span>
                  <span className="text-amber-400 font-semibold">Medium Risk</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Verification</span>
                  <span className="text-emerald-400 font-semibold">QR Verified</span>
                </div>
              </div>

              {/* Vertical timeline trace */}
              <div className="space-y-2 text-xs pt-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Immutable Lifecycle Trace
                </span>
                <div className="space-y-2 font-mono text-[11px] text-slate-300 pl-3 border-l border-slate-800">
                  <div className="flex justify-between">
                    <span>10:32 AM • Waste Reported via Citizen Portal</span>
                    <span className="text-slate-500">Aarav Patel (Student)</span>
                  </div>
                  <div className="flex justify-between text-blue-300">
                    <span>10:33 AM • AI Stream Classification Completed</span>
                    <span className="text-slate-500">Gemini Vision AI</span>
                  </div>
                  <div className="flex justify-between text-amber-300">
                    <span>10:34 AM • Contamination Detected (Food Grease)</span>
                    <span className="text-slate-500">Exception Engine</span>
                  </div>
                  <div className="flex justify-between">
                    <span>10:36 AM • Priority Task Dispatched</span>
                    <span className="text-slate-500">Rahul Verma (Crew)</span>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>11:05 AM • Physical Station QR Validated</span>
                    <span className="text-slate-500">SWALOOP-QR-WS-004</span>
                  </div>
                  <div className="flex justify-between text-emerald-300">
                    <span>11:07 AM • Photo Proof Uploaded & Loop Closed</span>
                    <span className="text-slate-500">Status: RESOLVED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: INNOVATION 2 — THE EXCEPTION ENGINE */}
      <section id="exceptions" className="relative z-10 py-20 bg-white border-b border-slate-200 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-rose-600 tracking-wider uppercase font-mono">
              CORE TECHNICAL INNOVATION #2
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              The Exception Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              The dashboard answers one single operational question: <strong>What requires attention right now?</strong>
            </p>
          </div>

          {/* Interactive Exception Categories Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs border-b border-slate-200">
            {Object.keys(exceptionData).map(key => (
              <button
                key={key}
                onClick={() => setActiveExceptionTab(key)}
                className={`px-3.5 py-2 rounded-lg font-semibold transition-all shrink-0 ${
                  activeExceptionTab === key
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {key.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Exception Details Card */}
          <div className="op-card p-6 sm:p-7 border-slate-300 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  AUTOMATED ANOMALY DIRECTIVE
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {exceptionData[activeExceptionTab].title}
                </h3>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border font-mono ${exceptionData[activeExceptionTab].badgeColor}`}>
                {exceptionData[activeExceptionTab].severity}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold block mb-1">Trigger Condition</span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {exceptionData[activeExceptionTab].trigger}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold block mb-1">Campus Operational Impact</span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {exceptionData[activeExceptionTab].impact}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold block mb-1">Automated Resolution Protocol</span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {exceptionData[activeExceptionTab].action}
                </p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                Integrated across all 12 smart campus nodes
              </span>
              <button
                onClick={() => navigate('/exceptions')}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs active:scale-98"
              >
                <span>Manage Exception Queue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: HARDWARE & FIELD ARCHITECTURE WITH LIVE IOT SLIDER */}
      <section id="iot" className="relative z-10 py-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase font-mono">
            FIELD ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Software-First, Hardware-Compatible
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            SwaLoop does not require costly proprietary hardware. The software engine works seamlessly with low-cost ESP32 microcontrollers or in pure software citizen-reporting mode.
          </p>
        </div>

        {/* 3 Hardware Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: ESP32 & Ultrasonic Depth Sensors */}
          <div className="op-card overflow-hidden op-card-hover border-t-4 border-t-blue-500 flex flex-col border-slate-300">
            <div className="h-36 w-full bg-slate-950 p-3.5 flex flex-col justify-between relative overflow-hidden font-mono border-b border-slate-800">
              <div className="flex items-center justify-between text-[10px]">
                <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>ESP32-WROOM-32D</span>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50 font-bold">
                  HC-SR04 PULSE
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 my-1">
                <div className="w-9 h-9 rounded-full border-2 border-blue-500/60 bg-blue-950/80 flex items-center justify-center text-blue-300 text-xs font-bold shadow-inner">
                  TX
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full flex items-center justify-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-ping" />
                    <span className="text-[10.5px] text-blue-300 font-bold">40 kHz Sonar</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-ping" />
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full w-3/4 rounded-full animate-pulse" />
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-indigo-500/60 bg-indigo-950/80 flex items-center justify-center text-indigo-300 text-xs font-bold shadow-inner">
                  RX
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>Ping: 1.08 ms</span>
                <span className="text-emerald-400 font-bold">Depth: 18.2 cm (92% Fill)</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">ESP32 & Ultrasonic Depth Sensors</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Standard HC-SR04 ultrasonic sensors emit sonic pulses inside the hopper, calculating real-time volumetric fill percentage every 10 seconds.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-mono text-slate-500 font-medium border-t border-slate-100">
                Protocol: REST / JSON / MQTT
              </div>
            </div>
          </div>

          {/* Pillar 2: Cryptographic Station QR Tokens */}
          <div className="op-card overflow-hidden op-card-hover border-t-4 border-t-emerald-500 flex flex-col border-slate-300">
            <div className="h-36 w-full bg-slate-950 p-3.5 flex items-center justify-between relative overflow-hidden font-mono border-b border-slate-800">
              {/* Matrix QR Code Graphic */}
              <div className="relative w-22 h-22 bg-white rounded-lg p-2 flex items-center justify-center shadow-lg shrink-0 border-2 border-emerald-400">
                <svg className="w-full h-full text-slate-950" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 2h4v4h-4v-4zm-4-4h4v2h-4v-2zm2 4h2v2h-2v-2zm-2 2h2v2h-2v-2zm4-2h2v4h-2v-4zm-8-2h2v2h-2v-2zm2 2h2v2h-2v-2z" />
                </svg>
                {/* Scanning Laser Beam */}
                <div className="absolute inset-x-0 h-0.5 bg-emerald-500 shadow-[0_0_8px_#10B981] animate-pulse top-3 pointer-events-none" />
              </div>

              <div className="flex-1 pl-3.5 space-y-1.5 text-[10px]">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <QrCode className="w-3.5 h-3.5" />
                  <span>STATION-WS-004</span>
                </div>
                <div className="text-slate-300 font-medium">
                  Token: <span className="text-white font-bold">0x8F9A...B3C2</span>
                </div>
                <div className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 inline-flex items-center gap-1 font-bold">
                  <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Geo-Fence Sealed</span>
                </div>
                <div className="text-slate-400 text-[9.5px]">
                  Zero GPS spoofing vulnerability
                </div>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Cryptographic Station QR Tokens</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Each station hopper features a high-contrast physical QR identity token. Workers must scan this token on-site to prove physical presence.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-mono text-emerald-700 font-semibold border-t border-slate-100">
                Zero GPS spoofing vulnerability
              </div>
            </div>
          </div>

          {/* Pillar 3: Mobile Worker Console (PWA) */}
          <div className="op-card overflow-hidden op-card-hover border-t-4 border-t-purple-500 flex flex-col border-slate-300">
            <div className="h-36 w-full bg-slate-950 p-3.5 flex flex-col justify-between relative overflow-hidden font-mono border-b border-slate-800">
              <div className="flex items-center justify-between text-[10px]">
                <span className="flex items-center gap-1.5 text-purple-400 font-bold">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>FIELD PWA CONSOLE</span>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-700/50 font-bold">
                  CREW #3
                </span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between text-[11px] my-1">
                <div className="text-slate-200">
                  <span className="text-slate-400 text-[9px] block">NEXT HOPPER</span>
                  <span className="font-bold text-white">WS-004 Cafeteria</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500 text-slate-950 font-bold text-[10px] animate-pulse">
                  SCAN QR
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="text-emerald-400">● Offline Sync Active</span>
                <span>4 / 5 Stations Done</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Mobile Worker Console (PWA)</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  High-contrast, mobile-first interface designed for sanitation workers. Simple 3-step action flow: Start Task, Validate QR, Submit Photo Proof.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-mono text-purple-700 font-semibold border-t border-slate-100">
                UX: Field-worker certified
              </div>
            </div>
          </div>
        </div>

        {/* Live Interactive Sensor Tuner */}
        <div className="op-card p-6 sm:p-7 border-slate-300 bg-white max-w-3xl mx-auto space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-600" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Live IoT Telemetry & Overflow Risk Simulator
              </h4>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Simulating Station WS-004 (Block A Cafeteria)
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Adjust Station Fill Level:</span>
              <span className="font-mono text-base font-extrabold text-slate-900">{simulatedFill}%</span>
            </div>

            <input
              type="range"
              min="10"
              max="100"
              value={simulatedFill}
              onChange={(e) => setSimulatedFill(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs mt-2">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Calculated Risk Tier</span>
                <span className={`font-mono font-bold mt-0.5 block ${
                  simulatedFill >= 90 ? 'text-rose-600' : simulatedFill >= 75 ? 'text-amber-600' : 'text-emerald-600'
                }`}>
                  {simulatedFill >= 90 ? 'CRITICAL OVERFLOW' : simulatedFill >= 75 ? 'HIGH RISK' : 'HEALTHY'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Time to Spillage</span>
                <span className="font-mono font-bold text-slate-900 mt-0.5 block">
                  {simulatedFill >= 90 ? '< 30 minutes' : simulatedFill >= 75 ? '~2 hours' : '> 6 hours'}
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[10px] text-slate-400 block font-medium">Automated Trigger</span>
                <span className="text-slate-700 font-medium mt-0.5 block">
                  {simulatedFill >= 90 ? 'Priority Crew Dispatched' : 'Routine Route Cycle'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: CAMPUS WASTE QUALITY SCORE & 1-CLICK LAUNCH */}
      <section id="impact" className="relative z-10 py-24 bg-[#0B0F19] text-white px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark radial-fade-dark pointer-events-none" />

        <div className="relative max-w-5xl mx-auto space-y-12 text-center">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              CAMPUS PERFORMANCE METRIC
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Campus Waste Quality Score: 82 / 100
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
              A holistic institutional framework auditing segregation accuracy, collection SLA velocity, and sanitization verification.
            </p>
          </div>

          {/* 5 Scoring Pillars with Rich Accents */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-left">
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono text-emerald-400 block font-bold">SEGREGATION</span>
              <span className="text-2xl font-bold font-mono text-white mt-1 block">87</span>
              <div className="w-full bg-slate-800 rounded-full h-1 mt-2 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '87%' }} />
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Target: &gt;85</span>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono text-blue-400 block font-bold">COLLECTION</span>
              <span className="text-2xl font-bold font-mono text-white mt-1 block">91</span>
              <div className="w-full bg-slate-800 rounded-full h-1 mt-2 overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '91%' }} />
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Target: &gt;90</span>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono text-amber-400 block font-bold">SANITATION</span>
              <span className="text-2xl font-bold font-mono text-white mt-1 block">79</span>
              <div className="w-full bg-slate-800 rounded-full h-1 mt-2 overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '79%' }} />
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Target: &gt;80</span>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono text-rose-400 block font-bold">CONTAMINATION</span>
              <span className="text-2xl font-bold font-mono text-white mt-1 block">74</span>
              <div className="w-full bg-slate-800 rounded-full h-1 mt-2 overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: '74%' }} />
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Target: &gt;80</span>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-[10px] font-mono text-teal-400 block font-bold">RESOLUTION</span>
              <span className="text-2xl font-bold font-mono text-white mt-1 block">89</span>
              <div className="w-full bg-slate-800 rounded-full h-1 mt-2 overflow-hidden">
                <div className="bg-teal-500 h-full rounded-full" style={{ width: '89%' }} />
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Target: &gt;85</span>
            </div>
          </div>

          {/* Smart Campus Environmental Impact Visual Banner */}
          <SafeImage
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80"
            alt="Sustainable smart green campus"
            className="rounded-2xl border border-slate-800 shadow-2xl max-w-4xl mx-auto h-64 sm:h-72"
            imgClassName="opacity-60"
            fallbackColor="from-slate-900 via-emerald-950/40 to-slate-950"
            fallbackIcon={Building2}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/60 to-transparent pointer-events-none" />
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-left space-y-2 pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                  NAAC Criterion 7.1.3 Institutional Benchmark Ready
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Empowering Clean, Data-Driven Indian Campuses
              </h3>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                Automated continuous auditing reduces landfill waste by 64%, eradicates unverified ghost collections, and engages over 12,000 students and staff in verifiable circular segregation.
              </p>
            </div>
          </SafeImage>

          {/* 1-Click Persona Launch Box */}
          <div className="p-6 sm:p-8 bg-slate-900/90 rounded-2xl border border-slate-800 max-w-2xl mx-auto space-y-4 shadow-xl glow-border">
            <h3 className="text-lg font-bold text-white">
              Launch the Interactive Campus Platform
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Explore live Indian smart campus seed data: 12 stations, 30+ events, 10 exceptions, and AI inspection workstation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-sm active:scale-98"
              >
                Facility Manager Console
              </button>
              <button
                onClick={() => navigate('/collection')}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors active:scale-98"
              >
                Sanitation Worker Mobile View
              </button>
              <button
                onClick={() => navigate('/student-report')}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors active:scale-98"
              >
                Citizen Report Portal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Footer */}
      <footer className="relative z-10 py-8 bg-white border-t border-slate-200 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-slate-900 flex items-center justify-center text-white text-[11px] font-extrabold">
              S
            </div>
            <span className="font-bold text-slate-900">SwaLoop Autonomous Campus Operations Platform</span>
          </div>

          <div className="text-[11px] font-mono text-slate-400">
            DETECT → CLASSIFY → VERIFY → ACT → PROVE → MEASURE
          </div>

          <div className="text-[11px] text-slate-500">
            © 2026 SwaLoop Architecture Team • MIT License
          </div>
        </div>
      </footer>
    </div>
  );
}
