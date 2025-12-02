import React from 'react';
import { useBlog } from '../context/BlogContext';
import { ArrowLeft, Clock, Eye, Calendar, Share2 } from 'lucide-react';
import { RoutePage } from '../types';

export const BlogPost = () => {
    const { posts, currentPostId, setPage } = useBlog();
    const post = posts.find(p => p.id === currentPostId);

    if (!post) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-500 font-mono">
                <div className="text-4xl mb-4 text-red-500">404</div>
                <p>ERROR: DATA_CORRUPTION_DETECTED</p>
                <button onClick={() => setPage(RoutePage.HOME)} className="mt-6 text-neon-green hover:underline">
                    &lt; Return Home
                </button>
            </div>
        );
    }

    return (
        <article className="max-w-4xl mx-auto px-6 py-12">
            
            {/* Nav Back */}
            <button 
                onClick={() => setPage(RoutePage.HOME)} 
                className="group flex items-center gap-2 text-gray-500 hover:text-neon-green mb-10 transition-colors font-mono text-sm"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                BACK_TO_ROOT
            </button>

            {/* Header */}
            <header className="mb-12 border-b border-gray-800 pb-12">
                <div className="flex items-center gap-4 mb-6">
                    <span className="bg-neon-green/10 text-neon-green border border-neon-green/20 px-3 py-1 text-xs font-mono rounded">
                        {post.category}
                    </span>
                    <span className="text-gray-500 text-xs font-mono">{post.date}</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight font-sans">
                    {post.title}
                </h1>

                <div className="flex items-center justify-between text-gray-500 text-sm font-mono">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Clock size={16} /> {post.readTime}
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye size={16} /> {post.views} Reads
                        </div>
                    </div>
                    <button className="flex items-center gap-2 hover:text-white transition-colors">
                        <Share2 size={16} /> Share
                    </button>
                </div>
            </header>

            {/* Image */}
            {post.imageUrl && (
                <div className="mb-12 border border-gray-800 p-2 bg-gray-900/50">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
            )}

            {/* Content */}
            <div 
                className="prose prose-invert prose-lg max-w-none prose-headings:font-sans prose-headings:text-white prose-p:text-gray-300 prose-a:text-neon-green prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Footer of Article */}
            <div className="mt-20 pt-10 border-t border-gray-800 flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-800 rounded-full mb-4 flex items-center justify-center text-2xl">👨‍💻</div>
                <h3 className="text-white font-bold font-sans">Digital Hustler X</h3>
                <p className="text-gray-500 text-sm mt-2 font-mono">System Administrator</p>
                <button className="mt-6 border border-neon-green text-neon-green px-6 py-2 text-sm font-mono hover:bg-neon-green hover:text-black transition-colors">
                    SUBSCRIBE_NEWSLETTER
                </button>
            </div>

        </article>
    );
};