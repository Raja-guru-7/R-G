
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MOCK_ITEMS } from '../mockData';
import { MapPin, Filter, Star, Search, Zap, X, LayoutGrid, Map as MapIcon, LocateFixed, Navigation, Heart } from 'lucide-react';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const Explore: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [maxDistance, setMaxDistance] = useState<number>(5);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());

  const toggleSave = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const newSaved = new Set(savedItems);
    if (newSaved.has(id)) newSaved.delete(id);
    else newSaved.add(id);
    setSavedItems(newSaved);
  };

  const syncLocation = () => {
    if (!navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsLocating(false);
      },
      () => setIsLocating(false)
    );
  };

  useEffect(() => {
    syncLocation();
  }, []);

  const itemsWithDistance = useMemo(() => {
    return MOCK_ITEMS.map((item, index) => {
      let lat = item.location.lat;
      let lng = item.location.lng;
      if (userLocation) {
        const latOffset = (Math.sin(index * 1.5) * 0.012);
        const lngOffset = (Math.cos(index * 1.5) * 0.012);
        lat = userLocation.lat + latOffset;
        lng = userLocation.lng + lngOffset;
      }
      const distance = userLocation 
        ? calculateDistance(userLocation.lat, userLocation.lng, lat, lng)
        : index * 0.3 + 0.1;
      return { 
        ...item, 
        location: { ...item.location, lat, lng },
        calculatedDistance: distance 
      };
    });
  }, [userLocation]);

  const filteredItems = itemsWithDistance.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesDistance = item.calculatedDistance <= maxDistance;
    const matchesPrice = item.pricePerDay <= maxPrice;
    return matchesSearch && matchesCategory && matchesDistance && matchesPrice;
  }).sort((a, b) => a.calculatedDistance - b.calculatedDistance);

  const pricePercentage = (maxPrice / 500) * 100;
  const distancePercentage = (maxDistance / 20) * 100;

  return (
    <div className="relative w-full max-w-full overflow-x-hidden min-h-screen flex flex-col">
      <div className="absolute inset-0 eclipse-glow pointer-events-none -z-10 overflow-hidden" />

      {showFilters && (
        <div className="fixed inset-0 z-[2000] flex justify-end overflow-hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowFilters(false)} />
          <div className="relative w-full sm:max-w-[440px] h-full bg-[#0a0c12] border-l border-white/5 p-6 sm:p-12 shadow-[0_0_100px_rgba(0,0,0,1)] animate-in slide-in-from-right duration-300 overflow-y-auto overflow-x-hidden">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase italic tracking-tighter">Filters</h2>
              <button onClick={() => setShowFilters(false)} className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl hover:bg-white/10">
                <X size={20} className="text-white/80" />
              </button>
            </div>
            
            <div className="space-y-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Category</label>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {['Electronics', 'Tools', 'Camping', 'Vehicle', 'Media', 'Home'].map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)} 
                      className={`px-3 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-[#A84bc9] text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Price</label>
                  <span className="text-[9px] font-black text-white uppercase tracking-widest bg-[#A84bc9]/30 px-3 py-1 rounded-full border border-[#A84bc9]/40 italic">Under ${maxPrice}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="500" 
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))} 
                  className="cinematic-slider" 
                  style={{ background: `linear-gradient(to right, #A84bc9 0%, #A84bc9 ${pricePercentage}%, rgba(255, 255, 255, 0.1) ${pricePercentage}%, rgba(255, 255, 255, 0.1) 100%)` }} 
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Distance</label>
                  <span className="text-[9px] font-black text-white uppercase tracking-widest bg-[#A84bc9]/30 px-3 py-1 rounded-full border border-[#A84bc9]/40 italic">{maxDistance} KM</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  step="0.5"
                  value={maxDistance} 
                  onChange={(e) => setMaxDistance(parseFloat(e.target.value))} 
                  className="cinematic-slider" 
                  style={{ background: `linear-gradient(to right, #A84bc9 0%, #A84bc9 ${distancePercentage}%, rgba(255, 255, 255, 0.1) ${distancePercentage}%, rgba(255, 255, 255, 0.1) 100%)` }} 
                />
              </div>
            </div>

            <button onClick={() => setShowFilters(false)} className="w-full mt-12 bg-[#A84bc9] text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl transition-all italic hover:brightness-110 active:scale-95">
              Apply
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-10 pt-10 sm:pt-16 pb-8 overflow-x-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-full overflow-hidden">
            <h1 className="text-3xl sm:text-7xl font-black text-white tracking-tighter uppercase italic leading-none break-words">
              Access <span className="text-[#A84bc9]">Everything.</span>
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <p className="text-[9px] sm:text-xs text-white/40 font-bold uppercase tracking-[0.2em] leading-relaxed max-w-[280px] sm:max-w-none">
                Hyper-local resources verified by bi-directional proof.
              </p>
              <button 
                onClick={syncLocation}
                disabled={isLocating}
                className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[8px] font-black uppercase tracking-widest transition-all ${userLocation ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' : 'border-white/10 bg-white/5 text-white/40 hover:text-white'}`}
              >
                {isLocating ? <Zap size={8} className="animate-spin" /> : <Navigation size={8} className={userLocation ? "fill-current" : ""} />}
                {userLocation ? 'Network Synced' : 'Sync Node'}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex bg-[#0a0c12] p-1 rounded-xl border border-white/5 shadow-2xl shrink-0">
               <button onClick={() => setViewMode('grid')} className={`px-4 py-2 rounded-lg font-black text-[9px] uppercase tracking-widest transition-all flex items-center gap-2 ${viewMode === 'grid' ? 'bg-[#A84bc9] text-white shadow-lg' : 'text-white/30 hover:text-white/50'}`}><LayoutGrid size={12} /> Assets</button>
               <button onClick={() => setViewMode('map')} className={`px-4 py-2 rounded-lg font-black text-[9px] uppercase tracking-widest transition-all flex items-center gap-2 ${viewMode === 'map' ? 'bg-[#A84bc9] text-white shadow-lg' : 'text-white/30 hover:text-white/50'}`}><MapIcon size={12} /> Network</button>
            </div>
            <button onClick={() => setShowFilters(true)} className="shrink-0 px-5 py-2.5 bg-white text-black rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center gap-2 shadow-2xl italic hover:bg-[#A84bc9] hover:text-white transition-all"><Filter size={12} /> Filters</button>
          </div>
        </div>

        <div className="mt-8 relative group max-w-2xl overflow-hidden">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={16} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Query neighborhood assets..." 
            className="w-full pl-12 pr-4 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-[#A84bc9]/40 text-xs font-bold text-white placeholder:text-white/10 outline-none uppercase tracking-[0.2em] transition-all"
          />
        </div>
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-10 pb-40 overflow-x-hidden">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {filteredItems.map(item => (
              <Link key={item.id} to={`/item/${item.id}`} className="group relative block w-full">
                <div className="bg-[#0a0c12] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-white/5 group-hover:border-[#A84bc9]/30 transition-all card-3d h-full flex flex-col">
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c12] via-transparent to-transparent opacity-60" />
                    <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
                       <span className="bg-[#06070a]/60 backdrop-blur px-3 py-1 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-white border border-white/10">
                        {item.category}
                       </span>
                    </div>
                    <button 
                      onClick={(e) => toggleSave(e, item.id)}
                      className="absolute top-4 sm:top-6 right-4 sm:right-6 w-10 h-10 rounded-xl bg-black/40 backdrop-blur border border-white/10 flex items-center justify-center transition-all hover:scale-110 active:scale-90"
                    >
                      <Heart size={18} className={savedItems.has(item.id) ? "fill-[#A84bc9] text-[#A84bc9]" : "text-white/40"} />
                    </button>
                    {userLocation && (
                      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
                        <div className="bg-white/90 backdrop-blur-sm text-black px-2 py-0.5 rounded-full text-[7px] sm:text-[8px] font-black uppercase tracking-widest flex items-center gap-1 shadow-xl">
                          <LocateFixed size={10} className="text-[#A84bc9]" />
                          {item.calculatedDistance.toFixed(1)} KM
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-[#A84bc9] text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] mb-3">
                        <MapPin size={10} /> {item.location.address}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white uppercase italic leading-none group-hover:text-[#A84bc9] transition-colors tracking-tighter mb-4 break-words">{item.title}</h3>
                      <div className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border border-emerald-500/20 w-fit flex items-center gap-1">
                        <Star size={9} fill="currentColor" /> {item.ownerTrustScore}% Trust
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <img src={`https://picsum.photos/seed/${item.ownerId}/100`} className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl border border-white/10" alt="" />
                        <div>
                          <p className="text-[7px] sm:text-[8px] font-black text-white/20 uppercase tracking-widest">Provider</p>
                          <p className="text-[10px] font-bold text-white uppercase tracking-widest">{item.ownerName.split(' ')[0]}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl sm:text-3xl font-black text-white tracking-tighter italic leading-none">${item.pricePerDay}</p>
                        <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Daily</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="h-[50vh] sm:h-[70vh] w-full rounded-[2rem] sm:rounded-[4rem] overflow-hidden border-4 sm:border-8 border-white/5 dark-glass shadow-2xl animate-in fade-in zoom-in-95 duration-500">
            <MapContainer 
              center={userLocation ? [userLocation.lat, userLocation.lng] : [40.7128, -74.0060]} 
              zoom={14} 
              className="h-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {filteredItems.map(item => (
                <Marker key={item.id} position={[item.location.lat, item.location.lng]}>
                  <Popup>
                    <div className="p-2 w-48 bg-[#06070a] text-white rounded-2xl overflow-hidden">
                      <h4 className="font-black text-[10px] uppercase tracking-widest italic">{item.title}</h4>
                      <Link to={`/item/${item.id}`} className="block mt-2 text-center bg-[#A84bc9] text-white py-2 rounded-lg text-[8px] font-black uppercase tracking-widest">Open Node</Link>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
