
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, DollarSign, Package, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';
import CameraCapture from '../components/CameraCapture';

const AddItem: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Electronics',
    price: '',
    location: 'SoHo, New York',
    insurance: '10'
  });
  const [videoProof, setVideoProof] = useState<Blob | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoProof) return;
    
    setIsDeploying(true);
    // Simulate AI content analysis and blockchain registration
    await new Promise(r => setTimeout(r, 3000));
    setIsDeploying(false);
    setIsSuccess(true);
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto px-6 py-40 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-32 h-32 bg-emerald-500/20 text-emerald-400 rounded-[3rem] flex items-center justify-center mx-auto mb-10 shadow-2xl border border-emerald-500/20">
          <CheckCircle2 size={64} />
        </div>
        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-4">Node Deployed</h1>
        <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-xs">Your asset is now being broadcast to the neighborhood mesh network.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-40 min-h-screen">
      <div className="mb-16">
        <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic mb-4">List an <span className="text-[#A84bc9]">Asset</span></h1>
        <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">Enable safe peer-to-peer resource sharing in your hub.</p>
      </div>

      <div className="bg-[#0a0c12] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 backdrop-blur-3xl">
        <div className="bg-white/5 px-10 py-6 border-b border-white/5 flex justify-between items-center">
          <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Operational Phase {step} / 2</span>
          <div className="flex gap-3">
            <div className={`h-2 w-12 rounded-full transition-all duration-700 ${step >= 1 ? 'bg-[#A84bc9] shadow-[0_0_15px_rgba(168,75,201,0.5)]' : 'bg-white/10'}`} />
            <div className={`h-2 w-12 rounded-full transition-all duration-700 ${step >= 2 ? 'bg-[#A84bc9] shadow-[0_0_15px_rgba(168,75,201,0.5)]' : 'bg-white/10'}`} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-10 sm:p-14 space-y-10">
          {step === 1 ? (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Resource Designation</label>
                <div className="relative group">
                  <Package className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#A84bc9] transition-colors" size={20} />
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Professional Camera, Heavy Tools"
                    className="w-full pl-16 pr-8 py-6 bg-white/5 border-2 border-transparent rounded-[1.8rem] focus:bg-white/10 focus:border-[#A84bc9]/20 focus:ring-8 focus:ring-[#A84bc9]/5 outline-none text-white font-black text-sm transition-all placeholder:text-white/10 tracking-widest uppercase"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Asset Parameters / Narrative</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Detail condition, specifications, and availability terms..."
                  className="w-full px-8 py-6 bg-white/5 border-2 border-transparent rounded-[1.8rem] focus:bg-white/10 focus:border-[#A84bc9]/20 focus:ring-8 focus:ring-[#A84bc9]/5 outline-none text-white font-black text-sm transition-all placeholder:text-white/10 resize-none tracking-widest uppercase"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Daily Yield ($)</label>
                  <div className="relative group">
                    <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#A84bc9] transition-colors" size={20} />
                    <input 
                      type="number" 
                      required
                      placeholder="0.00"
                      className="w-full pl-16 pr-8 py-6 bg-white/5 border-2 border-transparent rounded-[1.8rem] focus:bg-white/10 focus:border-[#A84bc9]/20 focus:ring-8 focus:ring-[#A84bc9]/5 outline-none text-white font-black text-sm transition-all placeholder:text-white/10 tracking-widest uppercase"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Network Node</label>
                  <div className="relative group">
                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#A84bc9] transition-colors" size={20} />
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Tribeca, New York"
                      className="w-full pl-16 pr-8 py-6 bg-white/5 border-2 border-transparent rounded-[1.8rem] focus:bg-white/10 focus:border-[#A84bc9]/20 focus:ring-8 focus:ring-[#A84bc9]/5 outline-none text-white font-black text-sm transition-all placeholder:text-white/10 tracking-widest uppercase"
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <button 
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.title || !formData.price || !formData.description}
                className="w-full bg-[#A84bc9] text-white py-7 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:brightness-110 disabled:opacity-20 transition-all shadow-[0_25px_60px_rgba(168,75,201,0.3)] active:scale-[0.98] mt-6"
              >
                Proceed to Verification
              </button>
            </div>
          ) : (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-[#A84bc9]/10 border border-[#A84bc9]/20 p-8 rounded-[2.5rem] space-y-4">
                <div className="flex items-center gap-4 text-[#A84bc9] font-black uppercase tracking-[0.3em] text-xs">
                  <ShieldCheck size={24} />
                  Live Liveness Verification
                </div>
                <p className="text-[9px] text-white/40 leading-relaxed font-bold uppercase tracking-widest">
                  Gallery uploads are restricted. You must capture a live video sequence of the asset to verify physical possession and condition. 
                </p>
              </div>

              <div className="rounded-[3rem] overflow-hidden border-4 border-white/5 shadow-2xl">
                <CameraCapture 
                  label="Asset Identification Session" 
                  mode="video"
                  onCapture={(blob) => setVideoProof(blob)} 
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-6">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={isDeploying}
                  className="w-full sm:flex-1 bg-white/5 text-white/40 py-6 rounded-[1.8rem] font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  Return to Specs
                </button>
                <button 
                  type="submit"
                  disabled={!videoProof || isDeploying}
                  className="w-full sm:flex-[2] bg-[#A84bc9] text-white py-6 rounded-[1.8rem] font-black text-xs uppercase tracking-[0.3em] hover:brightness-110 shadow-2xl disabled:opacity-20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  {isDeploying ? <Loader2 className="animate-spin" size={20} /> : 'Broadcasting Asset'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddItem;
