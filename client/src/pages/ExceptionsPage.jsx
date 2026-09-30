import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  AlertOctagon,
  Info,
  CheckCircle2,
  RefreshCw,
  UserCheck,
  ShieldCheck,
  Check,
  X,
  ArrowRight
} from 'lucide-react';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';

export default function ExceptionsPage() {
  const [exceptions, setExceptions] = useState([]);
  const [counts, setCounts] = useState({ total: 0, open: 0, assigned: 0, inProgress: 0, resolved: 0, critical: 0 });
  const [loading, setLoading] = useState(true);
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeModal, setActiveModal] = useState(null); // 'assign' | 'resolve'
  const [selectedException, setSelectedException] = useState(null);
  const [assignedWorker, setAssignedWorker] = useState('Rahul Verma');
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadExceptions();
  }, [severityFilter, statusFilter]);

  async function loadExceptions() {
    setLoading(true);
    try {
      const res = await api.getExceptions({
        severity: severityFilter,
        status: statusFilter
      });
      if (res.success) {
        setExceptions(res.exceptions);
        if (res.counts) setCounts(res.counts);
      }
    } catch (err) {
      console.error('Failed to load exceptions:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAssignSubmit() {
    if (!selectedException) return;
    setSubmitting(true);
    try {
      await api.updateException(selectedException.exceptionId, {
        status: 'ASSIGNED',
        assignedTo: { userId: 'usr-003', name: assignedWorker }
      });
      setActiveModal(null);
      await loadExceptions();
    } catch (err) {
      alert('Assignment failed: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResolveSubmit() {
    if (!selectedException) return;
    setSubmitting(true);
    try {
      await api.updateException(selectedException.exceptionId, {
        status: 'RESOLVED',
        resolutionNotes: resolutionNotes || 'Resolved through standard protocol.'
      });
      setActiveModal(null);
      await loadExceptions();
    } catch (err) {
      alert('Resolution failed: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Exception Engine"
        subtitle="Automated anomaly detection for overflows, stream contamination, sensor telemetry interruptions, and overdue tasks."
        badge={`${exceptions.length} Detected`}
      >
        <button
          onClick={loadExceptions}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </PageHeader>

      {/* KPI Severity Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="op-card p-3.5">
          <div className="text-slate-500 text-xs font-medium">Total Exceptions</div>
          <div className="text-xl font-bold text-slate-900 mt-1">{counts.total || 10}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Lifetime logged</div>
        </div>

        <div className="op-card p-3.5 border-l-3 border-l-rose-500">
          <div className="text-slate-500 text-xs font-medium">Critical Priority</div>
          <div className="text-xl font-bold text-rose-600 mt-1">{counts.critical || 3} Urgent</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Breaches SLA threshold</div>
        </div>

        <div className="op-card p-3.5 border-l-3 border-l-amber-500">
          <div className="text-slate-500 text-xs font-medium">Open / Assigned</div>
          <div className="text-xl font-bold text-amber-600 mt-1">
            {(counts.open || 0) + (counts.assigned || 0)} Active
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Awaiting completion</div>
        </div>

        <div className="op-card p-3.5 border-l-3 border-l-emerald-500">
          <div className="text-slate-500 text-xs font-medium">Resolved</div>
          <div className="text-xl font-bold text-emerald-600 mt-1">{counts.resolved || 5} Closed</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Verified loops</div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="op-card p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">Filter by Severity:</span>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white font-medium"
          >
            <option value="all">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="WARNING">Warning</option>
            <option value="ATTENTION">Attention</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">Filter by Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white font-medium"
          >
            <option value="all">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
      </div>

      {/* Exception Table (Section 10 & 23) */}
      <div className="op-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-semibold">
                <th className="py-3 px-4">Exception ID</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Assigned To</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {exceptions.map(exp => (
                <tr key={exp.exceptionId} className="op-table-row">
                  <td className="py-3 px-4 font-mono font-semibold text-slate-900">
                    {exp.exceptionId}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-800">
                      {exp.type.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={exp.severity} size="xs" />
                  </td>
                  <td className="py-3 px-4 text-slate-900 font-medium">
                    <div>{exp.location}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{exp.stationId}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-600 max-w-xs leading-relaxed">
                    {exp.description}
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    {exp.assignedTo?.name || 'Unassigned'}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={exp.status} size="xs" />
                  </td>
                  <td className="py-3 px-4 text-right space-x-1.5">
                    {exp.status !== 'RESOLVED' ? (
                      <>
                        <button
                          onClick={() => {
                            setSelectedException(exp);
                            setActiveModal('assign');
                          }}
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition-colors"
                        >
                          Assign
                        </button>
                        <button
                          onClick={() => {
                            setSelectedException(exp);
                            setActiveModal('resolve');
                          }}
                          className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-semibold transition-colors"
                        >
                          Resolve
                        </button>
                      </>
                    ) : (
                      <span className="text-emerald-700 font-semibold text-[11px] inline-flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Closed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Modal */}
      {activeModal === 'assign' && selectedException && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 space-y-4 border border-slate-200 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Assign Crew Member</h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Assign dispatch response for <strong>{selectedException.exceptionId}</strong> ({selectedException.location}).
            </p>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Select Field Sanitation Worker
              </label>
              <select
                value={assignedWorker}
                onChange={(e) => setAssignedWorker(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md font-medium"
              >
                <option value="Rahul Verma">Rahul Verma (Senior Sanitation Crew)</option>
                <option value="Suresh Kumar">Suresh Kumar (Field Operations)</option>
                <option value="Pooja Devi">Pooja Devi (Waste Handling Crew)</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignSubmit}
                disabled={submitting}
                className="px-4 py-2 rounded-md bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {submitting ? 'Assigning...' : 'Confirm Assignment'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resolve Modal */}
      {activeModal === 'resolve' && selectedException && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 space-y-4 border border-slate-200 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Resolve Exception</h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Document resolution and close loop for <strong>{selectedException.exceptionId}</strong>.
            </p>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Resolution Actions Taken
              </label>
              <textarea
                rows={3}
                placeholder="Station hopper emptied, sensor lens wiped, and contamination segregated..."
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:outline-hidden"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleResolveSubmit}
                disabled={submitting}
                className="px-4 py-2 rounded-md bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                {submitting ? 'Closing...' : 'Close & Resolve Loop'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
