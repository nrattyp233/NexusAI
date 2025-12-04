import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, Zap, DollarSign, Eye, Cpu, Database } from 'lucide-react';
import { analyzeTrendData } from '../services/gemini';
import { MetricCardProps, GeneratedContent } from '../types';

const data = [
  { name: 'Mon', value: 4000, organic: 2400 },
  { name: 'Tue', value: 3000, organic: 1398 },
  { name: 'Wed', value: 2000, organic: 9800 },
  { name: 'Thu', value: 2780, organic: 3908 },
  { name: 'Fri', value: 1890, organic: 4800 },
  { name: 'Sat', value: 2390, organic: 3800 },
  { name: 'Sun', value: 3490, organic: 4300 },
];

const engagementData = [
    { name: 'LinkClick', value: 65 },
    { name: 'Share', value: 45 },
    { name: 'Like', value: 85 },
    { name: 'Save', value: 35 },
];

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive, icon, subtext }) => (
  <div className="bg-nexus-800/50 backdrop-blur-sm p-6 rounded-xl border border-nexus-700/50 hover:border-nexus-accent/30 transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-nexus-900 rounded-lg text-slate-300">
        {icon}
      </div>
      <div className={`flex items-center space-x-1 text-xs font-bold px-2 py-1 rounded-full ${
        isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
      }`}>
        {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
        <span>{change}</span>
      </div>
    </div>
    <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-white">{value}</p>
    {subtext && <p className="text-xs text-slate-500 mt-2">{subtext}</p>}
  </div>
);

const Dashboard: React.FC = () => {
    const [aiInsight, setAiInsight] = useState<string>("Initializing neural analysis of market vectors...");
    const [historyCount, setHistoryCount] = useState(0);
    const [lastActive, setLastActive] = useState<string>("N/A");

    useEffect(() => {
        // Load Real Stats from Local Storage
        const saved = localStorage.getItem('nexus_history');
        if (saved) {
            const parsed: GeneratedContent[] = JSON.parse(saved);
            setHistoryCount(parsed.length);
            if (parsed.length > 0) {
                const last = new Date(parsed[0].timestamp);
                setLastActive(last.toLocaleDateString());
            }
        }

        const fetchInsight = async () => {
            const context = "Weekly traffic shows 45% growth in organic channels. User retention stable at 88%.";
            const result = await analyzeTrendData(context);
            setAiInsight(result);
        };
        fetchInsight();
    }, []);

    return (
        <div className="p-8 space-y-8 animate-fadeIn pb-20">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Command Center</h2>
                    <p className="text-slate-400">Real-time overview of operational metrics.</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-nexus-accent font-mono">LIVE_FEED_ACTIVE</p>
                </div>
            </header>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard 
                    title="Content Generated" 
                    value={historyCount.toString()} 
                    change="+100%" 
                    isPositive={true} 
                    icon={<Database size={20} />} 
                    subtext={`Last active: ${lastActive}`}
                />
                <MetricCard 
                    title="Active Users" 
                    value="1" 
                    change="Stable" 
                    isPositive={true} 
                    icon={<Users size={20} />} 
                    subtext="Admin Access Only"
                />
                <MetricCard 
                    title="Efficiency Rate" 
                    value="98.2%" 
                    change="+2.4%" 
                    isPositive={true} 
                    icon={<Zap size={20} />} 
                />
                <MetricCard 
                    title="Est. Value Saved" 
                    value={`$${(historyCount * 25).toFixed(0)}`} 
                    change="+22.4%" 
                    isPositive={true} 
                    icon={<DollarSign size={20} />} 
                    subtext="Based on agency rates"
                />
            </div>

            {/* Main Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-nexus-800/30 rounded-xl p-6 border border-nexus-700/50">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-white">Growth Trajectory</h3>
                        <div className="flex space-x-2">
                            <span className="px-3 py-1 text-xs rounded-full bg-nexus-accent/20 text-nexus-accent cursor-pointer">Weekly</span>
                            <span className="px-3 py-1 text-xs rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 cursor-pointer transition">Monthly</span>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#e2e8f0' }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                                <Area type="monotone" dataKey="organic" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorOrganic)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-nexus-800/30 rounded-xl p-6 border border-nexus-700/50 flex flex-col">
                     <h3 className="text-lg font-semibold text-white mb-6">Engagement Split</h3>
                     <div className="flex-1 min-h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={engagementData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.2} />
                                <XAxis type="number" stroke="#64748b" fontSize={12} hide />
                                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={60} tickLine={false} axisLine={false} />
                                <Tooltip 
                                    cursor={{fill: '#334155', opacity: 0.2}}
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                                />
                                <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                     </div>
                </div>
            </div>

            {/* AI Insight Box */}
            <div className="bg-gradient-to-r from-indigo-900/40 to-nexus-900 rounded-xl p-6 border border-indigo-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Cpu size={100} />
                </div>
                <h3 className="text-indigo-400 font-mono text-sm mb-2 flex items-center">
                    <Zap size={14} className="mr-2" />
                    AI STRATEGIC ANALYSIS
                </h3>
                <p className="text-slate-200 leading-relaxed font-light">
                    {aiInsight}
                </p>
            </div>
        </div>
    );
};

export default Dashboard;