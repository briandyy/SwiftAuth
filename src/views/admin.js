// Admin page for managing tokens
export default function renderAdminPage({ tokens = [] }) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">    <title>Admin Panel - SwiftAuth</title>
    
    <!-- Dark Mode Utility -->
    <script src="/src/utils/darkMode.js"></script>
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class'
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
    </script>
</head>
<body class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div class="container mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
            <div class="flex items-center space-x-2 sm:space-x-3">
                <div class="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <svg class="w-3 h-3 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                    </svg>
                </div>
                <div>
                    <h1 class="text-lg sm:text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent dark:from-red-400 dark:to-pink-400">Admin Panel</h1>
                    <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">SwiftAuth Management</p>
                </div>
            </div>
            <div class="flex items-center space-x-2 sm:space-x-4">
                <button id="darkModeToggle" class="p-1.5 sm:p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                    <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                    </svg>
                </button>
                <a href="/" class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center space-x-1 sm:space-x-2">
                    <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    <span class="text-xs sm:text-sm font-medium">Back</span>
                </a>
            </div>
        </div>
    </header>

    <main class="container mx-auto px-4 py-8">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border dark:border-gray-700">
                <div class="flex items-center">
                    <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tokens</p>
                        <p class="text-2xl font-semibold text-gray-900 dark:text-white">${tokens.length}</p>
                    </div>
                </div>
            </div>
            
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border dark:border-gray-700">
                <div class="flex items-center">
                    <div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                        <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
                        <p class="text-2xl font-semibold text-gray-900 dark:text-white">${tokens.length}</p>
                    </div>
                </div>
            </div>
            
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border dark:border-gray-700">
                <div class="flex items-center">
                    <div class="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                        <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Security Level</p>
                        <p class="text-2xl font-semibold text-gray-900 dark:text-white">High</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tokens Management -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700">
            <div class="p-6 border-b dark:border-gray-700">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Token Management</h2>
                <p class="text-gray-600 dark:text-gray-400 mt-1">View, edit, and delete TOTP tokens</p>
            </div>
            
            <div class="p-6">
                ${tokens.length === 0 ? `
                <div class="text-center py-12">
                    <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    <p class="text-gray-600 dark:text-gray-400">No tokens found</p>
                    <p class="text-sm text-gray-500 dark:text-gray-500 mt-1">Add some tokens to get started</p>
                </div>                ` : `
                <!-- Desktop Table View -->
                <div class="hidden md:block overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">                        <thead class="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Issuer</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Secret Key</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Algorithm</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Period</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Digits</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            ${tokens.map(token => `
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                                            <span class="text-white font-bold text-sm">${token.Issuer.charAt(0).toUpperCase()}</span>
                                        </div>
                                        <div>
                                            <div class="text-sm font-medium text-gray-900 dark:text-white">${token.Issuer}</div>
                                            <div class="text-sm text-gray-500 dark:text-gray-400">ID: ${token.Id}</div>
                                        </div>
                                    </div>                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <code class="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded border select-all" 
                                              title="Click to copy secret key" 
                                              onclick="copySecret('${token.EncryptedSecret}', this)"
                                              data-encrypted="${token.EncryptedSecret}">
                                            Click to reveal
                                        </code>
                                        <button onclick="copySecret('${token.EncryptedSecret}', this.previousElementSibling)" 
                                                class="ml-2 p-1 text-gray-500 hover:text-blue-500 transition-colors" 
                                                title="Copy secret key">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                        ${token.Algorithm}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${token.TimeStep}s</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${token.Digits}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div class="flex space-x-2">
                                        <button onclick="editToken(${token.Id}, '${token.Issuer}')" 
                                            class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                            </svg>
                                        </button>
                                        <button onclick="deleteToken(${token.Id}, '${token.Issuer}')" 
                                            class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <!-- Mobile Card View -->
                <div class="md:hidden space-y-4">
                    ${tokens.map(token => `
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                        <div class="flex items-center justify-between mb-3">
                            <div class="flex items-center">
                                <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                                    <span class="text-white font-bold text-sm">${token.Issuer.charAt(0).toUpperCase()}</span>
                                </div>
                                <div>
                                    <div class="text-base font-semibold text-gray-900 dark:text-white">${token.Issuer}</div>
                                    <div class="text-sm text-gray-500 dark:text-gray-400">ID: ${token.Id}</div>
                                </div>
                            </div>
                            <div class="flex space-x-2">
                                <button onclick="editToken(${token.Id}, '${token.Issuer}')" 
                                    class="p-2 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                    </svg>
                                </button>
                                <button onclick="deleteToken(${token.Id}, '${token.Issuer}')" 
                                    class="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                            </div>                        </div>
                        <div class="grid grid-cols-2 gap-4 text-sm mb-3">
                            <div class="col-span-2">
                                <span class="text-gray-500 dark:text-gray-400 block mb-1">Secret Key</span>
                                <div class="flex items-center">
                                    <code class="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded border select-all flex-1" 
                                          title="Click to copy secret key" 
                                          onclick="copySecret('${token.EncryptedSecret}', this)"
                                          data-encrypted="${token.EncryptedSecret}">
                                        Click to reveal
                                    </code>
                                    <button onclick="copySecret('${token.EncryptedSecret}', this.previousElementSibling)" 
                                            class="ml-2 p-1 text-gray-500 hover:text-blue-500 transition-colors" 
                                            title="Copy secret key">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-3 gap-4 text-sm">
                            <div>
                                <span class="text-gray-500 dark:text-gray-400 block">Algorithm</span>
                                <span class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                    ${token.Algorithm}
                                </span>
                            </div>
                            <div>
                                <span class="text-gray-500 dark:text-gray-400 block">Period</span>
                                <span class="font-medium text-gray-900 dark:text-white">${token.TimeStep}s</span>
                            </div>
                            <div>
                                <span class="text-gray-500 dark:text-gray-400 block">Digits</span>
                                <span class="font-medium text-gray-900 dark:text-white">${token.Digits}</span>
                            </div>
                        </div>
                    </div>
                    `).join('')}
                </div>
                `}
            </div>
        </div>
    </main>    <!-- Edit Modal -->
    <div id="editModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full hidden">
        <div class="relative top-4 mx-auto p-4 border max-w-md w-full mx-4 shadow-lg rounded-md bg-white dark:bg-gray-800 max-h-screen overflow-y-auto">
            <div class="mt-3">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Edit Token</h3>
                <form id="editForm">
                    <input type="hidden" id="editTokenId">
                    <div class="mb-4">
                        <label for="editIssuer" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Issuer Name</label>
                        <input type="text" id="editIssuer" name="issuer" required
                            class="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-base">
                    </div>
                    <div class="mb-6">
                        <label for="editSecret" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Secret Key (Base32)</label>
                        <input type="text" id="editSecret" name="secret" required
                            class="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-base"
                            placeholder="JBSWY3DPEHPK3PXP">
                    </div>
                    <div class="flex flex-col sm:flex-row gap-3 sm:justify-end">
                        <button type="button" onclick="closeEditModal()" 
                            class="w-full sm:w-auto px-4 py-2.5 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-base font-medium">
                            Cancel
                        </button>
                        <button type="submit" 
                            class="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-base font-medium">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>    <script>
        // Dark mode toggle using centralized system
        document.addEventListener('DOMContentLoaded', function() {
            const darkModeToggle = document.getElementById('darkModeToggle');
            if (darkModeToggle && window.darkModeManager) {
                window.darkModeManager.registerToggle(darkModeToggle);
            }
        });// Token management functions
        window.editToken = function(id, issuer) {
            document.getElementById('editTokenId').value = id;
            document.getElementById('editIssuer').value = issuer;
            document.getElementById('editSecret').value = '';
            document.getElementById('editModal').classList.remove('hidden');
        }

        window.closeEditModal = function() {
            document.getElementById('editModal').classList.add('hidden');
        }

        window.deleteToken = function(id, issuer) {
            if (confirm(\`Are you sure you want to delete the token for "\${issuer}"?\`)) {
                fetch('/admin/token/' + id, {
                    method: 'DELETE'
                }).then(response => {
                    if (response.ok) {
                        location.reload();                    } else {
                        showNotification('Failed to delete token', 'error');
                    }                });
            }
        }
        
        // Copy secret key function
        window.copySecret = async function(encryptedSecret, element) {
            try {
                // Decrypt the secret key (using same logic as in generateTotp)
                const response = await fetch('/api/token/decrypt', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ encryptedSecret })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    const secret = data.secret;
                    
                    // Update the display
                    element.textContent = secret;
                    element.title = 'Click to copy';
                    
                    // Copy to clipboard
                    navigator.clipboard.writeText(secret).then(() => {
                        showNotification('Secret key copied to clipboard!', 'success');
                    });
                    
                    // Hide the secret after 5 seconds
                    setTimeout(() => {
                        element.textContent = 'Click to reveal';
                        element.title = 'Click to reveal secret key';
                    }, 5000);
                } else {
                    showNotification('Failed to decrypt secret key', 'error');
                }            } catch (error) {
                showNotification('Error copying secret key', 'error');
            }
        }
        
        // Notification system
        function showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            const baseClasses = 'fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full';
            const typeClasses = type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
            notification.className = baseClasses + ' ' + typeClasses;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            // Slide in
            setTimeout(() => {
                notification.classList.remove('translate-x-full');
            }, 10);
            
            // Remove after 3 seconds
            setTimeout(() => {
                notification.classList.add('translate-x-full');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }

        // Edit form submission
        document.getElementById('editForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const id = document.getElementById('editTokenId').value;
            const issuer = document.getElementById('editIssuer').value;
            const secret = document.getElementById('editSecret').value;
            
            fetch('/admin/token/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ issuer, secret })
            }).then(response => {
                if (response.ok) {
                    location.reload();                } else {
                    showNotification('Failed to update token', 'error');
                }
            });
        });

        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            const typeClass = type === 'success' ? 'bg-green-600' : 
                             type === 'error' ? 'bg-red-600' : 'bg-blue-600';
            notification.className = 'fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ' + typeClass + ' text-white';
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }

        // Close modal when clicking outside
        document.getElementById('editModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeEditModal();
            }
        });
    </script>
</body>
</html>
    `;
}
