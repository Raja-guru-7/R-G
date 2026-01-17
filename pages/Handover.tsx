
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Transaction } from '../types';
import { ShieldCheck, Info, Lock, CheckCircle, Video, Loader2, ChevronLeft, ClipboardCheck } from 'lucide-react';
import CameraCapture from '../components/CameraCapture';

const Handover: React.FC = () => {
  const { txId } = useParams();
  const navigate = useNavigate();
  const [tx, setTx] = useState<Transaction | null>(null);
  
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [ownerVideo, setOwnerVideo] = useState<Blob | null>(null);
  const [renterVideo, setRenterVideo] = useState<Blob | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  
  const [checklist, setChecklist] = useState({
    condition: false,
    functionality: false,
    accessories: false
  });

  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  useEffect(() => {
    if (txId) {
      api.getTransactionById(txId).then(data => setTx(data || null));
    }
  }, [txId]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) otpRefs[index + 1].current?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) otpRefs[index - 1].current?.focus();
  };

  const verifyOtp = async () => {
    if (!txId) return;
    setIsVerifying(true);
    const isValid = await api.verifyOtp(txId, otp.join(''));
    if (isValid) {
      setStep(2);
    } else {
      alert("Invalid Security Code.");
      setOtp(['', '', '', '']);
      otpRefs[0].current?.focus();
    }
    setIsVerifying(false);
  };

  const handleComplete = async () => {
    if (!txId || !renterVideo) return;
    setIsCompleting(true);
    try {
      await api.uploadHandoverProof(txId, renterVideo, 'RENTER');
      await api.completeTransaction(txId);
      alert("Handover Successful! Rental is now ACTIVE.");
      navigate('/dashboard');
    } finally {
      setIsCompleting(false);
    }
  };

  const isOtpComplete = otp.every(digit => digit !== '');
  const isChecklistComplete = checklist.condition && checklist.functionality && checklist.accessories;

  if (!tx) return <div className="p-20 text-center font-black uppercase text-white/20">Establishing Node Link...</div>;

  return (
    <div className="max-w-xl mx-auto px-4 py-12 pb-40">
      <button onClick={() => navigate(-1)} className="flex items-center gap-3 text-white/30 hover:text-white transition-all mb-8 font-black uppercase text-[10px] tracking-widest">
        <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
          <ChevronLeft size={18} />
        </div>
        Abort Procedure
      </button>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">Secure Handshake</h1>
        <p className="text-white/40 font-bold uppercase tracking-widest text-xs mt-2">Protocol TX-Node: {tx.id}</p>
      </div>

      <div className="flex items-center justify-between mb-12 px-6">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-col items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all duration-500 shadow-xl ${step >= s ? 'bg-[#A84bc9] text-white scale-110' : 'bg-white/5 text-white/20'}`}>
              {step > s ? <CheckCircle size={24} /> : s}
            </div>
            <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${step >= s ? 'text-[#A84bc9]' : 'text-white/20'}`}>
              {s === 1 ? 'Verify' : s === 2 ? 'Lender' : 'Renter'}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-[#0a0c12] rounded-[3rem] shadow-2xl border border-white/5 p-10 backdrop-blur-3xl relative overflow-hidden">
        {step === 1 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-6 bg-white/5 p-6 rounded-[2rem] border border-white/5">
               <Lock className="text-[#A84bc9]" />
               <div>
                 <h3 className="font-black text-white uppercase tracking-widest text-sm">Physical Meeting Verification</h3>
                 <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Lender Code Auth Required</p>
               </div>
            </div>
            <div className="flex justify-center gap-4">
              {otp.map((digit, i) => (
                <input key={i} ref={otpRefs[i]} type="text" maxLength={1} value={digit} disabled={isVerifying} className="w-16 h-20 text-center text-3xl font-black bg-white/5 border-2 border-white/5 rounded-2xl focus:border-[#A84bc9] outline-none text-white transition-all shadow-inner" onChange={(e) => handleOtpChange(i, e.target.value)} onKeyDown={(e) => handleKeyDown(i, e)} />
              ))}
            </div>
            <button onClick={verifyOtp} disabled={!isOtpComplete || isVerifying} className="w-full bg-[#A84bc9] text-white py-6 rounded-[1.8rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl disabled:opacity-20 active:scale-95 transition-all flex items-center justify-center gap-3">
              {isVerifying ? <Loader2 className="animate-spin" /> : 'Authorize Proximity'}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-6 bg-white/5 p-6 rounded-[2rem] border border-white/5">
               <Video className="text-orange-400" />
               <div>
                 <h3 className="font-black text-white uppercase tracking-widest text-sm">Owner Handover Proof</h3>
                 <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Record the physical asset release</p>
               </div>
            </div>
            <CameraCapture label="Capture Lender Proof" mode="video" onCapture={(blob) => setOwnerVideo(blob)} />
            <button 
              onClick={() => {
                if(txId && ownerVideo) api.uploadHandoverProof(txId, ownerVideo, 'OWNER');
                setStep(3);
              }} 
              disabled={!ownerVideo} 
              className="w-full bg-[#A84bc9] text-white py-6 rounded-[1.8rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl disabled:opacity-20 active:scale-95 transition-all"
            >
              Proceed to Renter Proof
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-6 bg-white/5 p-6 rounded-[2rem] border border-white/5">
               <ClipboardCheck className="text-emerald-400" />
               <div>
                 <h3 className="font-black text-white uppercase tracking-widest text-sm">Digital Condition Report</h3>
                 <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Final audit before activation</p>
               </div>
            </div>

            <div className="space-y-3 bg-white/5 p-6 rounded-[2rem] border border-white/5">
              {[
                { key: 'condition', label: 'Asset matches listed condition' },
                { key: 'functionality', label: 'Primary functionality verified' },
                { key: 'accessories', label: 'All accessories accounted for' }
              ].map((item) => (
                <label key={item.key} className="flex items-center gap-4 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={checklist[item.key as keyof typeof checklist]} 
                    onChange={(e) => setChecklist({ ...checklist, [item.key]: e.target.checked })}
                    className="w-5 h-5 rounded-md bg-white/5 border border-white/10 checked:bg-[#A84bc9] transition-all cursor-pointer" 
                  />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">{item.label}</span>
                </label>
              ))}
            </div>

            <CameraCapture label="Record Receiving Proof" mode="video" onCapture={(blob) => setRenterVideo(blob)} />

            <button 
              onClick={handleComplete} 
              disabled={!renterVideo || !isChecklistComplete || isCompleting} 
              className="w-full bg-emerald-500 text-white py-6 rounded-[1.8rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl disabled:opacity-20 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              {isCompleting ? <Loader2 className="animate-spin" /> : 'Finalize Operational Link'}
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-4 text-white/20 px-4">
        <ShieldCheck size={20} className="shrink-0" />
        <p className="text-[9px] font-bold uppercase tracking-widest leading-relaxed">By finalizing, both nodes confirm the asset state. Disputes without video proof are ineligible for mesh insurance claims.</p>
      </div>
    </div>
  );
};

export default Handover;
