/**
 * EcoNest Headless IoT Sensor Telemetry Simulator
 * Simulates real-time fill level changes and heartbeat pulses across campus stations.
 */

const API_BASE = 'http://localhost:5000/api';

const stations = ['WS-001', 'WS-002', 'WS-003', 'WS-004', 'WS-005', 'WS-006', 'WS-007', 'WS-008'];

async function simulateCycle() {
  const targetStation = stations[Math.floor(Math.random() * stations.length)];
  const randomFill = Math.floor(35 + Math.random() * 60);

  try {
    const res = await fetch(`${API_BASE}/stations/${targetStation}/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fillLevel: randomFill,
        sensorStatus: Math.random() > 0.05 ? 'online' : 'warning'
      })
    });
    const data = await res.json();
    console.log(`[IoT Pulse] Station ${targetStation} updated to ${randomFill}% fill. Status: ${data.success ? 'OK' : 'ERR'}`);
  } catch (err) {
    console.warn('[IoT Pulse] Server offline or request failed:', err.message);
  }
}

console.log('Starting EcoNest IoT Campus Telemetry Simulator (every 8s)...');
setInterval(simulateCycle, 8000);
