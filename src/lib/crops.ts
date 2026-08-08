import { CropInfo } from './types';

export const CROPS: CropInfo[] = [
  {
    id: 'paddy',
    name: 'Paddy / Rice',
    tamilName: 'நெல் சாகுபடி',
    durationWeeks: 16,
    icon: '🌾',
    description: 'Requires high water retention. Highly sensitive to lunar sap flow during nursery transplanting and panicle initiation.',
    tamilDescription: 'சரியான நீர் தேக்கம் தேவை. நாற்று நடுதல் மற்றும் கதிர் வரும் தருணத்தில் சந்திர சாறு ஓட்டக் கட்டங்களுக்கு அதிக உணர்திறன் கொண்டது.',
    waterNeed: 'High',
    idealPaksha: 'Shukla',
    favoredNakshatras: ['Rohini', 'Pushya', 'Hasta', 'Anuradha', 'Uttara Ashadha']
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane',
    tamilName: 'கரும்பு சாகுபடி',
    durationWeeks: 16,
    icon: '🎋',
    description: 'Long-duration crop. Benefits from solar transit alignment during sett planting and tillering phase.',
    tamilDescription: 'நீண்ட கால பயிர். கரணை நடுதல் மற்றும் தூர் கட்டும் தருணத்தில் சூரிய சஞ்சார திட்டமிடல் மூலம் பெரும் பலன் பெறுகிறது.',
    waterNeed: 'High',
    idealPaksha: 'Shukla',
    favoredNakshatras: ['Mrigashira', 'Chitra', 'Swati', 'Uttara Bhadrapada']
  },
  {
    id: 'cotton',
    name: 'Cotton',
    tamilName: 'பருத்தி சாகுபடி',
    durationWeeks: 16,
    icon: '🌱',
    description: 'Demands dry seedbed during sowing. Performs best with root strength lunar cycles during boll development.',
    tamilDescription: 'விதைக்கும் போது மிதமான மண் ஈரப்பதம் தேவை. காய் பிடிக்கும் பருவத்தில் வேர் வலுவடையும் சந்திர சுழற்சியில் சிறந்த விளைச்சல்.',
    waterNeed: 'Medium',
    idealPaksha: 'Krishna',
    favoredNakshatras: ['Ashwini', 'Bharani', 'Uttara Phalguni', 'Vishakha']
  },
  {
    id: 'groundnut',
    name: 'Groundnut / Peanut',
    tamilName: 'நிலக்கடலை',
    durationWeeks: 16,
    icon: '🥜',
    description: 'Root crop development aligns strongly with waning moon phases (Krishna Paksha) for peg penetration and pod filling.',
    tamilDescription: 'விழுது இறங்குவதற்கும் காய் முதிர்வதற்கும் தேய்பிறை சந்திரனின் வேர் நோக்கிய சாறு ஓட்டம் (கிருஷ்ண பட்சம்) மிகவும் உகந்தது.',
    waterNeed: 'Low',
    idealPaksha: 'Krishna',
    favoredNakshatras: ['Rohini', 'Pushya', 'Anuradha', 'Revati']
  },
  {
    id: 'maize',
    name: 'Maize / Corn',
    tamilName: 'சோளம் சாகுபடி',
    durationWeeks: 16,
    icon: '🌽',
    description: 'Rapid growth crop. Responds strongly to nitrogen application during early Shukla Paksha moon phases.',
    tamilDescription: 'வேகமாக வளரும் பயிர். வளர்பிறை தொடக்கத்தில் தழைச்சத்து உரம் இடுவதன் மூலம் அதிக இலை வளர்ச்சி பெறுகிறது.',
    waterNeed: 'Medium',
    idealPaksha: 'Shukla',
    favoredNakshatras: ['Ardra', 'Punarvasu', 'Hasta', 'Shravana']
  },
  {
    id: 'banana',
    name: 'Banana',
    tamilName: 'வாழை சாகுபடி',
    durationWeeks: 16,
    icon: '🍌',
    description: 'Perennial crop. Sucker planting and bunch emergence synchronizes with peak gravitational lunar tides.',
    tamilDescription: 'கன்று நடுதல் மற்றும் தார் வெளிவரும் பருவம் பௌர்ணமி மற்றும் வளர்பிறை சந்திர ஈர்ப்பு விசையோடு ஒத்துப்போகிறது.',
    waterNeed: 'High',
    idealPaksha: 'Shukla',
    favoredNakshatras: ['Rohini', 'Pushya', 'Uttara Phalguni', 'Uttara Bhadrapada']
  },
  {
    id: 'tapioca',
    name: 'Tapioca / Cassava',
    tamilName: 'மரவள்ளி கிழங்கு',
    durationWeeks: 16,
    icon: '🥔',
    description: 'Tuber crop. Starch accumulation in roots is boosted when planted during Krishna Paksha root-flow windows.',
    tamilDescription: 'கிழங்குகளில் மாவுச்சத்து சேமிப்பிற்கு தேய்பிறை காலத்தில் கரணை நடுவது மகசூலை அதிகரிக்கும்.',
    waterNeed: 'Low',
    idealPaksha: 'Krishna',
    favoredNakshatras: ['Bharani', 'Magha', 'Mula', 'Revati']
  },
  {
    id: 'chilli',
    name: 'Chilli / Red Pepper',
    tamilName: 'மிளகாய் சாகுபடி',
    durationWeeks: 16,
    icon: '🌶️',
    description: 'Requires well-drained soil and precise flower-drop prevention during solar solstice transits.',
    tamilDescription: 'சிறந்த வடிகால் வசதி மற்றும் பூ உதிர்வைத் தடுக்க சூரிய அயன சஞ்சார காலத்தில் கவனமான மேலாண்மை தேவை.',
    waterNeed: 'Medium',
    idealPaksha: 'Shukla',
    favoredNakshatras: ['Krittika', 'Chitra', 'Dhanishta', 'Shatabhisha']
  }
];

export const PRESET_LOCATIONS = [
  { id: 'coimbatore', name: 'Coimbatore', tamilName: 'கோயம்புத்தூர்', district: 'Coimbatore', lat: 11.0168, lon: 76.9558, region: 'Western Zone (Kongu Region)' },
  { id: 'thanjavur', name: 'Thanjavur', tamilName: 'தஞ்சாவூர்', district: 'Thanjavur', lat: 10.7870, lon: 79.1378, region: 'Cauvery Delta Zone (Granary of TN)' },
  { id: 'madurai', name: 'Madurai', tamilName: 'மதுரை', district: 'Madurai', lat: 9.9252, lon: 78.1198, region: 'Southern Zone (Vaigai Basin)' },
  { id: 'trichy', name: 'Tiruchirappalli', tamilName: 'திருச்சிராப்பள்ளி', district: 'Tiruchirappalli', lat: 10.7905, lon: 78.7047, region: 'Central Zone' },
  { id: 'salem', name: 'Salem', tamilName: 'சேலம்', district: 'Salem', lat: 11.6643, lon: 78.1460, region: 'North Western Zone' },
  { id: 'tirunelveli', name: 'Tirunelveli', tamilName: 'திருநெல்வேலி', district: 'Tirunelveli', lat: 8.7139, lon: 77.7567, region: 'Deep South Zone (Thamirabarani Basin)' },
  { id: 'vellore', name: 'Vellore', tamilName: 'வேலூர்', district: 'Vellore', lat: 12.9165, lon: 79.1325, region: 'North Eastern Zone' },
  { id: 'erode', name: 'Erode', tamilName: 'ஈரோடு', district: 'Erode', lat: 11.3410, lon: 77.7172, region: 'Western Agro-Climatic Zone' }
];
