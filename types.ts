import React from 'react';

export enum RoutePage {
    HOME = 'HOME',
    BLOG_LIST = 'BLOG_LIST',
    BLOG_POST = 'BLOG_POST',
    ADMIN = 'ADMIN',
    AI_MASTERY = 'AI_MASTERY',
    SHOP = 'SHOP'
}

export interface BlogPost {
    id: string;
    title: string;
    category: string;
    excerpt: string;
    content: string; // HTML or Markdown string
    readTime: string;
    date: string;
    imageUrl?: string;
    views: number;
}

export interface NavItem {
    label: string;
    page: RoutePage;
    icon?: React.ReactNode;
}

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl?: string;
    category: 'course' | 'template' | 'ebook' | 'tool';
    features: string[];
    downloadUrl?: string;
    isFeatured?: boolean;
}