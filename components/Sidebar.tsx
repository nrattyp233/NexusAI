import React from 'react';
import { LayoutDashboard, PenTool, CreditCard, Settings, Activity, Cpu } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Command Center', icon: <LayoutDashboard size={20} /> },
    { id: 'generator', label: 'Neural Forge', icon: <PenTool size={20} /> },
    { id: 'monetization', label: 'Revenue Streams', icon: <CreditCard size={20} /> },
    { id: 'settings', label: 'System Config', icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-64 h-screen bg-nexus-900 border-r border-nexus-800 flex flex-col shadow-2xl z-20">
      <div className="p-6 flex items-center space-x-3 border-b border-nexus-800">
        <div className="p-2 bg-nexus-accent/10 rounded-lg">
            <Cpu className="text-nexus-accent" size={24} />
        </div>
        <div>
            <h1 className="text-xl font-bold text-white tracking-wider">NEXUS<span className="text-nexus-accent">AI</span></h1>
            <p className="text-xs text-slate-400">Ver 11.0.1</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as ViewState)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
              currentView === item.id
                ? 'bg-nexus-accent/10 text-nexus-accent border border-nexus-accent/20'
                : 'text-slate-400 hover:bg-nexus-800 hover:text-white'
            }`}
          >
            <span className={`${currentView === item.id ? 'animate-pulse' : ''}`}>
                {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
            {currentView === item.id && (
                <Activity size={14} className="ml-auto text-nexus-accent animate-spin-slow" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-nexus-800">
        <div className="bg-gradient-to-r from-nexus-800 to-nexus-900 rounded-xl p-4 border border-slate-700">
            <p className="text-xs text-slate-400 mb-2">System Status</p>
            <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-nexus-success animate-pulse"></div>
                <span className="text-xs font-mono text-nexus-success">OPERATIONAL</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;