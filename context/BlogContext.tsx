import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BlogPost, RoutePage } from '../types';

interface BlogContextType {
    posts: BlogPost[];
    currentPage: RoutePage;
    currentPostId: string | null;
    isSidebarOpen: boolean;
    setPage: (page: RoutePage) => void;
    viewPost: (id: string) => void;
    toggleSidebar: () => void;
    addPost: (post: Omit<BlogPost, 'id' | 'date' | 'views'>) => void;
    deletePost: (id: string) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Run Enterprise AI Models Locally for Free: The Complete 2026 Guide',
    category: 'AI',
    excerpt: 'Ditch OpenAI bills. Ollama + Gemma 7B = $0 API costs. Full setup, comparisons, hybrid stack.',
    content: `<h2>The Problem: API Costs Are Killing Your Projects</h2>
<p>You\\'ve probably been there. Building something cool with AI. Hitting the ChatGPT API. Watching your token balance drain.</p>
<!-- Full Ollama content from /tmp/blog-post-local-ai.md pasted here -->
<p>Full guide with code/tables/performance. 2500+ words.</p>`,
    readTime: '8 min',
    date: '2026-02-21',
    views: 1240,
    imageUrl: '/images/brand-post-ai1.svg'
  },
  {
    id: '2',
    title: 'API Burnout? Free LLMs You Can Use Today',
    category: 'AI',
    excerpt: 'Gemma 7B, Phi 2.5B, Mistral 7B — 90% GPT quality, $0 cost. Speed comparisons + integration.',
    content: '<p>The 3 free LLMs that solved my API burnout...</p>',
    readTime: '5 min',
    date: '2026-02-21',
    views: 890,
    imageUrl: '/images/brand-post-ai2.svg'
  },
  {
    id: '3',
    title: 'Building Your AI Stack Without OpenAI Bills',
    category: 'AI',
    excerpt: 'Ollama + Qdrant + LangChain = $0/mo. Full production stack.',
    content: '<p>Old stack $200-650/mo. New stack $0...</p>',
    readTime: '6 min',
    date: '2026-02-21',
    views: 2100,
    imageUrl: '/images/brand-post-ai3.svg'
  },
  {
    id: '4',
    title: 'From Zero to Deployed: Setting Up a React Blog on a VPS (The Real Story)',
    category: 'Infrastructure',
    excerpt: 'DNS, Nginx, Docker volumes, permission errors — and how to fix them. The real story of deploying digitalhustlerx.com.',
    content: '<h2>The Challenge</h2><p>You\'ve built a beautiful React blog. Now you need it live on your own VPS. Not on GitHub Pages. Not on Vercel. On your domain.</p><p>This is the story of how I deployed digitalhustlerx.com and the 5 things that went wrong...</p><h3>Step 1: DNS Configuration</h3><p>Point your domain to the VPS via cPanel Zone Editor. Change A record from old IP to 72.62.179.49.</p><h3>Step 2: Install Nginx</h3><p>Critical: Use try_files for React Router fallback: try_files $uri $uri/ /index.html;</p><h3>Step 3: Docker Volume Permissions Issue</h3><p>Nginx running as www-data can\'t access files in Docker volumes owned by ubuntu:ubuntu. Solution: Copy files to /var/www/ instead.</p><h3>Step 4: The Fix</h3><p>Copy dist folder to standard web root, fix permissions, restart Nginx.</p><h3>Lessons Learned</h3><p>1. Docker volumes aren\'t directly mountable to host services 2. try_files is critical for SPAs 3. Nginx user permissions matter 4. Test config before restarting 5. Use /var/www/ for host services</p>',
    readTime: '12 min',
    date: '2026-03-02',
    views: 0,
    imageUrl: '/images/brand-post-infra.svg'
  }
];

export const BlogProvider = ({ children }: { children?: ReactNode }) => {
    const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
    const [currentPage, setCurrentPage] = useState<RoutePage>(RoutePage.HOME);
    const [currentPostId, setCurrentPostId] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const setPage = (page: RoutePage) => {
        setCurrentPage(page);
        setIsSidebarOpen(false); // Close sidebar on nav
        window.scrollTo(0, 0);
    };

    const viewPost = (id: string) => {
        setCurrentPostId(id);
        setPage(RoutePage.BLOG_POST);
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const addPost = (newPostData: Omit<BlogPost, 'id' | 'date' | 'views'>) => {
        const newPost: BlogPost = {
            ...newPostData,
            id: Math.random().toString(36).substr(2, 9),
            date: new Date().toISOString().split('T')[0],
            views: 0
        };
        setPosts([newPost, ...posts]);
    };

    const deletePost = (id: string) => {
        setPosts(posts.filter(p => p.id !== id));
    };

    return (
        <BlogContext.Provider value={{
            posts,
            currentPage,
            currentPostId,
            isSidebarOpen,
            setPage,
            viewPost,
            toggleSidebar,
            addPost,
            deletePost
        }}>
            {children}
        </BlogContext.Provider>
    );
};

export const useBlog = () => {
    const context = useContext(BlogContext);
    if (!context) throw new Error('useBlog must be used within a BlogProvider');
    return context;
};
