
import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Star, MapPin, Zap, LayoutGrid, ArrowRight, Wallet, Info, Search } from 'lucide-react';
import { MOCK_ITEMS } from '../mockData';

const SavedAssets: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Simulate saved items
  const baseSavedItems = useMemo(() => MOCK_ITEMS.slice(0, 6), []);

  const filteredItems = useMemo(() => {
    return baseSavedItems.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, baseSavedItems]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-40">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-3 text-white/30 hover:text-white transition-all mb-12 font-black uppercase text-[10px] tracking-widest"
      >
        <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
          <ChevronLeft size={20} />
        </div>
        Back
      </button>

      <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic mb-4">Monitored <span className="text-[#A84bc9]">Assets</span></h1>
          <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">Shortlisted nodes for upcoming operational requirements.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
           <div className="relative w-full sm:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={14} />
              <input 
                type="text" 
                placeholder="Query Watchlist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-[#A84bc9]/40 transition-all"
              />
           </div>
           <button className="w-full sm:w-auto bg-white/5 px-8 py-4 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all flex items-center justify-center gap-3 italic">
              <LayoutGrid size={16} /> Compare Nodes
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-[#0a0c12] rounded-[2.5rem] border border-white/5 group relative overflow-hidden flex flex-col h-full shadow-2xl transition-all hover:border-[#A84bc9]/30 card-3d">
            <div className="relative aspect-[4/3] overflow-hidden">
               <img src={item.imageUrl} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" alt="" />
               <div className="absolute top-4 left-4 bg-emerald-500/80 backdrop-blur px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-white">Available Now</div>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-white/20 text-[8px] font-black uppercase tracking-widest mb-2">
                  <MapPin size={10} /> {item.location.address}
                </div>
                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter leading-tight mb-4 group-hover:text-[#A84bc9] transition-colors">{item.title}</h3>
                <div className="flex items-center gap-2 bg-[#A84bc9]/10 border border-[#A84bc9]/20 px-3 py-1 rounded-full w-fit">
                   <Star size={10} className="text-[#A84bc9] fill-[#A84bc9]" />
                   <span className="text-[9px] font-black text-[#A84bc9] uppercase tracking-widest">{item.ownerTrustScore}% Trust Score</span>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                 <div className="flex justify-between items-center text-white/30 font-black text-[10px] uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Wallet size={12} /> Min. Deposit</span>
                    <span className="text-white">${item.depositAmount}</span>
                 </div>
                 <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-0.5">Daily Rent</p>
                      <p className="text-2xl font-black text-white tracking-tighter italic">${item.pricePerDay}</p>
                    </div>
                    <Link to={`/item/${item.id}`} className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center hover:bg-[#A84bc9] hover:text-white transition-all">
                       <ArrowRight size={20} />
                    </Link>
                 </div>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="text-white/20 font-black uppercase tracking-widest italic">No matching resources found in monitored mesh.</p>
          </div>
        )}

        <div className="bg-white/5 rounded-[2.5rem] border-2 border-dashed border-white/5 p-8 flex flex-col items-center justify-center text-center opacity-40 hover:opacity-100 transition-opacity min-h-[400px]">
           <Zap size={40} className="text-white/20 mb-6" />
           <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Add New Observation</p>
           <Link to="/explore" className="mt-8 text-[9px] font-black text-[#A84bc9] uppercase tracking-widest flex items-center gap-2">Explore Mesh <ArrowRight size={14} /></Link>
        </div>
      </div>
    </div>
  );
};

export default SavedAssets;
