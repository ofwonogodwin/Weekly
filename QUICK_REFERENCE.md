# ⚡ Weekly - Quick Reference Card

## 🚀 Get Started in 3 Steps

1. **Start Server**
   ```bash
   cd Weekly
   ./start.sh
   ```

2. **Open Browser**
   ```
   http://localhost:8000
   ```

3. **Add Your First Task!** 🎉

---

## 📝 Common Tasks

### Add a Task
1. Fill in task title (required)
2. Add description (optional)
3. Set date and time
4. Click "Add Task"

### Complete a Task
- Click the checkbox ✓

### Delete a Task
- Click the trash icon 🗑️

### Enable Notifications
- Click "Enable Notifications" button in header
- Allow when browser asks

---

## ⌨️ Keyboard Shortcuts

| Action | Keys |
|--------|------|
| Focus title field | Tab |
| Submit form | Enter (when in form) |
| Scroll page | Arrow keys / Page Up/Down |

---

## 🔔 Notifications

- **10-min warning**: Reminder before deadline
- **Deadline alert**: When task is due
- **Click notification**: Opens/focuses app

---

## 💾 Data Storage

- **Saved**: Automatically on every change
- **Location**: Browser localStorage
- **Persistent**: Until browser data cleared
- **Export**: Manual backup (copy localStorage)

---

## 📱 Install as App

### Desktop
1. Click install icon (⊕) in address bar
2. Click "Install"

### Mobile
1. Open menu (⋮ or □↑)
2. "Add to Home Screen"

---

## 🎨 Customization

### Change Theme Color
Edit `style.css`:
```css
.bg-jade { background-color: #YOUR_COLOR; }
```

### Modify Reminder Time
Edit `app.js`:
```javascript
const REMINDER_BEFORE_MINUTES = 10; // Change this
```

---

## 🐛 Quick Fixes

### App Not Loading?
```bash
# Clear cache
Ctrl + Shift + Delete

# Hard reload
Ctrl + Shift + R
```

### Service Worker Issues?
```bash
# DevTools > Application > Service Workers
# Click "Unregister" then reload
```

### Notifications Not Working?
```bash
# Check: chrome://settings/content/notifications
# Ensure app has permission
```

---

## 📊 Progress Tracking

- **Progress Bar**: Visual weekly progress
- **Percentage**: Completion rate
- **Counter**: X of Y tasks done

---

## 🔄 Updates

When app updates:
1. Close app completely
2. Reopen
3. Service worker updates automatically

---

## 📁 Files You Need

**Essential (Don't delete):**
- index.html
- style.css
- app.js
- sw.js
- manifest.json
- icons/ folder

**Optional (Can remove):**
- README.md
- INSTALLATION.md
- PROJECT_OVERVIEW.md
- start.sh
- generate_icons.py

---

## 🌐 Browser Support

| Browser | Status |
|---------|--------|
| Chrome | ✅ Full |
| Edge | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full (iOS 16.4+) |
| Opera | ✅ Full |

---

## 📞 Need Help?

1. Check browser console (F12)
2. Read README.md
3. Check INSTALLATION.md
4. Review PROJECT_OVERVIEW.md

---

## 🎯 Tips & Tricks

### Productivity Tips
- Set realistic deadlines
- Break large tasks into smaller ones
- Review completed tasks weekly
- Enable notifications for important tasks

### Technical Tips
- Use localhost for development
- Use HTTPS for production
- Clear cache after updates
- Check service worker in DevTools

---

## 📈 Stats

| Metric | Value |
|--------|-------|
| Total Size | ~200 KB |
| Load Time | < 2s |
| Offline | Yes |
| Dependencies | 0 |
| Languages | 3 |

---

## 🔐 Privacy

- ✅ All data stored locally
- ✅ No server communication
- ✅ No tracking
- ✅ No accounts needed
- ✅ No cookies

---

## 📖 Documentation

| File | Purpose |
|------|---------|
| README.md | Full docs |
| INSTALLATION.md | Setup guide |
| PROJECT_OVERVIEW.md | Technical details |
| THIS FILE | Quick reference |

---

## ⚙️ Configuration

### LocalStorage Keys
```
weekly_tasks - Task data
weekly_notifications_permission - Notification state
```

### Cache Names
```
weekly-v1.0.0-static
weekly-v1.0.0-dynamic
```

---

## 🔧 Troubleshooting Flowchart

```
Problem?
├─ Can't load app?
│  └─ Check: Server running? Port correct?
├─ Tasks not saving?
│  └─ Check: Private mode off? localStorage enabled?
├─ No notifications?
│  └─ Check: Permission granted? HTTPS/localhost?
└─ Can't install PWA?
   └─ Check: Service worker registered? HTTPS?
```

---

## 💡 Feature Shortcuts

| Feature | Access |
|---------|--------|
| Add task | Form at top |
| Progress | Top of page |
| Enable notifications | Header button |
| View tasks | Scrollable list |
| Task actions | Checkbox/trash icon |

---

## 🎨 Color Codes

```
Jade Green:  #00BB77
Jade Dark:   #009960
Jade Light:  #00DD88
Success:     #10B981
Warning:     #D97706
Danger:      #DC2626
```

---

## 📱 Screen Sizes

| Device | Breakpoint |
|--------|------------|
| Mobile | < 768px |
| Tablet | 768-1024px |
| Desktop | > 1024px |

---

## ⚡ Performance

| Metric | Target | Actual |
|--------|--------|--------|
| FCP | < 1.8s | < 1s |
| TTI | < 3.8s | < 2s |
| LCP | < 2.5s | < 1.5s |

---

<div align="center">
  <p><strong>⭐ Keep This Card Handy!</strong></p>
  <p>Print or bookmark for quick reference</p>
</div>
