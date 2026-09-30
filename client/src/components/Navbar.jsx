import React, { useState } from 'react';
import { Search, Bell, Menu, Radio, ShieldCheck, Sparkles, Home } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar({ onToggleMobile, onOpenNotifications, unreadCount = 0 }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  }

  return (
    <header className="h-15 bg-white/95 backdrop-blur-2xl border-b border-slate-300 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 transition-all shadow-[0_2px_15px_-3px_rgba(15,23,42,0.06)]">
      {/* Top micro-accent glowing laser line */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-emerald-500 via-teal-400 via-sky-400 via-indigo-500 to-emerald-400 pointer-events-none" />

      {/* Ambient subtle blur glow behind header */}
      <div className="absolute top-0 left-1/4 right-1/4 h-5 bg-gradient-to-r from-emerald-400/10 via-teal-300/10 to-indigo-400/10 blur-xl pointer-events-none" />

      {/* Left: Mobile hamburger & search */}
      <div className="flex items-center gap-3 flex-1 max-w-md relative z-10">
        <button
          onClick={onToggleMobile}
          className="lg:hidden p-2 rounded-xl text-slate-800 hover:text-slate-950 hover:bg-slate-100 border border-slate-300 transition-colors shadow-2xs"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <form onSubmit={handleSearchSubmit} className="relative flex-1 group">
          <Search className="w-4 h-4 text-slate-500 group-focus-within:text-emerald-600 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search event ID, station, or anomaly..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-14 py-2 rounded-full border border-slate-300 bg-slate-50 text-xs text-slate-950 placeholder:text-slate-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-600 transition-all shadow-inner font-medium"
          />
          <kbd className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-slate-600 bg-white border border-slate-300 px-1.5 py-0.5 rounded shadow-2xs">
            /
          </kbd>
        </form>
      </div>

      {/* Right: Operational Status, Home Link, Date, Notifications */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 relative z-10">
        {/* Quick Link to Product Home */}
        <Link
          to="/"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-300 transition-all shadow-2xs"
          title="Return to Product Home & Architecture"
        >
          <Home className="w-3.5 h-3.5 text-slate-600" />
          <span>Home</span>
        </Link>

        {/* System telemetry status pill with pulsing radar indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
          </span>
          <span className="font-extrabold text-[11px] tracking-tight">IoT Live</span>
          <span className="hidden xl:inline text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-emerald-200/80 text-emerald-950 border border-emerald-300">
            99.8% SLA
          </span>
        </div>

        {/* Date string */}
        <div className="hidden lg:block text-xs font-bold text-slate-600 font-mono bg-slate-100 border border-slate-300 px-2.5 py-1 rounded-full">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          })}
        </div>

        {/* Notifications button */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-300 transition-all shadow-2xs cursor-pointer active:scale-95"
          title="Open operational alerts"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 ring-2 ring-white"></span>
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
