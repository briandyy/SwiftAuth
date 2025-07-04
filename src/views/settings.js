// Settings page for SwiftAuth

function renderSettingsPage() {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings - SwiftAuth</title>
      <!-- PWA Meta Tags -->
    <meta name="description" content="SwiftAuth Settings - Configure your authenticator">
    <meta name="theme-color" content="#3b82f6">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="mobile-web-app-capable" content="yes">
    
    <!-- Dark Mode Utility -->
    <script src="/src/utils/darkMode.js"></script>
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    animation: {
                        'fade-in': 'fadeIn 0.5s ease-in-out',
                        'slide-up': 'slideUp 0.3s ease-out',
                        'scale-in': 'scaleIn 0.3s ease-out'
                    },
                    keyframes: {
                        fadeIn: {
                            '0%': { opacity: '0', transform: 'translateY(10px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' }
                        },
                        slideUp: {
                            '0%': { transform: 'translateY(20px)', opacity: '0' },
                            '100%': { transform: 'translateY(0)', opacity: '1' }
                        },
                        scaleIn: {
                            '0%': { transform: 'scale(0.5)', opacity: '0' },
                            '100%': { transform: 'scale(1)', opacity: '1' }
                        }
                    }
                }
            }
        };
          // Initialize dark mode using centralized system
        if (typeof darkModeManager !== 'undefined') {
            darkModeManager.preloadTheme();
        } else {
            // Fallback
            const isDarkMode = document.cookie.split(';').some((item) => item.trim().startsWith('darkMode=true'));
            if (isDarkMode) {
                document.documentElement.classList.add('dark');
            }
        }
    </script>    <script src="/src/utils/backup.js"></script>
</head>
<body class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <header class="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-40">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <div class="flex items-center space-x-4">
                <a href="/" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </a>
                <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Settings</h1>
            </div>
            <button id="darkModeToggle" class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                <svg class="w-5 h-5 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
            </button>
        </div>
    </header>

    <main class="container mx-auto px-4 py-8 max-w-4xl">
        <div class="space-y-8">
            <!-- Security Settings -->
            <section class="animate-fade-in">
                <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                    <svg class="w-6 h-6 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    Security
                </h2>                <div class="grid gap-6 md:grid-cols-2">                    <!-- Auto-lock -->
                    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                        <div class="flex items-center space-x-4 mb-4">
                            <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Auto-lock</h3>
                                <p class="text-sm text-gray-600 dark:text-gray-400">Lock app after inactivity</p>
                            </div>
                        </div>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <span class="text-gray-700 dark:text-gray-300">Enable Auto-lock</span>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="autoLockToggle" class="sr-only peer">
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                            <div>
                                <label for="autoLockTime" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Lock after (minutes)</label>
                                <select id="autoLockTime" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
                                    <option value="1">1 minute</option>
                                    <option value="5" selected>5 minutes</option>
                                    <option value="15">15 minutes</option>
                                    <option value="30">30 minutes</option>
                                </select>
                            </div>
                        </div>
                        <div class="space-y-4">
                            <div class="flex justify-start mt-4">
                                <button id="logoutButton" class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2">
                                    Lock now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Privacy -->
            <section class="animate-fade-in" style="animation-delay: 0.3s">
                <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                    <svg class="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                    Privacy & Data
                </h2>
                <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <div class="space-y-6">
                        <!-- Hide Sensitive Info -->
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Hide Codes</h3>
                                <p class="text-sm text-gray-600 dark:text-gray-400">Hide codes until tapped</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="hideCodesToggle" class="sr-only peer">
                                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </section>

            <!-- About -->
            <section class="animate-fade-in" style="animation-delay: 0.4s">
                <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                    <svg class="w-6 h-6 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    About
                </h2>
                <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Version</span>
                            <span class="font-medium text-gray-800 dark:text-white">1.0.2</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Developer</span>
                            <a href="https://github.com/briandyy/SwiftAuth" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 font-medium" target="_blank">briandyy</a>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-gray-600 dark:text-gray-400">License</span>
                            <span class="font-medium text-gray-800 dark:text-white">MIT</span>
                        </div>
                        <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
                            <p class="text-sm text-gray-600 dark:text-gray-400 text-center">
                                SwiftAuth is a secure, modern TOTP authenticator built with privacy in mind.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>

    <script>        let backupManager;

        document.addEventListener('DOMContentLoaded', function() {            initDarkModeToggle();
            initSettingsHandlers();
            loadSettings();
            // Log out button handler
            const logoutButton = document.getElementById('logoutButton');
            if (logoutButton) {
                logoutButton.addEventListener('click', async function() {
                    try {
                        await fetch('/logout', { method: 'POST', credentials: 'include' });
                    } catch (e) {
                        console.warn('Logout request failed, but proceeding with client-side cleanup');
                    }
                    // Clear localStorage/sessionStorage
                    localStorage.clear();
                    sessionStorage.clear();
                    // Redirect to login page
                    window.location.href = '/?from=logout';
                });
            }
        });

        // ===== COOKIE MANAGEMENT =====
        function setCookie(name, value, days = 365) {
            const expires = new Date();
            expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
            document.cookie = name + "=" + value + ";expires=" + expires.toUTCString() + ";path=/;SameSite=Strict";
        }
        
        function getCookie(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }        function initDarkModeToggle() {
            const darkModeToggle = document.getElementById('darkModeToggle');
            if (darkModeToggle && window.darkModeManager) {
                window.darkModeManager.registerToggle(darkModeToggle);
            }
        }

        // Legacy compatibility function
        function updateDarkModeIcon() {
            if (window.darkModeManager) {
                window.darkModeManager.updateAllToggles();
            }
        }

        function initSettingsHandlers() {
            // Settings toggles
            document.getElementById('hideCodesToggle')?.addEventListener('change', function() {
                setCookie('hideCodesEnabled', this.checked);
                // Notify other pages of the change
                if (window.opener) {
                    window.opener.postMessage({type: 'hideCodesChanged', enabled: this.checked}, '*');
                }
            });
            
            // Auto-lock toggle
            document.getElementById('autoLockToggle')?.addEventListener('change', function() {
                localStorage.setItem('autoLockEnabled', this.checked);
                if (this.checked) {
                    const timeout = parseInt(document.getElementById('autoLockTime').value) * 60000; // Convert minutes to ms
                    localStorage.setItem('autoLockTimeout', timeout);
                    setupAutoLock();
                } else {
                    clearAutoLock();
                }
            });
            
            // Auto-lock time change
            document.getElementById('autoLockTime')?.addEventListener('change', function() {
                const timeout = parseInt(this.value) * 60000; // Convert minutes to ms
                localStorage.setItem('autoLockTimeout', timeout);
                if (document.getElementById('autoLockToggle').checked) {
                    setupAutoLock();
                }            });
        }

        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = \`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 \${
                type === 'success' ? 'bg-green-500 text-white' :
                type === 'error' ? 'bg-red-500 text-white' :
                type === 'warning' ? 'bg-yellow-500 text-white' :
                'bg-blue-500 text-white'
            }\`;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);        }

        // Auto-lock functionality
        let autoLockTimer;
        let lastActivity = Date.now();

        function setupAutoLock() {
            clearAutoLock();
            const timeout = parseInt(localStorage.getItem('autoLockTimeout')) || 300000; // Default 5 minutes
            
            function resetTimer() {
                lastActivity = Date.now();
                clearTimeout(autoLockTimer);
                autoLockTimer = setTimeout(() => {
                    // Redirect to login
                    window.location.href = '/?locked=true';
                }, timeout);
            }
            
            // Track user activity
            ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'].forEach(event => {
                document.addEventListener(event, resetTimer, true);
            });
            
            resetTimer();
        }

        function clearAutoLock() {
            clearTimeout(autoLockTimer);
            ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'].forEach(event => {
                document.removeEventListener(event, arguments.callee, true);
            });
        }

        function loadSettings() {            // Load hide codes setting
            const hideCodesEnabled = getCookie('hideCodesEnabled') === 'true';
            const hideCodesToggle = document.getElementById('hideCodesToggle');
            if (hideCodesToggle) hideCodesToggle.checked = hideCodesEnabled;
            
            // Load auto-lock settings
            const autoLockEnabled = localStorage.getItem('autoLockEnabled') === 'true';
            const autoLockToggle = document.getElementById('autoLockToggle');
            if (autoLockToggle) autoLockToggle.checked = autoLockEnabled;
            
            const autoLockTimeout = parseInt(localStorage.getItem('autoLockTimeout')) || 300000;
            const autoLockTime = document.getElementById('autoLockTime');
            if (autoLockTime) autoLockTime.value = autoLockTimeout / 60000; // Convert ms to minutes
            
            // Setup auto-lock if enabled
            if (autoLockEnabled) {
                setupAutoLock();
            }
        }

        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            const typeClass = type === 'success' ? 'bg-green-600' : 
                             type === 'error' ? 'bg-red-600' : 'bg-blue-600';
            notification.className = 'fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 animate-slide-up ' + typeClass + ' text-white';
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('opacity-0', 'translate-x-full');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
    </script>
</body>
</html>
    `;
}

export default renderSettingsPage;
