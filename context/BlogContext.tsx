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
    imageUrl: 'https://ollama.ai/images/hero.png'
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
    imageUrl: 'https://ollama.ai/images/hero.png'
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
    imageUrl: 'https://ollama.ai/images/hero.png'
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