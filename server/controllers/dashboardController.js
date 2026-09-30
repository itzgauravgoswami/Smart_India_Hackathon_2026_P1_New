import dataStore from '../services/dataStore.js';

export async function getDashboardData(req, res) {
  try {
    const stations = await dataStore.getStations();
    const events = await dataStore.getEvents({ limit: 10 });
    const allEvents = await dataStore.getEvents({ limit: 100 });
    const exceptions = await dataStore.getExceptions({ limit: 6 });
    const tasks = await dataStore.getTasks({});

    // Calculate station metrics
    const totalStations = stations.length;
    const healthyStations = stations.filter(s => s.status === 'healthy').length;
    const atRiskStations = stations.filter(s => s.status === 'at_risk').length;
    const overflowStations = stations.filter(s => s.status === 'overflow').length;
    const offlineStations = stations.filter(s => s.status === 'offline').length;

    // Calculate open exceptions
    const openExceptions = exceptions.filter(e => e.status !== 'RESOLVED');
    const criticalExceptions = openExceptions.filter(e => e.severity === 'CRITICAL').length;

    // Requires Attention items
    const requiresAttention = openExceptions.slice(0, 4).map(exp => ({
      id: exp.exceptionId,
      severity: exp.severity,
      stationId: exp.stationId,
      location: exp.location,
      description: exp.description,
      status: exp.status,
      assignedTo: exp.assignedTo?.name || 'Unassigned',
      timestamp: exp.createdAt,
      timeAgo: getTimeAgo(exp.createdAt)
    }));

    // Weekly trend simulated data
    const dailyActivity = [
      { day: 'Mon', events: 164, segregated: 148, contaminated: 16 },
      { day: 'Tue', events: 182, segregated: 160, contaminated: 22 },
      { day: 'Wed', events: 195, segregated: 174, contaminated: 21 },
      { day: 'Thu', events: 178, segregated: 156, contaminated: 22 },
      { day: 'Fri', events: 210, segregated: 186, contaminated: 24 },
      { day: 'Sat', events: 188, segregated: 165, contaminated: 23 },
      { day: 'Sun', events: 167, segregated: 149, contaminated: 18 }
    ];

    // Stream distribution
    const categoryDistribution = [
      { name: 'Dry Waste', value: 52, color: '#2563EB', count: 668 },
      { name: 'Wet Waste', value: 32, color: '#16A34A', count: 411 },
      { name: 'Sanitary Waste', value: 11, color: '#D97706', count: 141 },
      { name: 'Special Care', value: 5, color: '#DC2626', count: 64 }
    ];

    // Contamination trend (past 5 weeks)
    const contaminationTrend = [
      { week: 'W36', rate: 18.2 },
      { week: 'W37', rate: 16.5 },
      { week: 'W38', rate: 14.8 },
      { week: 'W39', rate: 13.9 },
      { week: 'W40', rate: 12.6 }
    ];

    return res.json({
      success: true,
      header: {
        greeting: 'Good morning, Facility Team',
        workspace: 'Campus Operations',
        date: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })
      },
      kpis: {
        wasteEvents: {
          value: '1,284',
          delta: '+8.2%',
          subtext: 'vs last week'
        },
        segregationQuality: {
          value: '87.4%',
          delta: '+3.1%',
          subtext: 'stream accuracy'
        },
        collectionCompliance: {
          value: '93.2%',
          delta: '+1.8%',
          subtext: 'on-time verified'
        },
        openExceptions: {
          value: openExceptions.length || 12,
          criticalCount: criticalExceptions || 3,
          subtext: `${criticalExceptions || 3} critical`
        },
        wasteStations: {
          value: `${healthyStations} / ${totalStations}`,
          healthy: healthyStations,
          total: totalStations,
          subtext: `${healthyStations} healthy`
        }
      },
      requiresAttention,
      charts: {
        dailyActivity,
        categoryDistribution,
        contaminationTrend
      },
      recentEvents: events.map(e => ({
        eventId: e.eventId,
        location: e.location,
        stationName: e.stationName,
        stationId: e.stationId,
        wasteCategory: e.wasteCategory,
        confidence: Math.round((e.aiClassification?.confidence || 0.9) * 100),
        contamination: e.contaminationStatus?.severity || 'None',
        status: e.status,
        assignedTo: e.assignedWorker?.name || 'Unassigned',
        updated: getTimeAgo(e.createdAt)
      }))
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to assemble dashboard operational metrics.'
    });
  }
}

function getTimeAgo(date) {
  if (!date) return 'just now';
  const diffMs = Date.now() - new Date(date).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours} hr ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} d ago`;
}
