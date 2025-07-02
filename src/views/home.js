// returns template for homepage

function renderHomepage({ tokens }) {
	return `
	<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SwiftAuth - Secure TOTP Authenticator</title>
    
    <!-- PWA Meta Tags -->
    <meta name="description" content="SwiftAuth - A secure and modern TOTP authenticator with advanced features">
    <meta name="theme-color" content="#3b82f6">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="SwiftAuth">
    <meta name="mobile-web-app-capable" content="yes">
    
    <!-- PWA Links -->
    <link rel="manifest" href="/manifest.json">
    <link rel="apple-touch-icon" href="/icons/icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png">
    
    <!-- iOS Safari specific -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="SwiftAuth">
    
    <!-- Android Chrome specific -->
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="application-name" content="SwiftAuth">
    
    <!-- Windows Phone -->
    <meta name="msapplication-navbutton-color" content="#3b82f6">
    <meta name="msapplication-TileColor" content="#3b82f6">
    <meta name="msapplication-TileImage" content="/icons/icon-144x144.png">
    
    <!-- Dark Mode Utility -->
    <script src="/src/utils/darkMode.js"></script>
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        // Configure Tailwind for dark mode
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    animation: {
                        'fade-in': 'fadeIn 0.5s ease-in-out',
                        'slide-up': 'slideUp 0.3s ease-out',
                        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        'bounce-gentle': 'bounceGentle 1s ease-in-out',
                        'glow': 'glow 2s ease-in-out infinite alternate',
                        'spin-slow': 'spin 3s linear infinite',
                        'wiggle': 'wiggle 1s ease-in-out infinite',
                        'shake': 'shake 0.5s ease-in-out',
                        'slide-in-left': 'slideInLeft 0.5s ease-out',
                        'slide-in-right': 'slideInRight 0.5s ease-out',
                        'scale-in': 'scaleIn 0.3s ease-out',
                        'float': 'float 3s ease-in-out infinite'
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
                        bounceGentle: {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-5px)' }
                        },
                        glow: {
                            '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
                            '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' }
                        },
                        wiggle: {
                            '0%, 100%': { transform: 'rotate(-3deg)' },
                            '50%': { transform: 'rotate(3deg)' }
                        },
                        shake: {
                            '0%, 100%': { transform: 'translateX(0)' },
                            '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
                            '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' }
                        },
                        slideInLeft: {
                            '0%': { transform: 'translateX(-100%)', opacity: '0' },
                            '100%': { transform: 'translateX(0)', opacity: '1' }
                        },
                        slideInRight: {
                            '0%': { transform: 'translateX(100%)', opacity: '0' },
                            '100%': { transform: 'translateX(0)', opacity: '1' }
                        },
                        scaleIn: {
                            '0%': { transform: 'scale(0.5)', opacity: '0' },
                            '100%': { transform: 'scale(1)', opacity: '1' }
                        },
                        float: {
                            '0%, 100%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(-20px)' }
                        }
                    },
                    screens: {
                        'xs': '475px',
                    }
                }
            }
        };
        
        // Add custom CSS for mobile optimizations
        const style = document.createElement('style');
        style.textContent = \`
            @media (max-width: 640px) {
                .token-card {
                    margin-bottom: 0.75rem;
                }
                
                .grid {
                    grid-template-columns: 1fr;
                    gap: 0.75rem;
                }
                
                /* Touch-friendly button sizes */
                button {
                    min-height: 44px;
                    padding: 0.75rem 1rem;
                }
                
                /* Smooth scrolling for mobile */
                html {
                    scroll-behavior: smooth;
                    -webkit-overflow-scrolling: touch;
                }
                
                /* Custom animations for mobile */
                @keyframes slideOutRight {
                    to { transform: translateX(100%); opacity: 0; }
                }
                
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                .animate-slide-out-right {
                    animation: slideOutRight 0.3s ease-in-out;
                }
                
                .animate-slide-in-right {
                    animation: slideInRight 0.3s ease-in-out;
                }
            }
        \`;
        document.head.appendChild(style);
        
        // Initialize dark mode using the centralized system
        if (typeof darkModeManager !== 'undefined') {
            darkModeManager.preloadTheme();
        } else {
            // Fallback for immediate initialization
            const isDarkMode = document.cookie.split(';').some((item) => item.trim().startsWith('darkMode=true'));
            if (isDarkMode) {
                document.documentElement.classList.add('dark');
            }
        }
    </script>
    <meta name="theme-color" content="#1f2937">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="SwiftAuth">
    <link rel="manifest" href="/manifest.json">
</head>
<body class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    <header class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b dark:border-gray-700 sticky top-0 z-50 transition-all duration-300">
        <div class="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-2 sm:space-x-3">
                    <div class="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <svg class="w-3 h-3 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <h1 class="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">SwiftAuth</h1>
                </div>
                <div class="flex items-center space-x-1 sm:space-x-2">
                    <a href="/settings" class="p-1.5 sm:p-2 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 transition-all duration-200 transform hover:scale-105 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800" title="Settings">
                        <svg class="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                    </a>
                    <button id="darkModeToggle" class="p-1.5 sm:p-2 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 transition-all duration-200 transform hover:scale-105 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                        <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                        </svg>
                    </button>
                    <a href="/scan" class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-1.5 px-2 sm:py-2 sm:px-4 rounded-lg inline-flex items-center transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                        <svg class="w-4 h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        <span class="text-sm">Add</span>
                    </a>
                </div>
            </div>
        </div>
    </header>
    <main class="container mx-auto px-2 sm:px-4 py-3 sm:py-6 min-h-screen">
        <!-- Search Bar -->
        <div class="relative mb-3 sm:mb-6">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>
            <input type="text" id="searchInput" class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm" placeholder="Search tokens...">
        </div>

        <!-- Stats Dashboard -->
        <div class="mb-3 sm:mb-6">
            <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 sm:p-4 rounded-xl shadow-lg">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-blue-100 text-xs">Total Tokens</p>
                        <p class="text-lg sm:text-2xl font-bold">${tokens.length}</p>
                    </div>
                    <svg class="w-6 h-6 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd"></path>
                    </svg>
                </div>
            </div>
        </div>

        <h2 class="text-base sm:text-xl font-semibold mb-3 sm:mb-6 text-gray-700 dark:text-gray-300 flex items-center">
            <svg class="w-4 h-4 sm:w-6 sm:h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
            Active Tokens
        </h2>
        <div class="grid gap-3 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" id="tokens-container">${tokens.map(
            (token) => `
            <!-- Token Card  -->
            <div class="token-card bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-6 transition-all duration-300 hover:scale-105 animate-fade-in" data-token-id="${token.id || token.issuer}" data-period="${token.period || 30}" data-issuer="${token.issuer.toLowerCase()}">
                <div class="flex justify-between items-start mb-3">
                    <div class="flex items-center space-x-2 sm:space-x-3">
                        <div class="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <span class="text-white font-bold text-sm sm:text-lg">${token.issuer.charAt(0).toUpperCase()}</span>
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-800 dark:text-white text-sm sm:text-lg">
                            ${token.issuer}
                            ${token.label ? `<span class="ml-2 text-xs text-gray-500 dark:text-gray-400 font-normal">(${token.label})</span>` : ''}
                            </h3>
                            <p class="text-xs text-gray-500 dark:text-gray-400">TOTP • ${token.period || 30}s</p>
                        </div>
                    </div>
                    <div class="flex space-x-1">
                        <button class="copy-btn p-1.5 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800" data-code="${token.otp}" title="Copy code">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                    <div class="text-center mb-3">
                        <div class="token-code text-xl sm:text-3xl font-mono font-bold text-gray-900 dark:text-white mb-2 tracking-wider cursor-pointer hover:text-blue-500 transition-colors select-all" 
                             data-code="${token.otp}" 
                             data-hidden="false"
                             title="Click to copy">${token.otp}</div>
                    <div class="flex items-center justify-between">
                        <p class="text-xs text-gray-500 dark:text-gray-400 token-timer">Expires in ${token.timeStep} seconds</p>
                        <div class="flex items-center space-x-2">
                            <div class="w-10 sm:w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div class="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000 ease-linear timer-bar" style="width: ${(token.timeStep / (token.period || 30)) * 100}%"></div>
                            </div>
                            <span class="text-xs font-medium text-gray-500 dark:text-gray-400">${Math.ceil((token.timeStep / (token.period || 30)) * 100)}%</span>
                        </div>
                    </div>
                </div>
            </div>
            `
        ).join('')}
        </div>

        <!-- Empty State -->
        <div id="emptyState" class="text-center py-16 ${tokens.length > 0 ? 'hidden' : ''}">
            <div class="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No tokens yet</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-6">Get started by adding your first two-factor authentication token</p>
            <a href="/scan" class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:scale-105">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Add Your First Token
            </a>
        </div>
    </main>
<script>
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
    }

    // ===== HIDE CODES FUNCTIONALITY =====  
    let hideCodesEnabled = false;
    
    function initHideCodes() {
        hideCodesEnabled = getCookie('hideCodesEnabled') === 'true';
        applyHideCodesState();
    }
    
    function applyHideCodesState() {
        const tokenCodes = document.querySelectorAll('.token-code');
        tokenCodes.forEach(codeElement => {
            const actualCode = codeElement.getAttribute('data-code');
            const isCurrentlyHidden = codeElement.getAttribute('data-hidden') === 'true';
            
            if (hideCodesEnabled && !isCurrentlyHidden) {
                // Hide the code
                codeElement.textContent = '******';
                codeElement.setAttribute('data-hidden', 'true');
                codeElement.style.cursor = 'pointer';
                codeElement.title = 'Click to reveal code';
            } else if (!hideCodesEnabled && isCurrentlyHidden) {
                // Show the code
                codeElement.textContent = actualCode;
                codeElement.setAttribute('data-hidden', 'false');
                codeElement.title = 'Click to copy';
            }
        });
    }
    
    function toggleCodeVisibility(codeElement) {
        if (!hideCodesEnabled) return; // If hide codes is disabled, don't toggle
        
        const isHidden = codeElement.getAttribute('data-hidden') === 'true';
        const actualCode = codeElement.getAttribute('data-code');
        
        if (isHidden) {
            // Show code temporarily
            codeElement.textContent = actualCode;
            codeElement.setAttribute('data-hidden', 'false');
            codeElement.title = 'Click to copy';
            
            // Hide again after 3 seconds
            setTimeout(() => {
                if (hideCodesEnabled) {
                    codeElement.textContent = '******';
                    codeElement.setAttribute('data-hidden', 'true');
                    codeElement.title = 'Click to reveal code';
                }
            }, 3000);
        }
    }

    // ===== INITIALIZATION =====
    document.addEventListener('DOMContentLoaded', function() {
        initDarkModeToggle();
        initHideCodes();
        setupCopySystem();
        startTokenRefresh();
        setupSearchAndButtons();
        
        // Listen for hide codes setting changes from other pages
        window.addEventListener('message', function(event) {
            if (event.data && event.data.type === 'hideCodesChanged') {
                hideCodesEnabled = event.data.enabled;
                setCookie('hideCodesEnabled', hideCodesEnabled);
                applyHideCodesState();
            }
        });
    });

    // ===== DARK MODE TOGGLE =====
    function initDarkModeToggle() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle && window.darkModeManager) {
            window.darkModeManager.registerToggle(darkModeToggle);
        }
    }
    
    // Legacy function for compatibility
    function updateDarkModeIcon() {
        if (window.darkModeManager) {
            window.darkModeManager.updateAllToggles();
        }
    }

    // ===== SIMPLE COPY SYSTEM =====
    function setupCopySystem() {
        // Use event delegation for copy functionality
        document.addEventListener('click', handleCopyClick);
    }
    
    function handleCopyClick(event) {
        const copyBtn = event.target.closest('.copy-btn');
        const tokenCode = event.target.closest('.token-code');
        
        if (copyBtn || tokenCode) {
            event.preventDefault();
            
            // Always copy the actual code, regardless of visibility
            const code = (copyBtn || tokenCode).getAttribute('data-code');
            if (code) {
                copyToClipboard(code, copyBtn || tokenCode);
                
                // If it's a token code click and codes are hidden, also toggle visibility
                if (tokenCode && hideCodesEnabled) {
                    toggleCodeVisibility(tokenCode);
                }
            }
        }
    }
    
    async function copyToClipboard(text, element) {
        try {
            await navigator.clipboard.writeText(text);
            showCopySuccess(element);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                showCopySuccess(element);        } catch (fallbackErr) {
            // Silent error handling
        }
            
            document.body.removeChild(textArea);
        }
    }
    
    function showCopySuccess(element) {
        if (element.classList.contains('copy-btn')) {
            // Show checkmark in copy button
            const originalContent = element.innerHTML;
            element.innerHTML = '<svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>';
            setTimeout(() => {
                element.innerHTML = originalContent;
            }, 1000);
        } else {
            // Show "Copied!" text
            const originalText = element.textContent;
            element.textContent = 'Copied!';
            element.classList.add('text-green-500');
            setTimeout(() => {
                element.textContent = originalText;
                element.classList.remove('text-green-500');
            }, 1000);
        }
        
        // Haptic feedback for mobile
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }

    // ===== CLIENT-SIDE TOKEN REFRESH SYSTEM =====
    let tokenTimers = new Map();
    let refreshInterval = null;
    let lastRefreshCall = 0; // Track when we last called the API
    
    function startTokenRefresh() {
        // Clear any existing intervals
        if (refreshInterval) {
            clearInterval(refreshInterval);
        }
        tokenTimers.clear();
        
        // Initialize each token
        const tokenCards = document.querySelectorAll('.token-card');
        tokenCards.forEach(card => {
            const period = parseInt(card.dataset.period) || 30;
            const tokenId = card.dataset.tokenId;
            initializeToken(card, tokenId, period);
        });
        
        // Start update interval - check every second
        refreshInterval = setInterval(updateAllTokens, 1000);
        
        // Initial update
        updateAllTokens();
    }
    
    function initializeToken(card, tokenId, period) {
        const now = Math.floor(Date.now() / 1000);
        const timeInPeriod = now % period;
        
        tokenTimers.set(tokenId, {
            card: card,
            period: period,
            lastRefreshTime: now - timeInPeriod,
            needsCodeRefresh: false
        });
    }
    
    function updateAllTokens() {
        const now = Math.floor(Date.now() / 1000);
        let needsRefresh = false;
        let earliestRefreshTime = Infinity;
        
        tokenTimers.forEach((tokenInfo, tokenId) => {
            const { card, period, lastRefreshTime } = tokenInfo;
            const timeInCurrentPeriod = now % period;
            const timeLeft = period - timeInCurrentPeriod;
            const currentPeriodStart = now - timeInCurrentPeriod;
            
            if (currentPeriodStart > lastRefreshTime) {
                tokenInfo.lastRefreshTime = currentPeriodStart;
                tokenInfo.needsCodeRefresh = true;
                needsRefresh = true;
                earliestRefreshTime = Math.min(earliestRefreshTime, currentPeriodStart);
            }
            
            updateTokenUI(card, timeLeft, period);
        });
        
        if (needsRefresh && now > lastRefreshCall + 2) {
            lastRefreshCall = now;
            fetchAllNewTokenCodes();
        }
    }
    
    async function fetchAllNewTokenCodes() {
        try {
            const response = await fetch('/api/tokens/refresh', {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            
            if (!response.ok) {
                throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
            }
            
            const data = await response.json();
            
            if (data.tokens && Array.isArray(data.tokens)) {
                data.tokens.forEach(tokenData => {
                    const tokenId = tokenData.id || tokenData.issuer;
                    const card = document.querySelector(\`[data-token-id="\${tokenId}"]\`);
                    if (card) {
                        updateTokenCode(card, tokenData.otp);
                    }
                });
            }
        } catch (error) {
            // Silent error handling - no console logging
        }
    }
    
    function updateTokenUI(card, timeLeft, period) {
        const timerElement = card.querySelector('.token-timer');
        const progressBar = card.querySelector('.timer-bar');
        const progressContainer = progressBar ? progressBar.parentElement.parentElement : null;
        const percentageElement = progressContainer ? progressContainer.querySelector('span') : null;
        
        // Calculate percentage with smooth transitions
        const percentage = Math.max(0, Math.round((timeLeft / period) * 100));
        
        // Update timer text
        if (timerElement) {
            timerElement.textContent = \`Expires in \${timeLeft} seconds\`;
        }
        
        // Update progress bar with smooth animations
        if (progressBar) {
            const currentWidth = parseFloat(progressBar.style.width) || 100;
            
            // Set up smooth transitions
            progressBar.style.transition = 'width 0.9s linear, background-color 0.3s ease';
            progressBar.style.width = percentage + '%';
            
            // Update colors based on percentage
            progressBar.className = 'h-full bg-gradient-to-r timer-bar';
            
            if (percentage > 50) {
                progressBar.classList.add('from-green-500', 'to-green-600');
            } else if (percentage > 20) {
                progressBar.classList.add('from-yellow-500', 'to-yellow-600');
            } else {
                progressBar.classList.add('from-red-500', 'to-red-600');
            }
            
            // Handle reset case (when percentage jumps from low to high)
            if (percentage > 90 && currentWidth < 10) {
                // Disable transition for the reset
                progressBar.style.transition = 'none';
                progressBar.style.width = '100%';
                
                // Re-enable smooth transition after reset
                setTimeout(() => {
                    progressBar.style.transition = 'width 0.9s linear, background-color 0.3s ease';
                }, 50);
            }
        }
        
        // Update percentage text with smooth counting
        if (percentageElement) {
            const currentPercentage = parseInt(percentageElement.textContent) || 100;
            
            // Animate percentage changes smoothly
            if (Math.abs(percentage - currentPercentage) > 50) {
                // Big jump (reset case) - update immediately
                percentageElement.textContent = percentage + '%';
            } else if (percentage !== currentPercentage) {
                // Small change - animate smoothly
                animatePercentage(percentageElement, currentPercentage, percentage);
            }
        }
    }
    
    function animatePercentage(element, from, to) {
        const duration = 800; // ms
        const steps = Math.abs(to - from);
        const stepDuration = duration / steps;
        
        let current = from;
        const direction = to > from ? 1 : -1;
        
        const interval = setInterval(() => {
            current += direction;
            element.textContent = current + '%';
            
            if (current === to) {
                clearInterval(interval);
            }
        }, stepDuration);
    }
    
    function updateTokenCode(card, newCode) {
        const codeElement = card.querySelector('.token-code');
        const copyButton = card.querySelector('.copy-btn');
        
        if (!codeElement) return;
        
        const oldCode = codeElement.getAttribute('data-code') || codeElement.textContent;
        
        // Update the data attribute with the actual code
        codeElement.setAttribute('data-code', newCode);
        
        // Update display based on hide codes setting
        const isCurrentlyHidden = codeElement.getAttribute('data-hidden') === 'true';
        if (hideCodesEnabled && !isCurrentlyHidden) {
            codeElement.textContent = '******';
            codeElement.setAttribute('data-hidden', 'true');
        } else if (!hideCodesEnabled) {
            codeElement.textContent = newCode;
            codeElement.setAttribute('data-hidden', 'false');
        }
        // If hidden and hide codes enabled, keep it hidden until clicked
        
        if (copyButton) {
            copyButton.setAttribute('data-code', newCode);
        }
        
        if (oldCode !== newCode) {
            codeElement.style.backgroundColor = 'rgba(34, 197, 94, 0.15)';
            codeElement.style.transform = 'scale(1.05)';
            codeElement.style.borderRadius = '8px';
            codeElement.style.padding = '8px 16px';
            codeElement.style.transition = 'all 0.3s ease';
            codeElement.style.boxShadow = '0 0 0 2px rgba(34, 197, 94, 0.3)';
            
            setTimeout(() => {
                codeElement.style.backgroundColor = '';
                codeElement.style.transform = '';
                codeElement.style.borderRadius = '';
                codeElement.style.padding = '';
                codeElement.style.boxShadow = '';
            }, 2000);
        }
    }
    
    function clearAllIntervals() {
        if (globalTimer) {
            clearInterval(globalTimer);
            globalTimer = null;
        }
        tokenIntervals.clear();
    }
    
    function stopTokenRefresh() {
        if (refreshInterval) {
            clearInterval(refreshInterval);
            refreshInterval = null;
        }
        tokenTimers.clear();
    }
    
    // Auto-stop refresh when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopTokenRefresh();
        } else {
            startTokenRefresh();
        }
    });
    
    // Stop refresh when page unloads
    window.addEventListener('beforeunload', stopTokenRefresh);

    // ===== SEARCH AND OTHER BUTTONS =====
    function setupSearchAndButtons() {
        // Search functionality  
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const query = this.value.toLowerCase().trim();
                const tokenCards = document.querySelectorAll('.token-card');
                const tokensContainer = document.getElementById('tokens-container');
                
                let visibleCount = 0;
                tokenCards.forEach(card => {
                    const issuer = (card.dataset.issuer || '').toLowerCase();
                    const tokenId = (card.dataset.tokenId || '').toLowerCase();
                    const issuerText = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
                    
                    // Search in issuer name, token ID, and displayed text
                    const visible = !query || 
                                  issuer.includes(query) || 
                                  tokenId.includes(query) || 
                                  issuerText.includes(query);
                    
                    card.style.display = visible ? 'block' : 'none';
                    if (visible) visibleCount++;
                });
                
                // Handle "No results" message
                let noResults = document.getElementById('no-results');
                
                if (visibleCount === 0 && query && tokenCards.length > 0) {
                    if (!noResults) {
                        noResults = document.createElement('div');
                        noResults.id = 'no-results';
                        noResults.className = 'col-span-full text-center py-8 text-gray-500 dark:text-gray-400';
                        noResults.innerHTML = '<div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div><p class="text-lg font-medium mb-2">No tokens found</p><p class="text-sm">Try searching with a different term</p>';
                        tokensContainer.appendChild(noResults);
                    }
                } else if (noResults) {
                    noResults.remove();
                }
            });
            
            // Keyboard shortcut for search (Ctrl/Cmd + K)
            document.addEventListener('keydown', function(e) {
                if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                    e.preventDefault();
                    searchInput.focus();
                    searchInput.select();
                }
            });
        }
    }
</script>
</body>
</html>
	`;
}

export default renderHomepage;
