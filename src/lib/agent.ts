import { addWeeks, format } from 'date-fns';
import { calculatePanchangam } from './astronomy';
import { getOpenMeteoTelemetry } from './openmeteo';
import { CROPS } from './crops';
import { PlanWeek } from './types';

/**
 * Synthesizes 16-week hyper-localized cultivation timeline fusing Astronomy + Weather + Crop Rules
 */
export async function generateCropPlan(
  cropId: string,
  lat: number,
  lon: number,
  startDate: Date = new Date()
): Promise<PlanWeek[]> {
  const crop = CROPS.find(c => c.id === cropId) || CROPS[0];
  const telemetry = await getOpenMeteoTelemetry(lat, lon);

  const plan: PlanWeek[] = [];

  for (let i = 0; i < crop.durationWeeks; i++) {
    const currentDate = addWeeks(startDate, i);
    const panchangam = calculatePanchangam(currentDate, lat, lon);

    // Dynamic soil moisture simulation curve across 16-week growth cycle
    const surfaceMoisture = Math.min(
      100,
      Math.max(20, Math.round(telemetry.surfaceMoisture + Math.sin(i * 0.4) * 12))
    );
    const deepMoisture = Math.min(100, Math.max(25, surfaceMoisture + 6));

    // Dynamic NDVI curve simulating seed emergence, vegetative growth, peak canopy, and senescence
    let baseNdvi = 0.25;
    if (i <= 2) {
      baseNdvi = 0.25 + i * 0.08;
    } else if (i <= 9) {
      baseNdvi = 0.45 + (i - 2) * 0.055; // Peak canopy ~ 0.835
    } else if (i <= 13) {
      baseNdvi = 0.83 - (i - 9) * 0.03;
    } else {
      baseNdvi = 0.70 - (i - 13) * 0.06; // Grain maturation & harvest
    }
    const ndvi = parseFloat((baseNdvi + (Math.random() * 0.04 - 0.02)).toFixed(2));

    // Weekly tasks and recommendations based on growth stage & celestial alignment
    let task = '';
    let tamilTask = '';
    let category: PlanWeek['taskCategory'] = 'sowing';
    let auspiciousReason = '';
    let tamilAuspiciousReason = '';

    if (i === 0) {
      category = 'sowing';
      if (panchangam.isAuspiciousForSowing) {
        task = `Optimal Sowing Window: ${crop.name} seedbed preparation under ${panchangam.nakshatra} Nakshatra.`;
        tamilTask = `உகந்த விதைப்பு காலம்: ${panchangam.nakshatra} நட்சத்திரத்தில் ${crop.tamilName} விதைத்தல் மற்றும் நாற்றங்கால் தயாரிப்பு.`;
        auspiciousReason = `${panchangam.nakshatra} Nakshatra combined with ${panchangam.paksha} Paksha maximizes germinating seed vigor.`;
        tamilAuspiciousReason = `${panchangam.nakshatra} நட்சத்திரம் மற்றும் ${panchangam.paksha === 'Shukla' ? 'வளர்பிறை' : 'தேய்பிறை'} இணைவு விதை முளைப்பு திறனை அதிகரிக்கும்.`;
      } else {
        task = `Land Tilling & Basal Manuring: Soil preparation for ${crop.name}. Pre-wet seedbeds.`;
        tamilTask = `நிலம் உழுதல் மற்றும் அடி உரம் இடுதல்: ${crop.tamilName} சாகுபடிக்கு மண் தயாரித்தல்.`;
        auspiciousReason = `Favorable soil preparation day prior to main sowing window.`;
        tamilAuspiciousReason = `முக்கிய விதைப்பு நாளுக்கு முன்னதாக நிலம் தயார் செய்ய ஏற்ற நாள்.`;
      }
    } else if (i === 1) {
      category = 'sowing';
      task = `Seedling Emergence Monitoring & Gap Filling for ${crop.name}.`;
      tamilTask = `முளைப்புத் திறன் கண்காணிப்பு மற்றும் விடுபட்ட இடங்களில் மீண்டும் விதைத்தல்.`;
    } else if (i === 3 || i === 7 || i === 11) {
      category = 'irrigation';
      if (surfaceMoisture < 40) {
        task = `Critical Irrigation Required: Soil moisture at ${surfaceMoisture}%. Irrigate during early morning hours.`;
        tamilTask = `அத்தியாவசிய நீர் பாசனம்: மண் ஈரம் ${surfaceMoisture}%. அதிகாலை வேளையில் நீர் பாய்ச்சவும்.`;
      } else {
        task = `Light Moisture Top-up & Field Drainage Audit. Soil moisture optimal at ${surfaceMoisture}%.`;
        tamilTask = `மிதமான நீர் மேலாண்மை. மண் ஈரப்பதம் சீராக உள்ளது (${surfaceMoisture}%).`;
      }
    } else if (i === 4 || i === 8) {
      category = 'fertilizer';
      if (panchangam.paksha === 'Shukla') {
        task = `Nutrient Application (NPK Top-Dressing): High sap flow in ${panchangam.paksha} Paksha enhances nutrient uptake.`;
        tamilTask = `தழைச்சத்து மற்றும் உரம் இடுதல்: ${panchangam.paksha === 'Shukla' ? 'வளர்பிறை' : 'தேய்பிறை'} காலத்தில் உரம் இடுவது ஊட்டச்சத்து உறிஞ்சுதலை அதிகரிக்கும்.`;
        auspiciousReason = `Moon gravity draws sap upward, driving rapid foliar absorption.`;
        tamilAuspiciousReason = `சந்திரனின் ஈர்ப்பு விசை தாவர சாற்றை மேலே இழுப்பதால் உரச்சத்து விரைவாக சேரும்.`;
      } else {
        task = `Root Zone Organic Manure Application & Bio-fertilizer drenching.`;
        tamilTask = `வேர் பகுதியில் இயற்கை உரம் இடுதல் மற்றும் உயிர் உரங்கள் அளித்தல்.`;
      }
    } else if (i === 5 || i === 9) {
      category = 'weeding';
      task = `Manual Weeding & Mulching: Clean inter-row weeds during ${panchangam.sapFlowState} sap flow.`;
      tamilTask = `களை எடுத்தல் மற்றும் மூடாக்கு இடுதல்: பயிர் வரிசைகளுக்கு இடையே களைகளை அகற்றவும்.`;
    } else if (i === 12 || i === 13) {
      category = 'pest';
      task = `Integrated Pest Management (IPM): Inspect leaves for leaf-folder or pod borer symptoms. Apply neem formulations.`;
      tamilTask = `பயிர் பாதுகாப்பு மற்றும் பூச்சி மேலாண்மை: வேப்ப எண்ணெய் கரைசல் தெளித்து பயிர் பாதுகாப்பு செய்யவும்.`;
    } else if (i === 14) {
      category = 'irrigation';
      task = `Terminal Irrigation & Water Withholding: Cease watering to facilitate grain drying.`;
      tamilTask = `கடைசி நீர்ப்பாசனம் மற்றும் நீர் நிறுத்தம்: பயிர் உலருவதற்கு நீர்ப்பாசனத்தை நிறுத்தவும்.`;
    } else {
      category = 'harvest';
      task = `Harvesting Phase: ${crop.name} grain/crop maturity reached. ${panchangam.isAuspiciousForSowing ? 'Auspicious harvest date.' : 'Begin field harvesting.'}`;
      tamilTask = `${crop.tamilName} அறுவடை கட்டம்: பயிர் முதிர்ச்சிடைந்தது. அறுவடையைத் தொடங்குங்கள்.`;
      auspiciousReason = `Low sap flow in Krishna Paksha facilitates longer grain storage life.`;
      tamilAuspiciousReason = `தேய்பிறை அறுவடை தானியங்களை நீண்ட காலம் பாதுகாப்பாக சேமிக்க உதவும்.`;
    }

    plan.push({
      week: i + 1,
      tamilMonth: panchangam.tamilMonth,
      gregorianDate: format(currentDate, 'MMM dd, yyyy'),
      panchangam,
      soil: {
        ...telemetry,
        surfaceMoisture,
        deepMoisture
      },
      satellite: {
        ndvi,
        vci: Math.round(ndvi * 100),
        canopyDensity: ndvi > 0.65 ? 'Dense Canopy' : ndvi > 0.45 ? 'Moderate Cover' : 'Emergent'
      },
      task,
      tamilTask,
      taskCategory: category,
      auspiciousReason: auspiciousReason || `Calculated based on ${panchangam.tithi} and ${panchangam.nakshatra}.`,
      tamilAuspiciousReason: tamilAuspiciousReason || `${panchangam.tithi} மற்றும் ${panchangam.nakshatra} கணக்கீட்டின்படி அமைக்கப்பட்டது.`
    });
  }

  return plan;
}
