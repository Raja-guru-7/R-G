
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MOCK_ITEMS } from '../mockData';
import { MapPin, Filter, Star, Search, Zap, X, ChevronRight } from 'lucide-react';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const Explore: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDistance, setSelectedDistance] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(500);

  const filteredItems = MOCK_ITEMS.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesDistance = selectedDistance ? (item.distance || 0) <= selectedDistance : true;
    const matchesPrice = item.pricePerDay <= maxPrice;
    return matchesSearch && matchesCategory && matchesDistance && matchesPrice;
  });

  const pricePercentage = (maxPrice / 500) * 100;

  return (
    <div className="relative min-h-screen pb-40">
      <div className="absolute inset-0 eclipse-glow pointer-events-none -z-10" />

      {/* Filter Sidebar Overlay */}
      {showFilters && (
        <div className="fixed inset-0 z-[2000] flex justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowFilters(false)} />
          <div className="relative w-full sm:max-w-[440px] h-full bg-[#0a0c12] border-l border-white/5 p-6 sm:p-12 shadow-[0_0_100px_rgba(0,0,0,1)] animate-in slide-in-from-right duration-300 overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase italic tracking-tighter">Asset Filters</h2>
              <button onClick={() => setShowFilters(false)} className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                {/* Fix: Removed invalid sm:size prop and added responsive Tailwind classes */}
                <X size={20} className="text-white/80 w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <div className="space-y-10 sm:space-y-14">
              {/* Category Section */}
              <div className="space-y-4 sm:space-y-6">
                <label className="text-[10px] sm:text-[11px] font-black text-white/30 uppercase tracking-[0.4em]">Category</label>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {['Electronics', 'Tools', 'Camping', 'Vehicle', 'Media', 'Home'].map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                      className={`px-4 sm:px-6 py-4 sm:py-5 rounded-xl sm:rounded-[1.4rem] text-[10px] sm:text-[11px] font-black uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-[#A84bc9] text-white shadow-lg' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Section */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] sm:text-[11px] font-black text-white/30 uppercase tracking-[0.4em]">Daily Price Range</label>
                  <span className="text-[10px] sm:text-[11px] font-black text-[#A84bc9] uppercase tracking-widest bg-[#A84bc9]/10 px-3 py-1 rounded-full border border-[#A84bc9]/20">
                    Under ${maxPrice}
                  </span>
                </div>
                <div className="relative pt-4 pb-2">
                   <input 
                    type="range" 
                    min="0" 
                    max="500" 
                    value={maxPrice} 
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="cinematic-slider"
                    style={{ 
                      background: `linear-gradient(to right, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.4) ${pricePercentage}%, rgba(255, 255, 255, 0.1) ${pricePercentage}%, rgba(255, 255, 255, 0.1) 100%)` 
                    }}
                   />
                </div>
                <div className="flex justify-between text-[10px] sm:text-[11px] font-black text-white/40 uppercase tracking-widest">
                  <span>$0</span>
                  <span>$500+</span>
                </div>
              </div>

              {/* Trust Radius Section */}
              <div className="space-y-4 sm:space-y-6">
                <label className="text-[10px] sm:text-[11px] font-black text-white/30 uppercase tracking-[0.4em]">Trust Radius</label>
                <div className="space-y-3 sm:space-y-4">
                  {[5, 10, 25, 50].map(km => (
                    <button 
                      key={km} 
                      onClick={() => setSelectedDistance(selectedDistance === km ? null : km)}
                      className={`w-full flex items-center justify-between p-4 sm:p-6 rounded-xl sm:rounded-[1.6rem] border transition-all group ${selectedDistance === km ? 'bg-[#A84bc9]/20 border-[#A84bc9]/30' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                    >
                      <span className={`text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-colors ${selectedDistance === km ? 'text-[#A84bc9]' : 'text-white/80'}`}>{km} Kilometers</span>
                      {/* Fix: Removed invalid sm:size prop and added responsive Tailwind classes */}
                      <ChevronRight size={14} className={`${selectedDistance === km ? 'text-[#A84bc9] translate-x-1' : 'text-white/20 group-hover:text-white/50'} transition-all w-3.5 h-3.5 sm:w-4 sm:h-4`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="mt-12 sm:mt-20 pb-10">
              <button 
                onClick={() => setShowFilters(false)}
                className="w-full bg-[#A84bc9] text-white py-5 sm:py-7 rounded-2xl sm:rounded-[2rem] font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] shadow-[0_20px_40px_rgba(168,75,201,0.3)] hover:brightness-110 active:scale-[0.98] transition-all"
              >
                Apply Search Params
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modern Header Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-10 sm:pt-16 pb-12 sm:pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 sm:gap-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter uppercase italic">
              Access <span className="text-[#A84bc9]">Everything</span>
            </h1>
            <p className="mt-4 sm:mt-8 text-sm sm:text-lg text-white/40 font-bold uppercase tracking-[0.2em] leading-relaxed max-w-xl">
              hyper-local resources verified by bi-directional video proof and escrow protection.
            </p>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
             <div className="bg-white/5 border border-white/10 p-3 sm:p-4 rounded-2xl sm:rounded-[2.5rem] flex items-center gap-4 sm:gap-6 pr-6 sm:pr-10 group cursor-pointer hover:bg-white/10 transition-all shadow-2xl backdrop-blur-xl">
               <div className="w-10 h-10 sm:w-14 sm:h-14 bg-[#A84bc9] rounded-full flex items-center justify-center text-white transition-all group-hover:scale-110 shadow-lg shadow-[#A84bc9]/30">
                 {/* Fix: Removed invalid sm:size prop and added responsive Tailwind classes */}
                 <Zap size={18} className="w-[18px] h-[18px] sm:w-6 sm:h-6" fill="currentColor" />
               </div>
               <div>
                 <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-[#A84bc9]">Trust Engine</p>
                 <span className="font-black text-white uppercase text-xs sm:text-sm tracking-widest">Active nodes</span>
               </div>
             </div>
          </div>
        </div>

        {/* Cinematic Search Interface */}
        <div className="mt-10 sm:mt-20 dark-glass p-2 sm:p-3 rounded-2xl sm:rounded-[2.5rem] flex flex-col md:flex-row items-center gap-2 sm:gap-3">
          <div className="relative flex-1 w-full">
            {/* Fix: Removed invalid sm:size prop and added responsive Tailwind classes */}
            <Search className="absolute left-6 sm:left-8 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5 sm:w-6 sm:h-6" size={20} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Query neighborhood assets..." 
              className="w-full pl-14 sm:pl-20 pr-6 sm:pr-10 py-4 sm:py-6 bg-white/5 border-none rounded-xl sm:rounded-[1.8rem] focus:ring-1 focus:ring-[#A84bc9]/50 text-base sm:text-lg font-bold text-white placeholder:text-white/20 shadow-inner tracking-widest uppercase outline-none"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full md:w-auto">
            <button 
              onClick={() => setShowFilters(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-10 py-4 sm:py-6 bg-white text-[#06070a] rounded-xl sm:rounded-[1.8rem] font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] hover:bg-slate-50 transition-all shadow-2xl active:scale-95"
            >
               {/* Fix: Removed invalid sm:size prop and added responsive Tailwind classes */}
               Filters <Filter size={16} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </button>
            <div className="flex bg-[#0a0c12] p-1.5 sm:p-2 rounded-xl sm:rounded-[1.8rem] border border-white/5 shadow-inner w-full sm:w-auto">
               <button onClick={() => setViewMode('grid')} className={`flex-1 sm:flex-none px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-[1.4rem] font-black text-[9px] sm:text-[10px] uppercase tracking-widest transition-all ${viewMode === 'grid' ? 'bg-[#A84bc9] text-white shadow-lg' : 'text-white/30'}`}>Assets</button>
               <button onClick={() => setViewMode('map')} className={`flex-1 sm:flex-none px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-[1.4rem] font-black text-[9px] sm:text-[10px] uppercase tracking-widest transition-all ${viewMode === 'map' ? 'bg-[#A84bc9] text-white shadow-lg' : 'text-white/30'}`}>Network</button>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Asset Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12">
            {filteredItems.map(item => (
              <Link key={item.id} to={`/item/${item.id}`} className="group relative">
                <div className="bg-[#0a0c12] rounded-[2rem] sm:rounded-[3rem] overflow-hidden card-3d border border-white/5 group-hover:border-[#A84bc9]/30">
                  <div className="relative aspect-[16/12]">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c12] via-[#0a0c12]/10 to-transparent opacity-60" />
                    <div className="absolute top-4 sm:top-8 left-4 sm:left-8">
                       <span className="bg-[#06070a]/80 backdrop-blur px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-white border border-white/10 shadow-2xl">
                        {item.category}
                       </span>
                    </div>
                  </div>
                  <div className="p-6 sm:p-10 relative">
                    <div className="flex items-center gap-2 sm:gap-3 text-[#A84bc9] text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-4 sm:mb-6">
                      {/* Fix: Removed invalid sm:size prop and added responsive Tailwind classes */}
                      <MapPin size={12} className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {item.location.address} • {item.distance}km
                    </div>
                    <h3 className="text-xl sm:text-3xl font-black text-white mb-6 sm:mb-8 group-hover:text-[#A84bc9] transition-colors uppercase italic tracking-tight leading-none">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between pt-6 sm:pt-10 border-t border-white/5">
                      <div className="flex items-center gap-3 sm:gap-4">
                         <img src={`https://picsum.photos/seed/${item.ownerId}/100`} className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl object-cover ring-1 ring-white/10 p-0.5" alt="" />
                         <div>
                            <p className="text-[8px] sm:text-[10px] font-black text-white/40 leading-none mb-1 sm:mb-1.5 uppercase tracking-widest">Provider</p>
                            <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-400 text-[8px] sm:text-[10px] font-black tracking-widest uppercase">
                              {/* Fix: Removed invalid sm:size prop and added responsive Tailwind classes */}
                              <Star size={8} className="w-2 h-2 sm:w-2.5 sm:h-2.5" fill="currentColor" /> {item.ownerTrustScore}% Trust
                            </div>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-xl sm:text-3xl font-black text-[#A84bc9] tracking-tighter">${item.pricePerDay}</p>
                         <p className="text-[8px] sm:text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Daily Rate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            {filteredItems.length === 0 && (
              <div className="col-span-full py-16 sm:py-20 text-center space-y-4">
                <div className="text-white/10 text-6xl sm:text-8xl font-black uppercase italic tracking-tighter">No Assets</div>
                <p className="text-sm sm:text-base text-white/40 font-bold uppercase tracking-[0.2em]">Adjust filters to find nearby community nodes.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="h-[400px] sm:h-[700px] w-full rounded-[2rem] sm:rounded-[4rem] overflow-hidden border-4 border-white/5 dark-glass shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            <MapContainer center={[40.7128, -74.0060]} zoom={14} className="h-full">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {filteredItems.map(item => (
                <Marker key={item.id} position={[item.location.lat, item.location.lng]}>
                  <Popup className="custom-popup">
                    <div className="p-3 sm:p-4 w-48 sm:w-56 bg-[#06070a] text-white rounded-2xl sm:rounded-3xl border border-white/10">
                      <img src={item.imageUrl} className="rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-xl" alt="" />
                      <h4 className="font-black text-[10px] sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">{item.title}</h4>
                      <Link to={`/item/${item.id}`} className="block text-center bg-[#A84bc9] text-white py-2 sm:py-3 rounded-lg sm:rounded-xl text-[8px] sm:text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all">Request Asset</Link>
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
