
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_TRANSACTIONS } from '../mockData';
import { ShieldCheck, Info, Camera, Lock, User, CheckCircle, Video } from 'lucide-react';
import CameraCapture from '../components/CameraCapture';

const Handover: React.FC = () => {
  const { txId } = useParams();
  const navigate = useNavigate();
  const tx = MOCK_TRANSACTIONS[0]; // Simplified for demo
  
  const [step, setStep] = useState(1);
  const [otpValue, setOtpValue] = useState('');
  const [ownerVideo, setOwnerVideo] = useState<Blob | null>(null);
  const [renterVideo, setRenterVideo] = useState<Blob | null>(null);

  const handleComplete = () => {
    alert("Handover Successful! Rental is now ACTIVE.");
    navigate('/dashboard');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Secure Handover</h1>
        <p className="text-slate-500">Transaction ID: {tx.id}</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-10 px-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${step >= s ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
              {step > s ? <CheckCircle size={18} /> : s}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= s ? 'text-blue-600' : 'text-slate-400'}`}>
              {s === 1 ? 'Meet' : s === 2 ? 'Lender Proof' : 'Renter Proof'}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border p-8">
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl">
              <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><Lock /></div>
              <div>
                <h3 className="font-bold text-slate-900">Verify Meeting</h3>
                <p className="text-slate-500 text-xs">Enter the 4-digit code shown on the Lender's phone</p>
              </div>
            </div>
            
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4].map((i) => (
                <input 
                  key={i}
                  type="text" 
                  maxLength={1}
                  className="w-12 h-16 text-center text-2xl font-bold border-2 rounded-xl focus:border-blue-500 focus:ring-0 outline-none"
                  onChange={(e) => {
                    if (e.target.value) setOtpValue(prev => prev + e.target.value);
                  }}
                />
              ))}
            </div>

            <button 
              onClick={() => setStep(2)}
              disabled={otpValue.length < 4}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold disabled:opacity-50"
            >
              Verify OTP
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl">
              <div className="bg-orange-100 p-3 rounded-xl text-orange-600"><Video /></div>
              <div>
                <h3 className="font-bold text-slate-900">Owner Proof</h3>
                <p className="text-slate-500 text-xs">Lender must record handing over the item</p>
              </div>
            </div>

            <CameraCapture 
              label="Record Handover (15s max)" 
              mode="video" 
              onCapture={(blob) => setOwnerVideo(blob)} 
            />

            <button 
              onClick={() => setStep(3)}
              disabled={!ownerVideo}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl">
              <div className="bg-green-100 p-3 rounded-xl text-green-600"><ShieldCheck /></div>
              <div>
                <h3 className="font-bold text-slate-900">Renter Acceptance</h3>
                <p className="text-slate-500 text-xs">Inspect item and record yourself receiving it</p>
              </div>
            </div>

            <CameraCapture 
              label="Record Acceptance (15s max)" 
              mode="video" 
              onCapture={(blob) => setRenterVideo(blob)} 
            />

            <button 
              onClick={handleComplete}
              disabled={!renterVideo}
              className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold disabled:opacity-50 shadow-lg shadow-green-100"
            >
              Finalize & Start Rental
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-3 text-slate-400">
        <Info size={20} className="shrink-0" />
        <p className="text-xs italic">
          By proceeding, you agree that these videos will be encrypted and stored for 30 days as evidence in case of a dispute.
        </p>
      </div>
    </div>
  );
};

export default Handover;
