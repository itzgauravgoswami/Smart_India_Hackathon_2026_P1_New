import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  RefreshCw,
  Radio,
  Battery,
  Clock,
  AlertTriangle,
  CheckCircle2,
  X,
  TrendingUp,
  Cpu
} from 'lucide-react';
import L from 'leaflet';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';

export default function StationsPage() {
  const [stations, setStations] = useState([]);
  const [summary, setSummary] = useState({ total: 12, healthy: 10, atRisk: 1, overflow: 1, offline: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState(null);
  const [simulating, setSimulating] = useState(false);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    loadStations();
  }, []);

  async function loadStations() {
    setLoading(true);
    try {
      const res = await api.getStations();
      if (res.success) {
        setStations(res.stations);
        if (res.summary) setSummary(res.summary);
        if (!selectedStation && res.stations.length > 0) {
          // Default to the first at_risk or overflow station for exciting demo inspection
          const alertStation = res.stations.find(s => s.status === 'overflow' || s.status === 'at_risk');
          setSelectedStation(alertStation || res.stations[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load stations:', err);
    } finally {
      setLoading(false);
    }
  }

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Campus center coordinates (approx IIT Delhi area coords for realistic campus feel)
      const campusCenter = [28.5465, 77.1945];
      const map = L.map(mapContainerRef.current, {
        center: campusCenter,
        zoom: 16,
        zoomControl: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];

    // Add marker for each station
    stations.forEach(station => {
      const coords = station.location?.coordinates;
      if (!coords || !coords.lat || !coords.lng) return;

      const isSelected = selectedStation?.stationId === station.stationId;
      const status = station.status;

      let pinColor = '#10B981'; // Green (healthy)
      if (status === 'at_risk') pinColor = '#F59E0B'; // Amber
      if (status === 'overflow') pinColor = '#EF4444'; // Red
      if (status === 'offline') pinColor = '#64748B'; // Slate

      const customIcon = L.divIcon({
        className: 'custom-station-pin',
        html: `
          <div style="
            background-color: ${pinColor};
            width: ${isSelected ? '24px' : '18px'};
            height: ${isSelected ? '24px' : '18px'};
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
          ">
            <span style="font-size: 8px; font-weight: bold; color: white;">
              ${station.fillLevel}%
            </span>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const marker = L.marker([coords.lat, coords.lng], { icon: customIcon }).addTo(map);
      marker.on('click', () => {
        setSelectedStation(station);
      });

      markersRef.current.push(marker);
    });
  }, [stations, selectedStation]);

  // Center map when station selected
  useEffect(() => {
    if (selectedStation && mapInstanceRef.current) {
      const coords = selectedStation.location?.coordinates;
      if (coords && coords.lat && coords.lng) {
        mapInstanceRef.current.setView([coords.lat, coords.lng], 16.5, { animate: true });
      }
    }
  }, [selectedStation]);

  // Simulate IoT Telemetry updates
  async function handleSimulateIoT() {
    if (!selectedStation) return;
    setSimulating(true);
    try {
      const res = await api.simulateTelemetry(selectedStation.stationId, {});
      if (res.success) {
        await loadStations();
        setSelectedStation(res.station);
      }
    } catch (err) {
      alert('Simulation error: ' + err.message);
    } finally {
      setSimulating(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Smart Waste Stations"
        subtitle="Live telemetry, ultrasonic fill thresholds, and predictive overflow monitoring across campus."
      >
        <button
          onClick={loadStations}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh IoT</span>
        </button>
      </PageHeader>

      {/* Top Summary Banner (Section 25) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="op-card p-3.5">
          <div className="text-slate-500 text-xs font-medium">Active Stations</div>
          <div className="text-xl font-bold text-slate-900 mt-1">{stations.length} Active</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Monitored 24/7</div>
        </div>

        <div className="op-card p-3.5 border-l-3 border-l-emerald-500">
          <div className="text-slate-500 text-xs font-medium">Healthy</div>
          <div className="text-xl font-bold text-emerald-600 mt-1">{summary.healthy} Stations</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Fill level &lt; 75%</div>
        </div>

        <div className="op-card p-3.5 border-l-3 border-l-amber-500">
          <div className="text-slate-500 text-xs font-medium">At Risk / Overflow</div>
          <div className="text-xl font-bold text-amber-600 mt-1">
            {(summary.atRisk || 0) + (summary.overflow || 0)} Stations
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Requires priority route</div>
        </div>

        <div className="op-card p-3.5 border-l-3 border-l-slate-400">
          <div className="text-slate-500 text-xs font-medium">Offline</div>
          <div className="text-xl font-bold text-slate-700 mt-1">{summary.offline || 1} Station</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Sensor battery alert</div>
        </div>
      </div>

      {/* Main Split Layout: Table (Left) + Leaflet Map (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Station Table (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="op-card overflow-hidden">
            <div className="p-3.5 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                Station Fleet Inventory
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">
                Click row to inspect on map
              </span>
            </div>

            <div className="overflow-x-auto max-h-[580px] overflow-y-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="sticky top-0 bg-white border-b border-slate-200 z-10">
                  <tr className="text-slate-500 font-medium">
                    <th className="py-2.5 px-3">Station ID</th>
                    <th className="py-2.5 px-3">Location</th>
                    <th className="py-2.5 px-3">Fill Level</th>
                    <th className="py-2.5 px-3">Sensor</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {stations.map(st => {
                    const isSelected = selectedStation?.stationId === st.stationId;
                    return (
                      <tr
                        key={st.stationId}
                        onClick={() => setSelectedStation(st)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-blue-50/60 font-medium' : 'op-table-row'
                        }`}
                      >
                        <td className="py-2.5 px-3 font-mono font-semibold text-slate-900">
                          {st.stationId}
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="text-slate-900 truncate max-w-[170px]">{st.name}</div>
                          <div className="text-[10px] text-slate-400">{st.location?.block}</div>
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-2">
                            <div className="w-14 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  st.fillLevel >= 90 ? 'bg-rose-500' : st.fillLevel >= 75 ? 'bg-amber-500' : 'bg-emerald-500'
                                }`}
                                style={{ width: `${st.fillLevel}%` }}
                              />
                            </div>
                            <span className="font-mono text-[11px] font-semibold text-slate-700">
                              {st.fillLevel}%
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                            st.sensorStatus === 'online' ? 'text-emerald-700' : 'text-slate-500'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              st.sensorStatus === 'online' ? 'bg-emerald-500' : 'bg-slate-400'
                            }`} />
                            {st.sensorStatus}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <StatusBadge status={st.status} size="xs" />
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedStation(st); }}
                            className="px-2 py-0.5 rounded text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Map & Selected Station Inspector (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Leaflet Map Card */}
          <div className="op-card p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                Live Campus Geolocation
              </span>
              <span className="text-[10px] text-slate-400 font-medium">OpenStreetMap</span>
            </div>

            <div className="h-64 rounded-lg overflow-hidden border border-slate-200">
              <div ref={mapContainerRef} className="w-full h-full" />
            </div>
          </div>

          {/* Selected Station Inspector & Overflow Risk Prediction (Section 26 & 37) */}
          {selectedStation && (
            <div className="op-card p-4 border-slate-300">
              <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-600">
                      {selectedStation.stationId}
                    </span>
                    <StatusBadge status={selectedStation.status} size="xs" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-1">
                    {selectedStation.name}
                  </h3>
                  <p className="text-xs text-slate-500">{selectedStation.location?.name}</p>
                </div>

                <button
                  onClick={handleSimulateIoT}
                  disabled={simulating}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors disabled:opacity-50"
                  title="Simulate IoT ultrasonic reading"
                >
                  <Cpu className={`w-3.5 h-3.5 ${simulating ? 'animate-spin' : ''}`} />
                  <span>{simulating ? 'Pinging...' : 'Simulate IoT'}</span>
                </button>
              </div>

              {/* Overflow Risk Prediction Module (Section 37) */}
              <div className="my-3 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Overflow Risk Assessment
                  </span>
                  <span className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] ${
                    selectedStation.overflowPrediction?.isHighRisk
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {selectedStation.overflowPrediction?.riskLevel || 'LOW RISK'}
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-slate-600">Expected Overflow:</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {selectedStation.overflowPrediction?.expectedOverflow || '> 6 hours'}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed pt-1 border-t border-slate-200/60">
                  {selectedStation.overflowPrediction?.reason || "Fill rate within acceptable limits."}
                </p>
              </div>

              {/* Station IoT Telemetry Metrics */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Fill Level</span>
                  <span className="text-base font-bold text-slate-900 font-mono">
                    {selectedStation.fillLevel}%
                  </span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Weight</span>
                  <span className="text-base font-bold text-slate-900 font-mono">
                    {selectedStation.weightKg} kg
                  </span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Battery</span>
                  <span className="text-base font-bold text-slate-900 font-mono">
                    {selectedStation.batteryLevel}%
                  </span>
                </div>
              </div>

              {/* QR and Worker Metadata */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>QR Token: <code className="font-mono text-slate-700">{selectedStation.qrCode}</code></span>
                <span>Assigned: <strong className="text-slate-700">{selectedStation.assignedWorker?.name || 'Unassigned'}</strong></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
