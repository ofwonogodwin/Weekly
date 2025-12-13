# Weekly - Your Weekly To-Do List App
We are still cooking guys. Soon
## Features

### Task Management
- **Add Tasks**: Create tasks with title, description, and deadline
- **Date & Time Deadlines**: Set precise deadlines with date and time
- **Mark as Complete**: Check off completed tasks
- **Delete Tasks**: Remove tasks you no longer need
- **Auto-Sort**: Tasks automatically sorted by nearest deadlines

### Progress Tracking
- **Progress Bar**: Visual representation of weekly progress
- **Percentage Display**: See completion percentage at a glance
- **Task Counter**: Track completed vs total tasks

### Smart Reminders
- **10-Minute Warning**: Get notified 10 minutes before deadline
- **Deadline Alert**: Notification when task is due
- **Permission-Based**: Respects user notification preferences
- **No Repeat Spam**: Each reminder sent only once

### Data Persistence
- **LocalStorage**: All tasks saved locally
- **Auto-Save**: Tasks automatically saved on every change
- **Offline First**: Works without internet connection

### PWA Features
- **Installable**: Add to home screen on mobile/desktop
- **Offline Support**: Full functionality without internet
- **Fast Loading**: Service worker caching for instant loads
- **Background Sync**: Sync tasks when connection restored

## Installation

## Usage

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
   - Warning 10 minutes before deadline
   - Alert at deadline time

### Progress Tracking
- View your **weekly progress bar** at the top
- See **percentage completed**
- Track **completed vs total tasks**
- 
## Notification System

### How It Works
1. **Permission Request**: App requests notification permission on button click
2. **Continuous Monitoring**: Checks tasks every minute for upcoming deadlines
3. **10-Minute Warning**: Notification sent when task is 10 minutes away
4. **Deadline Alert**: Notification sent when deadline arrives
5. **No Duplicates**: Each notification sent only once per task

### Offline Functionality
- View all tasks
- Add new tasks
- Complete tasks
- Delete tasks
- Full UI functionality
- Notifications work offline



## 👨‍💻 Author

**Godwin Ofwono-- GCE**  
Built with ❤️ for productivity enthusiasts

## Acknowledgments

- TailwindCSS for the amazing utility framework
- MDN Web Docs for excellent API documentation
- The web development community for inspiration
