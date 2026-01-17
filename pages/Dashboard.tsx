
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_TRANSACTIONS, MOCK_CURRENT_USER } from '../mockData';
import { 
  CheckCircle2, 
  ArrowUpRight, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  PlusCircle, 
  Activity, 
  Loader2, 
  X, 
  Globe, 
  Cpu, 
  ShieldAlert,
  ChevronLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Added DashboardProps interface to fix type error in App.tsx
interface DashboardProps {
  role: 'RENTER' | 'OWNER';
}

const Dashboard: React.FC<DashboardProps> = ({ role }) => {
  const navigate = useNavigate();
  // Initialize tab based on the current user role to provide a relevant starting view
  const [tab, setTab] = useState<'renting' | 'lending'>(role === 'OWNER' ? 'lending' : 'renting');
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [showNetworkModal, setShowNetworkModal] = useState(false);

  // Sync tab if user role is toggled from the navbar while on the dashboard
  useEffect(() => {
    setTab(role === 'OWNER' ? 'lending' : 'renting');
  }, [role]);

  const handleCheckNetwork = async () => {
    setIsStatusLoading(true);
    // Simulate deep network audit
    await new Promise(r => setTimeout(r, 1500));
    setIsStatusLoading(false);
    setShowNetworkModal(true);
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-20 pb-40">
      <div className="absolute inset-0 eclipse-glow pointer-events-none -z-10" />

      {/* Network Status Modal Overlay */}
      {showNetworkModal && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowNetworkModal(false)} />
          <div className="relative w-full max-w-lg bg-[#0a0c12] border border-white/10 rounded-[3rem] p-8 sm:p-12 shadow-[0_0_100px_rgba(168,75,201,0.2)] animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setShowNetworkModal(false)}
              className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-6 mb-10">
              <div className="w-16 h-16 bg-[#A84bc9]/20 rounded-[1.5rem] flex items-center justify-center text-[#A84bc9]">
                <Globe size={32} className="animate-pulse" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Network Health</h2>
                <p className="text-[#A84bc9] text-[10px] font-black uppercase tracking-[0.2em]">Operational Status: Optimal</p>
              </div>
            </div>

            <div className="space-y-6">
              <NetworkMetric icon={<Cpu size={18} />} label="Mesh Latency" value="24ms" status="Excellent" />
              <NetworkMetric icon={<ShieldCheck size={18} />} label="Encryption" value="AES-256-GCM" status="Quantum-Safe" />
              <NetworkMetric icon={<Activity size={18} />} label="Nodes Online" value="1,242" status="+12 this hour" />
              <NetworkMetric icon={<ShieldAlert size={18} />} label="Escrow Sync" value="Verified" status="Block 4,281,092" />
            </div>

            <button 
              onClick={() => setShowNetworkModal(false)}
              className="w-full mt-12 bg-white text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:brightness-90 transition-all active:scale-95 shadow-2xl"
            >
              Close Diagnostic
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => navigate('/explore')}
        className="flex items-center gap-3 text-white/30 hover:text-white transition-all mb-8 sm:mb-12 font-black uppercase text-[10px] sm:text-xs tracking-widest relative z-50"
      >
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center">
          <ChevronLeft size={18} className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
        </div>
        Back
      </button>

      {/* Dynamic Dashboard Header */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 sm:gap-16 mb-16 sm:mb-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-7xl font-black text-white tracking-tighter uppercase italic leading-none mb-4 sm:mb-6">
            Operational <br className="hidden sm:block" /><span className="text-white/20">Control.</span>
          </h1>
          <p className="text-sm sm:text-lg text-white/40 font-bold uppercase tracking-[0.2em]">
            Monitor active node handovers and reputation growth in real-time.
          </p>
        </div>

        <div className="flex bg-white/5 p-1.5 sm:p-2 rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-xl w-full md:w-auto">
          <button 
            onClick={() => setTab('renting')}
            className={`flex-1 px-6 sm:px-12 py-3 sm:py-5 rounded-xl sm:rounded-[1.6rem] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] transition-all ${tab === 'renting' ? 'bg-[#A84bc9] shadow-2xl text-white' : 'text-white/30 hover:text-white/50'}`}
          >
            Inbound
          </button>
          <button 
            onClick={() => setTab('lending')}
            className={`flex-1 px-6 sm:px-12 py-3 sm:py-5 rounded-xl sm:rounded-[1.6rem] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] transition-all ${tab === 'lending' ? 'bg-[#A84bc9] shadow-2xl text-white' : 'text-white/30 hover:text-white/50'}`}
          >
            Outbound
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12">
        {/* Main List Column */}
        <div className="lg:col-span-8 space-y-8 sm:space-y-10">
          <div className="flex items-center justify-between px-2 sm:px-4">
            <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-widest italic">Live Operations</h2>
            <div className="flex items-center gap-2 sm:gap-3 bg-[#A84bc9]/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#A84bc9]/20">
               <div className="w-1.5 h-1.5 rounded-full bg-[#A84bc9] animate-ping" />
               <span className="text-[8px] sm:text-[9px] font-black text-[#A84bc9] uppercase tracking-widest">Handover pending</span>
            </div>
          </div>

          {tab === 'renting' ? (
            MOCK_TRANSACTIONS.map(tx => (
              <div key={tx.id} className="bg-[#0a0c12] rounded-[2rem] sm:rounded-[3.5rem] overflow-hidden card-3d border border-white/5 group">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-72 relative overflow-hidden h-48 sm:h-64 md:h-auto">
                    <img src="https://picsum.photos/seed/camera/600/600" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c12] via-transparent to-transparent hidden md:block" />
                    <div className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-[#A84bc9] text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] shadow-2xl ring-1 ring-white/20">
                      Handover Desk
                    </div>
                  </div>
                  <div className="flex-1 p-6 sm:p-12">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 sm:mb-8">
                       <div>
                          <h3 className="text-xl sm:text-3xl font-black text-white mb-1 sm:mb-2 uppercase tracking-tight italic leading-tight">{tx.itemTitle}</h3>
                          <p className="text-white/30 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em]">Final Return: {tx.endDate}</p>
                       </div>
                       <div className="sm:text-right">
                          <p className="text-2xl sm:text-3xl font-black text-[#A84bc9] tracking-tighter">${tx.totalAmount}</p>
                          <p className="text-[8px] sm:text-[9px] font-black text-white/20 uppercase tracking-widest">In Escrow</p>
                       </div>
                    </div>
                    
                    <div className="pt-6 sm:pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
                       <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
                          <div className="flex -space-x-3 sm:-space-x-4">
                            <img src={MOCK_CURRENT_USER.avatar} className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-[#0a0c12] shadow-2xl" alt="" />
                            <img src="https://picsum.photos/seed/provider/100" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-[#0a0c12] shadow-2xl" alt="" />
                          </div>
                          <div>
                            <p className="text-[8px] sm:text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Counterparty</p>
                            <p className="text-xs font-black text-white uppercase tracking-widest">Sarah Miller</p>
                          </div>
                       </div>
                       <Link to={`/handover/${tx.id}`} className="w-full sm:w-auto flex items-center justify-center gap-3 sm:gap-4 bg-white text-[#06070a] px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-[1.8rem] font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] hover:brightness-95 transition-all shadow-2xl active:scale-95">
                          Initiate Verification <ArrowUpRight size={18} className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
                       </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-[#0a0c12]/50 p-12 sm:p-20 rounded-[2.5rem] sm:rounded-[4rem] border-2 border-dashed border-white/5 text-center">
               <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-10 border border-white/5">
                 <PlusCircle className="text-white/10 w-8 h-8 sm:w-12 sm:h-12" size={32} />
               </div>
               <h3 className="text-xl sm:text-2xl font-black text-white mb-2 sm:mb-4 uppercase tracking-widest italic">Inventory Offline</h3>
               <p className="text-white/30 font-bold uppercase tracking-widest text-[10px] sm:text-xs mb-8 sm:mb-12">Monetize your unused neighborhood resources today.</p>
               <Link to="/add" className="inline-block bg-white text-[#06070a] px-10 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-[1.8rem] font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] shadow-2xl">Deploy Asset</Link>
            </div>
          )}
        </div>

        {/* Sidebar Analytical Bento Widgets */}
        <div className="lg:col-span-4 space-y-10 sm:space-y-12">
          {/* Trust Metric Widget */}
          <div className="bg-[#0a0c12] p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[4rem] border border-white/5 relative overflow-hidden group glow-border">
            <div className="flex justify-between items-center mb-8 sm:mb-10">
               <div>
                  <h3 className="font-black text-white uppercase tracking-widest text-[10px] sm:text-xs italic">Reputation</h3>
                  <p className="text-[8px] sm:text-[10px] text-white/20 font-black uppercase tracking-[0.2em]">Community Score</p>
               </div>
               <div className="bg-emerald-500/10 text-emerald-400 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-emerald-500/20">
                 <Activity size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
               </div>
            </div>
            
            <div className="flex items-end gap-1.5 sm:gap-2 h-32 sm:h-40 mb-8 sm:mb-10">
              {[30, 50, 40, 70, 45, 85, 92].map((h, i) => (
                <div 
                  key={i} 
                  className={`flex-1 rounded-t-lg sm:rounded-t-xl transition-all duration-1000 group-hover:bg-[#A84bc9] ${i === 6 ? 'bg-[#A84bc9] shadow-[0_0_30px_rgba(168,75,201,0.5)]' : 'bg-white/5'}`} 
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-4xl sm:text-6xl font-black text-white tracking-tighter italic">{MOCK_CURRENT_USER.trustScore}%</span>
              <div className="text-right">
                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-emerald-400">+5.2 Node Power</span>
                <p className="text-[10px] sm:text-xs font-black text-white/20 uppercase tracking-widest">Tier 2 Provider</p>
              </div>
            </div>
          </div>

          {/* Security Status Widget */}
          <div className="bg-[#A84bc9] p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[4rem] text-white relative overflow-hidden shadow-[0_30px_100px_rgba(168,75,201,0.3)] ring-1 ring-white/20">
            <div className="absolute top-[-40px] right-[-40px] opacity-10">
              <ShieldCheck size={160} className="w-[160px] h-[160px] sm:w-[200px] sm:h-[200px]" />
            </div>
            <h3 className="font-black text-white/60 mb-8 sm:mb-10 uppercase tracking-[0.2em] text-[9px] sm:text-[10px]">Security Matrix</h3>
            <div className="space-y-6 sm:space-y-8">
               <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/20">
                    <Zap className="text-white w-[18px] h-[18px] sm:w-5 sm:h-5" size={18} fill="currentColor" />
                  </div>
                  <div>
                     <p className="font-black text-xs sm:text-sm uppercase tracking-widest">Biometric Validated</p>
                     <p className="text-[8px] sm:text-[9px] text-white/50 font-black uppercase tracking-widest mt-1">Liveness active</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/20">
                    <ShieldCheck className="text-white w-[18px] h-[18px] sm:w-5 sm:h-5" size={18} />
                  </div>
                  <div>
                     <p className="font-black text-xs sm:text-sm uppercase tracking-widest">Escrow Synchronized</p>
                     <p className="text-[8px] sm:text-[9px] text-white/50 font-black uppercase tracking-widest mt-1">Node link secured</p>
                  </div>
               </div>
            </div>
            <button 
              onClick={handleCheckNetwork}
              disabled={isStatusLoading}
              className="w-full mt-10 sm:mt-12 bg-white text-[#06070a] py-4 sm:py-5 rounded-xl sm:rounded-[1.8rem] font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] hover:brightness-95 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-80"
            >
               {isStatusLoading ? <Loader2 size={18} className="animate-spin" /> : 'Network Status'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NetworkMetric = ({ icon, label, value, status }: { icon: React.ReactNode, label: string, value: string, status: string }) => (
  <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
    <div className="flex items-center gap-4">
      <div className="text-[#A84bc9]">{icon}</div>
      <div>
        <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">{label}</p>
        <p className="text-xs font-black text-white uppercase italic">{value}</p>
      </div>
    </div>
    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">{status}</span>
  </div>
);

export default Dashboard;
