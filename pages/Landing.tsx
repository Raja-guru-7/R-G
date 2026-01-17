
import React from 'react';
import { ShieldCheck, Video, UserCheck, Wallet, Camera, Hammer, Tent, ChevronRight, Zap } from 'lucide-react';

interface LandingProps {
  onLogin: () => void;
}

const Landing: React.FC<LandingProps> = ({ onLogin }) => {
  return (
    <div className="relative w-full min-h-screen overflow-y-auto bg-[#06070a] text-white flex flex-col items-center">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 eclipse-glow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] md:w-[900px] h-[300px] sm:h-[600px] md:h-[900px] bg-[#A84bc9]/10 blur-[100px] sm:blur-[180px] rounded-full animate-pulse-slow pointer-events-none" />
      
      {/* Futuristic Eclipse Centerpiece */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 sm:opacity-30">
        <div className="relative w-[20rem] h-[20rem] sm:w-[35rem] sm:h-[35rem]">
          <div className="absolute inset-0 rounded-full bg-black shadow-[0_0_100px_rgba(168,75,201,0.1)] sm:shadow-[0_0_200px_rgba(168,75,201,0.2)]" />
          <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#A84bc9]/20 via-transparent to-transparent blur-xl sm:blur-2xl" />
        </div>
      </div>

      {/* Floating Cards */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatingAsset 
          icon={<Camera className="text-[#A84bc9]" size={24} />} 
          label="Imaging Node" 
          pos="top-[25%] left-[10%]" 
          delay="0s" 
          rot="-8deg"
        />
        <FloatingAsset 
          icon={<Hammer className="text-[#A84bc9]" size={24} />} 
          label="Industry Hub" 
          pos="bottom-[35%] left-[5%]" 
          delay="2s" 
          rot="5deg"
        />
        <FloatingAsset 
          icon={<Tent className="text-[#A84bc9]" size={24} />} 
          label="Outdoor Mesh" 
          pos="top-[20%] right-[15%]" 
          delay="1s" 
          rot="10deg"
        />
        <FloatingAsset 
          icon={<Zap className="text-[#A84bc9]" size={24} />} 
          label="Energy Link" 
          pos="bottom-[25%] right-[10%]" 
          delay="3s" 
          rot="-6deg"
        />
      </div>

      {/* Pill Navigation Bar */}
      <div className="mt-6 sm:mt-10 w-full max-w-7xl px-4 sm:px-6 z-[60]">
        <div className="dark-glass rounded-full px-6 sm:px-10 py-3 sm:py-4 flex items-center justify-between shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/5 ring-1 ring-white/5">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-[#A84bc9] p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-xl shadow-[#A84bc9]/20">
              <ShieldCheck className="text-white w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-base sm:text-xl font-black tracking-tighter uppercase italic">Around<span className="text-[#A84bc9]">U</span></span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
            <button onClick={onLogin} className="hover:text-white transition-all uppercase">Protocol</button>
            <button onClick={onLogin} className="hover:text-white transition-all uppercase">Verification</button>
            <button onClick={onLogin} className="hover:text-white transition-all uppercase">Escrow</button>
            <button onClick={onLogin} className="hover:text-white transition-all uppercase">Reputation</button>
            <button onClick={onLogin} className="hover:text-white transition-all uppercase">Access Hub</button>
          </nav>

          <button 
            onClick={onLogin}
            className="bg-white text-black px-4 sm:px-8 py-2 sm:py-3 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] hover:bg-[#A84bc9] hover:text-white transition-all shadow-2xl active:scale-95"
          >
            Join Node
          </button>
        </div>
      </div>

      {/* Hero Content Section */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20">
        <div className="relative mb-6 sm:mb-8 select-none">
          <div className="text-[60px] sm:text-[120px] md:text-[160px] font-black text-white/5 italic leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[80%] whitespace-nowrap tracking-tighter">
            Completely
          </div>
          <h1 className="text-[40px] sm:text-[80px] md:text-[110px] font-black text-white tracking-tighter leading-none italic z-10 relative">
            Autonomous.
          </h1>
        </div>

        <div className="max-w-xl mx-auto space-y-8 sm:space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <p className="text-[10px] sm:text-sm md:text-base text-white/40 font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] leading-relaxed">
            Our mission is to ensure absolute safety for every neighbor. we eliminate risk through cryptographic trust.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button 
              onClick={onLogin}
              className="w-full sm:w-64 bg-[#A84bc9] text-white py-4 sm:py-5 rounded-2xl sm:rounded-[1.5rem] font-black text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] hover:brightness-110 transition-all shadow-[0_25px_60px_rgba(168,75,201,0.3)] flex items-center justify-center gap-2 sm:gap-3 group active:scale-[0.98] ring-1 ring-white/10"
            >
              Sign In <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onLogin}
              className="w-full sm:w-64 dark-glass text-white py-4 sm:py-5 rounded-2xl sm:rounded-[1.5rem] font-black text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] hover:bg-white/5 transition-all active:scale-[0.98] border border-white/10"
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-7xl mt-16 sm:mt-24 mb-10">
          <FeatureHub icon={<Video size={20} className="text-[#A84bc9]" />} title="Live Proof" sub="Node Handover" />
          <FeatureHub icon={<UserCheck size={20} className="text-[#A84bc9]" />} title="Biometrics" sub="ID Verification" />
          <FeatureHub icon={<Wallet size={20} className="text-[#A84bc9]" />} title="Escrow" sub="Risk Management" />
          <FeatureHub icon={<ShieldCheck size={20} className="text-[#A84bc9]" />} title="Reputation" sub="Trust Scoring" />
        </div>
      </div>
    </div>
  );
};

const FloatingAsset = ({ icon, label, pos, delay, rot }: any) => (
  <div className={`absolute ${pos} hidden lg:block animate-float`} style={{ animationDelay: delay, rotate: rot }}>
    <div className="dark-glass p-6 rounded-[2rem] border border-white/5 flex flex-col items-center gap-3 transition-all hover:bg-white/5 shadow-2xl">
      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
        {icon}
      </div>
      <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] whitespace-nowrap">{label}</span>
    </div>
  </div>
);

const FeatureHub = ({ icon, title, sub }: { icon: React.ReactNode, title: string, sub: string }) => (
  <div className="dark-glass p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] text-left hover:bg-white/5 transition-all group cursor-default border border-white/5 shadow-xl">
    <div className="mb-4 sm:mb-6 bg-white/5 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-[#A84bc9]/10 transition-all border border-white/5 group-hover:border-[#A84bc9]/30">
      {icon}
    </div>
    <h3 className="text-[9px] sm:text-[11px] font-black uppercase tracking-widest text-white mb-1 sm:mb-2 italic">{title}</h3>
    <p className="text-[7px] sm:text-[8px] text-white/20 font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] whitespace-nowrap">{sub}</p>
  </div>
);

export default Landing;
