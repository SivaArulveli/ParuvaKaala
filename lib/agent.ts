import { getPanchangam } from './panchang';
import { getSatelliteData } from './satellite';
import { addWeeks, format } from 'date-fns';

export async function generateCropPlan(crop: string, location: string, startDate: Date) {
  const plan = [];
  
  // Dummy coordinates for Coimbatore
  const lat = 11.0168;
  const lon = 76.9558;

  const tamilMonths = [
    'Chithirai (சித்திரை)', 'Vaikasi (வைகாசி)', 'Aani (ஆனி)', 'Aadi (ஆடி)',
    'Avani (ஆவணி)', 'Purattasi (புரட்டாசி)', 'Aippasi (ஐப்பசி)', 'Karthikai (கார்த்திகை)',
    'Margazhi (மார்கழி)', 'Thai (தை)', 'Masi (மாசி)', 'Panguni (பங்குனி)'
  ];

  // 16 weeks ~ 112 days (approx Paddy cycle)
  for (let i = 0; i < 16; i++) {
    const currentDate = addWeeks(startDate, i);
    const panchangam = await getPanchangam(currentDate, lat, lon);
    const satellite = await getSatelliteData(lat, lon);
    
    // Simple rule engine for task assignment
    let task = '';
    let tamilTask = '';

    if (i === 0) {
      task = 'Land Preparation & Sowing. ' + (panchangam.isAuspicious ? 'Auspicious day.' : '');
      tamilTask = 'நிலம் தயாரித்தல் மற்றும் விதைத்தல். ' + (panchangam.isAuspicious ? 'உகந்த நாள்.' : '');
    } else if (i === 4) {
      task = 'First weeding and fertilizer application.';
      tamilTask = 'முதல் களை எடுத்தல் மற்றும் உரம் இடுதல்.';
    } else if (i === 15) {
      task = 'Harvesting begins. ' + (panchangam.isAuspicious ? 'Good time to harvest.' : '');
      tamilTask = 'அறுவடை தொடக்கம். ' + (panchangam.isAuspicious ? 'அறுவடை செய்ய நல்ல நேரம்.' : '');
    } else {
      task = satellite.soilMoisture === 'Low' ? 'Irrigation required.' : 'Monitor crop growth.';
      tamilTask = satellite.soilMoisture === 'Low' ? 'நீர் பாய்ச்சவும்.' : 'பயிர் வளர்ச்சியை கண்காணிக்கவும்.';
    }

    plan.push({
      week: i + 1,
      tamilMonth: tamilMonths[(currentDate.getMonth() + 3) % 12],
      gregorianDate: format(currentDate, 'MMM dd'),
      panchangam,
      satellite,
      task,
      tamilTask
    });
  }

  return plan;
}
