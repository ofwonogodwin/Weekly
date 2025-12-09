# 📋 Weekly - Your Weekly To-Do List App
### Still Cooking

<div align="center">
  <img src="icons/icon-192x192.png" alt="Weekly Logo" width="120" />
  <p><strong>A beautiful, simple weekly to-do list web app</strong></p>
  <p>
    <a href="#features">Features</a> •
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a> •
    <a href="#pwa">PWA</a> •
    <a href="#development">Development</a>
  </p>
</div>

---

## ✨ Features

### 🎯 Task Management
- ✅ **Add Tasks**: Create tasks with title, description, and deadline
- 📅 **Date & Time Deadlines**: Set precise deadlines with date and time
- ✔️ **Mark as Complete**: Check off completed tasks
- 🗑️ **Delete Tasks**: Remove tasks you no longer need
- 🔄 **Auto-Sort**: Tasks automatically sorted by nearest deadlines

### 📊 Progress Tracking
- 📈 **Progress Bar**: Visual representation of weekly progress
- 📉 **Percentage Display**: See completion percentage at a glance
- 📝 **Task Counter**: Track completed vs total tasks

### 🔔 Smart Reminders
- ⏰ **10-Minute Warning**: Get notified 10 minutes before deadline
- 🚨 **Deadline Alert**: Notification when task is due
- 🔕 **Permission-Based**: Respects user notification preferences
- 💾 **No Repeat Spam**: Each reminder sent only once

### 💎 Beautiful UI
- 🎨 **Jade Green Theme**: Calming #00BB77 color scheme
- 🌊 **Smooth Animations**: Delightful transitions and effects
- 📱 **Responsive Design**: Works perfectly on all devices
- 🌓 **Modern Cards**: Clean, card-based layout

### 💾 Data Persistence
- 🔒 **LocalStorage**: All tasks saved locally
- 🔄 **Auto-Save**: Tasks automatically saved on every change
- 📴 **Offline First**: Works without internet connection

### 📱 PWA Features
- 🏠 **Installable**: Add to home screen on mobile/desktop
- 📴 **Offline Support**: Full functionality without internet
- ⚡ **Fast Loading**: Service worker caching for instant loads
- 🔄 **Background Sync**: Sync tasks when connection restored

---

## 🚀 Installation

### Quick Start (No Installation Required)
1. Simply open `index.html` in your web browser
2. Start adding tasks immediately!

### Run with Local Server (Recommended for PWA)
```bash
# Using Python 3
cd Weekly
python3 -m http.server 8000

# Using Node.js (with npx)
cd Weekly
npx serve

# Using PHP
cd Weekly
php -S localhost:8000
```

Then open: `http://localhost:8000`

### Install as PWA
1. Open the app in Chrome/Edge/Safari
2. Look for "Install" button in the address bar
3. Click to install as a native app
4. Launch from your app drawer/desktop

---

## 📖 Usage

### Adding a Task
1. Fill in the **Task Title** (required)
2. Add a **Description** (optional)
3. Set a **Deadline Date** (required)
4. Set a **Deadline Time** (required)
5. Click **Add Task**

### Managing Tasks
- **Complete**: Click the checkbox to mark as complete
- **Delete**: Click the trash icon to remove
- **View Details**: All task information displayed on the card

### Enabling Notifications
1. Click **Enable Notifications** button in the header
2. Allow notifications when prompted by browser
3. You'll receive:
   - ⏰ Warning 10 minutes before deadline
   - 🚨 Alert at deadline time

### Progress Tracking
- View your **weekly progress bar** at the top
- See **percentage completed**
- Track **completed vs total tasks**

---

## 🔧 Project Structure

```
Weekly/
├── index.html          # Main HTML file with UI structure
├── style.css           # Custom CSS with animations
├── app.js              # Core JavaScript functionality
├── sw.js               # Service Worker for PWA
├── manifest.json       # PWA manifest configuration
├── icons/              # App icons for PWA
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   └── icon-512x512.png
└── README.md           # This file
```

---

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom animations and styles
- **TailwindCSS**: Utility-first CSS framework (via CDN)
- **Vanilla JavaScript**: No frameworks, pure JS
- **LocalStorage API**: Data persistence
- **Notifications API**: Browser notifications
- **Service Worker API**: PWA offline support
- **Web App Manifest**: PWA installability

---

## 🎨 Color Scheme

- **Primary (Jade)**: `#00BB77`
- **Jade Dark**: `#009960`
- **Jade Light**: `#00DD88`
- **Background**: Gradient from `#F9FAFB` to `#F3F4F6`

---

## 🔔 Notification System

### How It Works
1. **Permission Request**: App requests notification permission on button click
2. **Continuous Monitoring**: Checks tasks every minute for upcoming deadlines
3. **10-Minute Warning**: Notification sent when task is 10 minutes away
4. **Deadline Alert**: Notification sent when deadline arrives
5. **No Duplicates**: Each notification sent only once per task

### Browser Support
- ✅ Chrome/Edge: Full support
- ✅ Firefox: Full support
- ✅ Safari: Full support (iOS 16.4+)
- ❌ IE: Not supported

---

## 📱 PWA Features

### Installation
The app can be installed on:
- 📱 **Android**: Chrome, Edge, Samsung Internet
- 🍎 **iOS**: Safari (iOS 16.4+)
- 💻 **Desktop**: Chrome, Edge, Safari

### Offline Functionality
- ✅ View all tasks
- ✅ Add new tasks
- ✅ Complete tasks
- ✅ Delete tasks
- ✅ Full UI functionality
- ✅ Notifications work offline

### Service Worker Caching
- **Static Cache**: HTML, CSS, JS, icons
- **Dynamic Cache**: Runtime caching with size limit
- **Cache Strategy**: Cache-first, fallback to network

---

## 🔒 Privacy & Data

- ✅ **100% Local**: All data stored in your browser
- ✅ **No Server**: No data sent to any server
- ✅ **No Tracking**: No analytics or tracking
- ✅ **No Accounts**: No sign-up required
- ✅ **Your Device Only**: Data never leaves your device

### Data Storage
- Uses browser `localStorage`
- Stored under key: `weekly_tasks`
- Data persists until you clear browser data
- Export/backup not currently available (feature coming soon)

---

## 🐛 Troubleshooting

### Notifications Not Working
1. Check browser notification permissions
2. Ensure app has permission (click "Enable Notifications")
3. Check browser supports Notifications API
4. Ensure notifications not blocked at OS level

### PWA Not Installing
1. App must be served over HTTPS (or localhost)
2. Manifest.json must be valid
3. Service worker must register successfully
4. Icons must be available

### Tasks Not Saving
1. Check browser localStorage is enabled
2. Ensure not in private/incognito mode
3. Check browser storage quota not exceeded
4. Try clearing browser cache and reload

### Service Worker Issues
1. Open DevTools > Application > Service Workers
2. Check for errors in console
3. Try "Unregister" then reload page
4. Clear cache and hard reload (Ctrl+Shift+R)

---

## 🚀 Development

### File Modifications

**HTML** (`index.html`):
- Modify UI structure
- Add new form fields
- Update meta tags

**CSS** (`style.css`):
- Customize animations
- Change color scheme
- Add new styles

**JavaScript** (`app.js`):
- Add new features
- Modify task logic
- Update notification system

**Service Worker** (`sw.js`):
- Update cache version when making changes
- Modify caching strategy
- Add new cached resources

### Testing Locally
```bash
# Start local server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

### Building for Production
1. Update cache version in `sw.js`
2. Generate all icon sizes for `icons/` folder
3. Test PWA installation
4. Test offline functionality
5. Deploy to HTTPS server

---

## 📋 Future Enhancements

- [ ] Task categories/tags
- [ ] Task priority levels
- [ ] Recurring tasks
- [ ] Task search and filter
- [ ] Dark mode toggle
- [ ] Export tasks to CSV/JSON
- [ ] Import tasks
- [ ] Task statistics and analytics
- [ ] Multiple themes
- [ ] Custom notification sounds
- [ ] Task notes/attachments
- [ ] Collaboration features
- [ ] Cloud sync (optional)

---

## 🤝 Contributing

This is an open-source project. Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

**Weekly Team**  
Built with ❤️ for productivity enthusiasts

---

## 🙏 Acknowledgments

- TailwindCSS for the amazing utility framework
- MDN Web Docs for excellent API documentation
- The web development community for inspiration

---

## 📞 Support

If you encounter any issues or have questions:
1. Check the Troubleshooting section above
2. Review browser console for errors
3. Ensure you're using a modern browser
4. Try clearing cache and reloading

---

<div align="center">
  <p><strong>Happy Task Managing! 🎉</strong></p>
  <p>Stay productive with Weekly</p>
</div>
