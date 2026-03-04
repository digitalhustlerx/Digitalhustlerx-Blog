import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Download, Star, Check, Zap, Terminal, FileText, Code, BookOpen } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { RoutePage, Product } from '../types';

const PRODUCTS: Product[] = [
    {
        id: '1',
        title: 'Cursor AI Mastery Course',
        description: 'Complete video course teaching you how to build production apps using Cursor AI. From zero to deployed in one weekend.',
        price: 97,
        category: 'course',
        features: [
            '4+ hours of video content',
            'Real project walkthroughs',
            'Lifetime access',
            'Private Discord community',
            'Source code included'
        ],
        isFeatured: true
    },
    {
        id: '2',
        title: 'AI Prompt Engineering Templates',
        description: '50+ battle-tested prompts for coding, content creation, and automation. Copy, paste, deploy.',
        price: 29,
        category: 'template',
        features: [
            '50+ optimized prompts',
            'Categorized by use case',
            'Regular updates',
            'Notion template included'
        ]
    },
    {
        id: '3',
        title: 'The $0 AI Stack eBook',
        description: 'How to run enterprise AI models locally without paying API fees. Ollama + Gemma + Mistral guide.',
        price: 19,
        category: 'ebook',
        features: [
            'Complete setup guide',
            'Performance comparisons',
            'Code examples',
            'PDF + EPUB formats'
        ]
    },
    {
        id: '4',
        title: 'Automated Content Pipeline',
        description: 'Template system for generating blog posts, tweets, and video scripts from one idea. Multiply your output 10x.',
        price: 49,
        category: 'tool',
        features: [
            'Notion workspace template',
            'Automation workflows',
            'Video training included',
            'Email support'
        ]
    },
    {
        id: '5',
        title: 'Landing Page Boilerplate',
        description: 'High-converting landing page template with dark theme, animations, and Stripe checkout integration.',
        price: 79,
        category: 'template',
        features: [
            'React + Tailwind',
            'Mobile responsive',
            'SEO optimized',
            'Stripe integration ready'
        ]
    },
    {
        id: '6',
        title: 'AI Business Ideas Vault',
        description: '100+ validated AI product ideas with market analysis, competition research, and launch strategies.',
        price: 39,
        category: 'ebook',
        features: [
            '100+ ideas documented',
            'Market size estimates',
            'Competition analysis',
            'Launch checklist'
        ]
    }
];

const CATEGORY_LABELS = {
    course: { label: 'Course', icon: Terminal, color: 'text-neon-green' },
    template: { label: 'Template', icon: FileText, color: 'text-blue-400' },
    ebook: { label: 'eBook', icon: BookOpen, color: 'text-purple-400' },
    tool: { label: 'Tool', icon: Code, color: 'text-yellow-400' }
};

export const Shop = () => {
    const { setPage } = useBlog();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [cart, setCart] = useState<string[]>([]);

    const filteredProducts = selectedCategory 
        ? PRODUCTS.filter(p => p.category === selectedCategory)
        : PRODUCTS;

    const toggleCart = (productId: string) => {
        setCart(prev => 
            prev.includes(productId) 
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const featuredProducts = PRODUCTS.filter(p => p.isFeatured);

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            
            <button 
                onClick={() => setPage(RoutePage.HOME)} 
                className="group flex items-center gap-2 text-gray-500 hover:text-neon-green mb-10 transition-colors font-mono text-sm"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                BACK_TO_ROOT
            </button>

            <div className="mb-12 border-b border-gray-800 pb-12">
                <div className="flex items-center gap-3 mb-4">
                    <ShoppingCart size={32} className="text-neon-green" />
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-sans tracking-tight">
                        Digital <span className="text-neon-green">Arsenal</span>
                    </h1>
                </div>
                <p className="text-lg text-gray-400 max-w-2xl font-sans leading-relaxed">
                    Tools, templates, and training to accelerate your digital hustle. 
                    Build faster, earn smarter, scale indefinitely.
                </p>
            </div>

            {featuredProducts.length > 0 && (
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-8 text-gray-400 font-mono text-sm">
                        <Star size={16} className="text-neon-green fill-neon-green" />
                        <span>featured_product</span>
                        <div className="h-px bg-gray-800 flex-1"></div>
                    </div>
                    
                    {featuredProducts.map(product => (
                        <div key={product.id} className="border border-neon-green/30 bg-gradient-to-br from-gray-900/50 to-charcoal rounded-lg p-8 hover:border-neon-green transition-all group">
                            <div className="flex flex-col lg:flex-row gap-8">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="bg-neon-green/10 text-neon-green border border-neon-green/20 px-3 py-1 text-xs font-mono rounded uppercase">
                                            Featured
                                        </span>
                                        <span className="text-gray-500 text-xs font-mono">
                                            {CATEGORY_LABELS[product.category].label}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-sans group-hover:text-neon-green transition-colors">
                                        {product.title}
                                    </h2>
                                    <p className="text-gray-400 mb-6 font-sans leading-relaxed">
                                        {product.description}
                                    </p>
                                    
                                    <ul className="space-y-2 mb-8">
                                        {product.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3 text-gray-300 text-sm font-sans">
                                                <Check size={16} className="text-neon-green shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div className="lg:w-64 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-gray-800 pt-6 lg:pt-0 lg:pl-8">
                                    <div className="text-4xl font-bold text-white mb-2 font-sans">
                                        ${product.price}
                                    </div>
                                    <button 
                                        onClick={() => toggleCart(product.id)}
                                        className={`w-full py-4 px-6 font-bold font-mono text-sm transition-all flex items-center justify-center gap-2 ${
                                            cart.includes(product.id)
                                                ? 'bg-gray-800 text-gray-400 border border-gray-700'
                                                : 'bg-neon-green text-black hover:bg-white'
                                        }`}
                                    >
                                        {cart.includes(product.id) ? (
                                            <>ADDED_TO_CART</>
                                        ) : (
                                            <><ShoppingCart size={16} /> ADD_TO_CART</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex items-center gap-4 mb-8 text-gray-400 font-mono text-sm">
                <Download size={16} className="text-neon-green" />
                <span>all_products</span>
                <div className="h-px bg-gray-800 flex-1"></div>
                {cart.length > 0 && (
                    <span className="text-neon-green">{cart.length} in cart</span>
                )}
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
                <button 
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
                        selectedCategory === null 
                            ? 'bg-neon-green text-black' 
                            : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                >
                    All
                </button>
                {Object.entries(CATEGORY_LABELS).map(([key, { label }]) => (
                    <button 
                        key={key}
                        onClick={() => setSelectedCategory(key)}
                        className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
                            selectedCategory === key 
                                ? 'bg-neon-green text-black' 
                                : 'bg-gray-800 text-gray-400 hover:text-white'
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => {
                    const CategoryIcon = CATEGORY_LABELS[product.category].icon;
                    const categoryColor = CATEGORY_LABELS[product.category].color;
                    
                    return (
                        <div 
                            key={product.id} 
                            className="border border-gray-800 bg-gray-900/20 rounded-lg overflow-hidden hover:border-neon-green/50 transition-all group flex flex-col"
                        >
                            <div className="h-40 bg-gradient-to-br from-gray-900 to-charcoal flex items-center justify-center border-b border-gray-800 group-hover:border-neon-green/30 transition-colors">
                                <CategoryIcon size={48} className={`${categoryColor} opacity-50 group-hover:opacity-100 transition-opacity`} />
                            </div>
                            
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-3">
                                    <span className={`text-xs font-mono uppercase ${categoryColor}`}>
                                        {CATEGORY_LABELS[product.category].label}
                                    </span>
                                    {product.isFeatured && (
                                        <Star size={14} className="text-neon-green fill-neon-green" />
                                    )}
                                </div>
                                
                                <h3 className="text-lg font-bold text-white mb-2 font-sans group-hover:text-neon-green transition-colors">
                                    {product.title}
                                </h3>
                                
                                <p className="text-gray-400 text-sm mb-4 font-sans line-clamp-2 flex-1">
                                    {product.description}
                                </p>
                                
                                <ul className="space-y-1 mb-6">
                                    {product.features.slice(0, 3).map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-gray-500 text-xs font-sans">
                                            <Check size={12} className="text-gray-600 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                    {product.features.length > 3 && (
                                        <li className="text-gray-600 text-xs font-mono">
                                            +{product.features.length - 3} more
                                        </li>
                                    )}
                                </ul>
                                
                                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                                    <div className="text-2xl font-bold text-white font-sans">
                                        ${product.price}
                                    </div>
                                    <button 
                                        onClick={() => toggleCart(product.id)}
                                        className={`py-2 px-4 font-bold font-mono text-xs transition-all flex items-center gap-2 ${
                                            cart.includes(product.id)
                                                ? 'bg-gray-800 text-neon-green border border-neon-green/30'
                                                : 'bg-neon-green text-black hover:bg-white'
                                        }`}
                                    >
                                        {cart.includes(product.id) ? (
                                            <><Check size={14} /> ADDED</>
                                        ) : (
                                            <><ShoppingCart size={14} /> ADD</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {cart.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-charcoal border-t border-neon-green/30 p-4 z-40">
                    <div className="max-w-6xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <ShoppingCart size={20} className="text-neon-green" />
                            <span className="text-white font-sans">
                                {cart.length} {cart.length === 1 ? 'item' : 'items'} in cart
                            </span>
                        </div>
                        <button className="bg-neon-green text-black px-8 py-3 font-bold font-mono text-sm hover:bg-white transition-colors flex items-center gap-2">
                            <Zap size={16} />
                            CHECKOUT_${PRODUCTS.filter(p => cart.includes(p.id)).reduce((sum, p) => sum + p.price, 0)}
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};
