import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import NotificationDrawer from '../components/NotificationDrawer';
import api from '../services/api';

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();

  // Close mobile drawer on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Periodic poll for notification count
  useEffect(() => {
    async function checkNotifs() {
      try {
        const res = await api.getNotifications();
        if (res.success) {
          setUnreadCount(res.unreadCount || 0);
        }
      } catch (_) {}
    }
    checkNotifs();
    const interval = setInterval(checkNotifs, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen bg-[#F1F5F9] overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0">
        <Sidebar onOpenNotifications={() => setNotifOpen(true)} unreadCount={unreadCount} />
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 w-64 bg-white h-full shadow-2xl">
            <Sidebar onOpenNotifications={() => { setMobileOpen(false); setNotifOpen(true); }} unreadCount={unreadCount} />
          </div>
        </div>
      )}

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar
          onToggleMobile={() => setMobileOpen(!mobileOpen)}
          onOpenNotifications={() => setNotifOpen(true)}
          unreadCount={unreadCount}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto flex flex-col min-h-full">
            <div className="flex-1">
              <Outlet />
            </div>

            {/* Operational App Footer */}
            <footer className="mt-12 pt-6 pb-2 border-t border-slate-300/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-md bg-white border border-slate-300 overflow-hidden flex items-center justify-center p-0.5 shadow-2xs">
                  <img src="/logo.png" alt="EcoNest" className="w-full h-full object-contain" />
                </div>
                <span className="font-bold text-slate-800">EcoNest Operations Platform</span>
                <span className="text-slate-400">•</span>
                <span className="text-emerald-700 font-bold font-mono text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  12 Stations Live
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[11px]">
                <span className="text-slate-600 font-mono font-medium">DETECT → CLASSIFY → VERIFY → ACT → PROVE → MEASURE</span>
                <span className="text-slate-400 font-mono">v1.0.0</span>
              </div>
            </footer>
          </div>
        </main>
      </div>

      {/* Notification Drawer */}
      <NotificationDrawer isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
    </div>
  );
}
