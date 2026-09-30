import { classifyWasteImage, generateOperationalReport, getDeterministicClassification } from '../services/geminiService.js';

export async function classify(req, res) {
  try {
    const file = req.file;
    const { sampleType, userCategory } = req.body;

    let classification = null;

    if (file) {
      classification = await classifyWasteImage({
        imageBuffer: file.buffer,
        mimeType: file.mimetype,
        filename: file.originalname,
        userCategory
      });
    } else {
      // If client sent sample selection
      classification = getDeterministicClassification({
        filename: sampleType || 'plastic_bottle.jpg',
        userCategory: userCategory || 'dry'
      });
    }

    return res.json({
      success: true,
      classification
    });
  } catch (err) {
    console.error('AI classification error:', err);
    // Graceful fallback
    const fallback = getDeterministicClassification({ filename: 'waste_sample.jpg' });
    return res.json({
      success: true,
      classification: fallback,
      notice: 'AI service unavailable. Showing calibrated demo classification.'
    });
  }
}

export async function generateReport(req, res) {
  try {
    const { reportType = 'Daily Operations', timeframe = 'Last 7 Days' } = req.body;
    const report = await generateOperationalReport({ reportType, timeframe });

    return res.json({
      success: true,
      report
    });
  } catch (err) {
    console.error('Report error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate operational report.'
    });
  }
}
