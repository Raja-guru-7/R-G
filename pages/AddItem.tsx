
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, DollarSign, Package, Video, ShieldCheck } from 'lucide-react';
import CameraCapture from '../components/CameraCapture';

const AddItem: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    insurance: '10'
  });
  const [videoProof, setVideoProof] = useState<Blob | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Item listed successfully! It will be visible after 15 minutes of AI verification.");
    navigate('/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-40 min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white tracking-tight uppercase italic mb-2">List an Item</h1>
        <p className="text-white/40 font-bold uppercase tracking-widest text-sm">Enable safe sharing in your community</p>
      </div>

      <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white/5">
        <div className="bg-slate-50/80 px-10 py-5 border-b border-slate-100 flex justify-between items-center">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Step {step} of 2</span>
          <div className="flex gap-2">
            <div className={`h-1.5 w-10 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-[#A84bc9]' : 'bg-slate-200'}`} />
            <div className={`h-1.5 w-10 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-[#A84bc9]' : 'bg-slate-200'}`} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          {step === 1 ? (
            <>
              <div className="space-y-4">
                <label className="block text-sm font-black text-slate-800 uppercase tracking-widest">What are you renting?</label>
                <div className="relative group">
                  <Package className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#A84bc9] transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="e.g. Camping Tent, Power Drill"
                    className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-[#A84bc9]/20 focus:ring-4 focus:ring-[#A84bc9]/5 outline-none text-slate-900 font-bold transition-all placeholder:text-slate-300"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-black text-slate-800 uppercase tracking-widest">Description</label>
                <textarea 
                  rows={4}
                  placeholder="Tell potential renters about condition, specs, etc."
                  className="w-full px-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-[#A84bc9]/20 focus:ring-4 focus:ring-[#A84bc9]/5 outline-none text-slate-900 font-bold transition-all placeholder:text-slate-300 resize-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="block text-sm font-black text-slate-800 uppercase tracking-widest">Price / Day</label>
                  <div className="relative group">
                    <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#A84bc9] transition-colors" size={20} />
                    <input 
                      type="number" 
                      placeholder="0.00"
                      className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-[#A84bc9]/20 focus:ring-4 focus:ring-[#A84bc9]/5 outline-none text-slate-900 font-bold transition-all placeholder:text-slate-300"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-black text-slate-800 uppercase tracking-widest">Location</label>
                  <div className="relative group">
                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#A84bc9] transition-colors" size={20} />
                    <input 
                      type="text" 
                      placeholder="Tribeca, NY"
                      className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-[#A84bc9]/20 focus:ring-4 focus:ring-[#A84bc9]/5 outline-none text-slate-900 font-bold transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>
              </div>

              <button 
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.title || !formData.price}
                className="w-full bg-[#A84bc9] text-white py-6 rounded-[1.8rem] font-black text-sm uppercase tracking-[0.2em] hover:brightness-110 disabled:opacity-30 transition-all shadow-[0_20px_40px_rgba(168,75,201,0.2)] active:scale-[0.98] mt-6"
              >
                Next: Live Verification
              </button>
            </>
          ) : (
            <>
              <div className="bg-[#A84bc9]/5 border border-[#A84bc9]/10 p-8 rounded-[2rem] space-y-4">
                <div className="flex items-center gap-3 text-[#A84bc9] font-black uppercase tracking-widest text-sm">
                  <ShieldCheck size={24} />
                  Live Verification Required
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-wider">
                  To prevent fake listings, you must record a 5-second video of the actual item. Gallery uploads are prohibited by our security protocol.
                </p>
              </div>

              <div className="rounded-[2.5rem] overflow-hidden border-4 border-slate-50 shadow-inner">
                <CameraCapture 
                  label="Record Item (5s)" 
                  mode="video"
                  onCapture={(blob) => setVideoProof(blob)} 
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-slate-100 text-slate-600 py-6 rounded-[1.8rem] font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  disabled={!videoProof}
                  className="flex-[2] bg-[#A84bc9] text-white py-6 rounded-[1.8rem] font-black text-xs uppercase tracking-[0.2em] hover:brightness-110 shadow-2xl disabled:opacity-30 active:scale-[0.98] transition-all"
                >
                  Deploy Asset Now
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddItem;
