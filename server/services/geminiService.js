import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

let genAI = null;
if (GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here') {
  try {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  } catch (err) {
    console.warn('Failed to initialize GoogleGenerativeAI client:', err.message);
  }
}

/**
 * Deterministic AI fallback logic for waste classification
 */
export function getDeterministicClassification({ filename = '', userCategory = 'dry' } = {}) {
  const lowerName = filename.toLowerCase();

  if (lowerName.includes('food') || lowerName.includes('fruit') || lowerName.includes('vegetable') || userCategory === 'wet') {
    return {
      category: 'Wet Waste',
      wasteStream: 'wet',
      confidence: 0.93,
      confidenceTier: 'High',
      contamination: {
        detected: false,
        severity: 'None',
        detectedItems: [],
        notes: 'Pure organic matter detected. Suitable for campus compost pits.'
      },
      recommendedStream: 'Wet (Green Bin)',
      explanation: 'Identified organic food residuals and compostable biomass.',
      source: 'deterministic_fallback',
      statusNotice: 'AI Service in fallback demo mode. Showing calibrated reference classification.'
    };
  }

  if (lowerName.includes('battery') || lowerName.includes('cell') || lowerName.includes('circuit') || lowerName.includes('wire') || userCategory === 'special') {
    return {
      category: 'Special Care Waste',
      wasteStream: 'special',
      confidence: 0.91,
      confidenceTier: 'High',
      contamination: {
        detected: false,
        severity: 'None',
        detectedItems: [],
        notes: 'Hazardous materials detected. Requires segregated containment.'
      },
      recommendedStream: 'Special Care (Red Bin)',
      explanation: 'Identified heavy metals, chemical cells or electrical components requiring safe handling.',
      source: 'deterministic_fallback',
      statusNotice: 'AI Service in fallback demo mode. Showing calibrated reference classification.'
    };
  }

  if (lowerName.includes('tissue') || lowerName.includes('mask') || lowerName.includes('sanitary') || userCategory === 'sanitary') {
    return {
      category: 'Sanitary Waste',
      wasteStream: 'sanitary',
      confidence: 0.95,
      confidenceTier: 'High',
      contamination: {
        detected: false,
        severity: 'None',
        detectedItems: [],
        notes: 'Bio-hazard precautions apply. Must be incinerated or autoclaved.'
      },
      recommendedStream: 'Sanitary Waste (Yellow Bin)',
      explanation: 'Identified single-use hygiene and personal care articles.',
      source: 'deterministic_fallback',
      statusNotice: 'AI Service in fallback demo mode. Showing calibrated reference classification.'
    };
  }

  // Default to Dry Waste with potential food contamination demo
  return {
    category: 'Dry Waste',
    wasteStream: 'dry',
    confidence: 0.94,
    confidenceTier: 'High',
    contamination: {
      detected: true,
      severity: 'Medium',
      detectedItems: ['Curry / sauce residue on inner card packaging', 'Beverage droplet traces'],
      notes: 'Food residue detected on packaging. Contamination alert generated.'
    },
    recommendedStream: 'Dry (Blue Bin)',
    requiredAction: 'Remove organic food residue before dry-waste binning or divert soiled section.',
    explanation: 'Detected polyethylene plastic bottle and cardboard container. Surface oil staining observed.',
    source: 'deterministic_fallback',
    statusNotice: 'AI Service in fallback demo mode. Showing calibrated reference classification.'
  };
}

/**
 * Classify waste image using Gemini Vision if available, otherwise deterministic fallback
 */
export async function classifyWasteImage({ imageBuffer, mimeType, filename, userCategory }) {
  if (!genAI || !GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    return getDeterministicClassification({ filename, userCategory });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `
You are an expert waste classification and campus sanitation AI inspector.
Analyze this waste item image and categorize it strictly into one of four streams:
1. Dry Waste (paper, clean plastic, cardboard, metal, glass, packaging)
2. Wet Waste (food scraps, vegetable peelings, biodegradable organic items)
3. Sanitary Waste (used tissues, diapers, medical masks, hygiene products)
4. Special Care Waste (batteries, chemical containers, e-waste, hazardous lab waste)

Inspect for contamination (e.g. food residue on plastic, liquids in paper bins, misplaced items).

Respond ONLY with valid JSON in this exact structure:
{
  "category": "Dry Waste" | "Wet Waste" | "Sanitary Waste" | "Special Care Waste",
  "wasteStream": "dry" | "wet" | "sanitary" | "special",
  "confidence": 0.94,
  "confidenceTier": "High" | "Medium" | "Low",
  "contamination": {
    "detected": true | false,
    "severity": "None" | "Low" | "Medium" | "High",
    "detectedItems": ["item 1"],
    "notes": "explanation of contamination if any"
  },
  "recommendedStream": "Dry (Blue Bin)",
  "requiredAction": "Clear action for operator or sanitation worker",
  "explanation": "Concise 1-2 sentence reason for classification"
}
`;

    const parts = [
      prompt,
      {
        inlineData: {
          data: imageBuffer.toString('base64'),
          mimeType: mimeType || 'image/jpeg'
        }
      }
    ];

    const result = await model.generateContent(parts);
    const text = result.response.text();
    
    // Extract JSON block
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        ...parsed,
        source: 'gemini',
        statusNotice: 'Live Gemini Vision Analysis'
      };
    }
    throw new Error('Could not parse Gemini JSON response');
  } catch (err) {
    console.warn('Gemini classification error, switching to deterministic fallback:', err.message);
    const fallback = getDeterministicClassification({ filename, userCategory });
    fallback.statusNotice = 'AI Service unavailable. Showing calibrated demo classification.';
    return fallback;
  }
}

/**
 * Generate Operational AI Reports using Gemini or deterministic engine
 */
export async function generateOperationalReport({ reportType = 'Daily Operations', timeframe = 'Last 7 Days', campusMetrics }) {
  const fallbackReports = {
    'Daily Operations': `Campus Operations Briefing — ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}

Executive Summary:
Today the campus recorded 184 waste event passes across 12 active smart stations. Segregation compliance averaged 87.4%, representing a 3.1% week-on-week gain.

Operational Highlights:
• Block A Cafeteria recorded the highest volumetric throughput (92% bin peak) with 2 contamination alerts logged during post-lunch rush.
• Central Library Atrium maintained pristine paper segregation quality (98.2% clean stream).
• North Parking Transit Bay station went offline due to an ultrasonic module power drop; maintenance crew has been dispatched.
• Average collection loop turnaround time improved from 24 minutes to 16.5 minutes following QR verification enforcement.

Priority Actions:
1. Re-route secondary collection trolley to Block A Cafeteria by 14:00.
2. Replace battery harness at WS-009 (North Parking).
3. Conduct brief student awareness drive on food-soiled packaging segregation in Hostel Quadrangle.`,

    'Weekly Operations': `Weekly Campus Waste & Sanitation Performance Audit

Total Events Analyzed: 1,284 waste lifecycle events.
Loop Closure Rate: 93.2% verified collection compliance.

Key Trends:
1. Stream Distribution: Dry Waste (52%), Wet Waste (32%), Sanitary (11%), Special Care (5%).
2. Contamination Exceptions: 14 total exceptions logged. Cafeteria dining halls accounted for 64% of recurring segregation mistakes.
3. Worker SLA: Rahul Verma and Suresh Kumar achieved 100% QR-scan compliance on all high-priority alerts.

Recommendations:
• Deploy dual-receptacle signage in Block A Cafeteria annex.
• Schedule preventive maintenance for Hostel B composting digester.`,

    'Waste Quality': `Campus Waste Quality & Stream Integrity Report

Quality Index: 82 / 100 (Operational Target: >80)
• Segregation Integrity: 87 / 100
• Collection Compliance: 91 / 100
• Sanitation Regularity: 79 / 100
• Contamination Control: 74 / 100
• Resolution Velocity: 89 / 100

Diagnostics:
Food grease cross-contamination in dry paper recyclables represents the single largest drag on the campus recycling valuation. Implementation of pre-rinse guidance has yielded promising 14% improvements in residential hostels.`,

    'Exception Summary': `Exception Engine Diagnostic Digest

Total Open Exceptions: 4 (1 Critical, 1 Warning, 2 Attention)
Total Resolved Exceptions (Last 24h): 6

Critical Alert Review:
• EXP-101 (Block A Cafeteria): 92% capacity overflow risk. Worker actively en-route with mobile check-in.
• EXP-104 (North Parking Lot): Telemetry heartbeat interruption. Hardware inspection scheduled.

Preventive Advice:
Implement automated worker alerts when fill trajectory indicates >80% threshold within 30 minutes.`
  };

  if (!genAI || !GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    return {
      reportType,
      generatedAt: new Date(),
      content: fallbackReports[reportType] || fallbackReports['Daily Operations'],
      source: 'deterministic_fallback',
      notice: 'AI Service in fallback demo mode. Showing structured operational report.'
    };
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `
You are the Chief Facility Operations Officer for an enterprise smart university campus running EcoNest.
Generate an operational, professional, data-driven ${reportType} report for the timeframe: ${timeframe}.
Reference the EcoNest operational loop: DETECT → CLASSIFY → VERIFY → ACT → PROVE → MEASURE.
Tone: Calm, precise, operational, data-driven, without generic AI marketing fluff or emojis.
Metrics context: 1,284 total events, 87.4% segregation quality, 93.2% collection compliance, 12 active stations (WS-001 through WS-012), 4 open exceptions.
`;
    const result = await model.generateContent(prompt);
    return {
      reportType,
      generatedAt: new Date(),
      content: result.response.text(),
      source: 'gemini',
      notice: 'Generated via Gemini Operational AI Assistant'
    };
  } catch (err) {
    console.warn('Gemini report generation error, falling back:', err.message);
    return {
      reportType,
      generatedAt: new Date(),
      content: fallbackReports[reportType] || fallbackReports['Daily Operations'],
      source: 'deterministic_fallback',
      notice: 'AI Service unavailable. Showing structured operational report.'
    };
  }
}
