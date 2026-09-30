import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Camera,
  CheckSquare,
  ShieldCheck,
  X
} from 'lucide-react';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import LoopBanner from '../components/LoopBanner';

export default function SanitationPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTask, setActiveTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadSanitation();
  }, []);

  async function loadSanitation() {
    setLoading(true);
    try {
      const res = await api.getSanitation();
      if (res.success) {
        setTasks(res.tasks);
      }
    } catch (err) {
      console.error('Failed to load sanitation:', err);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenChecklist(task) {
    setActiveTask(JSON.parse(JSON.stringify(task)));
    setModalOpen(true);
  }

  function toggleCheckItem(index) {
    if (!activeTask) return;
    const updated = { ...activeTask };
    updated.checklist[index].completed = !updated.checklist[index].completed;
    setActiveTask(updated);
  }

  async function handleSubmitCompletion() {
    if (!activeTask) return;
    setActionLoading(true);
    try {
      await api.updateSanitation(activeTask.taskId, {
        status: 'COMPLETED',
        checklist: activeTask.checklist,
        proofPhoto: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80',
        notes: 'Disinfection wipe-down completed, liners replaced, sensor aperture cleared.'
      });
      setModalOpen(false);
      await loadSanitation();
    } catch (err) {
      alert('Error updating sanitation task: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sanitation & Hygiene Operations"
        subtitle="Campus disinfection schedules, deodorization logs, and sanitization verification audits."
        badge={`${tasks.length} Cycles`}
      >
        <button
          onClick={loadSanitation}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Sync</span>
        </button>
      </PageHeader>

      <LoopBanner activeStep="prove" />

      {/* Schedule Timeline Grid (Section 34) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tasks.map(task => {
          const isOverdue = task.status === 'OVERDUE';
          const isDone = task.status === 'COMPLETED';

          return (
            <div
              key={task.taskId}
              className={`op-card p-4 flex flex-col justify-between transition-all ${
                isOverdue ? 'border-rose-300 bg-rose-50/20' : isDone ? 'border-emerald-200' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1 text-slate-500 font-mono text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>
                      {new Date(task.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <StatusBadge status={task.status} size="xs" />
                </div>

                <h3 className="text-sm font-bold text-slate-900 truncate">
                  {task.location}
                </h3>
                <p className="text-[11px] text-slate-500 font-mono">{task.stationId}</p>

                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Crew Member:</span>
                    <strong className="text-slate-700 font-medium">{task.assignedWorker?.name}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Audit Status:</span>
                    <span className={isDone ? 'text-emerald-700 font-medium' : 'text-slate-500'}>
                      {task.verificationStatus || 'PENDING'}
                    </span>
                  </div>
                </div>

                {/* Checklist progress preview */}
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span>Audit Checklist</span>
                    <span className="font-semibold text-slate-700">
                      {task.checklist?.filter(c => c.completed).length} / {task.checklist?.length || 0}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isDone ? 'bg-emerald-500' : 'bg-blue-500'}`}
                      style={{
                        width: `${((task.checklist?.filter(c => c.completed).length || 0) / (task.checklist?.length || 1)) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleOpenChecklist(task)}
                  className="w-full py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <CheckSquare className="w-3.5 h-3.5 text-slate-500" />
                  <span>{isDone ? 'View Audit Proof' : 'Verify Checklist'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Checklist Audit Modal */}
      {modalOpen && activeTask && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 space-y-4 border border-slate-200 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Sanitation Protocol Checklist
                </h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <span className="text-xs text-slate-500">Location:</span>
              <h4 className="text-sm font-bold text-slate-900">{activeTask.location} ({activeTask.stationId})</h4>
            </div>

            <div className="space-y-2 py-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Sanitation Tasks
              </span>
              {(activeTask.checklist || []).map((item, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2.5 p-2 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs"
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleCheckItem(idx)}
                    className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                  />
                  <span className={item.completed ? 'text-slate-900 font-medium' : 'text-slate-600'}>
                    {item.item}
                  </span>
                </label>
              ))}
            </div>

            {activeTask.proofPhoto && (
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-3">
                <img src={activeTask.proofPhoto} alt="Proof" className="w-12 h-12 rounded object-cover" />
                <div className="text-[11px] text-slate-600">
                  <span className="font-semibold block text-slate-800">Verification Photo Recorded</span>
                  <span>Audited by Facility Operations Lead</span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              {activeTask.status !== 'COMPLETED' && (
                <button
                  onClick={handleSubmitCompletion}
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-md bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                  {actionLoading ? 'Recording...' : 'Mark Disinfected & Verified'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
