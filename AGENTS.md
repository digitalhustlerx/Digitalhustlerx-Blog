# AGENTS.md - Digital Hustler X Blog

Guidelines for AI coding agents working in this repository.

## Build Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (port 3000)
npm run build        # Production build to /dist
npm run preview      # Preview production build
```

## Test Commands

No test framework is currently configured. When tests are added:
```bash
npm test                    # Run all tests
npm test -- path/to/file    # Run single test file
```

## Lint/Typecheck Commands

No linter configured. Use TypeScript for type checking:
```bash
npx tsc --noEmit            # Type check without emitting
```

## Project Architecture

```
/
├── App.tsx              # Main app with routing logic
├── index.tsx            # Entry point
├── types.ts             # TypeScript interfaces and enums
├── context/
│   └── BlogContext.tsx  # Global state via React Context
├── components/
│   ├── Sidebar.tsx      # Navigation sidebar
│   ├── Footer.tsx       # Site footer
│   └── GithubActivity.tsx
├── pages/
│   ├── Home.tsx         # Landing page with blog grid
│   ├── BlogList.tsx     # Article listing
│   ├── BlogPost.tsx     # Single article view
│   ├── Admin.tsx        # Admin panel for posts
│   └── AiMastery.tsx    # Course modules page
└── metadata.json        # Site metadata
```

## Code Style Guidelines

### Import Order (Strict)

```typescript
// 1. React imports (always explicit)
import React, { useState, useEffect } from 'react';

// 2. Third-party libraries
import { ArrowRight, Terminal } from 'lucide-react';

// 3. Local imports (prefer @/ alias for deep paths)
import { useBlog } from '../context/BlogContext';
import { RoutePage } from '@/types';
```

### Component Pattern

Use arrow functions with named exports:
```typescript
export const ComponentName = () => {
    const [state, setState] = useState<string>('');
    
    return (
        <div className="...">
            {/* content */}
        </div>
    );
};
```

### TypeScript Conventions

- **Interfaces** for data shapes (BlogPost, NavItem, etc.)
- **Enums** for constants (RoutePage)
- **Explicit types** for context and complex functions
- **Optional props** use `?:` syntax

```typescript
export interface BlogPost {
    id: string;
    title: string;
    imageUrl?: string;  // optional
}

export enum RoutePage {
    HOME = 'HOME',
    BLOG_LIST = 'BLOG_LIST',
}
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `BlogPost`, `Sidebar` |
| Functions | camelCase | `viewPost`, `toggleSidebar` |
| Variables | camelCase | `currentPage`, `isSidebarOpen` |
| Constants | UPPER_SNAKE | `INITIAL_POSTS` |
| Enums | PascalCase + UPPER_VALUES | `RoutePage.HOME` |
| Files | PascalCase.tsx | `BlogPost.tsx` |

### Styling (Tailwind CSS)

- Use Tailwind utility classes exclusively
- Custom theme colors defined in `index.html`:
  - `neon-green` (#39FF14) - primary accent
  - `obsidian` (#050505) - darkest background
  - `charcoal` (#121212) - card backgrounds
- Dark terminal/hacker aesthetic
- Responsive: `md:` and `lg:` breakpoints

```typescript
// Typical button styling
<button className="bg-neon-green text-black px-6 py-3 font-bold font-sans hover:bg-white transition-colors">
    Action
</button>
```

### State Management

Use React Context with custom hooks:
```typescript
// Context provides state + actions
const { posts, currentPage, setPage, viewPost } = useBlog();

// Context hook throws if used outside provider
export const useBlog = () => {
    const context = useContext(BlogContext);
    if (!context) throw new Error('useBlog must be used within BlogProvider');
    return context;
};
```

### Error Handling

- Early returns for null/undefined checks
- Terminal-style error messages matching the theme
- User-friendly fallbacks

```typescript
if (!post) {
    return (
        <div className="text-red-500 font-mono">
            ERROR: DATA_CORRUPTION_DETECTED
        </div>
    );
}
```

### File Structure per Component

```typescript
// 1. Imports
import React from 'react';
import { Icon } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

// 2. Types (if local)
interface LocalProps {
    title: string;
}

// 3. Component
export const Component = ({ title }: LocalProps) => {
    // hooks at top
    const { posts } = useBlog();
    const [state, setState] = useState('');
    
    // handlers
    const handleClick = () => {};
    
    // early returns
    if (!posts.length) return <EmptyState />;
    
    // render
    return <div>...</div>;
};
```

## Environment

- Node.js required
- Set `GEMINI_API_KEY` in `.env.local` for AI features
- React 19, TypeScript 5.8, Vite 6, Tailwind 4

## VPS Configuration

- **Domain:** digitalhustlerx.com
- **VPS IP:** 72.62.179.49
- **Web Root:** /var/www/digitalhustlerx/
- **Nginx Config:** /etc/nginx/sites-available/digitalhustlerx

## Key Dependencies

- `react` / `react-dom` - UI framework
- `lucide-react` - Icon library
- `tailwindcss` - Styling
- `vite` - Build tool

## Deployment Guide

### Building for Production

```bash
npm run build        # Creates optimized build in /dist
```

The `/dist` folder contains static files (HTML, CSS, JS) ready for deployment.

### Deploying to VPS (Hostinger)

1. **Build the project locally or in CI/CD:**
   ```bash
   npm run build
   ```

2. **Copy files to VPS:**
   ```bash
   scp -r dist/* root@72.62.179.49:/var/www/digitalhustlerx/
   ```

3. **On VPS - Test nginx config:**
   ```bash
   nginx -t
   ```

4. **On VPS - Restart nginx:**
   ```bash
   systemctl restart nginx
   systemctl enable nginx   # Enable auto-start
   ```

5. **On VPS - Verify:**
   ```bash
   curl http://localhost/   # Should return HTML
   curl -I http://localhost/  # Should return 200 OK
   ```

### Nginx Configuration

Location: `/etc/nginx/sites-available/digitalhustlerx`

```nginx
server {
    listen server_name digitalhustlerx.com 80;
    www.digitalhustlerx.com;
    root /var/www/digitalhustlerx;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:
```bash
ln -s /etc/nginx/sites-available/digitalhustlerx /etc/nginx/sites-enabled/
```

## Troubleshooting

### Site Not Loading (Timeout/Connection Refused)

1. **Check if nginx is running:**
   ```bash
   systemctl status nginx
   ps aux | grep nginx
   ```

2. **Check nginx error logs:**
   ```bash
   tail -100 /var/log/nginx/error.log
   ```

3. **Check if port 80 is in use:**
   ```bash
   ss -tlnp | grep :80
   lsof -i :80
   ```

4. **Test nginx configuration:**
   ```bash
   nginx -t
   ```

5. **Check if another web server is running:**
   ```bash
   systemctl status apache2
   ps aux | grep apache
   ```

6. **Check firewall rules:**
   ```bash
   ufw status
   iptables -L -n
   ```

7. **Check systemd journal for nginx errors:**
   ```bash
   journalctl -u nginx -n 50
   ```

### DNS Not Resolving

1. **Verify DNS configuration:**
   ```bash
   dig digitalhustlerx.com
   nslookup digitalhustlerx.com
   ```

2. **Check CNAME/ALIAS records at domain registrar**

### Common Fixes

| Issue | Solution |
|-------|----------|
| nginx not running | `systemctl start nginx` |
| Config syntax error | Run `nginx -t` to identify issues |
| Permission denied | Check `/var/www/digitalhustlerx` permissions: `chown -R www-data:www-data /var/www/digitalhustlerx` |
| Port 80 in use | Stop conflicting service or change nginx port |
| Firewall blocking | `ufw allow 80/tcp` |

### Verification Commands

```bash
# Local verification (on VPS)
curl -v http://localhost/
curl -I http://localhost/

# External verification (from your machine)
curl -v http://digitalhustlerx.com
curl -v http://72.62.179.49
```
