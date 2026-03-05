import React from 'react';
import { useBlog } from '../context/BlogContext';
import { RoutePage } from '../types';
import { ArrowLeft, Search, Calendar, Eye } from 'lucide-react';

export const BlogList = () => {
  const { posts, setPage } = useBlog();
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <button 
        onClick={() => setPage(RoutePage.HOME)} 
        className="group flex items-center gap-2 text-gray-500 hover:text-neon-blue mb-10 transition-colors font-mono text-sm"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        BACK_TO_HOME
      </button>

      <div className="mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full pl-12 pr-4 py-3 bg-gray-900/40 border border-gray-800 rounded-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-neon-blue/50 transition-colors font-mono text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article key={post.id} className="group cursor-pointer hover:border-neon-blue/50 transition-all bg-gray-900/20 border border-gray-800 p-6 rounded-lg">
            {post.imageUrl && (
              <div className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-4 flex items-center justify-center group-hover:bg-neon-blue/10 transition-all">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover rounded-lg grayscale group-hover:grayscale-0" />
              </div>
            )}
            <div className="flex items-center gap-2 text-xs text-neon-blue mb-3 font-mono uppercase tracking-wider">
              {post.category}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-neon-blue transition-colors">
              {post.title}
            </h3>
            <p className="text-gray-400 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
              <span><Calendar size={12} /> {post.date}</span>
              <span><Eye size={12} /> {post.views}</span>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-20 text-gray-500 font-mono">
          No articles match your search. Try something else.
        </div>
      )}
    </div>
  );
};
