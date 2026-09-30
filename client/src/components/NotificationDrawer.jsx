import React, { useEffect, useState } from 'react';
import { X, AlertOctagon, AlertTriangle, Info, CheckCircle2, Bell, Check } from 'lucide-react';
import api from '../services/api';

export default function NotificationDrawer({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen]);

  async function loadNotifications() {
    setLoading(true);
    try {
      const res = await api.getNotifications();
      if (res.success) {
        setNotifications(res.notifications);
      }
    } catch (err) {
      console.error('Failed to load notifications:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleMarkRead(id) {
    try {
      await api.markNotificationRead(id);
      setNotifications(prev => prev.map(n => n.notificationId === id ? { ...n, read: true } : n));
    } catch (err) {
      console.error('Mark read failed:', err);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-slate-700" />
              <h2 className="text-base font-semibold text-slate-900">Notifications</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                {notifications.filter(n => !n.read).length} new
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {loading ? (
              <div className="py-12 text-center text-sm text-slate-400">Loading alerts...</div>
            ) : notifications.length === 0 ? (
              <div className="py-12 text-center text-sm text-slate-400">No active notifications</div>
            ) : (
              notifications.map(n => {
                const isCritical = n.severity === 'CRITICAL';
                const isWarning = n.severity === 'WARNING';
                const isResolved = n.severity === 'RESOLVED';

                return (
                  <div
                    key={n.notificationId}
                    className={`p-3.5 rounded-lg border text-left transition-all ${
                      n.read
                        ? 'bg-white border-slate-200/80 opacity-75'
                        : isCritical
                        ? 'bg-rose-50/60 border-rose-200'
                        : isWarning
                        ? 'bg-amber-50/60 border-amber-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        {isCritical && <AlertOctagon className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                        {isWarning && <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                        {isResolved && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                        {!isCritical && !isWarning && !isResolved && <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />}

                        <span className={`text-[11px] font-semibold uppercase tracking-wider ${
                          isCritical ? 'text-rose-700' : isWarning ? 'text-amber-700' : isResolved ? 'text-emerald-700' : 'text-blue-700'
                        }`}>
                          {n.severity}
                        </span>
                      </div>

                      {!n.read && (
                        <button
                          onClick={() => handleMarkRead(n.notificationId)}
                          className="text-[11px] text-slate-400 hover:text-slate-700 flex items-center gap-0.5"
                          title="Mark as read"
                        >
                          <Check className="w-3 h-3" />
                          <span>Mark read</span>
                        </button>
                      )}
                    </div>

                    <h4 className="text-xs font-semibold text-slate-900 mt-1">
                      {n.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {n.message}
                    </p>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                      <span>{n.location || 'Campus Wide'}</span>
                      <span>
                        {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
