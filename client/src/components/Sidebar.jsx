import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Truck,
  Sparkles,
  MapPin,
  Map,
  AlertTriangle,
  BarChart3,
  FileCheck2,
  Bell,
  Settings,
  Shield,
  LogOut,
  UserCheck,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Sidebar({ onOpenNotifications, unreadCount = 0 }) {
  const { user, switchDemoRole, logout } = useAuth();

  const navSections = [
    {
      label: null,
      items: [
        { to: '/dashboard', label: 'Operations Dashboard', icon: LayoutDashboard },
        { to: '/', label: 'Product Home & Loop', icon: Shield }
      ]
    },
    {
      label: 'OPERATIONS',
      items: [
        { to: '/events', label: 'Waste Events', icon: FileText },
        { to: '/collection', label: 'Collection', icon: Truck },
        { to: '/sanitation', label: 'Sanitation', icon: Sparkles }
      ]
    },
    {
      label: 'INFRASTRUCTURE',
      items: [
        { to: '/stations', label: 'Waste Stations', icon: MapPin },
        { to: '/map', label: 'Operations Map', icon: Map }
      ]
    },
    {
      label: 'INTELLIGENCE',
      items: [
        { to: '/classifier', label: 'AI Classifier', icon: Sparkles, badge: 'Vision' },
        { to: '/exceptions', label: 'Exceptions', icon: AlertTriangle },
        { to: '/analytics', label: 'Analytics', icon: BarChart3 },
        { to: '/reports', label: 'AI Reports', icon: FileCheck2 }
      ]
    },
    {
      label: 'PORTALS',
      items: [
        { to: '/student-report', label: 'Report Waste Issue', icon: FileText, badge: 'Student' }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-300 flex flex-col shrink-0 h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-300">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shrink-0 shadow-xs">
            <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
              <path d="M11 16C11 13.2386 13.2386 11 16 11C18.7614 11 21 13.2386 21 16C21 18.7614 18.7614 21 16 21C13.5 21 11.5 19.3 11.1 17" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="16" cy="16" r="2" fill="#10B981"/>
              <path d="M20 14L22.5 16.5L25 12" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-slate-950 text-base">SwaLoop</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-300 font-bold">PRO</span>
            </div>
            <p className="text-[11px] text-slate-600 font-semibold">Campus Operations</p>
          </div>
        </div>

        {/* Demo status tag */}
        <div className="mt-3 flex items-center justify-between px-2 py-1 rounded bg-slate-50 border border-slate-300 text-[11px]">
          <span className="flex items-center gap-1.5 text-slate-800 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            DEMO MODE: ON
          </span>
          <span className="text-slate-500 font-mono text-[10px] font-bold">v1.0</span>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {navSections.map((section, idx) => (
          <div key={idx}>
            {section.label && (
              <div className="px-2 pb-1.5 text-[10.5px] font-extrabold text-slate-500 tracking-wider">
                {section.label}
              </div>
            )}
            <div className="space-y-0.5">
              {section.items.map(item => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-slate-900 text-white font-bold shadow-xs'
                          : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Footer & 1-Click Role Switcher */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/50">
        <div className="mb-2">
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Simulate Role:
          </label>
          <div className="grid grid-cols-2 gap-1 text-[11px]">
            <button
              onClick={() => switchDemoRole('manager')}
              className={`px-1.5 py-1 rounded text-center font-medium border transition-colors ${
                user?.role === 'manager'
                  ? 'bg-blue-50 text-blue-800 border-blue-200 font-semibold'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Manager
            </button>
            <button
              onClick={() => switchDemoRole('worker')}
              className={`px-1.5 py-1 rounded text-center font-medium border transition-colors ${
                user?.role === 'worker'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Worker
            </button>
            <button
              onClick={() => switchDemoRole('student')}
              className={`px-1.5 py-1 rounded text-center font-medium border transition-colors ${
                user?.role === 'student'
                  ? 'bg-amber-50 text-amber-800 border-amber-200 font-semibold'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => switchDemoRole('admin')}
              className={`px-1.5 py-1 rounded text-center font-medium border transition-colors ${
                user?.role === 'admin'
                  ? 'bg-purple-50 text-purple-800 border-purple-200 font-semibold'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Current profile info */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
          <div className="flex items-center gap-2 overflow-hidden">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={user?.name || 'User'}
              className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0"
            />
            <div className="truncate">
              <p className="text-xs font-semibold text-slate-900 truncate">
                {user?.name || 'Ananya Iyer'}
              </p>
              <p className="text-[10px] text-slate-500 capitalize">
                {user?.role || 'manager'}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Sign out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
