
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_ITEMS } from '../mockData';
import { ChevronLeft, ShieldCheck, Info, Calendar, MapPin, Zap, ArrowRight, Star, Loader2 } from 'lucide-react';

const ItemDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = MOCK_ITEMS.find(i => i.id === id);
  const [isInitializing, setIsInitializing] = useState(false);
  const [days, setDays] = useState(2);

  if (!item) return <div className="p-10 text-center font-black text-white">Item not found</div>;

  const handleCheckout = async () => {
    setIsInitializing(true);
    // Simulate smart contract generation and payment processing
    await new Promise(r => setTimeout(r, 2000));
    navigate('/handover/tx-1');
  };

  const rentalFee = item.pricePerDay * days;
  const trustBonus = 10;
  const totalDue = rentalFee + item.insuranceFee - trustBonus;

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-8 sm:pt-12 pb-32">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-3 text-white/30 hover:text-white transition-all mb-8 sm:mb-12 font-black uppercase text-[10px] sm:text-xs tracking-widest"
      >
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center">
          <ChevronLeft size={18} className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
        </div>
        Back to network
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left: Gallery & Narrative */}
        <div className="lg:col-span-7 space-y-8 sm:space-y-12 animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="bg-[#0a0c12] rounded-[2rem] sm:rounded-[3rem] overflow-hidden border-4 sm:border-8 border-white/5 relative group shadow-2xl">
            <img src={item.imageUrl} alt={item.title} className="w-full aspect-[4/3] object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000" />
            <div className="absolute top-6 sm:top-10 left-6 sm:left-10">
              <span className="bg-[#A84bc9]/90 backdrop-blur px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest text-white border border-white/10 shadow-2xl">
                {item.category}
              </span>
            </div>
          </div>

          <div className="px-0 sm:px-4">
            <div className="flex items-center gap-2 text-[#A84bc9] font-black uppercase tracking-widest text-[10px] sm:text-xs mb-4">
               <MapPin size={14} /> {item.location.address}
            </div>
            <h1 className="text-3xl sm:text-6xl font-black text-white leading-tight tracking-tight mb-6 sm:mb-8 uppercase italic">
              {item.title}
            </h1>
            <p className="text-base sm:text-xl text-white/40 font-medium leading-relaxed max-w-2xl uppercase tracking-wider text-[11px] sm:text-[13px] font-black">
              {item.description}
            </p>

            <div className="mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-white/5">
               <h3 className="text-xl sm:text-2xl font-black text-white mb-6 sm:mb-8 uppercase italic tracking-widest">Node Reputation</h3>
               <div className="bg-white/5 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 backdrop-blur-xl group hover:border-[#A84bc9]/20 transition-all">
                  <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
                    <img src={`https://picsum.photos/seed/${item.ownerId}/100`} className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-[1.5rem] border-2 sm:border-4 border-white/10 shadow-xl group-hover:scale-105 transition-all" alt="" />
                    <div>
                      <h4 className="text-lg sm:text-xl font-extrabold text-white uppercase italic tracking-widest">{item.ownerName}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                          {item.ownerTrustScore}% Network Trust
                        </div>
                        <span className="text-[10px] text-white/20 font-black uppercase tracking-widest">Provider Node</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full sm:w-auto bg-[#A84bc9] text-white px-8 py-4 rounded-xl sm:rounded-2xl font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#A84bc9]/20">
                    Audit Profile <ArrowRight size={16} />
                  </button>
               </div>
            </div>
          </div>
        </div>

        {/* Right: Checkout Card */}
        <div className="lg:col-span-5 animate-in fade-in slide-in-from-right-4 duration-700">
           <div className="sticky top-28 bg-[#0a0c12] rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 border-4 sm:border-8 border-white/5 shadow-2xl backdrop-blur-3xl">
              <div className="flex items-end gap-2 mb-8 sm:mb-10">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tighter">${item.pricePerDay}</span>
                <span className="text-white/20 font-bold mb-1.5 sm:mb-2 uppercase tracking-widest text-[10px] sm:text-xs">/ Operational Cycle</span>
              </div>

              <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
                <div 
                  className="bg-white/5 p-4 sm:p-6 rounded-xl sm:rounded-[2rem] border border-white/5 hover:border-[#A84bc9]/30 transition-all cursor-pointer group shadow-inner"
                  onClick={() => setDays(prev => (prev % 7) + 1)} // Dummy interaction to change duration
                >
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 rounded-xl sm:rounded-2xl shadow-sm flex items-center justify-center text-[#A84bc9] group-hover:bg-[#A84bc9] group-hover:text-white transition-all border border-white/10">
                           <Calendar size={18} className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
                        </div>
                        <div>
                           <p className="text-[8px] sm:text-[10px] font-black text-white/30 uppercase tracking-widest">Lease Duration</p>
                           <p className="text-sm sm:text-lg font-extrabold text-white uppercase tracking-widest italic">{days} Cycles (Tap to change)</p>
                        </div>
                     </div>
                     <ArrowRight size={18} className="text-white/20 group-hover:translate-x-1 transition-transform w-[18px] h-[18px] sm:w-5 sm:h-5" />
                   </div>
                </div>

                <div className="px-2 space-y-3 sm:space-y-4">
                   <div className="flex justify-between items-center text-white/40 font-bold text-[10px] sm:text-sm uppercase tracking-widest">
                      <span>Base Rental ({days} Days)</span>
                      <span className="text-white font-black">${rentalFee}</span>
                   </div>
                   <div className="flex justify-between items-center text-white/40 font-bold text-[10px] sm:text-sm uppercase tracking-widest">
                      <span className="flex items-center gap-1.5 underline decoration-dotted decoration-2 decoration-[#A84bc9]/40">Protocol Insurance <Info size={12} className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#A84bc9]" /></span>
                      <span className="text-white font-black">${item.insuranceFee}</span>
                   </div>
                   <div className="flex justify-between items-center text-emerald-400 font-black text-[10px] sm:text-sm bg-emerald-400/10 px-4 py-2 rounded-xl border border-emerald-400/20 uppercase tracking-widest">
                      <span className="flex items-center gap-2"><Zap size={14} fill="currentColor" /> Network Merit Bonus</span>
                      <span>-${trustBonus}.00</span>
                   </div>
                   <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 sm:gap-0">
                      <div className="text-center sm:text-left">
                        <p className="text-[8px] sm:text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Escrow Deposit</p>
                        <p className="text-2xl sm:text-3xl font-black text-white tracking-tighter italic">$0.00</p>
                      </div>
                      <div className="text-center sm:text-right">
                         <p className="text-[8px] sm:text-[10px] font-black text-[#A84bc9] uppercase tracking-widest mb-1">Final Settlement</p>
                         <p className="text-3xl sm:text-4xl font-black text-[#A84bc9] tracking-tighter shadow-glow italic">${totalDue}</p>
                      </div>
                   </div>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={isInitializing}
                className="w-full bg-[#A84bc9] text-white py-5 sm:py-6 rounded-2xl sm:rounded-[2rem] font-black text-base sm:text-xl hover:brightness-110 transition-all shadow-[0_20px_40px_rgba(168,75,201,0.3)] flex items-center justify-center gap-3 active:scale-[0.98] uppercase tracking-widest italic"
              >
                 {isInitializing ? <Loader2 className="animate-spin" size={24} /> : <>Initialize Handover <ShieldCheck size={20} className="w-5 h-5 sm:w-6 sm:h-6" /></>}
              </button>

              <p className="mt-6 sm:mt-8 text-center text-white/20 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] leading-relaxed">
                 Encrypted Escrow Active • Node Verification Required <br /> Peer-to-Peer Protocol v2.5
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
