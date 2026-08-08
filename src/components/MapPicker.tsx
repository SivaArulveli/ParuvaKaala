import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation, Layers, Check } from 'lucide-react';
import { PRESET_LOCATIONS } from '../lib/crops';
import { LocationInfo, Language } from '../lib/types';
import { TRANSLATIONS } from '../lib/i18n';

// Custom emerald map pin icon
const customIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="%2310b981" stroke="%23ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3" fill="%23ffffff"/></svg>',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36]
});

interface MapPickerProps {
  selectedLocation: LocationInfo;
  onSelectLocation: (loc: LocationInfo) => void;
  language: Language;
}

// Subcomponent to handle map click events
function LocationMarker({ onSelect }: { onSelect: (lat: number, lon: number) => void }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
}

// Subcomponent to smoothly pan map when location changes
function MapRecenter({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lon], 11, { duration: 1.2 });
  }, [lat, lon, map]);
  return null;
}

export default function MapPicker({ selectedLocation, onSelectLocation, language }: MapPickerProps) {
  const [mapType, setMapType] = useState<'street' | 'satellite'>('street');
  const t = TRANSLATIONS[language];

  const handleMapClick = (lat: number, lon: number) => {
    onSelectLocation({
      id: 'custom-' + Date.now(),
      name: `${lat.toFixed(3)}°N, ${lon.toFixed(3)}°E`,
      tamilName: `${lat.toFixed(3)}°N, ${lon.toFixed(3)}°E`,
      district: 'Custom Location',
      lat: parseFloat(lat.toFixed(4)),
      lon: parseFloat(lon.toFixed(4)),
      region: 'Tamil Nadu Field Coordinates'
    });
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          handleMapClick(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          alert('Geolocation error: ' + err.message);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <label className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
          <MapPin size={14} />
          {t.selectLocation}
        </label>

        <div className="flex items-center gap-2">
          {/* Map Layer Switcher */}
          <div className="bg-[#121a15] p-1 rounded-xl border border-emerald-500/20 flex items-center gap-1">
            <button
              onClick={() => setMapType('street')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                mapType === 'street'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Street
            </button>
            <button
              onClick={() => setMapType('satellite')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                mapType === 'satellite'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layers size={12} />
              Satellite
            </button>
          </div>

          {/* GPS Button */}
          <button
            onClick={handleGeolocation}
            className="px-3 py-1.5 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
          >
            <Navigation size={13} className="text-emerald-400 animate-pulse" />
            <span>{t.useMyLocation}</span>
          </button>
        </div>
      </div>

      {/* Preset District Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {PRESET_LOCATIONS.map((loc) => {
          const isSelected = selectedLocation.id === loc.id;
          return (
            <button
              key={loc.id}
              onClick={() => onSelectLocation(loc)}
              className={`p-3 rounded-2xl border text-left transition-all duration-200 ${
                isSelected
                  ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : 'bg-[#121a15]/60 border-white/5 text-gray-400 hover:border-white/20 hover:text-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="font-bold text-sm text-gray-100">
                  {language === 'en' ? loc.name : loc.tamilName}
                </p>
                {isSelected && <Check size={14} className="text-emerald-400" />}
              </div>
              <p className="text-[10px] text-gray-400 truncate mt-0.5">{loc.region}</p>
            </button>
          );
        })}
      </div>

      {/* Leaflet Interactive Map */}
      <div className="w-full h-64 md:h-72 rounded-3xl overflow-hidden border border-emerald-500/20 shadow-2xl relative">
        <MapContainer
          center={[selectedLocation.lat, selectedLocation.lon]}
          zoom={11}
          scrollWheelZoom={false}
          className="w-full h-full z-10"
        >
          {mapType === 'street' ? (
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          ) : (
            <TileLayer
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          )}

          <Marker position={[selectedLocation.lat, selectedLocation.lon]} icon={customIcon} />
          <LocationMarker onSelect={handleMapClick} />
          <MapRecenter lat={selectedLocation.lat} lon={selectedLocation.lon} />
        </MapContainer>

        {/* Selected Coordinates Overlay */}
        <div className="absolute bottom-3 left-3 z-20 px-3 py-1.5 bg-[#090d0b]/80 backdrop-blur-md border border-white/10 rounded-xl text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
          <MapPin size={12} />
          <span>{selectedLocation.lat.toFixed(4)}° N, {selectedLocation.lon.toFixed(4)}° E</span>
        </div>
      </div>
    </div>
  );
}
