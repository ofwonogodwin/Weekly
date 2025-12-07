# 🚀 Weekly - Installation & Setup Guide

## Quick Start (30 seconds)

### Option 1: Direct Browser Access (Simplest)
```bash
# Just open the file in your browser
firefox index.html
# or
google-chrome index.html
# or
open index.html  # macOS
```

### Option 2: Using the Start Script (Recommended for PWA)
```bash
cd Weekly
./start.sh
```
Then open: http://localhost:8000

---

## Detailed Installation Methods

### 🐍 Method 1: Python HTTP Server (Recommended)

**Requirements:** Python 3.x

```bash
cd Weekly
python3 -m http.server 8000
```

Open browser to: `http://localhost:8000`

**Advantages:**
- ✅ Built into Python
- ✅ No additional installation
- ✅ Full PWA support
- ✅ Service worker works correctly

---

### 📦 Method 2: Node.js HTTP Server

**Requirements:** Node.js and npm

```bash
# Install http-server globally (one-time)
npm install -g http-server

# Run server
cd Weekly
http-server -p 8000
```

Or using npx (no installation):
```bash
cd Weekly
npx serve
```

Open browser to: `http://localhost:8000`

---

### 🐘 Method 3: PHP Built-in Server

**Requirements:** PHP 7.x or higher

```bash
cd Weekly
php -S localhost:8000
```

Open browser to: `http://localhost:8000`

---

### 🌐 Method 4: Apache/Nginx (Production)

#### Apache
```bash
# Copy files to web root
sudo cp -r Weekly /var/www/html/

# Set permissions
sudo chown -R www-data:www-data /var/www/html/Weekly
sudo chmod -R 755 /var/www/html/Weekly
```

Access at: `http://localhost/Weekly`

#### Nginx
```nginx
# Add to nginx configuration
server {
    listen 80;
    server_name localhost;
    root /var/www/html/Weekly;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Restart nginx: `sudo systemctl restart nginx`

---

## 📱 Installing as PWA

### Desktop (Chrome/Edge)
1. Open the app in browser (must use http:// or https://)
2. Look for install icon (⊕) in address bar
3. Click "Install Weekly" button
4. App will open in standalone window
5. Find it in your applications menu

### Desktop (Firefox)
1. Open the app
2. Click the three dots (⋯) in address bar
3. Select "Install Weekly"
4. App appears in your applications

### Android (Chrome)
1. Open app in Chrome
2. Tap the three dots (⋮) menu
3. Select "Add to Home screen"
4. Confirm installation
5. Icon appears on home screen

### iOS (Safari)
1. Open app in Safari
2. Tap the Share button (□↑)
3. Scroll and tap "Add to Home Screen"
4. Confirm and add
5. Icon appears on home screen

---

## 🔧 System Requirements

### Browser Support
- **Chrome/Edge:** 90+ ✅ (Best experience)
- **Firefox:** 88+ ✅
- **Safari:** 14+ ✅
- **Opera:** 76+ ✅
- **Internet Explorer:** ❌ Not supported

### Operating Systems
- **Windows:** 10, 11 ✅
- **macOS:** 10.15+ ✅
- **Linux:** Any modern distro ✅
- **Android:** 7.0+ ✅
- **iOS:** 14.0+ ✅

### Storage Requirements
- **Disk Space:** ~500 KB
- **LocalStorage:** Minimal (depends on task count)

---

## 🔒 Permissions Required

### Browser Permissions
1. **Notifications:** For task reminders
   - Optional but recommended
   - Can be enabled later via app button

2. **LocalStorage:** For saving tasks
   - Automatically granted
   - No user prompt needed

### No Other Permissions Needed
- ❌ No location access
- ❌ No camera/microphone
- ❌ No contacts access
- ❌ No file system access (beyond app cache)

---

## 🐛 Troubleshooting Installation

### Issue: Service Worker Not Registering

**Symptom:** PWA features don't work, can't install app

**Solutions:**
1. Ensure using http://localhost or https:// (not file://)
2. Check browser console for errors
3. Clear browser cache and reload
4. Verify sw.js is accessible

```bash
# Test if service worker file loads
curl http://localhost:8000/sw.js
```

### Issue: Icons Not Loading

**Symptom:** Broken image icons in manifest

**Solutions:**
1. Verify icons exist in icons/ folder
2. Regenerate icons:
```bash
cd Weekly/icons
python3 generate_icons.py
```
3. Clear browser cache
4. Check file permissions

### Issue: Port 8000 Already in Use

**Symptom:** "Address already in use" error

**Solutions:**
1. Find and stop the process:
```bash
# Linux/macOS
lsof -ti:8000 | xargs kill -9

# Or use a different port
python3 -m http.server 8080
```

### Issue: Cannot Access on Mobile

**Symptom:** Can't connect to localhost:8000 from phone

**Solutions:**
1. Find your computer's IP address:
```bash
# Linux/macOS
hostname -I

# Windows
ipconfig
```

2. Access via IP on mobile:
```
http://192.168.1.XXX:8000
```

3. Ensure firewall allows connection
4. Both devices on same WiFi network

---

## 🔐 Security Considerations

### Development (localhost)
- ✅ Safe for testing
- ✅ Service workers work
- ✅ PWA features enabled

### Production (HTTPS Required)
- ⚠️ PWA requires HTTPS (except localhost)
- ⚠️ Service workers need HTTPS
- ⚠️ Notifications need HTTPS

### Get Free HTTPS
- Use **GitHub Pages** (free)
- Use **Netlify** (free)
- Use **Vercel** (free)
- Use **Cloudflare Pages** (free)

---

## 🌍 Deployment Options

### Option 1: GitHub Pages (Free)
```bash
# Create repository
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/weekly.git
git push -u origin main

# Enable GitHub Pages in repository settings
# Site will be at: https://yourusername.github.io/weekly
```

### Option 2: Netlify (Free)
1. Sign up at netlify.com
2. Drag & drop the Weekly folder
3. Instant deployment with HTTPS
4. Custom domain support

### Option 3: Vercel (Free)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd Weekly
vercel
```

### Option 4: Traditional Web Host
1. Upload files via FTP/SFTP
2. Ensure HTTPS is enabled
3. Point domain to directory
4. Done!

---

## 📊 Verifying Installation

### Checklist
- [ ] App loads in browser
- [ ] Can add tasks
- [ ] Tasks persist after refresh
- [ ] Progress bar updates
- [ ] Service worker registers (check DevTools)
- [ ] Can install as PWA
- [ ] Notifications permission works
- [ ] Icons display correctly

### Testing PWA Features
1. Open DevTools (F12)
2. Go to Application tab
3. Check:
   - ✅ Manifest loads correctly
   - ✅ Service worker active
   - ✅ Cache storage populated
   - ✅ LocalStorage contains tasks

### Testing Offline
1. Install app as PWA
2. Open app
3. Turn off WiFi/disconnect network
4. App should still work fully
5. Add tasks, complete tasks, etc.
6. Reconnect - changes persist

---

## 🔄 Updating the App

### For Users (PWA Installed)
1. Changes deploy automatically
2. Close and reopen app
3. Service worker updates in background
4. Or manually clear cache in browser

### For Developers
```bash
# Update cache version in sw.js
# Change: const CACHE_VERSION = 'weekly-v1.0.1';

# Then redeploy
git add .
git commit -m "Update to v1.0.1"
git push
```

---

## 📞 Getting Help

### Check Logs
```bash
# Browser console (F12)
# Look for:
# - Service Worker registration
# - Task save/load messages
# - Notification status
# - Any error messages
```

### Common Error Messages

**"Notification permission denied"**
- Solution: Enable in browser settings

**"Failed to register service worker"**
- Solution: Use http://localhost or https://

**"Tasks not saving"**
- Solution: Check private mode is off, localStorage enabled

---

## 🎉 You're All Set!

Your Weekly app is now installed and ready to use!

### Next Steps:
1. ✅ Add your first task
2. ✅ Enable notifications
3. ✅ Install as PWA
4. ✅ Start being productive!

---

## 📚 Additional Resources

- [README.md](README.md) - Full documentation
- [icons/generate-icons.html](icons/generate-icons.html) - Icon generator tool
- [style.css](style.css) - Customization guide
- [app.js](app.js) - API documentation (inline comments)

---

<div align="center">
  <p><strong>Happy Installing! 🎊</strong></p>
  <p>Questions? Check the README or browser console for details.</p>
</div>
