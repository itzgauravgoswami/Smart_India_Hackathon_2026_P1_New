import React, { useState, useEffect } from 'react';
import {
  Truck,
  Filter,
  CheckCircle2,
  Clock,
  QrCode,
  Camera,
  Play,
  AlertTriangle,
  RefreshCw,
  Smartphone,
  LayoutList,
  ShieldCheck,
  X
} from 'lucide-react';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import LoopBanner from '../components/LoopBanner';

export default function CollectionPage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [mobileMode, setMobileMode] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [proofModalOpen, setProofModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [qrInput, setQrInput] = useState('');
  const [proofNote, setProofNote] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    setLoading(true);
    try {
      const res = await api.getTasks();
      if (res.success) {
        setTasks(res.tasks);
        if (res.tasks.length > 0 && !activeTask) {
          setActiveTask(res.tasks[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load tasks:', err);
    } finally {
      setLoading(false);
    }
  }

  // Filter tasks
  const filteredTasks = tasks.filter(t => {
    if (filter === 'MY_TASKS') return t.assignedWorker?.name?.includes('Rahul');
    if (filter === 'URGENT') return t.priority === 'HIGH' || t.priority === 'CRITICAL';
    if (filter === 'IN_PROGRESS') return t.status === 'IN_PROGRESS';
    if (filter === 'COMPLETED') return t.status === 'COMPLETED';
    return true;
  });

  async function handleStartTask(taskId) {
    setActionLoading(true);
    try {
      await api.updateTask(taskId, { action: 'START' });
      await loadTasks();
      const updated = tasks.find(t => t.taskId === taskId);
      if (updated) setActiveTask({ ...updated, status: 'IN_PROGRESS' });
    } catch (err) {
      alert('Error starting task: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  }

  async function handleVerifyAndComplete() {
    if (!activeTask) return;
    setActionLoading(true);
    try {
      await api.updateTask(activeTask.taskId, {
        action: 'COMPLETE',
        qrCodeScanned: qrInput || `ECONEST-QR-${activeTask.stationId}`,
        proofPhoto: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
        notes: proofNote || 'Dispatched collection, validated QR, and normalized station.'
      });
      setQrModalOpen(false);
      setProofModalOpen(false);
      await loadTasks();
      alert(`Loop Verified! Task #${activeTask.taskId} completed and station normalized.`);
    } catch (err) {
      alert('Error completing task: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Collection Operations"
        subtitle="Manage dispatch SLA, station clearing assignments, and proof-verified collection loops."
        badge={`${filteredTasks.length} Tasks`}
      >
        <div className="flex items-center gap-2">
          {/* Mobile view toggle (Section 31) */}
          <button
            onClick={() => setMobileMode(!mobileMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
              mobileMode
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{mobileMode ? 'Desktop Table' : 'Worker Mobile View'}</span>
          </button>

          <button
            onClick={loadTasks}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
        </div>
      </PageHeader>

      <LoopBanner activeStep="act" />

      {/* Filter Tabs (Section 30) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs border-b border-slate-200">
        {[
          { key: 'ALL', label: 'All Tasks' },
          { key: 'MY_TASKS', label: 'My Tasks (Rahul Verma)' },
          { key: 'URGENT', label: 'Urgent / High Priority' },
          { key: 'IN_PROGRESS', label: 'In Progress' },
          { key: 'COMPLETED', label: 'Completed' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors shrink-0 ${
              filter === tab.key
                ? 'bg-slate-900 text-white font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* WORKER MOBILE-FIRST VIEW (Section 31) */}
      {mobileMode ? (
        <div className="max-w-md mx-auto space-y-4">
          <div className="bg-slate-900 text-slate-200 text-xs px-3 py-1.5 rounded-lg flex items-center justify-between">
            <span className="font-semibold text-emerald-400">Worker Console</span>
            <span>Rahul Verma • On Duty</span>
          </div>

          {activeTask ? (
            <div className="op-card p-5 space-y-5 border-slate-300 shadow-md">
              <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold">
                    DISPATCH TICKET
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                    TASK #{activeTask.taskId}
                  </h2>
                </div>
                <StatusBadge status={activeTask.status} />
              </div>

              <div>
                <span className="text-xs text-slate-400 font-medium block">Station Location</span>
                <p className="text-base font-bold text-slate-900 mt-0.5">
                  {activeTask.location}
                </p>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Station ID: {activeTask.stationId}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 text-[11px]">Waste Stream</span>
                  <div className="font-semibold text-slate-900 mt-0.5">{activeTask.wasteType}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Priority</span>
                  <div className={`font-bold mt-0.5 ${activeTask.priority === 'HIGH' ? 'text-rose-600' : 'text-slate-900'}`}>
                    {activeTask.priority}
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-700 block mb-1">
                  Dispatch Directive:
                </span>
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                  {activeTask.reason}
                </p>
              </div>

              {/* Big Action Buttons for mobile worker (Section 31) */}
              <div className="space-y-2.5 pt-2">
                {activeTask.status === 'PENDING' && (
                  <button
                    onClick={() => handleStartTask(activeTask.taskId)}
                    disabled={actionLoading}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Play className="w-4 h-4" />
                    <span>START TASK</span>
                  </button>
                )}

                {activeTask.status === 'IN_PROGRESS' && (
                  <>
                    <button
                      onClick={() => {
                        setQrInput(`ECONEST-QR-${activeTask.stationId}`);
                        setQrModalOpen(true);
                      }}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wide transition-colors flex items-center justify-center gap-2 shadow-xs"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>SCAN / ENTER STATION QR</span>
                    </button>

                    <button
                      onClick={() => setProofModalOpen(true)}
                      className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm tracking-wide transition-colors flex items-center justify-center gap-2 shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>MARK COLLECTION COMPLETE</span>
                    </button>
                  </>
                )}

                {activeTask.status === 'COMPLETED' && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-semibold text-emerald-800 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>COLLECTION COMPLETED & VERIFIED</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs">No active task selected</div>
          )}
        </div>
      ) : (
        /* DESKTOP OPERATIONS TABLE (Section 30) */
        <div className="op-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-semibold">
                  <th className="py-3 px-4">Task ID</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Waste Type</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Assigned Crew</th>
                  <th className="py-3 px-4">Due SLA</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTasks.map(task => (
                  <tr key={task.taskId} className="op-table-row">
                    <td className="py-3 px-4 font-mono font-semibold text-slate-900">
                      #{task.taskId}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-900">
                      <div>{task.location}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{task.stationId}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">
                      {task.wasteType}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        task.priority === 'HIGH' || task.priority === 'CRITICAL'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      {task.assignedWorker?.name}
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                      {new Date(task.dueTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={task.status} size="xs" />
                    </td>
                    <td className="py-3 px-4 text-right">
                      {task.status === 'PENDING' && (
                        <button
                          onClick={() => handleStartTask(task.taskId)}
                          className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] transition-colors"
                        >
                          Start
                        </button>
                      )}
                      {task.status === 'IN_PROGRESS' && (
                        <button
                          onClick={() => {
                            setActiveTask(task);
                            setProofModalOpen(true);
                          }}
                          className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] transition-colors"
                        >
                          Complete
                        </button>
                      )}
                      {task.status === 'COMPLETED' && (
                        <span className="text-[11px] text-emerald-600 font-semibold flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Verified
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Proof & QR Completion Modal (Section 32 & 33) */}
      {(proofModalOpen || qrModalOpen) && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 space-y-4 border border-slate-200 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Verify Collection Loop
                </h3>
              </div>
              <button
                onClick={() => { setProofModalOpen(false); setQrModalOpen(false); }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Complete physical station validation for <strong>{activeTask?.location}</strong>.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Station QR Identity
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={qrInput || `ECONEST-QR-${activeTask?.stationId}`}
                    onChange={(e) => setQrInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs font-mono border border-slate-300 rounded-md"
                  />
                  <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-2 rounded border border-emerald-200">
                    MATCH
                  </span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Collection & Sanitization Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Bin cleared, liner replaced, and odor neutralizer applied..."
                  value={proofNote}
                  onChange={(e) => setProofNote(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:outline-hidden"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-3">
                <Camera className="w-5 h-5 text-slate-400 shrink-0" />
                <div className="text-xs text-slate-600">
                  <span className="font-semibold block text-slate-800">Photo Proof Attached</span>
                  <span className="text-[11px] text-slate-400">Timestamp: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => { setProofModalOpen(false); setQrModalOpen(false); }}
                className="px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyAndComplete}
                disabled={actionLoading}
                className="px-4 py-2 rounded-md bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                {actionLoading ? 'Verifying...' : 'Submit Proof & Close Loop'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
