import * as Astronomy from 'astronomy-engine';
import { PanchangamData } from './types';

// 27 Nakshatras
export const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

export const TAMIL_NAKSHATRAS = [
  'அசுவினி', 'பரணி', 'கார்த்திகை', 'ரோகிணி', 'மிருகசீரிஷம்', 'திருவாதிரை',
  'புனர்பூசம்', 'பூசம்', 'ஆயில்யம்', 'மகம்', 'பூரம்', 'உத்திரம்',
  'அஸ்தம்', 'சித்திரை', 'சுவாதி', 'விசாகம்', 'அனுஷம்', 'கேட்டை',
  'மூலம்', 'பூராடம்', 'உத்திராடம்', 'திருவோணம்', 'அவிட்டம்', 'சதயம்',
  'பூரட்டாதி', 'உத்திரட்டாதி', 'ரேவதி'
];

// 30 Tithis
export const TITHI_NAMES = [
  'Pratipada', 'Dvitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi',
  'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dvadashi',
  'Trayodashi', 'Chaturdashi', 'Purnima / Full Moon',
  'Pratipada', 'Dvitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi',
  'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dvadashi',
  'Trayodashi', 'Chaturdashi', 'Amavasya / New Moon'
];

// 27 Yogas
export const YOGAS = [
  'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda',
  'Sukarma', 'Dhriti', 'Shoola', 'Ganda', 'Vriddhi', 'Dhruva',
  'Vyaghasha', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyan',
  'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla',
  'Brahma', 'Indra', 'Vaidhriti'
];

// 11 Karanas
export const KARANAS = [
  'Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti',
  'Shakuni', 'Chatushpada', 'Naga', 'Kintughna'
];

// Tamil Months
export const TAMIL_MONTHS = [
  'Chithirai (சித்திரை)', 'Vaikasi (வைகாசி)', 'Aani (ஆனி)', 'Aadi (ஆடி)',
  'Avani (ஆவணி)', 'Purattasi (புரட்டாசி)', 'Aippasi (ஐப்பசி)', 'Karthigai (கார்த்திகை)',
  'Margazhi (மார்கழி)', 'Thai (தை)', 'Maasi (மாசி)', 'Panguni (பங்குனி)'
];

const VARAS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Calculates Lahiri Ayanamsa for accurate Sidereal astronomy
 */
function getLahiriAyanamsa(date: Date): number {
  const year = date.getFullYear();
  const dayOfYear = Math.floor((date.getTime() - new Date(year, 0, 0).getTime()) / 86400000);
  // Standard Lahiri formula ~ 23.85° in year 2000, increasing ~ 0.01396° / year
  return 23.85 + (year - 2000) * 0.01396 + (dayOfYear / 365.25) * 0.01396;
}

/**
 * Computes exact Panchangam data for a given date and location
 */
export function calculatePanchangam(date: Date, lat: number, lon: number): PanchangamData {
  const time = Astronomy.MakeTime(date);

  // Ecliptic positions of Sun and Moon using GeoVector → Ecliptic
  const sunGeo = Astronomy.GeoVector(Astronomy.Body.Sun, time, true);
  const moonGeo = Astronomy.GeoVector(Astronomy.Body.Moon, time, true);

  const sunEcliptic = Astronomy.Ecliptic(sunGeo);
  const moonEcliptic = Astronomy.Ecliptic(moonGeo);

  const sunLon = (sunEcliptic.elon + 360) % 360;
  const moonLon = (moonEcliptic.elon + 360) % 360;

  const ayanamsa = getLahiriAyanamsa(date);
  const siderealMoon = (moonLon - ayanamsa + 360) % 360;
  const siderealSun = (sunLon - ayanamsa + 360) % 360;

  // 1. Tithi (Moon angle - Sun angle)
  const tithiAngle = (moonLon - sunLon + 360) % 360;
  const tithiIndex = Math.floor(tithiAngle / 12); // 0 - 29
  const tithiNumber = tithiIndex + 1;
  const paksha: 'Shukla' | 'Krishna' = tithiIndex < 15 ? 'Shukla' : 'Krishna';
  const tithiName = TITHI_NAMES[tithiIndex];

  // 2. Nakshatra (Sidereal Moon longitude / 13° 20')
  const nakshatraIndex = Math.floor(siderealMoon / (360 / 27)); // 0 - 26
  const nakshatraName = NAKSHATRAS[nakshatraIndex];

  // 3. Yoga ((Sidereal Sun + Sidereal Moon) / 13° 20')
  const yogaIndex = Math.floor(((siderealSun + siderealMoon) % 360) / (360 / 27));
  const yogaName = YOGAS[yogaIndex];

  // 4. Karana (Half Tithi = 6 degrees)
  const karanaIndex = Math.floor(tithiAngle / 6) % 11;
  const karanaName = KARANAS[karanaIndex];

  // 5. Vara (Day of Week)
  const varaName = VARAS[date.getDay()];

  // 6. Tamil Month (Sidereal Sun position / 30 degrees per rasi)
  const rasiIndex = Math.floor(siderealSun / 30) % 12;
  const tamilMonth = TAMIL_MONTHS[rasiIndex];

  // 7. Moon Phase percentage
  const moonPhasePercent = Math.round((1 - Math.cos((tithiAngle * Math.PI) / 180)) / 2 * 100);

  // 8. Sap Flow Mechanics
  let sapFlowState: 'High (Rising)' | 'Peak' | 'Low (Receding)' | 'Minimum' = 'High (Rising)';
  if (tithiIndex >= 11 && tithiIndex <= 15) {
    sapFlowState = 'Peak';
  } else if (tithiIndex > 15 && tithiIndex <= 24) {
    sapFlowState = 'Low (Receding)';
  } else if (tithiIndex > 24 || tithiIndex === 0) {
    sapFlowState = 'Minimum';
  }

  // 9. Auspiciousness for agricultural operations
  const auspiciousNakshatras = [
    'Rohini', 'Mrigashira', 'Pushya', 'Uttara Phalguni',
    'Hasta', 'Chitra', 'Swati', 'Anuradha', 'Uttara Ashadha',
    'Uttara Bhadrapada', 'Revati'
  ];

  // Avoid Rikta Tithis (4th, 9th, 14th of each Paksha)
  const isRiktaTithi = [3, 8, 13, 18, 23, 28].includes(tithiIndex);
  const isAuspiciousForSowing = auspiciousNakshatras.includes(nakshatraName) && !isRiktaTithi;

  return {
    tithi: `${paksha} ${tithiName}`,
    tithiNumber,
    paksha,
    nakshatra: nakshatraName,
    nakshatraNumber: nakshatraIndex + 1,
    yoga: yogaName,
    karana: karanaName,
    vara: varaName,
    sunSign: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'][rasiIndex],
    tamilMonth,
    moonPhasePercent,
    sapFlowState,
    isAuspiciousForSowing
  };
}
