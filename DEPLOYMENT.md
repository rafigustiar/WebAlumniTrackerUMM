# 🚀 DEPLOYMENT GUIDE

Panduan lengkap untuk men-deploy Alumni Tracker UMM ke berbagai platform.

## Table of Contents
1. [Vercel (Recommended)](#vercel-recommended)
2. [Netlify](#netlify)
3. [GitHub Pages](#github-pages)
4. [Self-Hosted Server](#self-hosted-server)
5. [Environment Setup](#environment-setup)

---

## Vercel (Recommended)

Vercel adalah platform terbaik untuk React & Vite apps. Proses deploy sangat mudah dan cepat.

### Prerequisites
- GitHub account
- Vercel account (free)

### Steps

#### 1. Push code ke GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### 2. Connect dengan Vercel
- Buka https://vercel.com
- Klik "New Project"
- Import repository GitHub
- Vercel akan auto-detect konfigurasi Vite

#### 3. Configure
```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Environment Variables: (optional) - skip for now
```

#### 4. Deploy
- Klik "Deploy"
- Tunggu proses build (±2-3 menit)
- Aplikasi live di `https://alumni-tracker-umm.vercel.app`

### Continuous Deployment
- Setiap push ke `main` branch akan auto-deploy
- Vercel akan menjalankan build dan testing otomatis

### Custom Domain (Optional)
1. Beli domain (Namecheap, GoDaddy, etc)
2. Di Vercel > Settings > Domains
3. Add custom domain
4. Configure DNS records sesuai instruksi Vercel

---

## Netlify

Alternatif lain yang juga bagus untuk hosting static sites.

### Steps

#### 1. Push ke GitHub
```bash
git add .
git commit -m "Ready for Netlify"
git push origin main
```

#### 2. Connect dengan Netlify
- Buka https://netlify.com
- Klik "New site from Git"
- Choose GitHub
- Select repository

#### 3. Configure Build Settings
```
Build command:      npm run build
Publish directory:  dist
```

#### 4. Environment Variables (Optional)
- Di Build & Deploy > Environment
- Add any env variables jika diperlukan

#### 5. Deploy
- Klik "Deploy site"
- Tunggu build selesai
- Get random URL atau setup custom domain

---

## GitHub Pages

Deploy langsung dari GitHub (gratis tapi ada beberapa keterbatasan).

### Steps

#### 1. Update vite.config.js
```javascript
export default defineConfig({
  base: '/alumni-tracker-umm/', // Sesuaikan dengan repo name
  plugins: [react()],
})
```

#### 2. Update package.json
```json
{
  "scripts": {
    "build": "vite build",
    "deploy": "npm run build && git add dist -f && git commit -m 'Deploy to GH Pages' && git push"
  }
}
```

#### 3. Configure GitHub Settings
- Go to Settings > Pages
- Source: Deploy from a branch
- Branch: main (or gh-pages)
- Folder: /(root) or /docs

#### 4. Deploy
```bash
npm run deploy
```

#### 5. Access
- URL: `https://yourusername.github.io/alumni-tracker-umm/`

---

## Self-Hosted Server

Untuk hosting di server sendiri (VPS, Shared Hosting, etc).

### Prerequisites
- Server dengan Node.js installed (optional, bisa statis)
- FTP/SSH access
- Domain atau IP address

### Opsi 1: Static Hosting (Recommended)

#### 1. Build Aplikasi
```bash
npm run build
```

#### 2. Upload ke Server
- Build output ada di folder `dist/`
- Upload folder `dist` ke server (via FTP/SCP)

```bash
# Contoh menggunakan SCP
scp -r dist/* user@server.com:/var/www/alumni-tracker/
```

#### 3. Configure Web Server

**Nginx Config** (`/etc/nginx/sites-available/alumni-tracker`)
```nginx
server {
    listen 80;
    server_name alumni-tracker.umm.ac.id;

    root /var/www/alumni-tracker;
    index index.html;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache busting untuk JS/CSS
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Cache control untuk HTML
    location ~* \.html?$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/alumni-tracker /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**Apache Config** (`/etc/apache2/sites-available/alumni-tracker.conf`)
```apache
<VirtualHost *:80>
    ServerName alumni-tracker.umm.ac.id
    DocumentRoot /var/www/alumni-tracker

    <Directory /var/www/alumni-tracker>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted

        # SPA routing
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    # Logging
    ErrorLog ${APACHE_LOG_DIR}/alumni-tracker_error.log
    CustomLog ${APACHE_LOG_DIR}/alumni-tracker_access.log combined
</VirtualHost>
```

Enable site:
```bash
sudo a2ensite alumni-tracker
sudo a2enmod rewrite
sudo apache2ctl configtest
sudo systemctl restart apache2
```

#### 4. Setup HTTPS (SSL/TLS)

Menggunakan Let's Encrypt (FREE):

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --nginx -d alumni-tracker.umm.ac.id

# Auto-renewal
sudo systemctl enable certbot.timer
```

### Opsi 2: Node.js Server (dengan Backend)

Untuk integrasi dengan backend API.

#### 1. Create Server File
```bash
npm install express cors
```

File: `server.js`
```javascript
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));

// API routes (jika ada)
app.use('/api', apiRoutes);

// SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### 2. Build dan Run
```bash
npm run build
node server.js
```

#### 3. Use PM2 untuk Production
```bash
# Install PM2
npm install -g pm2

# Start dengan PM2
pm2 start server.js --name "alumni-tracker"

# Save configuration
pm2 save

# Setup startup
pm2 startup
```

---

## Environment Setup

### .env Configuration

Create `.env` file untuk development:
```
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Alumni Tracker UMM
```

Create `.env.production` untuk production:
```
VITE_API_URL=https://api.alumni-tracker.umm.ac.id
VITE_APP_NAME=Alumni Tracker UMM
```

Access di aplikasi:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
const appName = import.meta.env.VITE_APP_NAME;
```

---

## Performance Optimization

### 1. Enable Gzip Compression

**Nginx:**
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;
```

**Apache:**
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/javascript
</IfModule>
```

### 2. Enable Caching
- Static files (JS, CSS, images): Cache 1 year
- HTML files: No cache (always fresh)
- API responses: Cache based on content

### 3. Monitor Performance
```bash
# Check page load time
time curl https://alumni-tracker.umm.ac.id

# Monitor server resources
top
htop
```

---

## Security Checklist

- [ ] HTTPS/SSL enabled
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Input validation implemented
- [ ] XSS protection enabled
- [ ] CSRF tokens configured (if backend)
- [ ] Rate limiting configured
- [ ] Regular backups scheduled
- [ ] Dependencies updated
- [ ] Security audit performed

### Add Security Headers (Nginx)

```nginx
# In server block
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval';" always;
```

---

## Monitoring & Logging

### 1. Application Monitoring
```bash
# View logs
tail -f /var/log/nginx/alumni-tracker_access.log
tail -f /var/log/nginx/alumni-tracker_error.log
```

### 2. Uptime Monitoring
- Use services like UptimeRobot
- Monitor availability
- Get alerts jika down

### 3. Performance Monitoring
- Setup Google Analytics
- Monitor Core Web Vitals
- Track user behavior

---

## Troubleshooting

### Problem: 404 on page refresh
**Solution**: Configure SPA routing (see Web Server Config above)

### Problem: Assets not loading
**Solution**: Check `base` in vite.config.js matches deployment path

### Problem: CORS errors
**Solution**: Configure CORS headers di backend atau reverse proxy

### Problem: Slow performance
**Solution**:
- Enable compression
- Enable caching
- Optimize images
- Check CDN configuration

---

## Deployment Checklist

- [ ] Build test: `npm run build` successful
- [ ] Build preview: `npm run preview` works
- [ ] All tests pass
- [ ] README updated
- [ ] Environment variables configured
- [ ] Database/storage backup ready
- [ ] SSL certificate installed
- [ ] Monitoring setup
- [ ] Backup strategy in place
- [ ] Documentation updated
- [ ] Team notified
- [ ] Rollback plan ready

---

## Post-Deployment

### 1. Verify Deployment
```bash
# Test main page
curl -I https://alumni-tracker.umm.ac.id

# Test SPA routing
curl -I https://alumni-tracker.umm.ac.id/dashboard

# Check response time
ab -n 100 -c 10 https://alumni-tracker.umm.ac.id/
```

### 2. Monitor
- Check error logs
- Monitor performance metrics
- Watch user reports
- Track analytics

### 3. Update DNS Records
```
alumni-tracker.umm.ac.id A 1.2.3.4
```

---

## Rollback Plan

If something goes wrong:

```bash
# Stop current deployment
sudo systemctl stop alumni-tracker

# Revert to previous version
git revert HEAD

# Rebuild dan redeploy
npm run build

# Restart
sudo systemctl start alumni-tracker
```

---

For more info, check:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Nginx Docs](https://nginx.org/en/docs/)
- [Apache Docs](https://httpd.apache.org/docs/)

Good luck with deployment! 🚀
