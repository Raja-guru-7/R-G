
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import ItemDetail from './pages/ItemDetail';
import Handover from './pages/Handover';
import Dashboard from './pages/Dashboard';
import AddItem from './pages/AddItem';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import SavedAssets from './pages/SavedAssets';
import ActivityLog from './pages/ActivityLog';
import AiAssistant from './components/AiAssistant';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'RENTER' | 'OWNER'>('RENTER');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const toggleRole = () => {
    setUserRole(prev => prev === 'RENTER' ? 'OWNER' : 'RENTER');
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans overflow-x-hidden bg-[#06070a]">
        {isAuthenticated && <Navbar userRole={userRole} onToggleRole={toggleRole} />}
        <main className="flex-1 relative">
          <Routes>
            <Route 
              path="/" 
              element={isAuthenticated ? <Navigate to="/explore" replace /> : <Landing onLogin={handleLogin} />} 
            />
            <Route 
              path="/explore" 
              element={isAuthenticated ? <Explore /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/item/:id" 
              element={isAuthenticated ? <ItemDetail /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/handover/:txId" 
              element={isAuthenticated ? <Handover /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? <Dashboard role={userRole} /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/add" 
              element={isAuthenticated ? <AddItem /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/profile" 
              element={isAuthenticated ? <Profile /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/settings" 
              element={isAuthenticated ? <Settings /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/saved" 
              element={isAuthenticated ? <SavedAssets /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/activity" 
              element={isAuthenticated ? <ActivityLog /> : <Navigate to="/" replace />} 
            />
          </Routes>
        </main>
        
        {isAuthenticated && <AiAssistant />}
        
        {isAuthenticated && (
          <footer className="bg-[#0a0c12] border-t border-white/5 py-16 px-8 text-center pb-40">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-white/30 text-xs font-black uppercase tracking-[0.2em]">
                &copy; 2024 AroundU • Decentralized Trust Ecosystem
              </div>
              <div className="flex items-center gap-12">
                <a href="#" className="text-xs font-black uppercase tracking-widest text-white/40 hover:text-indigo-400 transition-colors">Privacy Protocol</a>
                <a href="#" className="text-xs font-black uppercase tracking-widest text-white/40 hover:text-indigo-400 transition-colors">Safety Network</a>
                <a href="#" className="text-xs font-black uppercase tracking-widest text-white/40 hover:text-indigo-400 transition-colors">Legal Terms</a>
              </div>
            </div>
          </footer>
        )}
      </div>
    </Router>
  );
};

export default App;
