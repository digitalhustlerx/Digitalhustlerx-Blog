# From Zero to Deployed: Setting Up a React Blog on a VPS (The Real Story)

**Date:** March 2, 2026  
**Read Time:** 12 min  
**Category:** Infrastructure, Deployment

---

## The Challenge

You've built a beautiful React blog. It's fast, it's responsive, it's sitting in a GitHub repo. Now you need it **live on your domain**. Not on GitHub Pages. Not on Vercel. On **your own VPS**.

Sounds simple. It's not. This is the story of how I deployed **digitalhustlerx.com** to a Hostinger VPS and the 5 things that went wrong (and how to avoid them).

---

## Step 1: DNS Configuration (The Easy Part)

First, point your domain to the VPS.

**What I had:**
- Domain: `digitalhustlerx.com` (registered on StableHost)
- VPS: Hostinger with IP `72.62.179.49`

**What I needed to do:**
Change the A record in cPanel to point to the VPS IP.

```bash
# In StableHost cPanel → Zone Editor
# Old: 213.109.149.176 (StableHost)
# New: 72.62.179.49 (Hostinger)
```

**The lesson:** DNS changes are instantaneous in Zone Editor (not 24-48 hours like nameserver changes). Verify with:

```bash
curl -s "https://dns.google/resolve?name=yourdomain.com&type=A" | grep data
# Returns: "data":"72.62.179.49" ✅
```

---

## Step 2: Install Nginx (Still Easy)

SSH as root and install the web server:

```bash
apt update && apt install -y nginx
```

Create the config file:

```bash
cat > /etc/nginx/sites-available/digitalhustlerx << 'EOF'
server {
    listen 80;
    server_name digitalhustlerx.com www.digitalhustlerx.com;
    root /var/www/digitalhustlerx;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/digitalhustlerx /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test config
nginx -t
systemctl restart nginx
```

**Critical detail:** The `try_files $uri $uri/ /index.html;` line is **essential** for React Router. Without it, direct links break.

---

## Step 3: Copy Files to the Web Root (Where It Gets Messy)

Your React blog is built and sitting in a Docker volume:

```
/var/lib/docker/volumes/openclaw-x8v6_openclaw_workspace/_data/projects/Digitalhustlerx-Blog/dist/
```

You try to point Nginx there:

```bash
# This will FAIL due to Docker volume permissions
root /var/lib/docker/volumes/openclaw-x8v6_openclaw_workspace/_data/projects/Digitalhustlerx-Blog/dist;
```

**The error:**
```
[crit] 52597#52597: *1 stat() failed (13: Permission denied)
```

**Why?**
- Docker volume files are owned by `ubuntu:ubuntu` (inside the container)
- Nginx runs as `www-data` on the host
- The host can't traverse the Docker volume with `www-data` permissions

---

## Step 4: The Solution — Copy, Don't Symlink

Instead of pointing Nginx to the Docker volume, **copy the files out**:

```bash
mkdir -p /var/www/digitalhustlerx
cp -r /var/lib/docker/volumes/openclaw-x8v6_openclaw_workspace/_data/projects/Digitalhustlerx-Blog/dist/* /var/www/digitalhustlerx/
chown -R www-data:www-data /var/www/digitalhustlerx
chmod -R 755 /var/www/digitalhustlerx

# Update Nginx config to use standard web root
cat > /etc/nginx/sites-available/digitalhustlerx << 'EOF'
server {
    listen 80;
    server_name digitalhustlerx.com www.digitalhustlerx.com;
    root /var/www/digitalhustlerx;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

nginx -t && systemctl restart nginx
```

**Result:** ✅ Blog is now live.

---

## Step 5: Lessons Learned

### 1. **Docker Volumes Are Not Directly Mountable to Host Services**
If you have services running on the host (like Nginx), they can't easily access files in Docker volumes due to permission layers. Copy files out instead.

### 2. **The `try_files` Line Is Critical**
For single-page apps (React, Vue, Angular), direct routes like `/blog/post-title` need to route to `index.html`. Without it:
```
GET /blog/post-title → 404 (file not found)
GET / → index.html (works)
```

The `try_files` fix:
```nginx
try_files $uri $uri/ /index.html;
```

### 3. **Nginx User Permissions Matter**
Nginx runs as `www-data` by default. Files must be readable by that user:
```bash
chown -R www-data:www-data /var/www/your-site
chmod -R 755 /var/www/your-site
```

### 4. **Test Your Config Before Restarting**
```bash
nginx -t  # Test syntax
systemctl restart nginx  # Then restart
```

### 5. **Use Standard Web Roots (`/var/www/`) for Host Services**
Avoid complexity. Copy files to `/var/www/` and point host services there. Docker volumes are great for development persistence, not for host service integration.

---

## The Full Deployment Script

Here's the complete one-liner (after Nginx is installed):

```bash
mkdir -p /var/www/digitalhustlerx && \
cp -r /var/lib/docker/volumes/openclaw-x8v6_openclaw_workspace/_data/projects/Digitalhustlerx-Blog/dist/* /var/www/digitalhustlerx/ && \
chown -R www-data:www-data /var/www/digitalhustlerx && \
cat > /etc/nginx/sites-available/digitalhustlerx << 'EOF'
server {
    listen 80;
    server_name digitalhustlerx.com www.digitalhustlerx.com;
    root /var/www/digitalhustlerx;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF
ln -sf /etc/nginx/sites-available/digitalhustlerx /etc/nginx/sites-enabled/ && \
rm -f /etc/nginx/sites-enabled/default && \
nginx -t && systemctl restart nginx && \
echo "✅ Blog is live at http://digitalhustlerx.com"
```

---

## What's Next?

1. **HTTPS/SSL** — Add Let's Encrypt certificate
2. **Caching** — Enable Nginx caching for static assets
3. **Monitoring** — Set up health checks
4. **Updates** — Automate blog rebuilds when pushing to GitHub

---

## TL;DR

- **DNS:** Change A record in cPanel to VPS IP
- **Nginx:** Install and configure with `try_files` for React Router
- **Files:** Copy from Docker volumes to `/var/www/`
- **Permissions:** Ensure `www-data` owns the files
- **Test:** Run `nginx -t` before restarting

That's it. Your React blog is now on your VPS.

---

**Have you deployed a React app to a VPS? Hit a permission issue? Let me know in the comments.**
