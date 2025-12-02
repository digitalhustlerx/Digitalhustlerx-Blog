import React from 'react';
import { Menu } from 'lucide-react';
import { BlogProvider, useBlog } from './context/BlogContext';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { BlogPost } from './pages/BlogPost';
import { Admin } from './pages/Admin';
import { AiMastery } from './pages/AiMastery';
import { RoutePage } from './types';

const TopBar = () => {
    const { toggleSidebar } = useBlog();
    return (
        <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-800 bg-black/90 backdrop-blur sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <button onClick={toggleSidebar} className="text-gray-400 hover:text-white transition-colors">
                    <Menu size={24} />
                </button>
                <div className="text-xl font-bold text-white tracking-widest cursor-pointer">&lt;DHX/&gt;</div>
            </div>
            
            <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-gray-400 font-mono">
                <span className="text-neon-green">System Status: Online</span>
            </div>
        </nav>
    );
};

const MainContent = () => {
    const { currentPage } = useBlog();

    let content;
    switch (currentPage) {
        case RoutePage.HOME:
            content = <Home />;
            break;
        case RoutePage.BLOG_LIST:
            content = <Home />; // Reusing Home for list view for now, could be separate
            break;
        case RoutePage.BLOG_POST:
            content = <BlogPost />;
            break;
        case RoutePage.ADMIN:
            content = <Admin />;
            break;
        case RoutePage.AI_MASTERY:
            content = <AiMastery />;
            break;
        default:
            content = <Home />;
    }

    return (
        <div className="min-h-screen bg-black text-gray-300 font-sans selection:bg-neon-green selection:text-black flex flex-col">
            <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-green to-blue-500 z-50"></div>
            
            <TopBar />
            
            <main className="flex-grow relative">
                {content}
            </main>
            
            <Footer />
            <Sidebar />
        </div>
    );
};

const App = () => {
    return (
        <BlogProvider>
            <MainContent />
        </BlogProvider>
    );
};

export default App;