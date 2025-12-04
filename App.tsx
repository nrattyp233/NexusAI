import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Generator from './components/Generator';
import Monetization from './components/Monetization';
import Settings from './components/Settings';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'generator':
        return <Generator />;
      case 'monetization':
        return <Monetization />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#020617] text-slate-200 font-sans overflow-hidden selection:bg-nexus-accent/30 selection:text-white">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {/* Background Grid Effect */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
             style={{ 
                 backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', 
                 backgroundSize: '40px 40px' 
             }}>
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-[#020617] pointer-events-none"></div>
        
        <div className="relative z-10 flex-1 overflow-auto">
            {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;