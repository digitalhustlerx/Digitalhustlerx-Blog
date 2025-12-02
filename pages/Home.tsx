
import React from 'react';
import { ArrowRight, Terminal } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { GithubActivity } from '../components/GithubActivity';
import { RoutePage } from '../types';

export const Home = () => {
    const { posts, viewPost, setPage } = useBlog();
    
    // Only show first 4 posts
    const featuredPosts = posts.slice(0, 4);

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            
            {/* Hero Section */}
            <div className="border-l-2 border-neon-green pl-6 mb-20 relative">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-neon-green blur-md opacity-50"></div>
                <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 font-sans tracking-tighter leading-tight">
                    Master the Art of <br />
                    Digital Leverage <span className="text-neon-green terminal-cursor"></span>
                </h1>
                <p className="text-lg text-gray-400 max-w-xl font-sans mb-8 leading-relaxed">
                    Join 50,000+ entrepreneurs utilizing <span className="text-white font-semibold">Automated Intelligence</span> and <span className="text-white font-semibold">High-Leverage Content</span> to scale disconnected income sources.
                </p>
                
                <div className="flex gap-4">
                    <button 
                        onClick={() => setPage(RoutePage.AI_MASTERY)}
                        className="bg-neon-green text-black px-6 py-3 font-bold font-sans text-sm hover:bg-white transition-colors flex items-center gap-2 rounded-sm"
                    >
                        Start Learning <ArrowRight size={16} />
                    </button>
                    <button className="border border-gray-700 text-gray-300 px-6 py-3 font-bold font-sans text-sm hover:border-neon-green hover:text-neon-green transition-colors rounded-sm">
                        Read Articles
                    </button>
                </div>
            </div>
            
            {/* Terminal Divider: Articles */}
            <div className="flex items-center gap-4 mb-10 text-gray-600 font-mono text-sm">
                <Terminal size={16} className="text-neon-green" />
                <span>root@dhx:~/latest_uploads</span>
                <div className="h-px bg-gray-800 flex-1"></div>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 gap-6 mb-20">
                {featuredPosts.map((post) => (
                    <article 
                        key={post.id} 
                        onClick={() => viewPost(post.id)}
                        className="flex flex-col md:flex-row gap-6 border border-gray-800 p-6 rounded hover:border-neon-green/50 transition duration-300 bg-gray-900/20 group cursor-pointer hover:bg-gray-900/40"
                    >
                        <div className="w-full md:w-56 h-36 shrink-0 relative overflow-hidden border border-gray-700 group-hover:border-neon-green transition-colors">
                            {post.imageUrl ? (
                                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            ) : (
                                <div className="w-full h-full bg-gray-800 flex items-center justify-center font-mono text-gray-600">
                                    NO_IMG
                                </div>
                            )}
                            <div className="absolute top-0 right-0 bg-black/80 px-2 py-1 text-[10px] font-mono text-neon-green border-l border-b border-gray-700">
                                {post.category}
                            </div>
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-center">
                            <div className="flex items-center gap-2 text-xs text-neon-green mb-2 font-mono opacity-70">
                                <span>./{post.category.toLowerCase().replace(' ', '_')}</span>
                                <span className="text-gray-600">|</span>
                                <span className="text-gray-500">{post.date}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-neon-green transition-colors font-sans leading-tight">
                                {post.title}
                            </h3>
                            <p className="text-sm text-gray-500 mb-4 line-clamp-2 font-mono">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center gap-2 text-xs font-mono text-gray-600">
                                <span>Reading time: {post.readTime}</span>
                                <span>//</span>
                                <span>Views: {post.views}</span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* Github Activity Section */}
            <GithubActivity />
        </div>
    );
};
