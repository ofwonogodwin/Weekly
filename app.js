/**
 * Weekly To-Do List App - Main JavaScript
 * Author: Weekly Team
 * Description: Core functionality for task management, notifications, and PWA features
 */

// ===========================
// Constants and Configuration
// ===========================

const STORAGE_KEY = 'weekly_tasks';
const NOTIFICATION_PERMISSION_KEY = 'weekly_notifications_permission';
const REMINDER_INTERVAL = 60000; // Check every minute (60000ms)
const REMINDER_BEFORE_MINUTES = 10; // Notify 10 minutes before deadline

// ===========================
// DOM Elements
// ===========================

const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskDate = document.getElementById('taskDate');
const taskTime = document.getElementById('taskTime');
const tasksList = document.getElementById('tasksList');
const emptyState = document.getElementById('emptyState');
const progressBar = document.getElementById('progressBar');
const progressPercentage = document.getElementById('progressPercentage');
const completedCount = document.getElementById('completedCount');
const totalCount = document.getElementById('totalCount');
const taskCount = document.getElementById('taskCount');
const notificationBtn = document.getElementById('notificationBtn');
const notificationBtnText = document.getElementById('notificationBtnText');

// ===========================
// State Management
// ===========================

let tasks = [];
let notificationCheckInterval = null;

// ===========================
// Initialization
// ===========================

/**
 * Initialize the application
 */
function init() {
    console.log('🚀 Weekly App Initializing...');

    // Load tasks from localStorage
    loadTasks();

    // Set up event listeners
    setupEventListeners();

    // Check notification permission status
    checkNotificationPermission();

    // Start notification checker
    startNotificationChecker();

    // Render tasks
    renderTasks();

    // Register service worker for PWA
    registerServiceWorker();

    console.log('✅ Weekly App Ready!');
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Form submission
    taskForm.addEventListener('submit', handleTaskSubmit);

    // Notification button
    notificationBtn.addEventListener('click', requestNotificationPermission);
}

// ===========================
// LocalStorage Functions
// ===========================

/**
 * Load tasks from localStorage
 */
function loadTasks() {
    try {
        const storedTasks = localStorage.getItem(STORAGE_KEY);
        tasks = storedTasks ? JSON.parse(storedTasks) : [];
        console.log(`📋 Loaded ${tasks.length} tasks from storage`);
    } catch (error) {
        console.error('Error loading tasks:', error);
        tasks = [];
    }
}

/**
 * Save tasks to localStorage
 */
function saveTasks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        console.log('💾 Tasks saved to storage');
    } catch (error) {
        console.error('Error saving tasks:', error);
    }
}

// ===========================
// Task Management Functions
// ===========================

/**
 * Handle task form submission
 */
function handleTaskSubmit(e) {
    e.preventDefault();

    // Get form values
    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    const date = taskDate.value;
    const time = taskTime.value;

    // Validate
    if (!title || !date || !time) {
        showError('Please fill in all required fields');
        return;
    }

    // Create deadline timestamp
    const deadline = new Date(`${date}T${time}`);

    // Validate deadline is in the future
    if (deadline <= new Date()) {
        showError('Deadline must be in the future');
        return;
    }

    // Create new task
    const newTask = {
        id: Date.now(),
        title,
        description,
        deadline: deadline.toISOString(),
        completed: false,
        createdAt: new Date().toISOString(),
        notifiedBefore: false,
        notifiedAt: false
    };

    // Add to tasks array
    tasks.push(newTask);

    // Save to localStorage
    saveTasks();

    // Render tasks
    renderTasks();

    // Reset form
    taskForm.reset();

    // Show success message
    showSuccess('Task added successfully! 🎉');

    console.log('➕ New task added:', newTask);
}

/**
 * Delete a task
 */
function deleteTask(taskId) {
    const taskCard = document.querySelector(`[data-task-id="${taskId}"]`);

    // Animate out
    if (taskCard) {
        taskCard.classList.add('animate-slide-out');

        setTimeout(() => {
            // Remove from array
            tasks = tasks.filter(task => task.id !== taskId);

            // Save and re-render
            saveTasks();
            renderTasks();

            console.log('🗑️ Task deleted:', taskId);
        }, 300);
    }
}

/**
 * Toggle task completion status
 */
function toggleTaskComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();

        console.log(`✅ Task ${task.completed ? 'completed' : 'uncompleted'}:`, taskId);
    }
}

/**
 * Sort tasks by deadline (nearest first)
 */
function sortTasksByDeadline() {
    tasks.sort((a, b) => {
        // Incomplete tasks first
        if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
        }
        // Then by deadline
        return new Date(a.deadline) - new Date(b.deadline);
    });
}

// ===========================
// Rendering Functions
// ===========================

/**
 * Render all tasks
 */
function renderTasks() {
    // Sort tasks
    sortTasksByDeadline();

    // Clear task list
    tasksList.innerHTML = '';

    // Show/hide empty state
    if (tasks.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';

        // Render each task
        tasks.forEach((task, index) => {
            const taskCard = createTaskCard(task, index);
            tasksList.appendChild(taskCard);
        });
    }

    // Update progress
    updateProgress();

    // Update task count
    taskCount.textContent = `${tasks.length} task${tasks.length !== 1 ? 's' : ''}`;
}

/**
 * Create a task card element
 */
function createTaskCard(task, index) {
    const card = document.createElement('div');
    card.className = `task-card bg-white rounded-xl shadow-md p-5 relative animate-slide-in ${task.completed ? 'task-completed' : ''}`;
    card.style.animationDelay = `${index * 0.05}s`;
    card.setAttribute('data-task-id', task.id);

    const deadline = new Date(task.deadline);
    const now = new Date();
    const timeUntil = deadline - now;
    const hoursUntil = timeUntil / (1000 * 60 * 60);

    // Determine deadline status
    let deadlineClass = 'deadline-upcoming';
    let deadlineText = formatDeadline(deadline);

    if (timeUntil < 0 && !task.completed) {
        deadlineClass = 'deadline-past';
        deadlineText = '⚠️ Overdue';
        card.classList.add('task-urgent');
    } else if (hoursUntil < 24 && !task.completed) {
        deadlineClass = 'deadline-today';
        deadlineText = `⏰ ${deadlineText}`;
    }

    card.innerHTML = `
        <div class="flex items-start gap-4">
            <!-- Checkbox -->
            <input 
                type="checkbox" 
                class="custom-checkbox mt-1" 
                ${task.completed ? 'checked' : ''}
                onchange="toggleTaskComplete(${task.id})"
            >
            
            <!-- Task Content -->
            <div class="flex-1 min-w-0">
                <h3 class="task-title text-lg font-semibold text-gray-800 mb-1 break-words">
                    ${escapeHtml(task.title)}
                </h3>
                
                ${task.description ? `
                    <p class="text-gray-600 text-sm mb-3 break-words">
                        ${escapeHtml(task.description)}
                    </p>
                ` : ''}
                
                <div class="flex flex-wrap items-center gap-2">
                    <span class="deadline-badge ${deadlineClass}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        ${deadlineText}
                    </span>
                </div>
            </div>
            
            <!-- Delete Button -->
            <button 
                onclick="deleteTask(${task.id})" 
                class="btn-delete text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 no-print"
                title="Delete task"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
            </button>
        </div>
    `;

    return card;
}

/**
 * Update progress indicators
 */
function updateProgress() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Update DOM
    totalCount.textContent = total;
    completedCount.textContent = completed;
    progressPercentage.textContent = `${percentage}%`;
    progressBar.style.width = `${percentage}%`;
}

// ===========================
// Notification Functions
// ===========================

/**
 * Check current notification permission status
 */
function checkNotificationPermission() {
    if (!('Notification' in window)) {
        console.warn('This browser does not support notifications');
        notificationBtn.disabled = true;
        notificationBtnText.textContent = 'Not Supported';
        return;
    }

    const permission = Notification.permission;

    if (permission === 'granted') {
        notificationBtnText.textContent = 'Notifications On ✓';
        notificationBtn.classList.add('bg-jade-dark');
    } else if (permission === 'denied') {
        notificationBtnText.textContent = 'Notifications Blocked';
        notificationBtn.classList.add('bg-gray-400');
    } else {
        notificationBtnText.textContent = 'Enable Notifications';
    }
}

/**
 * Request notification permission from user
 */
async function requestNotificationPermission() {
    if (!('Notification' in window)) {
        showError('This browser does not support notifications');
        return;
    }

    if (Notification.permission === 'granted') {
        showSuccess('Notifications are already enabled! 🔔');
        return;
    }

    if (Notification.permission === 'denied') {
        showError('Notifications are blocked. Please enable them in your browser settings.');
        return;
    }

    try {
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
            showSuccess('Notifications enabled successfully! 🔔');
            checkNotificationPermission();

            // Send a test notification
            sendNotification('Weekly App', {
                body: 'You will now receive reminders for your tasks!',
                icon: 'icons/icon-192x192.png'
            });
        } else {
            showError('Notification permission denied');
        }
    } catch (error) {
        console.error('Error requesting notification permission:', error);
        showError('Error enabling notifications');
    }
}

/**
 * Send a browser notification
 */
function sendNotification(title, options) {
    if (Notification.permission === 'granted') {
        const notification = new Notification(title, {
            icon: 'icons/icon-192x192.png',
            badge: 'icons/icon-192x192.png',
            vibrate: [200, 100, 200],
            ...options
        });

        // Click handler to focus the app
        notification.onclick = () => {
            window.focus();
            notification.close();
        };

        console.log('🔔 Notification sent:', title);
    }
}

/**
 * Check for tasks that need notifications
 */
function checkForReminders() {
    const now = new Date();

    tasks.forEach(task => {
        // Skip completed tasks
        if (task.completed) return;

        const deadline = new Date(task.deadline);
        const timeUntil = deadline - now;
        const minutesUntil = timeUntil / (1000 * 60);

        // Check if we should send 10-minute warning
        if (minutesUntil <= REMINDER_BEFORE_MINUTES && minutesUntil > 0 && !task.notifiedBefore) {
            sendNotification('⏰ Task Reminder', {
                body: `"${task.title}" is due in ${Math.ceil(minutesUntil)} minutes!`,
                tag: `reminder-before-${task.id}`
            });

            task.notifiedBefore = true;
            saveTasks();
        }

        // Check if deadline has arrived
        if (timeUntil <= 0 && timeUntil > -60000 && !task.notifiedAt) {
            sendNotification('🚨 Task Deadline!', {
                body: `"${task.title}" is due now!`,
                tag: `reminder-at-${task.id}`
            });

            task.notifiedAt = true;
            saveTasks();
        }
    });
}

/**
 * Start the notification checker interval
 */
function startNotificationChecker() {
    // Check immediately
    checkForReminders();

    // Then check every minute
    notificationCheckInterval = setInterval(checkForReminders, REMINDER_INTERVAL);

    console.log('⏰ Notification checker started');
}

// ===========================
// PWA Functions
// ===========================

/**
 * Register service worker for PWA functionality
 */
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('sw.js');
            console.log('✅ Service Worker registered:', registration.scope);
        } catch (error) {
            console.error('❌ Service Worker registration failed:', error);
        }
    }
}

// ===========================
// Utility Functions
// ===========================

/**
 * Format deadline date/time for display
 */
function formatDeadline(date) {
    const now = new Date();
    const deadline = new Date(date);

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const deadlineDay = new Date(deadline.getFullYear(), deadline.getMonth(), deadline.getDate());

    let dateStr;
    if (deadlineDay.getTime() === today.getTime()) {
        dateStr = 'Today';
    } else if (deadlineDay.getTime() === tomorrow.getTime()) {
        dateStr = 'Tomorrow';
    } else {
        dateStr = deadline.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: deadline.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    }

    const timeStr = deadline.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    return `${dateStr} at ${timeStr}`;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Show success message
 */
function showSuccess(message) {
    console.log('✅', message);
    // You could implement a toast notification here
    alert(message);
}

/**
 * Show error message
 */
function showError(message) {
    console.error('❌', message);
    // You could implement a toast notification here
    alert(message);
}

// ===========================
// Initialize on DOM Ready
// ===========================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===========================
// Global Error Handler
// ===========================

window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

// ===========================
// Handle page visibility for notifications
// ===========================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('📱 App in background');
    } else {
        console.log('📱 App in foreground');
        // Re-render tasks when coming back
        renderTasks();
    }
});
