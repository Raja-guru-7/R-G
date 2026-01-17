
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ShieldCheck, Star, CheckCircle2, Award, History, Users, ArrowUpRight } from 'lucide-react';
import { MOCK_CURRENT_USER } from '../mockData';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-6 pt-12 pb-32">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-3 text-white/30 hover:text-white transition-all mb-12 font-black uppercase text-[10px] tracking-widest"
      >
        <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
          <ChevronLeft size={20} />
        </div>
        Back
      </button>

      {/* Hero: Recalibrated Trust Meter */}
      <div className="relative mb-20">
        <div className="bg-[#0a0c12] rounded-[3.5rem] p-10 sm:p-14 border border-white/5 shadow-2xl overflow-hidden group">
          <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#A84bc9]/5 blur-[120px] rounded-full group-hover:bg-[#A84bc9]/10 transition-all duration-700 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-10 sm:gap-16 relative z-10">
            {/* Meter Section */}
            <div className="relative flex-shrink-0">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border-[10px] border-white/5 flex items-center justify-center relative shadow-inner">
                 <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle 
                      cx="50%" cy="50%" r="42%" 
                      fill="transparent" 
                      stroke="#A84bc9" 
                      strokeWidth="10" 
                      strokeDasharray="527" 
                      strokeDashoffset={527 * (1 - 0.99)}
                      className="transition-all duration-1000 ease-out"
                    />
                 </svg>
                 <div className="text-center">
                    <span className="text-5xl sm:text-6xl font-black text-white italic tracking-tighter">99<span className="text-2xl">%</span></span>
                    <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mt-1">Trust Meter</p>
                 </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 shadow-2xl whitespace-nowrap border border-white/10">
                 <ShieldCheck size={12} /> Tier 1 Node
              </div>
            </div>

            {/* Info Section */}
            <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start justify-center">
              <div className="mb-6 sm:mb-8">
                <h1 className="text-5xl sm:text-7xl font-black text-white uppercase italic tracking-tighter mb-4 leading-none">
                  {MOCK_CURRENT_USER.name}
                </h1>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4">
                <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/5 flex items-center gap-3">
                   <Users size={16} className="text-[#A84bc9]" />
                   <span className="text-[10px] font-black text-white/60 tracking-widest uppercase">42 Successful Handovers</span>
                </div>
                <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/5 flex items-center gap-3">
                   <Award size={16} className="text-amber-400" />
                   <span className="text-[10px] font-black text-white/60 tracking-widest uppercase">Master Handler Badge</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-white uppercase tracking-widest italic">Reputation Feed</h2>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(s => <Star key={s} size={12} className="text-amber-400 fill-amber-400" />)}
            </div>
          </div>
          <div className="space-y-6">
            <ReviewCard 
              name="Marcus Chen" 
              comment="Extremely careful with my Sony A7III. Returned it cleaner than it was! Highly recommended node."
              item="Sony A7III Camera"
            />
            <ReviewCard 
              name="Sarah Miller" 
              comment="Punctual and followed all protocol steps perfectly. The video verification was smooth."
              item="Heavy Duty Drill"
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-black text-white uppercase tracking-widest italic mb-8">Operational History</h2>
          <div className="bg-white/5 rounded-[3rem] border border-white/5 p-8 sm:p-10">
            <div className="space-y-8">
               <HistoryItem label="Nintendo Switch OLED" status="Returned" date="2 days ago" />
               <HistoryItem label="Professional Steam Cleaner" status="Returned" date="1 week ago" />
               <HistoryItem label="Camping Tent (4-Person)" status="Returned" date="Oct 12, 2023" />
            </div>
            <button className="w-full mt-12 py-5 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white hover:bg-white/5 transition-all italic">View Deep Ledger Access</button>
          </div>
        </section>
      </div>

      <div className="mt-20">
        <h2 className="text-xl font-black text-white uppercase tracking-widest italic mb-8">Verified Credentials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <CredentialCard label="Aadhaar" status="Verified" date="Verified Oct 2023" />
          <CredentialCard label="College ID" status="Linked" date="IIT Delhi Node" />
          <CredentialCard label="Mobile" status="OTP Verified" date="+91 ••••••4210" />
        </div>
      </div>
    </div>
  );
};

const CredentialCard = ({ label, status, date }: { label: string, status: string, date: string }) => (
  <div className="bg-[#0a0c12] p-8 rounded-[2.5rem] border border-white/5 hover:border-[#A84bc9]/30 transition-all group">
    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
      <CheckCircle2 size={24} />
    </div>
    <h3 className="text-xs font-black text-white uppercase tracking-widest mb-1">{label}</h3>
    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">{status}</p>
    <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{date}</p>
  </div>
);

const ReviewCard = ({ name, comment, item }: { name: string, comment: string, item: string }) => (
  <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-colors">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-3">
        <img src={`https://picsum.photos/seed/${name}/100`} className="w-10 h-10 rounded-xl" alt="" />
        <span className="text-[11px] font-black text-white uppercase tracking-widest italic">{name}</span>
      </div>
      <span className="text-[9px] font-black text-[#A84bc9] uppercase tracking-widest">{item}</span>
    </div>
    <p className="text-[11px] text-white/40 font-bold uppercase tracking-widest leading-relaxed">"{comment}"</p>
  </div>
);

const HistoryItem = ({ label, status, date }: { label: string, status: string, date: string }) => (
  <div className="flex items-center justify-between group cursor-pointer">
    <div className="flex items-center gap-6">
      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_100px_rgba(16,185,129,0.5)]" />
      <div>
        <p className="text-[11px] font-black text-white uppercase tracking-widest">{label}</p>
        <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">{date}</p>
      </div>
    </div>
    <ArrowUpRight size={16} className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
  </div>
);

export default Profile;
