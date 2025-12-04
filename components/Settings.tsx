import React, { useState, useEffect } from 'react';
import { Save, User, Bell, Database, Download, Trash2, ShieldCheck, Key, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { UserSettings } from '../types';

const Settings: React.FC = () => {
    const [settings, setSettings] = useState<UserSettings>({
        username: 'Admin_User',
        role: 'Chief Operations',
        emailNotifications: true,
        autoSave: true,
        apiKey: ''
    });
    const [saveStatus, setSaveStatus] = useState<string>('');
    const [showKey, setShowKey] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('nexus_settings');
        if (saved) {
            setSettings(JSON.parse(saved));
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem('nexus_settings', JSON.stringify(settings));
        setSaveStatus('Configuration Saved');
        setTimeout(() => setSaveStatus(''), 2000);
    };

    const handleExport = () => {
        const history = localStorage.getItem('nexus_history') || '[]';
        const config = localStorage.getItem('nexus_settings') || '{}';
        
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ settings: JSON.parse(config), history: JSON.parse(history) }, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "nexus_ai_backup.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const handleClearData = () => {
        if (window.confirm("WARNING: This will purge all local neural archives. Proceed?")) {
            localStorage.removeItem('nexus_history');
            window.location.reload();
        }
    };

    return (
        <div className="p-8 animate-fadeIn max-w-4xl mx-auto pb-20">
            <header className="mb-8 border-b border-nexus-800 pb-6 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">System Configuration</h2>
                    <p className="text-slate-400">Manage neural identity and data protocols.</p>
                </div>
                {saveStatus && <span className="text-nexus-success font-mono text-sm animate-pulse">{saveStatus}</span>}
            </header>

            <div className="space-y-6">
                
                {/* API Configuration Module - Highlighted for First Time Setup */}
                <section className={`rounded-xl p-6 border shadow-lg transition-all ${!settings.apiKey ? 'bg-indigo-900/20 border-nexus-accent shadow-nexus-accent/10' : 'bg-nexus-800/30 border-nexus-accent/30 shadow-nexus-accent/5'}`}>
                    <div className="flex items-center mb-6 text-nexus-accent">
                        <Key className="mr-3" />
                        <h3 className="text-lg font-semibold text-white">Neural Uplink (API Key)</h3>
                        {!settings.apiKey && <span className="ml-auto text-xs bg-nexus-accent text-nexus-900 px-2 py-1 rounded font-bold animate-pulse">REQUIRED FOR AI</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Google Gemini API Key</label>
                        <div className="relative">
                            <input 
                                type={showKey ? "text" : "password"}
                                value={settings.apiKey || ''}
                                onChange={(e) => setSettings({...settings, apiKey: e.target.value})}
                                placeholder="Paste your Gemini API Key here (starts with AIza...)"
                                className="w-full bg-nexus-900 border border-nexus-700 rounded-lg p-3 text-white focus:border-nexus-accent outline-none pr-12 font-mono"
                            />
                            <button 
                                onClick={() => setShowKey(!showKey)}
                                className="absolute right-3 top-3 text-slate-500 hover:text-white"
                            >
                                {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {!settings.apiKey && (
                            <div className="mt-3 flex items-start space-x-2 text-amber-400 text-xs bg-amber-900/20 p-2 rounded">
                                <AlertTriangle size={14} className="mt-0.5" />
                                <p>Without an API Key, the Neural Forge and Dashboard Analysis will be offline. This key is stored ONLY in your browser's local storage.</p>
                            </div>
                        )}
                        <p className="text-xs text-slate-500 mt-2">
                            Get a free key at <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-nexus-accent hover:underline">aistudio.google.com</a>
                        </p>
                    </div>
                </section>

                {/* Identity Module */}
                <section className="bg-nexus-800/30 rounded-xl p-6 border border-nexus-700/50">
                    <div className="flex items-center mb-6 text-nexus-accent">
                        <User className="mr-3" />
                        <h3 className="text-lg font-semibold text-white">Identity Protocol</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Designation (Username)</label>
                            <input 
                                type="text" 
                                value={settings.username}
                                onChange={(e) => setSettings({...settings, username: e.target.value})}
                                className="w-full bg-nexus-900 border border-nexus-700 rounded-lg p-3 text-white focus:border-nexus-accent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Clearance Level (Role)</label>
                            <input 
                                type="text" 
                                value={settings.role}
                                onChange={(e) => setSettings({...settings, role: e.target.value})}
                                className="w-full bg-nexus-900 border border-nexus-700 rounded-lg p-3 text-white focus:border-nexus-accent outline-none"
                            />
                        </div>
                    </div>
                </section>

                {/* Notification Module */}
                <section className="bg-nexus-800/30 rounded-xl p-6 border border-nexus-700/50">
                    <div className="flex items-center mb-6 text-nexus-accent">
                        <Bell className="mr-3" />
                        <h3 className="text-lg font-semibold text-white">Alert Vectors</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-nexus-900/50 rounded-lg">
                            <span className="text-slate-300">Email Analysis Reports</span>
                            <button 
                                onClick={() => setSettings({...settings, emailNotifications: !settings.emailNotifications})}
                                className={`w-12 h-6 rounded-full transition-colors relative ${settings.emailNotifications ? 'bg-nexus-success' : 'bg-slate-700'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.emailNotifications ? 'left-7' : 'left-1'}`}></div>
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-nexus-900/50 rounded-lg">
                            <span className="text-slate-300">Auto-Archive Generated Content</span>
                            <button 
                                onClick={() => setSettings({...settings, autoSave: !settings.autoSave})}
                                className={`w-12 h-6 rounded-full transition-colors relative ${settings.autoSave ? 'bg-nexus-success' : 'bg-slate-700'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.autoSave ? 'left-7' : 'left-1'}`}></div>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Data Management */}
                <section className="bg-nexus-800/30 rounded-xl p-6 border border-nexus-700/50">
                    <div className="flex items-center mb-6 text-nexus-accent">
                        <Database className="mr-3" />
                        <h3 className="text-lg font-semibold text-white">Data Sovereignty</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button 
                            onClick={handleExport}
                            className="flex items-center justify-center space-x-2 p-4 border border-nexus-700 rounded-lg hover:bg-nexus-700/50 transition-colors text-slate-300 hover:text-white"
                        >
                            <Download size={18} />
                            <span>Export System Data (JSON)</span>
                        </button>
                        <button 
                            onClick={handleClearData}
                            className="flex items-center justify-center space-x-2 p-4 border border-rose-900/50 rounded-lg hover:bg-rose-900/20 transition-colors text-rose-400"
                        >
                            <Trash2 size={18} />
                            <span>Purge Local Archives</span>
                        </button>
                    </div>
                </section>

                 <section className="bg-gradient-to-r from-nexus-900 to-nexus-800 rounded-xl p-6 border border-nexus-700/50 flex justify-between items-center">
                    <div className="flex items-center text-slate-400">
                        <ShieldCheck className="mr-3 text-emerald-500" />
                        <div className="text-sm">
                            <p className="text-white font-medium">System Integrity Verified</p>
                            <p>Version 11.0.1 • Build 2409</p>
                        </div>
                    </div>
                    <button 
                        onClick={handleSave}
                        className="bg-nexus-accent hover:bg-cyan-400 text-nexus-900 px-6 py-3 rounded-lg font-bold flex items-center space-x-2 transition-transform active:scale-95"
                    >
                        <Save size={18} />
                        <span>Save Configuration</span>
                    </button>
                </section>
            </div>
        </div>
    );
};

export default Settings;