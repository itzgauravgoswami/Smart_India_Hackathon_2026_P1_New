import dataStore from '../services/dataStore.js';

export async function getStations(req, res) {
  try {
    const stations = await dataStore.getStations();

    const total = stations.length;
    const healthy = stations.filter(s => s.status === 'healthy').length;
    const atRisk = stations.filter(s => s.status === 'at_risk').length;
    const overflow = stations.filter(s => s.status === 'overflow').length;
    const offline = stations.filter(s => s.status === 'offline').length;

    // Attach overflow risk predictions (Section 37)
    const enriched = stations.map(s => {
      let riskLevel = 'LOW';
      let expectedOverflow = '> 6 hours';
      let riskReason = 'Fill trajectory within expected baseline.';

      if (s.fillLevel >= 88) {
        riskLevel = 'CRITICAL';
        expectedOverflow = '< 30 min';
        riskReason = 'Station fill is above threshold (90%+). Overflow imminent.';
      } else if (s.fillLevel >= 75) {
        riskLevel = 'HIGH';
        expectedOverflow = '~2 hours';
        riskReason = "Current filling rate is above the station's recent average.";
      } else if (s.fillLevel >= 55) {
        riskLevel = 'MODERATE';
        expectedOverflow = '~4 hours';
        riskReason = 'Steady accumulation observed in active foot-traffic window.';
      }

      return {
        ...s.toObject ? s.toObject() : s,
        overflowPrediction: {
          riskLevel,
          expectedOverflow,
          reason: riskReason,
          isHighRisk: riskLevel === 'HIGH' || riskLevel === 'CRITICAL'
        }
      };
    });

    return res.json({
      success: true,
      summary: {
        total,
        healthy,
        atRisk,
        overflow,
        offline
      },
      stations: enriched
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve smart waste stations.'
    });
  }
}

export async function getStationById(req, res) {
  try {
    const { id } = req.params;
    const station = await dataStore.getStationById(id);
    if (!station) {
      return res.status(404).json({ success: false, message: 'Station not found.' });
    }

    // Recent events at this station
    const events = await dataStore.getEvents({ stationId: id, limit: 5 });

    return res.json({
      success: true,
      station,
      recentEvents: events
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error retrieving station details.'
    });
  }
}

export async function updateStation(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Recalculate status based on fill level if fillLevel is updated
    if (typeof updates.fillLevel === 'number') {
      if (updates.fillLevel >= 90) updates.status = 'overflow';
      else if (updates.fillLevel >= 75) updates.status = 'at_risk';
      else if (updates.sensorStatus === 'offline') updates.status = 'offline';
      else updates.status = 'healthy';
    }

    const updated = await dataStore.updateStation(id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Station not found.' });
    }

    return res.json({
      success: true,
      message: 'Station updated successfully.',
      station: updated
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update station.'
    });
  }
}

export async function simulateTelemetry(req, res) {
  try {
    const { id } = req.params;
    const { fillLevel, weightKg, batteryLevel, sensorStatus } = req.body;

    const station = await dataStore.getStationById(id);
    if (!station) {
      return res.status(404).json({ success: false, message: 'Station not found.' });
    }

    const newFill = fillLevel !== undefined ? fillLevel : Math.min(100, Math.max(0, station.fillLevel + (Math.random() > 0.4 ? 5 : -10)));
    const newWeight = weightKg !== undefined ? weightKg : parseFloat((newFill * 0.3 + 2).toFixed(1));
    const newBattery = batteryLevel !== undefined ? batteryLevel : Math.max(10, station.batteryLevel - 1);

    let status = 'healthy';
    if (sensorStatus === 'offline') status = 'offline';
    else if (newFill >= 90) status = 'overflow';
    else if (newFill >= 75) status = 'at_risk';

    const updated = await dataStore.updateStation(id, {
      fillLevel: newFill,
      weightKg: newWeight,
      batteryLevel: newBattery,
      sensorStatus: sensorStatus || station.sensorStatus,
      status
    });

    return res.json({
      success: true,
      message: 'IoT telemetry simulation updated.',
      station: updated
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to simulate sensor telemetry.'
    });
  }
}
