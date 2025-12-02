import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { Trash2, Plus, LayoutDashboard, FileText, Save, XCircle } from 'lucide-react';
import { BlogPost } from '../types';

export const Admin = () => {
    const { posts, addPost, deletePost } = useBlog();
    const [view, setView] = useState<'LIST' | 'CREATE'>('LIST');
    
    // Form State
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        excerpt: '',
        content: '',
        imageUrl: '',
        readTime: '5 min'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.content) return;
        
        addPost({
            title: formData.title,
            category: formData.category || 'General',
            excerpt: formData.excerpt,
            content: formData.content,
            imageUrl: formData.imageUrl || `https://picsum.photos/800/400?random=${Math.floor(Math.random() * 100)}`,
            readTime: formData.readTime
        });
        
        // Reset and go back to list
        setFormData({ title: '', category: '', excerpt: '', content: '', imageUrl: '', readTime: '5 min' });
        setView('LIST');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            
            {/* Header */}
            <div className="flex justify-between items-end mb-10 border-b border-gray-800 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white font-mono flex items-center gap-3">
                        <LayoutDashboard className="text-neon-green" /> 
                        Admin_Console
                    </h1>
                    <p className="text-gray-500 text-sm mt-2 font-mono">> Access Level: Root</p>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={() => setView('LIST')} 
                        className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors ${view === 'LIST' ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-white'}`}
                    >
                        Database
                    </button>
                    <button 
                        onClick={() => setView('CREATE')} 
                        className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors ${view === 'CREATE' ? 'bg-neon-green text-black' : 'text-gray-500 hover:text-neon-green'}`}
                    >
                        New Entry
                    </button>
                </div>
            </div>

            {view === 'LIST' ? (
                <div className="bg-gray-900/30 border border-gray-800 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-800 bg-gray-900/50 text-xs font-mono text-gray-500 uppercase tracking-wider">
                        <div className="col-span-6">Title</div>
                        <div className="col-span-2">Category</div>
                        <div className="col-span-2">Date</div>
                        <div className="col-span-2 text-right">Action</div>
                    </div>
                    {posts.map(post => (
                        <div key={post.id} className="grid grid-cols-12 gap-4 p-4 border-b border-gray-800 hover:bg-gray-800/30 transition-colors items-center">
                            <div className="col-span-6 font-sans font-medium text-gray-200 truncate pr-4">{post.title}</div>
                            <div className="col-span-2">
                                <span className="bg-gray-800 text-neon-green px-2 py-1 rounded text-xs font-mono border border-gray-700">{post.category}</span>
                            </div>
                            <div className="col-span-2 text-sm text-gray-500 font-mono">{post.date}</div>
                            <div className="col-span-2 text-right">
                                <button onClick={() => deletePost(post.id)} className="text-gray-500 hover:text-red-500 transition-colors p-2">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {posts.length === 0 && (
                        <div className="p-12 text-center text-gray-600 font-mono">
                            > No entries found in database.
                        </div>
                    )}
                </div>
            ) : (
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-neon-green uppercase">Title</label>
                                <input 
                                    name="title" 
                                    value={formData.title} 
                                    onChange={handleChange}
                                    className="w-full bg-black border border-gray-700 p-3 text-white focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green/50 transition-all font-sans" 
                                    placeholder="Enter article title..." 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-neon-green uppercase">Category</label>
                                <select 
                                    name="category" 
                                    value={formData.category} 
                                    onChange={handleChange}
                                    className="w-full bg-black border border-gray-700 p-3 text-white focus:border-neon-green focus:outline-none transition-all font-mono"
                                >
                                    <option value="">Select Category</option>
                                    <option value="AI Tools">AI Tools</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Mindset">Mindset</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-neon-green uppercase">Excerpt</label>
                            <input 
                                name="excerpt" 
                                value={formData.excerpt} 
                                onChange={handleChange}
                                className="w-full bg-black border border-gray-700 p-3 text-gray-300 focus:border-neon-green focus:outline-none transition-all font-sans text-sm" 
                                placeholder="Short summary for the card view..." 
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-neon-green uppercase">Content (HTML Supported)</label>
                            <textarea 
                                name="content" 
                                value={formData.content} 
                                onChange={handleChange}
                                rows={10}
                                className="w-full bg-black border border-gray-700 p-3 text-gray-300 focus:border-neon-green focus:outline-none transition-all font-mono text-sm" 
                                placeholder="<p>Write your content here...</p>" 
                            />
                            <p className="text-[10px] text-gray-600 font-mono text-right">HTML tags enabled for formatting.</p>
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            <button type="button" onClick={() => setView('LIST')} className="px-6 py-3 border border-gray-700 text-gray-400 font-mono text-sm hover:text-white transition-colors">
                                CANCEL
                            </button>
                            <button type="submit" className="px-6 py-3 bg-neon-green text-black font-bold font-mono text-sm hover:bg-white transition-colors flex items-center gap-2">
                                <Save size={16} /> SAVE_ENTRY
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};