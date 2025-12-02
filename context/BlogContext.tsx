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
        title: '5 ChatGPT Prompts That Replace Your Virtual Assistant',
        category: 'AI Tools',
        excerpt: 'Stop wasting time on administrative tasks. These specific prompt chains will handle scheduling, email drafting, and research.',
        content: `
            <p class="mb-4">The modern solopreneur doesn't need a payroll, they need a prompt library. In this breakdown, we explore the specific syntax required to turn an LLM into an executive assistant.</p>
            <h3 class="text-xl font-bold text-white mt-6 mb-2">1. The Inbox Zero Prompt</h3>
            <p class="mb-4">Most people use AI to write emails. The pros use AI to <em>triangulate</em> them. By feeding your inbox exports into a context window, you can generate priority matrices.</p>
            <div class="bg-gray-900 p-4 border-l-2 border-neon-green font-mono text-sm my-6">
                > SYSTEM: Act as an Executive Assistant.<br/>
                > INPUT: Here are my last 50 emails.<br/>
                > ACTION: Categorize by urgency (High/Med/Low) and draft replies for 'High'.
            </div>
            <p>This simple switch saves approx 4 hours/week.</p>
        `,
        readTime: '5 min',
        date: '2023-10-24',
        views: 1240,
        imageUrl: 'https://picsum.photos/800/400?random=1'
    },
    {
        id: '2',
        title: 'The Solopreneur Stack: $0 Overhead Business',
        category: 'Finance',
        excerpt: 'How to run a 6-figure operation using only free-tier SaaS products and open-source software.',
        content: '<p>Content coming soon...</p>',
        readTime: '8 min',
        date: '2023-10-22',
        views: 890,
        imageUrl: 'https://picsum.photos/800/400?random=2'
    },
    {
        id: '3',
        title: 'Deep Work: The Only Skill That Matters',
        category: 'Mindset',
        excerpt: 'In an age of distraction, the ability to focus for 4 hours is worth more than a Harvard MBA.',
        content: '<p>Content coming soon...</p>',
        readTime: '10 min',
        date: '2023-10-20',
        views: 2100,
        imageUrl: 'https://picsum.photos/800/400?random=3'
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