
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ShieldCheck, Lock, CreditCard, Eye, Bell, Smartphone, UserCheck, Video, Database, KeyRound, Fingerprint, Mail } from 'lucide-react';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-6 pt-12 pb-32">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-3 text-white/30 hover:text-white transition-all mb-12 font-black uppercase text-[10px] tracking-widest"
      >
        <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
          <ChevronLeft size={20} />
        </div>
        Back
      </button>

      <div className="mb-16">
        <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic mb-4">Security <span className="text-white/20">& Settings</span></h1>
        <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">Manage your node parameters and encryption protocols.</p>
      </div>

      <div className="space-y-10">
        {/* Identity Verification */}
        <section className="bg-[#0a0c12] rounded-[3rem] p-8 sm:p-10 border border-white/5 shadow-2xl">
          <div className="flex items-center gap-6 mb-10">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-[1.2rem] flex items-center justify-center text-emerald-400">
               <UserCheck size={28} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-widest italic">Identity Hub</h2>
              <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">Global Status: Fully Authenticated</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Government ID</p>
                  <p className="text-xs font-black text-white uppercase italic mt-1">Verified</p>
                </div>
                <ShieldCheck size={20} className="text-emerald-400" />
             </div>
             <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Face Match</p>
                  <p className="text-xs font-black text-white uppercase italic mt-1">Liveness Passed</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                </div>
             </div>
          </div>
        </section>

        {/* Password & Access */}
        <section className="bg-[#0a0c12] rounded-[3rem] p-8 sm:p-10 border border-white/5 shadow-2xl">
          <h2 className="text-xl font-black text-white uppercase tracking-widest italic mb-10 flex items-center gap-4">
            <KeyRound size={20} className="text-[#A84bc9]" /> Access Protocols
          </h2>
          <div className="space-y-8">
            <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 flex items-center justify-between group cursor-pointer hover:border-[#A84bc9]/30 transition-all">
              <div className="flex items-center gap-6">
                <Lock size={20} className="text-white/20" />
                <div>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Master Password</p>
                  <p className="text-xs font-black text-white uppercase italic mt-1">Change Encryption Key</p>
                </div>
              </div>
              <ChevronLeft size={16} className="text-white/20 rotate-180" />
            </div>
            <ToggleItem 
              icon={<Fingerprint size={18} />} 
              label="Biometric Login" 
              sub="Use FaceID/TouchID for quick access." 
              initial={true}
            />
          </div>
        </section>

        {/* Privacy & Data */}
        <section className="bg-[#0a0c12] rounded-[3rem] p-8 sm:p-10 border border-white/5 shadow-2xl">
          <h2 className="text-xl font-black text-white uppercase tracking-widest italic mb-10 flex items-center gap-4">
            <Database size={20} className="text-[#A84bc9]" /> Data Governance
          </h2>
          <div className="space-y-8">
            <ToggleItem 
              icon={<Eye size={18} />} 
              label="Node Stealth Mode" 
              sub="Hide items from non-verified neighborhood nodes." 
              initial={false}
            />
            <ToggleItem 
              icon={<ShieldCheck size={18} />} 
              label="Metadata Encryption" 
              sub="Encrypt all handover chat and video logs." 
              initial={true}
            />
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-[#0a0c12] rounded-[3rem] p-8 sm:p-10 border border-white/5 shadow-2xl">
          <h2 className="text-xl font-black text-white uppercase tracking-widest italic mb-10 flex items-center gap-4">
            <Bell size={20} className="text-[#A84bc9]" /> Notification Hub
          </h2>
          <div className="space-y-8">
            <ToggleItem 
              icon={<Smartphone size={18} />} 
              label="Handover Alerts" 
              sub="Mobile notifications for physical handshakes." 
              initial={true}
            />
            <ToggleItem 
              icon={<Mail size={18} />} 
              label="Escrow Summaries" 
              sub="Receive transaction receipts via email." 
              initial={false}
            />
          </div>
        </section>

        {/* Payment Settings */}
        <section className="bg-[#0a0c12] rounded-[3rem] p-8 sm:p-10 border border-white/5 shadow-2xl">
          <h2 className="text-xl font-black text-white uppercase tracking-widest italic mb-10 flex items-center gap-4">
            <CreditCard size={20} className="text-[#A84bc9]" /> Payment Matrix
          </h2>
          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 mb-8 flex items-center justify-between group cursor-pointer hover:border-emerald-500/30 transition-all">
            <div className="flex items-center gap-6">
              <div className="w-12 h-8 bg-black border border-white/10 rounded-lg flex items-center justify-center font-black italic text-[10px] text-white/40">VISA</div>
              <div>
                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">HDFC Node Bank</p>
                <p className="text-xs font-black text-white uppercase tracking-[0.3em] mt-1">•••• •••• •••• 4210</p>
              </div>
            </div>
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Escrow Active</p>
          </div>
          <button className="w-full py-5 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-[#A84bc9] hover:bg-[#A84bc9]/10 transition-all italic">Link New Capital Node</button>
        </section>
      </div>
    </div>
  );
};

const ToggleItem = ({ icon, label, sub, initial }: { icon: React.ReactNode, label: string, sub: string, initial: boolean }) => {
  const [active, setActive] = useState(initial);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="text-white/20">{icon}</div>
        <div>
          <h4 className="text-xs font-black text-white uppercase tracking-widest">{label}</h4>
          <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-1">{sub}</p>
        </div>
      </div>
      <button 
        onClick={() => setActive(!active)}
        className={`w-14 h-8 rounded-full transition-all relative ${active ? 'bg-[#A84bc9]' : 'bg-white/10'}`}
      >
        <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${active ? 'left-7' : 'left-1'}`} />
      </button>
    </div>
  );
};

export default Settings;
