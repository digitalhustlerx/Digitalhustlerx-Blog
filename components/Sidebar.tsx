import React from 'react';
import { Home, FileText, Settings, X, Cpu, DollarSign, Zap, Twitter, Github, Linkedin, Youtube, Terminal } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { RoutePage } from '../types';

export const Sidebar = () => {
    const { isSidebarOpen, toggleSidebar, setPage } = useBlog();

    return (
        <>
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleSidebar}
            />

            {/* Sidebar Panel */}
            <div className={`fixed top-0 left-0 w-80 h-full bg-charcoal border-r border-gray-800 z-50 transform transition-transform duration-300 ease-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
                
                <div className="flex justify-between items-center p-6 border-b border-gray-800 shrink-0">
                    <div className="text-xl font-bold text-white tracking-widest font-mono">&lt;MENU/&gt;</div>
                    <button onClick={toggleSidebar} className="text-gray-400 hover:text-neon-green transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                    
                    {/* Main Nav */}
                    <div className="space-y-2">
                        <p className="text-xs text-gray-500 font-mono mb-4 uppercase tracking-widest">[ System_Nav ]</p>
                        
                        <button onClick={() => setPage(RoutePage.HOME)} className="w-full flex items-center gap-3 text-gray-300 hover:text-neon-green hover:bg-gray-900 p-3 rounded transition-all group text-left">
                            <Home size={18} className="group-hover:animate-pulse" />
                            <span className="font-mono text-sm">/home</span>
                        </button>
                        
                        <button onClick={() => setPage(RoutePage.BLOG_LIST)} className="w-full flex items-center gap-3 text-gray-300 hover:text-neon-green hover:bg-gray-900 p-3 rounded transition-all group text-left">
                            <FileText size={18} />
                            <span className="font-mono text-sm">/articles</span>
                        </button>

                         <button onClick={() => setPage(RoutePage.AI_MASTERY)} className="w-full flex items-center gap-3 text-white hover:text-neon-green hover:bg-gray-900 p-3 rounded transition-all group text-left bg-gray-900/50 border border-gray-800">
                            <Terminal size={18} className="text-neon-green" />
                            <span className="font-mono text-sm font-bold">/cursor_protocol</span>
                        </button>

                        <button onClick={() => setPage(RoutePage.ADMIN)} className="w-full flex items-center gap-3 text-gray-300 hover:text-neon-green hover:bg-gray-900 p-3 rounded transition-all group text-left">
                            <Settings size={18} />
                            <span className="font-mono text-sm">/admin_panel</span>
                        </button>
                    </div>

                    {/* Categories */}
                    <div className="space-y-2 pt-6 border-t border-gray-800">
                        <p className="text-xs text-gray-500 font-mono mb-4 uppercase tracking-widest">[ Tags ]</p>
                        
                        <div className="flex items-center gap-3 text-gray-400 hover:text-white p-2 cursor-pointer transition-colors">
                            <Cpu size={16} className="text-neon-green" />
                            <span className="font-sans text-sm">Artificial Intelligence</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400 hover:text-white p-2 cursor-pointer transition-colors">
                            <DollarSign size={16} className="text-blue-400" />
                            <span className="font-sans text-sm">Crypto & Finance</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400 hover:text-white p-2 cursor-pointer transition-colors">
                            <Zap size={16} className="text-yellow-400" />
                            <span className="font-sans text-sm">Performance Marketing</span>
                        </div>
                    </div>
                </div>

                {/* Social Media Links (Bottom) */}
                <div className="p-6 border-t border-gray-800 shrink-0">
                    <p className="text-xs text-gray-500 font-mono mb-4 uppercase tracking-widest">[ Connect ]</p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-400 hover:text-neon-green transition-transform hover:-translate-y-1">
                            <Twitter size={20} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-neon-green transition-transform hover:-translate-y-1">
                            <Github size={20} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-neon-green transition-transform hover:-translate-y-1">
                            <Linkedin size={20} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-neon-green transition-transform hover:-translate-y-1">
                            <Youtube size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};