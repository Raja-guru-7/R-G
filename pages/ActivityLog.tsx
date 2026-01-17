
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Download, ShieldCheck, Video, History, ArrowUpRight, Search, Filter } from 'lucide-react';
import { MOCK_TRANSACTIONS } from '../mockData';

const ActivityLog: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = useMemo(() => {
    return MOCK_TRANSACTIONS.filter(tx => 
      tx.itemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-40">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-3 text-white/30 hover:text-white transition-all mb-12 font-black uppercase text-[10px] tracking-widest"
      >
        <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
          <ChevronLeft size={20} />
        </div>
        Back
      </button>

      <div className="flex flex-col md:flex-row items-end justify-between gap-10 mb-16">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic mb-4">Proof <span className="text-white/20">Vault</span></h1>
          <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">Secure audit trail of every operational handover.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5 shadow-inner w-full md:w-auto">
           <div className="relative w-full sm:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={14} />
              <input 
                type="text" 
                placeholder="TX ID / Node name" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none pl-12 pr-4 py-3 text-[10px] font-black uppercase tracking-widest text-white" 
              />
           </div>
           <button className="w-full sm:w-auto bg-white/5 px-6 py-3 rounded-xl border border-white/10 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-all"><Filter size={14} /> Filter</button>
        </div>
      </div>

      <div className="bg-[#0a0c12] rounded-[3.5rem] border border-white/5 overflow-hidden shadow-2xl overflow-x-auto">
         <table className="w-full text-left min-w-[800px]">
            <thead>
               <tr className="border-b border-white/5 bg-white/5">
                  <th className="px-8 py-8 text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Resource / Date</th>
                  <th className="px-8 py-8 text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Verification Proofs</th>
                  <th className="px-8 py-8 text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Operational Status</th>
                  <th className="px-8 py-8 text-[9px] font-black text-white/20 uppercase tracking-[0.4em] text-right">Escrow</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
               {filteredLogs.map(tx => (
                 <tr key={tx.id} className="group hover:bg-white/5 transition-colors">
                    <td className="px-8 py-8">
                       <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1 group-hover:text-[#A84bc9] transition-colors italic">{tx.itemTitle}</h4>
                       <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Connected {tx.startDate} • Node ID: {tx.id}</p>
                    </td>
                    <td className="px-8 py-8">
                       <div className="flex gap-4">
                          <ProofButton icon={<Video size={14} />} label="Dispatch" />
                          <ProofButton icon={<Video size={14} />} label="Receipt" />
                       </div>
                    </td>
                    <td className="px-8 py-8">
                       <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${tx.status === 'ACTIVE' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-pulse'}`} />
                          <span className={`text-[10px] font-black uppercase tracking-widest ${tx.status === 'ACTIVE' ? 'text-emerald-400' : 'text-amber-400'}`}>{tx.status}</span>
                       </div>
                    </td>
                    <td className="px-8 py-8 text-right">
                       <p className="text-lg font-black text-white tracking-tighter italic">${tx.totalAmount}</p>
                       <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Escrow Settled</p>
                    </td>
                 </tr>
               ))}
               
               {filteredLogs.length === 0 && (
                 <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
                       <p className="text-white/10 font-black uppercase tracking-widest italic">No matching operational records found.</p>
                    </td>
                 </tr>
               )}

               {/* Historic entry kept as a reference log */}
               <tr className="group hover:bg-white/5 transition-colors">
                    <td className="px-8 py-8">
                       <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1 group-hover:text-[#A84bc9] transition-colors italic">Mountain Bike X-200</h4>
                       <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Completed Sept 14 • Node ID: TX-7128</p>
                    </td>
                    <td className="px-8 py-8">
                       <div className="flex gap-4">
                          <ProofButton icon={<History size={14} />} label="Logs" />
                          <ProofButton icon={<Download size={14} />} label="Audit PDF" />
                       </div>
                    </td>
                    <td className="px-8 py-8">
                       <div className="flex items-center gap-3">
                          <ShieldCheck size={16} className="text-emerald-500" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/30 italic">Protocol Finalized</span>
                       </div>
                    </td>
                    <td className="px-8 py-8 text-right">
                       <p className="text-lg font-black text-white/20 tracking-tighter italic">$72</p>
                       <p className="text-[9px] font-black text-white/10 uppercase tracking-widest">Deposit Refunded</p>
                    </td>
                 </tr>
            </tbody>
         </table>
      </div>
    </div>
  );
};

const ProofButton = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <button className="flex items-center gap-2 bg-white/5 px-4 py-2.5 rounded-xl border border-white/5 hover:border-[#A84bc9]/30 hover:bg-[#A84bc9]/5 transition-all">
    <span className="text-[#A84bc9]">{icon}</span>
    <span className="text-[9px] font-black text-white/60 uppercase tracking-widest">{label}</span>
  </button>
);

export default ActivityLog;
