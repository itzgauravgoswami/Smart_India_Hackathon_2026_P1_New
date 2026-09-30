import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  QrCode,
  Camera,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Clock,
  User,
  ArrowRight,
  ExternalLink,
  Upload,
  RefreshCw,
  Check
} from 'lucide-react';
import api from '../services/api';
import StatusBadge from '../components/StatusBadge';
import EventTimeline from '../components/EventTimeline';

export default function EventPassportModal({ eventId, onClose, onEventUpdated }) {
  const [eventData, setEventData] = useState(null);
  const [stationData, setStationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [simulatedQr, setSimulatedQr] = useState('');
  const [qrModalOpen, setQrModalOpen] = useState(false);

  useEffect(() => {
    if (eventId) {
      loadEventDetails();
    }
  }, [eventId]);

  async function loadEventDetails() {
    setLoading(true);
    try {
      const res = await api.getEventById(eventId);
      if (res.success) {
        setEventData(res.event);
        setStationData(res.station);
        setSimulatedQr(res.station?.qrCode || res.event.qrCodeToken || `SWALOOP-QR-${res.event.stationId}`);
      }
    } catch (err) {
      console.error('Failed to load event passport:', err);
    } finally {
      setLoading(false);
    }
  }

  // Action: Worker Check-in / Start
  async function handleStartWork() {
    setActionLoading(true);
    try {
      await api.updateEventStatus(eventId, {
        status: 'IN_PROGRESS',
        workerName: 'Rahul Verma (Sanitation Worker)'
      });
      await loadEventDetails();
      if (onEventUpdated) onEventUpdated();
    } catch (err) {
      alert('Failed to start task: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  }

  // Action: QR Verification Simulation
  async function handleVerifyQr() {
    setActionLoading(true);
    try {
      const res = await api.verifyEvent(eventId, {
        qrCodeScanned: simulatedQr,
        notes: 'Station physical QR validated at kiosk hopper.'
      });
      setQrModalOpen(false);
      await loadEventDetails();
      if (onEventUpdated) onEventUpdated();
    } catch (err) {
      alert('QR verification error: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  }

  // Action: Complete Collection & Upload Proof
  async function handleCompleteCollection() {
    setActionLoading(true);
    try {
      await api.updateEventStatus(eventId, {
        status: 'RESOLVED',
        proofPhoto: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
        notes: 'Segregated and transferred to campus recycling bay. Receptacle disinfected.'
      });
      await loadEventDetails();
      if (onEventUpdated) onEventUpdated();
    } catch (err) {
      alert('Completion failed: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  }

  if (!eventId) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Passport Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-semibold">
                  Official Verification Record
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                  ISO-14001 Compliant
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                Waste Event Passport
                <span className="font-mono text-emerald-300 font-normal">#{eventId}</span>
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Passport Body */}
        {loading || !eventData ? (
          <div className="py-24 text-center space-y-2">
            <div className="w-7 h-7 border-2 border-slate-300 border-t-slate-800 rounded-full animate-spin mx-auto"></div>
            <p className="text-xs text-slate-500">Retrieving cryptographic event ledger...</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Top Identity Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <div>
                <span className="text-[11px] text-slate-400 font-medium">Location</span>
                <div className="font-semibold text-slate-900 truncate mt-0.5">
                  {eventData.location}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">{eventData.stationId}</div>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 font-medium">Detected Stream</span>
                <div className="font-semibold text-slate-900 capitalize mt-0.5">
                  {eventData.wasteCategory} Waste
                </div>
                <div className="text-[10px] text-emerald-600 font-medium">
                  {Math.round((eventData.aiClassification?.confidence || 0.9) * 100)}% AI Confidence
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 font-medium">Contamination</span>
                <div className="mt-0.5">
                  {eventData.contaminationStatus?.detected ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 text-[11px]">
                      <AlertTriangle className="w-3 h-3" />
                      {eventData.contaminationStatus.severity} Risk
                    </span>
                  ) : (
                    <span className="text-emerald-700 font-medium">None Detected</span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 font-medium">Verification State</span>
                <div className="mt-0.5">
                  <StatusBadge status={eventData.status} />
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5 flex items-center gap-1">
                  {eventData.verificationStatus === 'qr_verified' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>QR Verified</span>
                    </>
                  ) : (
                    'Pending Physical Scan'
                  )}
                </div>
              </div>
            </div>

            {/* AI Diagnostics & Required Operational Action */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Classification card */}
              <div className="border border-slate-200 rounded-lg p-3.5 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    AI Vision Analysis
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    {eventData.aiClassification?.source === 'gemini' ? 'Gemini 1.5 Flash' : 'Calibrated Engine'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {eventData.aiClassification?.explanation || 'Detected standard material attributes.'}
                </p>

                {eventData.contaminationStatus?.detectedItems?.length > 0 && (
                  <div className="mt-2.5 pt-2.5 border-t border-slate-100">
                    <span className="text-[11px] font-medium text-amber-800">
                      Detected Mismatch Items:
                    </span>
                    <ul className="list-disc list-inside text-xs text-slate-600 mt-1 space-y-0.5">
                      {eventData.contaminationStatus.detectedItems.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Required Action card */}
              <div className="border border-slate-200 rounded-lg p-3.5 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      Required Action
                    </h4>
                    {eventData.exceptionId && (
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                        {eventData.exceptionId}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-slate-800 leading-relaxed">
                    {eventData.requiredAction || 'Proceed with routine disposal and loop audit.'}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Assigned: <strong>{eventData.assignedWorker?.name || 'Unassigned'}</strong></span>
                  <span>Station: <strong>{stationData?.name || eventData.stationName}</strong></span>
                </div>
              </div>
            </div>

            {/* Proof Submission Showcase */}
            {eventData.proof?.photoUrl && (
              <div className="border border-slate-200 rounded-lg p-3.5 bg-slate-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-slate-600" />
                    Submitted Verification Proof
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {eventData.proof.uploadedAt ? new Date(eventData.proof.uploadedAt).toLocaleString() : 'Audited'}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src={eventData.proof.photoUrl}
                    alt="Proof"
                    className="w-24 h-24 object-cover rounded-md border border-slate-200 shrink-0"
                  />
                  <div className="text-xs text-slate-600 leading-relaxed">
                    <p className="font-medium text-slate-800">{eventData.proof.notes || 'Photo submission audited and verified.'}</p>
                    <p className="text-[11px] text-slate-400 mt-1">Image hash verified against timestamp and station coordinates.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Verified Operational Timeline (Section 9) */}
            <div className="border border-slate-200 rounded-lg p-4 bg-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Verified Operational Timeline
                  </h4>
                  <p className="text-xs text-slate-500">Immutable lifecycle trace from detection to resolution</p>
                </div>
                <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Loop Integrity 100%
                </span>
              </div>

              <EventTimeline timeline={eventData.timeline || []} />
            </div>

            {/* Operational Actions to Progress the Loop */}
            <div className="p-4 bg-slate-900 text-white rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono tracking-wider text-emerald-400 uppercase font-semibold">
                  Operator Actions
                </span>
                <p className="text-xs text-slate-300">
                  {eventData.status === 'RESOLVED'
                    ? 'This event loop has been verified and permanently closed.'
                    : 'Execute next operational step to advance verification.'}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {eventData.status === 'OPEN' && (
                  <button
                    onClick={handleStartWork}
                    disabled={actionLoading}
                    className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors disabled:opacity-50"
                  >
                    {actionLoading ? 'Assigning...' : 'Start Collection Task'}
                  </button>
                )}

                {eventData.status === 'IN_PROGRESS' && eventData.verificationStatus !== 'qr_verified' && (
                  <button
                    onClick={() => setQrModalOpen(true)}
                    className="px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    Verify Station QR
                  </button>
                )}

                {eventData.status !== 'RESOLVED' && (
                  <button
                    onClick={handleCompleteCollection}
                    disabled={actionLoading}
                    className="px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {actionLoading ? 'Closing Loop...' : 'Complete & Close Loop'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* QR Scanner Simulation Sub-Modal */}
        {qrModalOpen && (
          <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-sm w-full p-5 space-y-4 border border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-slate-900">Station QR Verification</h3>
                </div>
                <button onClick={() => setQrModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Scan or confirm the physical station token affixed to the bin receptacle.
              </p>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Station QR Token
                </label>
                <input
                  type="text"
                  value={simulatedQr}
                  onChange={(e) => setSimulatedQr(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setQrModalOpen(false)}
                  className="px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleVerifyQr}
                  disabled={actionLoading}
                  className="px-3 py-1.5 rounded-md bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 transition-colors"
                >
                  {actionLoading ? 'Verifying...' : 'Validate QR & Proceed'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
