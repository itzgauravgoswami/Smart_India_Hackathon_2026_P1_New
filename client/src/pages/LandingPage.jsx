import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Eye,
  QrCode,
  Camera,
  BarChart2,
  FileCheck2,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import LoopBanner from '../components/LoopBanner';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Navbar (Section 53) */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
              <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
                <path d="M11 16C11 13.2386 13.2386 11 16 11C18.7614 11 21 13.2386 21 16C21 18.7614 18.7614 21 16 21C13.5 21 11.5 19.3 11.1 17" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="16" cy="16" r="2" fill="#10B981"/>
                <path d="M20 14L22.5 16.5L25 12" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-bold text-lg text-slate-900">EcoNest</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#problem" className="hover:text-slate-900 transition-colors">The Problem</a>
            <a href="#loop" className="hover:text-slate-900 transition-colors">The Verified Loop</a>
            <a href="#passport" className="hover:text-slate-900 transition-colors">Event Passport</a>
            <a href="#engine" className="hover:text-slate-900 transition-colors">Exception Engine</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5"
            >
              Sign In
            </Link>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors shadow-xs"
            >
              Live Demo
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section (Section 53) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Operational Verification Platform for Smart Campuses</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight">
          Waste operations, verified from detection to resolution.
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Every waste event becomes a measurable operational loop — from detection and classification to collection, verification, and resolution.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs sm:text-sm hover:bg-slate-800 transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <span>Launch Operations Platform</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
          <button
            onClick={() => navigate('/classifier')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors"
          >
            Try AI Inspection Station
          </button>
        </div>
      </section>

      {/* The 6-Stage Loop Section (Section 53) */}
      <section id="loop" className="py-12 bg-white border-y border-slate-200 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-emerald-600 tracking-wider uppercase">
              The Architecture
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
              The EcoNest Verification Loop
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              EcoNest does not simply tell people which bin to use. It creates a verified operational loop around waste events.
            </p>
          </div>

          <LoopBanner activeStep="detect" />
        </div>
      </section>

      {/* The Problem Breakdown (Section 53) */}
      <section id="problem" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-rose-600 tracking-wider uppercase">
            Operational Blindspots
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
            The Critical Visibility Gaps
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Traditional campus waste systems disconnect detection from accountability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="op-card p-5 space-y-2 border-l-4 border-l-slate-400">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">GAP 01</span>
            <h3 className="text-sm font-bold text-slate-900">Detection Blindspots</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bins overflow for hours with no automated alert to facilities crew until complaints occur.
            </p>
          </div>

          <div className="op-card p-5 space-y-2 border-l-4 border-l-amber-500">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">GAP 02</span>
            <h3 className="text-sm font-bold text-slate-900">Silent Contamination</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dry recyclables get ruined by wet food residue, degrading the campus recycling salvage score.
            </p>
          </div>

          <div className="op-card p-5 space-y-2 border-l-4 border-l-blue-500">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">GAP 03</span>
            <h3 className="text-sm font-bold text-slate-900">Unverified Collection</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tasks marked "done" on paper clipboards without timestamp, physical QR tokens, or photographic proof.
            </p>
          </div>

          <div className="op-card p-5 space-y-2 border-l-4 border-l-emerald-500">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">GAP 04</span>
            <h3 className="text-sm font-bold text-slate-900">Fragmented Reporting</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Campus directors receive lagging monthly totals instead of real-time SLA accountability.
            </p>
          </div>
        </div>
      </section>

      {/* The Two Innovations: Waste Event Passport + Exception Engine (Section 67) */}
      <section id="passport" className="py-16 bg-slate-900 text-white px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              Core Technical Innovation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Waste Event Passport + Exception Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              The foundational difference between a generic smart dustbin and an enterprise operations platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Waste Event Passport Card */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Waste Event Passport</h3>
                  <p className="text-xs text-slate-400">Structured cryptographic lifecycle record</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Every event records: What happened, Where it happened, What the AI classified, Contamination detection, Required operational action, Assigned worker, QR verification status, Photo proof, and full immutable timeline.
              </p>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 font-mono text-[11px] text-slate-300 space-y-1">
                <div>EVENT #WS-10482: Block A Cafeteria</div>
                <div className="text-emerald-400">Detected: Dry Waste • AI Conf: 94%</div>
                <div className="text-amber-400">Contamination: Medium • QR Verified</div>
                <div className="text-emerald-300">Status: RESOLVED</div>
              </div>
            </div>

            {/* Exception Engine Card */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Exception Engine</h3>
                  <p className="text-xs text-slate-400">Exception-First Operational Governance</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Automatically flags what requires attention right now: station fill overflow, cross-stream contamination, overdue sanitation cycles, telemetry heartbeat drops, and unusual waste generation spikes.
              </p>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 font-mono text-[11px] text-slate-300 space-y-1">
                <div className="text-rose-400">CRITICAL: WS-004 Overflow Risk (92% full)</div>
                <div className="text-amber-400">WARNING: Hostel B Sanitation Overdue</div>
                <div className="text-blue-400">ATTENTION: Cafeteria Contamination</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-slate-200 text-center text-xs text-slate-500">
        <p>EcoNest — Every waste event. One verified loop. Main Smart Campus Prototype.</p>
      </footer>
    </div>
  );
}
