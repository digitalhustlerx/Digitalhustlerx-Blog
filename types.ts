import React from 'react';

export enum RoutePage {
    HOME = 'HOME',
    BLOG_LIST = 'BLOG_LIST',
    BLOG_POST = 'BLOG_POST',
    ADMIN = 'ADMIN',
    AI_MASTERY = 'AI_MASTERY'
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