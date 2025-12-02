import React from 'react';
import { Play, ArrowLeft, Video } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { RoutePage } from '../types';

export const AiMastery = () => {
    const { setPage } = useBlog();

    // AI Course Modules Data - Human readable, simplified
    const videoModules = [
        {
            id: '1',
            title: 'Setting Up Cursor',
            description: 'Download the app, install it, and delete your old code editor. This is where the magic starts.',
            duration: '5:00',
            level: 'Step 1'
        },
        {
            id: '2',
            title: 'English is the New Code',
            description: 'You don\'t need to learn syntax. You just need to explain what you want clearly. Here is how to talk to the AI.',
            duration: '12:20',
            level: 'Step 2'
        },
        {
            id: '3',
            title: 'Building a Landing Page',
            description: 'Watch me build a real website in under 15 minutes just by typing commands. No coding required.',
            duration: '15:45',
            level: 'Practical'
        },
        {
            id: '4',
            title: 'Going Live',
            description: 'It works on your laptop, now let\'s put it on the internet so people can actually see it.',
            duration: '8:30',
            level: 'Final Step'
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
                    Build with <span className="text-neon-green">Cursor AI</span>
                </h1>
                <p className="text-xl text-gray-400 font-sans max-w-2xl leading-relaxed mb-6">
                    Coding used to be hard. Now, it's just about having ideas. 
                    This course teaches you how to use <strong>Cursor.com</strong> to build your own apps, websites, and tools without needing a degree in computer science.
                </p>
                <div className="inline-block bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                    <p className="text-gray-300 font-sans text-sm">
                        <span className="text-neon-green font-bold">The Goal:</span> Go from "I have an idea" to "I built this" in one weekend.
                    </p>
                </div>
            </div>

            {/* Section Header */}
            <div className="flex items-center gap-3 mb-8 text-white font-sans font-bold text-xl">
                <Video size={24} className="text-neon-green" />
                <span>Course Modules</span>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {videoModules.map((module) => (
                    <div key={module.id} className="group cursor-pointer border border-gray-800 bg-gray-900/20 rounded-xl overflow-hidden hover:border-neon-green hover:bg-gray-900/40 transition-all duration-300 shadow-lg">
                        {/* Video Thumbnail Placeholder */}
                        <div className="h-56 bg-gray-900 relative border-b border-gray-800 group-hover:border-neon-green/50 transition-colors">
                            <img 
                                src={`https://picsum.photos/800/450?random=${module.id + 10}`} 
                                alt={module.title}
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-500" 
                            />
                            {/* Play Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                                <div className="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-neon-green group-hover:text-black group-hover:border-neon-green transition-all">
                                    <Play size={20} className="ml-1 text-white group-hover:text-black" fill="currentColor" />
                                </div>
                            </div>
                            <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur px-2 py-1 text-xs font-bold text-white rounded">
                                {module.duration}
                            </div>
                        </div>

                        {/* Content Info */}
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-3">
                                <span className="text-[10px] font-bold text-neon-green uppercase tracking-wider bg-neon-green/10 px-2 py-1 rounded">
                                    {module.level}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 font-sans group-hover:text-neon-green transition-colors">
                                {module.title}
                            </h3>
                            <p className="text-sm text-gray-400 font-sans leading-relaxed">
                                {module.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 text-center">
                <p className="text-gray-500 text-sm mb-4">
                    New videos are added weekly.
                </p>
                <button className="text-white border-b border-neon-green hover:text-neon-green transition-colors pb-1 text-sm font-medium">
                    Get notified when I post new stuff
                </button>
            </div>
        </div>
    );
};