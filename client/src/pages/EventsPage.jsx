import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FileText,
  Search,
  Filter,
  RefreshCw,
  Plus,
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import EventPassportModal from './EventPassportModal';

export default function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const initialSearch = searchParams.get('search') || '';
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    loadEvents();
  }, [category, status]);

  async function loadEvents() {
    setLoading(true);
    try {
      const res = await api.getEvents({
        category,
        status,
        search: search.trim() || undefined,
        limit: 100
      });
      if (res.success) {
        setEvents(res.events);
      }
    } catch (err) {
      console.error('Failed to load events:', err);
    } finally {
      setLoading(false);
    }
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    loadEvents();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Waste Events Ledger"
        subtitle="Track, inspect, and verify every waste event lifecycle across all campus stations."
        badge={`${events.length} Events`}
      >
        <button
          onClick={loadEvents}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </PageHeader>

      {/* Filter and Search Bar (Section 13) */}
      <div className="op-card p-3 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Event ID, location, or station name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-400"
          />
        </form>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          {/* Stream Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-hidden font-medium"
          >
            <option value="all">All Waste Streams</option>
            <option value="dry">Dry Waste</option>
            <option value="wet">Wet Waste</option>
            <option value="sanitary">Sanitary Waste</option>
            <option value="special">Special Care Waste</option>
          </select>

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-hidden font-medium"
          >
            <option value="all">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
      </div>

      {/* Events Table (Section 23) */}
      <div className="op-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-semibold">
                <th className="py-3 px-4">Event ID</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Stream</th>
                <th className="py-3 px-4">AI Confidence</th>
                <th className="py-3 px-4">Contamination</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Verification</th>
                <th className="py-3 px-4">Assigned Worker</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && events.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    Loading waste events ledger...
                  </td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    No waste events match the active filter criteria.
                  </td>
                </tr>
              ) : (
                events.map(ev => {
                  const isContaminated = ev.contaminationStatus?.detected;
                  return (
                    <tr key={ev.eventId} className="op-table-row">
                      <td className="py-3 px-4 font-mono font-semibold text-blue-600">
                        #{ev.eventId}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-900 max-w-[200px] truncate">
                        <div>{ev.location}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{ev.stationId}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="capitalize font-medium text-slate-700">
                          {ev.wasteCategory}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-slate-700">
                            {Math.round((ev.aiClassification?.confidence || 0.9) * 100)}%
                          </span>
                          <span className="text-[10px] text-slate-400">
                            ({ev.aiClassification?.confidenceTier || 'High'})
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {isContaminated ? (
                          <span className="inline-flex items-center gap-1 font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px]">
                            <AlertTriangle className="w-3 h-3" />
                            {ev.contaminationStatus.severity}
                          </span>
                        ) : (
                          <span className="text-emerald-700 font-medium text-[11px]">Clean</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={ev.status} size="xs" />
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {ev.verificationStatus === 'qr_verified' ? (
                          <span className="text-emerald-700 font-medium flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            QR Verified
                          </span>
                        ) : (
                          <span className="text-slate-400">Unverified</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {ev.assignedWorker?.name || 'Unassigned'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedEventId(ev.eventId)}
                          className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-semibold transition-colors inline-flex items-center gap-1"
                        >
                          <span>Open Passport</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Waste Event Passport Modal */}
      {selectedEventId && (
        <EventPassportModal
          eventId={selectedEventId}
          onClose={() => setSelectedEventId(null)}
          onEventUpdated={loadEvents}
        />
      )}
    </div>
  );
}
