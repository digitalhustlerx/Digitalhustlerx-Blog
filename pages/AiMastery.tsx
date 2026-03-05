
import React, { useState } from 'react';
import { Play, ArrowLeft, Video, CheckCircle, Brain, Terminal, Zap } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { RoutePage } from '../types';

export const AiMastery = () => {
    const { setPage } = useBlog();
    const [watchedModules, setWatchedModules] = useState<string[]>([]);

    const handleModuleClick = (id: string) => {
        if (!watchedModules.includes(id)) {
            setWatchedModules([...watchedModules, id]);
        }
        // In a real implementation, this would trigger the video player or navigation
    };

    // AI Course Modules Data - Simplified and Direct
    const videoModules = [
        {
            id: '1',
            title: 'Install the Tool',
            description: 'Get Cursor on your computer. It looks like a code editor, but it is actually a robot that works for you.',
            duration: '5:00',
            level: 'Step 1',
            thumbnail: '/images/brand-module-1.svg'
        },
        {
            id: '2',
            title: 'How to Speak AI',
            description: 'You do not need to learn code syntax. You just need to write clear English instructions. I show you how.',
            duration: '12:20',
            level: 'Step 2',
            thumbnail: '/images/brand-module-2.svg'
        },
        {
            id: '3',
            title: 'Build a Real Website',
            description: 'Watch me create a full landing page from scratch just by telling the AI what I want it to look like.',
            duration: '15:45',
            level: 'Practical',
            thumbnail: '/images/brand-module-3.svg'
        },
        {
            id: '4',
            title: 'Put It On The Internet',
            description: 'Taking the website from your laptop to the real world so anyone can visit it.',
            duration: '8:30',
            level: 'Final Step',
            thumbnail: '/images/brand-module-4.svg'
        }
    ];

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            
            {/* Nav Back */}
            <button 
                onClick={() => setPage(RoutePage.HOME)} 
                className="group flex items-center gap-2 text-gray-500 hover:text-white mb-10 transition-colors font-sans text-sm font-medium"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Home
            </button>

            {/* Header */}
            <div className="mb-12 border-b border-gray-800 pb-12">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-sans tracking-tight">
                    Build with <span className="text-neon-blue">Cursor AI</span>
                </h1>
                <p className="text-xl text-gray-400 font-sans max-w-2xl leading-relaxed mb-6">
                    Stop learning "how to code" and start building. Cursor is an AI tool that writes the code for you. 
                    If you can describe your idea in English, you can build it.
                </p>
                <div className="inline-block bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                    <p className="text-gray-300 font-sans text-sm">
                        <span className="text-neon-blue font-bold">The Goal:</span> Go from "I have an idea" to "I built this" in one weekend.
                    </p>
                </div>
            </div>

            {/* Benefits / Explanation Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="bg-charcoal border border-gray-800 p-6 rounded-lg hover:border-gray-600 transition-colors">
                    <div className="w-10 h-10 bg-neon-blue/10 flex items-center justify-center rounded mb-4">
                        <Brain className="text-neon-blue" size={20} />
                    </div>
                    <h3 className="text-white font-bold font-sans text-lg mb-2">It Thinks For You</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Unlike basic chatbots, Cursor understands your entire project. It knows where files are and how they connect.
                    </p>
                </div>
                
                <div className="bg-charcoal border border-gray-800 p-6 rounded-lg hover:border-gray-600 transition-colors">
                    <div className="w-10 h-10 bg-blue-500/10 flex items-center justify-center rounded mb-4">
                        <Terminal className="text-blue-400" size={20} />
                    </div>
                    <h3 className="text-white font-bold font-sans text-lg mb-2">It Executes Commands</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        You don't copy-paste code. You just press "Apply", and it writes the code into the files for you automatically.
                    </p>
                </div>

                <div className="bg-charcoal border border-gray-800 p-6 rounded-lg hover:border-gray-600 transition-colors">
                    <div className="w-10 h-10 bg-purple-500/10 flex items-center justify-center rounded mb-4">
                        <Zap className="text-purple-400" size={20} />
                    </div>
                    <h3 className="text-white font-bold font-sans text-lg mb-2">Zero to One</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        It bridges the gap between having an idea and having a product. No syntax errors, just results.
                    </p>
                </div>
            </div>

            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3 text-white font-sans font-bold text-xl">
                    <Video size={24} className="text-neon-blue" />
                    <span>Course Modules</span>
                </div>
                <div className="text-xs font-mono text-gray-500">
                    PROGRESS: <span className="text-neon-blue">{watchedModules.length}</span> / {videoModules.length} COMPLETED
                </div>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {videoModules.map((module) => {
                    const isWatched = watchedModules.includes(module.id);
                    return (
                        <div 
                            key={module.id} 
                            onClick={() => handleModuleClick(module.id)}
                            className={`group cursor-pointer border rounded-xl overflow-hidden transition-all duration-300 shadow-lg relative ${isWatched ? 'border-neon-blue/30 bg-gray-900/10' : 'border-gray-800 bg-gray-900/20 hover:border-neon-blue hover:bg-gray-900/40'}`}
                        >
                            {/* Watched Badge */}
                            {isWatched && (
                                <div className="absolute top-3 left-3 z-20 bg-neon-blue text-black text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 font-mono shadow-lg">
                                    <CheckCircle size={12} /> WATCHED
                                </div>
                            )}

                            {/* Video Thumbnail Placeholder */}
                            <div className="h-56 bg-gray-900 relative border-b border-gray-800 group-hover:border-neon-blue/50 transition-colors">
                                <img
                                    src={module.thumbnail}
                                    alt={`${module.title} thumbnail`}
                                    loading="lazy"
                                    className={`w-full h-full object-cover transition-all duration-500 ${isWatched ? 'grayscale opacity-40' : 'opacity-60 group-hover:opacity-90'}`}
                                />
                                {/* Play Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center transition-colors">
                                    {isWatched ? (
                                        <div className="text-neon-blue font-mono text-sm font-bold bg-black/50 px-3 py-1 rounded border border-neon-blue/30">
                                            REWATCH
                                        </div>
                                    ) : (
                                        <div className="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-neon-blue group-hover:text-black group-hover:border-neon-blue transition-all shadow-xl">
                                            <Play size={20} className="ml-1 text-white group-hover:text-black" fill="currentColor" />
                                        </div>
                                    )}
                                </div>
                                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur px-2 py-1 text-xs font-bold text-white rounded">
                                    {module.duration}
                                </div>
                            </div>

                            {/* Content Info */}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded transition-colors ${isWatched ? 'bg-gray-800 text-gray-500' : 'bg-neon-blue/10 text-neon-blue'}`}>
                                        {module.level}
                                    </span>
                                </div>
                                <h3 className={`text-lg font-bold mb-2 font-sans transition-colors ${isWatched ? 'text-gray-400' : 'text-white group-hover:text-neon-blue'}`}>
                                    {module.title}
                                </h3>
                                <p className="text-sm text-gray-400 font-sans leading-relaxed">
                                    {module.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-16 text-center border-t border-gray-800 pt-8">
                <p className="text-gray-500 text-sm mb-4">
                    New videos are added weekly.
                </p>
                <button className="text-white border-b border-neon-blue hover:text-neon-blue transition-colors pb-1 text-sm font-medium">
                    Get notified when I post new stuff
                </button>
            </div>
        </div>
    );
};
