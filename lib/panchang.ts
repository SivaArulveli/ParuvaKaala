export interface PanchangamData {
  tithi: string;
  nakshatra: string;
  yoga: string;
  vara: string;
  karana: string;
  isAuspicious: boolean;
}

// Mocking Panchangam logic as actual astrology API requires paid/complex keys
// in a real prod app, use @bidyashish/panchang or astrologyapi.com
export async function getPanchangam(date: Date, lat: number, lon: number): Promise<PanchangamData> {
  const day = date.getDay();
  const auspiciousNakshatras = ['Rohini', 'Mrigashira', 'Pushya', 'Anuradha', 'Uttara Ashadha'];
  const riktaTithis = ['Chaturthi', 'Navami', 'Chaturdashi'];

  // Mock data mapping
  const nakshatras = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya'];
  const tithis = ['Pratipada', 'Dvitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami', 'Navami'];

  const randomNakshatra = nakshatras[day % nakshatras.length];
  const randomTithi = tithis[day % tithis.length];

  const isAuspicious = auspiciousNakshatras.includes(randomNakshatra) && !riktaTithis.includes(randomTithi);

  return {
    tithi: randomTithi,
    nakshatra: randomNakshatra,
    yoga: 'Siddhi',
    vara: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day],
    karana: 'Bava',
    isAuspicious
  };
}
