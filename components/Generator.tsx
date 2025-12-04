import React, { useState, useEffect } from 'react';
import { Send, FileText, Share2, Copy, Check, Archive, Clock, ArrowRight, Trash } from 'lucide-react';
import { ContentType, GeneratedContent } from '../types';
import { generateStrategicContent } from '../services/gemini';

const Generator: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [selectedType, setSelectedType] = useState<ContentType>(ContentType.LINKEDIN);
    const [isGenerating, setIsGenerating] = useState(false);
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);
    const [history, setHistory] = useState<GeneratedContent[]>([]);
    const [viewHistory, setViewHistory] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('nexus_history');
        if (saved) {
            setHistory(JSON.parse(saved));
        }
    }, []);

    const saveToHistory = (content: string, topic: string, type: ContentType) => {
        const newItem: GeneratedContent = {
            id: Date.now().toString(),
            topic,
            title: `${type} Strategy: ${topic.substring(0, 20)}...`,
            body: content,
            type,
            timestamp: Date.now()
        };
        const updated = [newItem, ...history];
        setHistory(updated);
        localStorage.setItem('nexus_history', JSON.stringify(updated));
    };

    const deleteItem = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const updated = history.filter(item => item.id !== id);
        setHistory(updated);
        localStorage.setItem('nexus_history', JSON.stringify(updated));
    }

    const handleGenerate = async () => {
        if (!topic) return;
        setIsGenerating(true);
        setOutput('');
        
        const result = await generateStrategicContent(topic, selectedType);
        setOutput(result);
        
        // Auto-save logic could go here based on settings, but we'll do manual for now or implied
        saveToHistory(result, topic, selectedType);
        
        setIsGenerating(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const loadFromHistory = (item: GeneratedContent) => {
        setTopic(item.topic);
        setSelectedType(item.type);
        setOutput(item.body);
        setViewHistory(false);
    };

    return (
        <div className="p-8 h-full flex flex-col animate-fadeIn relative">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Neural Forge</h2>
                    <p className="text-slate-400">Autonomous content generation module.</p>
                </div>
                <button 
                    onClick={() => setViewHistory(!viewHistory)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${viewHistory ? 'bg-nexus-accent text-nexus-900 border-nexus-accent' : 'bg-nexus-800 border-nexus-700 text-slate-300 hover:text-white'}`}
                >
                    <Clock size={18} />
                    <span>{viewHistory ? 'Close Archives' : 'Access Archives'}</span>
                </button>
            </header>

            <div className="flex gap-8 flex-1 overflow-hidden">
                {/* Main Workflow Area */}
                <div className={`flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 transition-all duration-300 ${viewHistory ? 'w-2/3' : 'w-full'}`}>
                    {/* Input Control */}
                    <div className="bg-nexus-800/30 rounded-xl p-6 border border-nexus-700/50 h-fit">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Target Topic</label>
                                <textarea 
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    className="w-full bg-nexus-900 border border-nexus-700 rounded-lg p-4 text-white focus:ring-2 focus:ring-nexus-accent focus:border-transparent outline-none transition-all placeholder-slate-600 h-32 resize-none"
                                    placeholder="E.g., The future of AI in SaaS development..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Platform Vector</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {Object.values(ContentType).map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setSelectedType(type)}
                                            className={`p-3 rounded-lg text-sm font-medium transition-all ${
                                                selectedType === type
                                                ? 'bg-nexus-accent text-nexus-900 shadow-lg shadow-nexus-accent/20'
                                                : 'bg-nexus-900 text-slate-400 hover:bg-nexus-800 border border-nexus-700'
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleGenerate}
                                disabled={isGenerating || !topic}
                                className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 transition-all ${
                                    isGenerating || !topic
                                    ? 'bg-nexus-700 text-slate-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-nexus-accent to-indigo-500 text-white hover:shadow-lg hover:shadow-nexus-accent/25 active:scale-[0.98]'
                                }`}
                            >
                                {isGenerating ? (
                                    <>
                                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                        <span>PROCESSING...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        <span>INITIATE SEQUENCE</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Output Display */}
                    <div className="lg:col-span-2 bg-nexus-900 rounded-xl border border-nexus-700/50 relative flex flex-col shadow-inner min-h-[500px]">
                        <div className="flex items-center justify-between p-4 border-b border-nexus-800 bg-nexus-800/30 rounded-t-xl">
                            <div className="flex items-center space-x-2 text-slate-400">
                                <FileText size={16} />
                                <span className="text-xs font-mono uppercase">Output_Stream_v1</span>
                            </div>
                            {output && (
                                <div className="flex space-x-2">
                                    <button onClick={handleCopy} className="p-2 hover:bg-slate-700 rounded-md text-slate-400 hover:text-white transition" title="Copy to Clipboard">
                                        {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        <div className="flex-1 p-6 overflow-y-auto font-mono text-sm leading-relaxed text-slate-300 whitespace-pre-wrap">
                            {output ? (
                                output
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50">
                                    <div className="w-16 h-16 border-2 border-slate-700 border-t-slate-500 rounded-full animate-spin-slow mb-4"></div>
                                    <p>AWAITING INPUT PARAMETERS</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Archives Sidebar */}
                {viewHistory && (
                    <div className="w-80 bg-nexus-900 border-l border-nexus-800 flex flex-col animate-slideInRight">
                        <div className="p-4 border-b border-nexus-800 font-bold text-white flex items-center">
                            <Archive size={18} className="mr-2 text-nexus-accent" />
                            <span>Neural Archives</span>
                            <span className="ml-auto text-xs bg-nexus-800 px-2 py-1 rounded-full text-slate-400">{history.length}</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {history.length === 0 ? (
                                <p className="text-center text-slate-500 text-sm py-8">No archived generations found.</p>
                            ) : (
                                history.map((item) => (
                                    <div 
                                        key={item.id} 
                                        onClick={() => loadFromHistory(item)}
                                        className="group p-3 rounded-lg bg-nexus-800/50 border border-nexus-800 hover:border-nexus-accent/50 cursor-pointer transition-all"
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-xs font-bold text-nexus-accent uppercase">{item.type}</span>
                                            <span className="text-[10px] text-slate-500">{new Date(item.timestamp).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-sm text-slate-300 line-clamp-2 mb-2">{item.topic}</p>
                                        <div className="flex justify-between items-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="text-xs flex items-center text-nexus-accent">
                                                Load <ArrowRight size={12} className="ml-1" />
                                            </button>
                                            <button onClick={(e) => deleteItem(item.id, e)} className="text-slate-500 hover:text-rose-400">
                                                <Trash size={12} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Generator;