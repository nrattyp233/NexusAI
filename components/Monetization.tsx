import React from 'react';
import { Check, Shield, Zap, Globe } from 'lucide-react';

const PricingCard = ({ title, price, features, recommended = false }: { title: string, price: string, features: string[], recommended?: boolean }) => (
    <div className={`relative p-8 rounded-2xl border flex flex-col ${
        recommended 
        ? 'bg-nexus-800/80 border-nexus-accent shadow-2xl shadow-nexus-accent/10 scale-105 z-10' 
        : 'bg-nexus-900/50 border-nexus-700/50 opacity-80 hover:opacity-100 transition-opacity'
    }`}>
        {recommended && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-nexus-accent text-nexus-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                Best Value
            </div>
        )}
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <div className="flex items-baseline mb-6">
            <span className="text-4xl font-bold text-white">{price}</span>
            <span className="text-slate-400 ml-2">/mo</span>
        </div>
        <ul className="space-y-4 mb-8 flex-1">
            {features.map((feat, idx) => (
                <li key={idx} className="flex items-center text-slate-300 text-sm">
                    <Check size={16} className="text-nexus-accent mr-3 flex-shrink-0" />
                    {feat}
                </li>
            ))}
        </ul>
        <button className={`w-full py-3 rounded-lg font-bold transition-all ${
            recommended
            ? 'bg-nexus-accent text-nexus-900 hover:bg-cyan-400'
            : 'bg-slate-800 text-white hover:bg-slate-700'
        }`}>
            Select Plan
        </button>
    </div>
);

const Monetization: React.FC = () => {
    return (
        <div className="p-8 h-full overflow-y-auto animate-fadeIn">
             <header className="mb-12 text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-4">Revenue Streams</h2>
                <p className="text-slate-400">Upgrade to Enterprise protocols for unrestricted bandwidth and advanced neural models.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <PricingCard 
                    title="Operative" 
                    price="$29" 
                    features={['Basic Trend Analysis', '10 Content Generations/day', 'Standard Support', 'Single User Seat']} 
                />
                <PricingCard 
                    title="Tactical" 
                    price="$99" 
                    recommended={true}
                    features={['Advanced Neural Models', 'Unlimited Generation', 'API Access', 'Priority Support', '5 User Seats', 'Custom Templates']} 
                />
                <PricingCard 
                    title="Strategic" 
                    price="$299" 
                    features={['Full Source Code Access', 'White-label Options', 'Dedicated Server', '24/7 Ops Support', 'Unlimited Seats', 'Custom Model Fine-tuning']} 
                />
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <div className="p-6 bg-nexus-800/30 rounded-xl border border-nexus-700/50 flex flex-col items-center text-center">
                    <div className="p-3 bg-nexus-900 rounded-full text-nexus-accent mb-4">
                        <Shield size={24} />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Enterprise Security</h4>
                    <p className="text-sm text-slate-400">SOC2 Compliant infrastructure with end-to-end encryption.</p>
                </div>
                <div className="p-6 bg-nexus-800/30 rounded-xl border border-nexus-700/50 flex flex-col items-center text-center">
                    <div className="p-3 bg-nexus-900 rounded-full text-nexus-accent mb-4">
                        <Zap size={24} />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Low Latency</h4>
                    <p className="text-sm text-slate-400">Global edge network ensures sub-100ms response times.</p>
                </div>
                <div className="p-6 bg-nexus-800/30 rounded-xl border border-nexus-700/50 flex flex-col items-center text-center">
                    <div className="p-3 bg-nexus-900 rounded-full text-nexus-accent mb-4">
                        <Globe size={24} />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Global Scale</h4>
                    <p className="text-sm text-slate-400">Multi-region deployment capabilities for international operations.</p>
                </div>
            </div>
        </div>
    );
};

export default Monetization;