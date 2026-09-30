export async function getAnalytics(req, res) {
  try {
    const { timeframe = '30d', location = 'all', wasteType = 'all' } = req.query;

    const wasteQualityScore = {
      overall: 82,
      max: 100,
      target: 80,
      label: 'Campus Waste Quality Score',
      disclaimer: 'Prototype KPI framework — not a scientifically validated score.',
      breakdown: [
        { metric: 'Segregation Quality', score: 87, target: 85, weight: '25%' },
        { metric: 'Collection Compliance', score: 91, target: 90, weight: '25%' },
        { metric: 'Sanitation Regularity', score: 79, target: 80, weight: '20%' },
        { metric: 'Contamination Control', score: 74, target: 80, weight: '15%' },
        { metric: 'Resolution Velocity', score: 89, target: 85, weight: '15%' }
      ]
    };

    const volumeTrends = [
      { date: 'Sep 24', dry: 142, wet: 98, sanitary: 28, special: 12 },
      { date: 'Sep 25', dry: 155, wet: 104, sanitary: 31, special: 9 },
      { date: 'Sep 26', dry: 168, wet: 112, sanitary: 26, special: 14 },
      { date: 'Sep 27', dry: 160, wet: 108, sanitary: 30, special: 11 },
      { date: 'Sep 28', dry: 182, wet: 124, sanitary: 34, special: 16 },
      { date: 'Sep 29', dry: 174, wet: 118, sanitary: 29, special: 10 },
      { date: 'Sep 30', dry: 189, wet: 126, sanitary: 32, special: 15 }
    ];

    const complianceTrends = [
      { date: 'Sep 24', collection: 91.2, sanitation: 84.1 },
      { date: 'Sep 25', collection: 92.5, sanitation: 83.4 },
      { date: 'Sep 26', collection: 94.0, sanitation: 86.2 },
      { date: 'Sep 27', collection: 93.1, sanitation: 82.8 },
      { date: 'Sep 28', collection: 92.8, sanitation: 85.0 },
      { date: 'Sep 29', collection: 94.5, sanitation: 87.1 },
      { date: 'Sep 30', collection: 93.2, sanitation: 86.5 }
    ];

    const exceptionFrequency = [
      { type: 'Overflow Risk', count: 18, critical: 6 },
      { type: 'Contamination', count: 24, critical: 4 },
      { type: 'Sanitation Overdue', count: 12, critical: 2 },
      { type: 'Missed Collection', count: 8, critical: 1 },
      { type: 'Repeated Segregation Error', count: 15, critical: 0 },
      { type: 'Sensor Offline', count: 4, critical: 3 },
      { type: 'Unusual Generation', count: 7, critical: 1 }
    ];

    const hotspotLocations = [
      { location: 'Block A Cafeteria', volumeKg: 384, contaminationRate: 24.2, status: 'At Risk' },
      { location: 'Hostel Block B Courtyard', volumeKg: 298, contaminationRate: 18.5, status: 'At Risk' },
      { location: 'Student Activity Center', volumeKg: 246, contaminationRate: 14.1, status: 'Attention' },
      { location: 'Academic Block B Computing', volumeKg: 194, contaminationRate: 9.8, status: 'Healthy' },
      { location: 'Central Library Atrium', volumeKg: 162, contaminationRate: 2.1, status: 'Healthy' }
    ];

    return res.json({
      success: true,
      timeframe,
      wasteQualityScore,
      volumeTrends,
      complianceTrends,
      exceptionFrequency,
      hotspotLocations
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve analytics.'
    });
  }
}
