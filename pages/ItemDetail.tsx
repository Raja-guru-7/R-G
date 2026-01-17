
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_ITEMS } from '../mockData';
import { ChevronLeft, ShieldCheck, Info, Calendar, MapPin, Zap, ArrowRight, Star, Loader2, Wallet, ShieldAlert } from 'lucide-react';

const ItemDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = MOCK_ITEMS.find(i => i.id === id);
  const [isInitializing, setIsInitializing] = useState(false);
  const [days, setDays] = useState(2);
  const [securityStrategy, setSecurityStrategy] = useState<'insurance' | 'deposit'>('insurance');

  if (!item) return <div className="p-10 text-center font-black text-white">Item not found</div>;

  const handleCheckout = async () => {
    setIsInitializing(true);
    await new Promise(r => setTimeout(r, 2000));
    navigate('/handover/tx-1');
  };

  const rentalFee = item.pricePerDay * days;
  const trustBonus = 10;
  const depositAmount = item.depositAmount || 200;
  const insuranceFee = item.insuranceFee || 15;
  const totalDue = rentalFee + (securityStrategy === 'insurance' ? insuranceFee : 0) - trustBonus;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-32">
      <button 
        onClick={() => navigate('/explore')}
        className="flex items-center gap-3 text-white/30 hover:text-white transition-all mb-8 sm:mb-12 font-black uppercase text-[10px] sm:text-xs tracking-widest relative z-50"
      >
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center">
          <ChevronLeft size={18} className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
        </div>
        Back to network
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
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
               <MapPin size={14} /> {item.location.address} • Verified Location Node
            </div>
            <h1 className="text-3xl sm:text-6xl font-black text-white leading-tight tracking-tight mb-6 sm:mb-8 uppercase italic">
              {item.title}
            </h1>
            <p className="text-base sm:text-xl text-white/40 font-black uppercase tracking-widest text-[11px] sm:text-[13px] leading-relaxed max-w-2xl">
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
                  <button onClick={() => navigate('/profile')} className="w-full sm:w-auto bg-[#A84bc9] text-white px-8 py-4 rounded-xl sm:rounded-2xl font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95">
                    Audit Profile <ArrowRight size={16} />
                  </button>
               </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 animate-in fade-in slide-in-from-right-4 duration-700">
           <div className="sticky top-28 bg-[#0a0c12] rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 border-4 sm:border-8 border-white/5 shadow-2xl backdrop-blur-3xl">
              <div className="flex items-end gap-2 mb-8 sm:mb-10">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tighter">${item.pricePerDay}</span>
                <span className="text-white/20 font-bold mb-1.5 sm:mb-2 uppercase tracking-widest text-[10px] sm:text-xs">/ Operational Cycle</span>
              </div>

              <div className="mb-8 space-y-4">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Security Strategy</label>
                <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
                  <button 
                    onClick={() => setSecurityStrategy('insurance')}
                    className={`flex-1 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${securityStrategy === 'insurance' ? 'bg-[#A84bc9] text-white shadow-xl' : 'text-white/30 hover:text-white/50'}`}
                  >
                    <ShieldCheck size={14} /> Trust Insurance
                  </button>
                  <button 
                    onClick={() => setSecurityStrategy('deposit')}
                    className={`flex-1 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${securityStrategy === 'deposit' ? 'bg-[#A84bc9] text-white shadow-xl' : 'text-white/30 hover:text-white/50'}`}
                  >
                    <Wallet size={14} /> Full Deposit
                  </button>
                </div>
                <p className="text-[8px] font-black text-white/20 uppercase tracking-widest italic leading-relaxed">
                  {securityStrategy === 'insurance' 
                    ? "Pay a small non-refundable fee. Platform covers damages up to $1500." 
                    : "Pay a larger refundable amount. Held in smart escrow until return."}
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
                <div className="bg-white/5 p-4 sm:p-6 rounded-xl sm:rounded-[2rem] border border-white/5 hover:border-[#A84bc9]/30 transition-all cursor-pointer group shadow-inner" onClick={() => setDays(prev => (prev % 7) + 1)}>
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 rounded-xl sm:rounded-2xl flex items-center justify-center text-[#A84bc9] group-hover:bg-[#A84bc9] group-hover:text-white transition-all border border-white/10">
                           <Calendar size={18} />
                        </div>
                        <div>
                           <p className="text-[8px] sm:text-[10px] font-black text-white/30 uppercase tracking-widest">Lease Duration</p>
                           <p className="text-sm sm:text-lg font-extrabold text-white uppercase tracking-widest italic">{days} Cycles</p>
                        </div>
                     </div>
                     <ArrowRight size={18} className="text-white/20 group-hover:translate-x-1 transition-transform" />
                   </div>
                </div>

                <div className="px-2 space-y-3 sm:space-y-4">
                   <div className="flex justify-between items-center text-white/40 font-bold text-[10px] sm:text-sm uppercase tracking-widest">
                      <span>Base Rental ({days} Days)</span>
                      <span className="text-white font-black">${rentalFee}</span>
                   </div>
                   {securityStrategy === 'insurance' ? (
                     <div className="flex justify-between items-center text-white/40 font-bold text-[10px] sm:text-sm uppercase tracking-widest">
                        <span className="flex items-center gap-1.5 underline decoration-dotted decoration-2 decoration-[#A84bc9]/40 text-[#A84bc9]">Trust-Based Insurance <Info size={12} /></span>
                        <span className="text-white font-black">${insuranceFee}</span>
                     </div>
                   ) : (
                     <div className="flex justify-between items-center text-white/40 font-bold text-[10px] sm:text-sm uppercase tracking-widest">
                        <span className="flex items-center gap-1.5">Standard Security Deposit</span>
                        <span className="text-white font-black">${depositAmount} (Refundable)</span>
                     </div>
                   )}
                   <div className="flex justify-between items-center text-emerald-400 font-black text-[10px] sm:text-sm bg-emerald-400/10 px-4 py-2 rounded-xl border border-emerald-400/20 uppercase tracking-widest">
                      <span className="flex items-center gap-2"><Zap size={14} fill="currentColor" /> Network Merit Bonus</span>
                      <span>-${trustBonus}.00</span>
                   </div>
                   <div className="pt-6 border-t border-white/5 flex justify-between items-end">
                      <div>
                        <p className="text-[8px] sm:text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Escrow Total</p>
                        <p className="text-2xl sm:text-3xl font-black text-white tracking-tighter italic">${securityStrategy === 'deposit' ? depositAmount : '0.00'}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[8px] sm:text-[10px] font-black text-[#A84bc9] uppercase tracking-widest mb-1">Net Outflow</p>
                         <p className="text-3xl sm:text-4xl font-black text-[#A84bc9] tracking-tighter shadow-glow italic">${totalDue}</p>
                      </div>
                   </div>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={isInitializing}
                className="w-full bg-[#A84bc9] text-white py-5 sm:py-6 rounded-2xl sm:rounded-[2rem] font-black text-base sm:text-xl hover:brightness-110 transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-[0.98] uppercase tracking-widest italic"
              >
                 {isInitializing ? <Loader2 className="animate-spin" size={24} /> : <>Initialize Protocol <ShieldCheck size={20} /></>}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
