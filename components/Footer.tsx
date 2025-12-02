import React from 'react';
import { Twitter, Github, Linkedin, Mail, Youtube } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="border-t border-gray-800 bg-obsidian mt-20">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    
                    {/* Brand */}
                    <div>
                        <div className="text-2xl font-bold text-white tracking-widest mb-2">&lt;DHX/&gt;</div>
                        <p className="text-gray-500 text-sm font-mono max-w-xs">
                            Optimizing the intersection of biological creativity and artificial intelligence.
                        </p>
                    </div>

                    {/* Socials */}
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

                <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-mono">
                    <p>&copy; 2024 Digital Hustler X. All systems operational.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="#" className="hover:text-gray-300">Privacy Protocol</a>
                        <a href="#" className="hover:text-gray-300">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};