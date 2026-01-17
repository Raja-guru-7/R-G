
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  LayoutDashboard, 
  ShieldCheck, 
  Search, 
  Settings, 
  Heart, 
  History, 
  LogOut, 
  UserCircle,
  Repeat
} from 'lucide-react';
import { MOCK_CURRENT_USER } from '../mockData';

interface NavbarProps {
  userRole: 'RENTER' | 'OWNER';
  onToggleRole: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ userRole, onToggleRole }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsProfileOpen(false);
    window.location.href = '#/';
    window.location.reload();
  };

  const handleMenuAction = (label: string) => {
    setIsProfileOpen(false);
    if (label === 'My Hub') navigate('/dashboard');
    else if (label === 'Settings') navigate('/settings');
    else if (label === 'My Profile') navigate('/profile');
    else if (label === 'Saved Assets') navigate('/saved');
    else if (label === 'Activity Log') navigate('/activity');
    else if (label === 'Switch Account') {
      onToggleRole();
    }
  };

  return (
    <>
      <div className="w-full h-20 sm:h-24 sticky top-0 z-[1001] bg-[#06070a]/80 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-4 group">
            <div className="bg-[#A84bc9] p-2 rounded-[0.8rem] sm:rounded-[1.2rem] group-hover:rotate-12 transition-all shadow-xl shadow-[#A84bc9]/30 ring-1 ring-white/20">
              <ShieldCheck className="text-white" size={20} />
            </div>
            <span className="text-xl sm:text-2xl font-black text-white tracking-tighter uppercase italic">
              Around<span className="text-[#A84bc9]">U</span>
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-8 relative" ref={dropdownRef}>
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-black text-white/90">{MOCK_CURRENT_USER.name}</span>
              <div className="flex items-center gap-2 bg-[#A84bc9]/10 text-[#A84bc9] px-3 py-0.5 rounded-full border border-[#A84bc9]/20 shadow-sm mt-0.5">
                <span className="text-[9px] uppercase tracking-widest font-black italic">{userRole} Mode</span>
              </div>
            </div>
            
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`relative p-0.5 sm:p-1 rounded-[1.2rem] bg-white/5 border transition-all ${isProfileOpen ? 'border-[#A84bc9] scale-95 ring-4 ring-[#A84bc9]/10' : 'border-white/10 hover:bg-white/10'}`}
            >
              <img 
                src={MOCK_CURRENT_USER.avatar} 
                alt="Profile" 
                className="w-9 h-9 sm:w-12 sm:h-12 rounded-[0.8rem] shadow-2xl object-cover" 
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[#06070a] rounded-full shadow-lg" />
            </button>

            {isProfileOpen && (
              <div className="absolute top-16 sm:top-20 right-0 w-64 sm:w-72 bg-[#0a0c12] border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] p-2 sm:p-3 animate-in fade-in slide-in-from-top-4 duration-200 z-[2001] backdrop-blur-3xl">
                <div className="p-3 sm:p-4 mb-1 border-b border-white/5 flex items-center justify-between">
                  <div className="truncate">
                    <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] mb-0.5">Authenticated Node</p>
                    <p className="text-xs sm:text-sm font-black text-white uppercase italic tracking-widest truncate">{MOCK_CURRENT_USER.name}</p>
                  </div>
                  <div className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-lg text-[8px] font-black shrink-0">{MOCK_CURRENT_USER.trustScore}%</div>
                </div>

                <div className="space-y-0.5">
                  <ProfileMenuItem icon={<UserCircle size={16} />} label="My Profile" onClick={() => handleMenuAction('My Profile')} />
                  <ProfileMenuItem icon={<Settings size={16} />} label="Settings" onClick={() => handleMenuAction('Settings')} />
                  <ProfileMenuItem icon={<Heart size={16} />} label="Saved Assets" onClick={() => handleMenuAction('Saved Assets')} />
                  <ProfileMenuItem icon={<History size={16} />} label="Activity Log" onClick={() => handleMenuAction('Activity Log')} />
                  <div className="h-px bg-white/5 my-1 mx-4" />
                  <ProfileMenuItem icon={<Repeat size={16} />} label="Switch Account" onClick={() => handleMenuAction('Switch Account')} subLabel={userRole} />
                  <ProfileMenuItem 
                    icon={<LogOut size={16} />} 
                    label="Log Out" 
                    variant="danger" 
                    onClick={handleLogout}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-[1002] px-3 sm:px-6 py-2 sm:py-4 bg-[#0a0c12]/90 backdrop-blur-2xl rounded-full flex items-center gap-1 sm:gap-2 shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/10 ring-1 ring-white/5 whitespace-nowrap">
        <NavLink to="/explore" icon={<Search size={16} />} label="Explore" active={isActive('/explore')} />
        <NavLink to="/dashboard" icon={<LayoutDashboard size={16} />} label="My Hub" active={isActive('/dashboard')} />
        <div className="w-px h-5 sm:h-6 bg-white/10 mx-1" />
        <Link to="/add" className="flex items-center gap-1.5 bg-[#A84bc9] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full hover:brightness-110 transition-all font-black text-[9px] sm:text-xs uppercase tracking-widest shadow-xl active:scale-95 group">
          <PlusCircle size={14} className="sm:w-[16px] sm:h-[16px] group-hover:rotate-90 transition-transform" /> 
          <span>{userRole === 'RENTER' ? 'Rent' : 'List'}</span>
        </Link>
      </div>
    </>
  );
};

const ProfileMenuItem = ({ icon, label, variant = 'default', onClick, subLabel }: { icon: React.ReactNode, label: string, variant?: 'default' | 'danger', onClick?: () => void, subLabel?: string }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-[1.2rem] transition-all text-[9px] sm:text-[10px] font-black uppercase tracking-widest ${variant === 'danger' ? 'text-red-400 hover:bg-red-500/10' : 'text-white/60 hover:text-white hover:bg-white/5 group'}`}
  >
    <div className="flex items-center gap-3">
      <span className={`${variant === 'danger' ? 'text-red-400' : 'text-white/30 group-hover:text-[#A84bc9]'} transition-colors`}>{icon}</span>
      {label}
    </div>
    {subLabel && <span className="text-[7px] text-white/20">{subLabel}</span>}
  </button>
);

const NavLink = ({ to, icon, label, active }: { to: string, icon: React.ReactNode, label: string, active: boolean }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-2 px-3 sm:px-6 py-2 rounded-full text-[9px] sm:text-xs font-black uppercase tracking-widest transition-all ${active ? 'text-white bg-white/10 shadow-inner' : 'text-white/30 hover:text-white hover:bg-white/5'}`}
  >
    <span className={active ? 'text-[#A84bc9]' : ''}>{icon}</span>
    <span className="hidden xs:inline">{label}</span>
  </Link>
);

export default Navbar;
