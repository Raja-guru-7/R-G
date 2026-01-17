
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_TRANSACTIONS } from '../mockData';
import { ShieldCheck, Info, Lock, CheckCircle, Video, Loader2 } from 'lucide-react';
import CameraCapture from '../components/CameraCapture';

const Handover: React.FC = () => {
  const { txId } = useParams();
  const navigate = useNavigate();
  const tx = MOCK_TRANSACTIONS.find(t => t.id === txId) || MOCK_TRANSACTIONS[0];
  
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [ownerVideo, setOwnerVideo] = useState<Blob | null>(null);
  const [renterVideo, setRenterVideo] = useState<Blob | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);

  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const verifyOtp = async () => {
    setIsVerifying(true);
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1500));
    const fullOtp = otp.join('');
    if (fullOtp === tx.otpCode || fullOtp === '1234') { // Allow 1234 for demo
      setStep(2);
    } else {
      alert("Invalid Security Code. Please check the Lender's device.");
      setOtp(['', '', '', '']);
      otpRefs[0].current?.focus();
    }
    setIsVerifying(false);
  };

  const handleComplete = async () => {
    setIsCompleting(true);
    // Simulate final encryption and upload
    await new Promise(r => setTimeout(r, 2000));
    alert("Handover Successful! Rental is now ACTIVE and recorded in the secure protocol.");
    navigate('/dashboard');
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <div className="max-w-xl mx-auto px-4 py-12 pb-40">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">Secure Handover</h1>
        <p className="text-white/40 font-bold uppercase tracking-widest text-xs mt-2">Node Verification: {tx.id}</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-12 px-6">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-col items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all duration-500 shadow-xl ${step >= s ? 'bg-[#A84bc9] text-white scale-110' : 'bg-white/5 text-white/20'}`}>
              {step > s ? <CheckCircle size={24} /> : s}
            </div>
            <span className={`text-[9px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${step >= s ? 'text-[#A84bc9]' : 'text-white/20'}`}>
              {s === 1 ? 'Meet' : s === 2 ? 'Lender Proof' : 'Renter Proof'}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-[#0a0c12] rounded-[3rem] shadow-2xl border border-white/5 p-10 backdrop-blur-3xl">
        {step === 1 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-6 bg-white/5 p-6 rounded-[2rem] border border-white/5">
              <div className="bg-[#A84bc9]/20 p-4 rounded-2xl text-[#A84bc9] shadow-lg"><Lock /></div>
              <div>
                <h3 className="font-black text-white uppercase tracking-widest text-sm">Verify Physical Meeting</h3>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Enter the 4-digit code from Sarah's device</p>
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              {otp.map((digit, i) => (
                <input 
                  key={i}
                  ref={otpRefs[i]}
                  type="text" 
                  maxLength={1}
                  value={digit}
                  disabled={isVerifying}
                  className="w-16 h-20 text-center text-3xl font-black bg-white/5 border-2 border-white/5 rounded-2xl focus:border-[#A84bc9] focus:bg-white/10 focus:ring-4 focus:ring-[#A84bc9]/10 outline-none text-white transition-all shadow-inner"
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                />
              ))}
            </div>

            <button 
              onClick={verifyOtp}
              disabled={!isOtpComplete || isVerifying}
              className="w-full bg-[#A84bc9] text-white py-6 rounded-[1.8rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl disabled:opacity-20 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              {isVerifying ? <Loader2 className="animate-spin" size={20} /> : 'Authorize Handover'}
            </button>
            <p className="text-center text-[9px] font-black text-white/10 uppercase tracking-widest">Default demo code: 1234</p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-6 bg-white/5 p-6 rounded-[2rem] border border-white/5">
              <div className="bg-orange-500/20 p-4 rounded-2xl text-orange-400 shadow-lg"><Video /></div>
              <div>
                <h3 className="font-black text-white uppercase tracking-widest text-sm">Owner Video Proof</h3>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Lender must record the handover of Sony A7III</p>
              </div>
            </div>

            <CameraCapture 
              label="Record Handover Proof" 
              mode="video" 
              onCapture={(blob) => setOwnerVideo(blob)} 
            />

            <button 
              onClick={() => setStep(3)}
              disabled={!ownerVideo}
              className="w-full bg-[#A84bc9] text-white py-6 rounded-[1.8rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl disabled:opacity-20 active:scale-95 transition-all"
            >
              Synchronize Proof
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-6 bg-white/5 p-6 rounded-[2rem] border border-white/5">
              <div className="bg-emerald-500/20 p-4 rounded-2xl text-emerald-400 shadow-lg"><ShieldCheck /></div>
              <div>
                <h3 className="font-black text-white uppercase tracking-widest text-sm">Renter Asset Acceptance</h3>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Inspect asset and record your receiving session</p>
              </div>
            </div>

            <CameraCapture 
              label="Record Acceptance Session" 
              mode="video" 
              onCapture={(blob) => setRenterVideo(blob)} 
            />

            <button 
              onClick={handleComplete}
              disabled={!renterVideo || isCompleting}
              className="w-full bg-emerald-500 text-white py-6 rounded-[1.8rem] font-black uppercase tracking-[0.3em] text-xs shadow-[0_20px_50px_rgba(16,185,129,0.3)] disabled:opacity-20 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              {isCompleting ? <Loader2 className="animate-spin" size={20} /> : 'Finalize Operational Link'}
            </button>
          </div>
        )}
      </div>

      <div className="mt-12 flex gap-4 text-white/20 px-4">
        <Info size={24} className="shrink-0" />
        <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">
          By proceeding, you agree that these videos will be encrypted with local session keys and stored for 30 days as absolute proof of handover.
        </p>
      </div>
    </div>
  );
};

export default Handover;
