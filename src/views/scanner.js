export default function renderScannerPage() {
	return `
	<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Token - SwiftAuth</title>
    
    <!-- Dark Mode Utility -->
    <script src="/src/utils/darkMode.js"></script>
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        // Configure Tailwind for dark mode
        tailwind.config = {
            darkMode: 'class'
        };
        
        // Dark mode initialization using centralized system
        if (typeof darkModeManager !== 'undefined') {
            darkModeManager.preloadTheme();
        } else {
            // Fallback
            const isDarkMode = document.cookie.split(';').some((item) => item.trim().startsWith('darkMode=true'));
            if (isDarkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    </script>
</head>
<body class="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors duration-300">
    <header class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b dark:border-gray-700 sticky top-0 z-50">
        <div class="container mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
            <div class="flex items-center space-x-2 sm:space-x-3">
                <div class="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg class="w-3 h-3 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd"></path>
                    </svg>
                </div>
                <h1 class="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">SwiftAuth</h1>
            </div>
            <div class="flex items-center space-x-2 sm:space-x-4">
                <button id="darkModeToggle" class="p-1.5 sm:p-2 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 transition-all duration-200 transform hover:scale-105 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                    <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                    </svg>
                </button>
                <a href="/" class="px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium transition-all duration-200 transform hover:scale-105 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center space-x-1 sm:space-x-2">
                    <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    <span class="text-xs sm:text-sm">Back</span>
                </a>
            </div>
        </div>
    </header>

    <main class="flex-grow flex flex-col items-center justify-center px-4 py-4 sm:py-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-8 w-full max-w-md">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6 text-center">Add New Token</h2>

            <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul class="flex flex-wrap -mb-px text-xs sm:text-sm font-medium text-center" id="myTab">
                    <li class="mr-1 sm:mr-2">
                        <button class="inline-block p-2 sm:p-4 border-b-2 rounded-t-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200" id="scan-tab" type="button">Scan QR</button>
                    </li>
                    <li class="mr-1 sm:mr-2">
                        <button class="inline-block p-2 sm:p-4 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-300 dark:hover:text-blue-400 dark:hover:border-blue-600 text-gray-700 dark:text-gray-300 transition-all duration-200" id="uri-tab" type="button">From URI</button>
                    </li>
                    <li class="mr-1 sm:mr-2">
                        <button class="inline-block p-2 sm:p-4 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-300 dark:hover:text-blue-400 dark:hover:border-blue-600 text-gray-700 dark:text-gray-300 transition-all duration-200" id="manual-tab" type="button">Manual Entry</button>
                    </li>
                </ul>
            </div>
            <div id="myTabContent">
                <div id="scan-content">
                    <div class="bg-gray-200 dark:bg-gray-700 aspect-square w-full max-w-xs mx-auto mb-4 sm:mb-6 flex flex-col items-center justify-center" id="reader">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <p class="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                        Position the QR code within the frame to scan
                    </p>
                </div>
                <div id="uri-content" class="hidden">
                    <div class="mb-4">
                        <label for="manual-code" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Enter otpauth:// URI:</label>
                        <input type="text" id="manual-code" name="manual-code"
                            class="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base"
                            placeholder="otpauth://...">
                    </div>
                    <div class="text-center">
                        <button
                            id="add-token-btn-uri"
                            class="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                            Add Token
                        </button>
                    </div>
                </div>
                <div id="manual-content" class="hidden">
                    <div class="mb-4">
                        <label for="manual-issuer" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Issuer (e.g. Google, GitHub)</label>
                        <input type="text" id="manual-issuer"
                            class="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base"
                            placeholder="Issuer">
                    </div>
                    <div class="mb-4">
                        <label for="manual-label" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account (e.g. user@example.com)</label>
                        <input type="text" id="manual-label"
                            class="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base"
                            placeholder="Account">
                    </div>
                    <div class="mb-4">
                        <label for="manual-secret" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Secret Key</label>
                        <input type="text" id="manual-secret"
                            class="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base"
                            placeholder="Secret">
                    </div>
                    <div class="mb-6">
                        <label for="manual-period" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Period (seconds)</label>
                        <select id="manual-period"
                            class="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base">
                            <option value="30">30 seconds (Standard)</option>
                            <option value="60">60 seconds</option>
                        </select>
                    </div>
                    <div class="text-center">
                        <button
                            id="add-token-btn-manual"
                            class="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                            Add Token
                        </button>
                    </div>
                </div>
            </div>

            <div id="result"></div>
        </div>
    </main>

   <script src="https://unpkg.com/html5-qrcode" type="text/javascript"></script>

   <script>
        // Notification system for better user feedback
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = \`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full\`;
            
            const typeStyles = {
                success: 'bg-green-500 text-white',
                error: 'bg-red-500 text-white',
                warning: 'bg-yellow-500 text-white',
                info: 'bg-blue-500 text-white'
            };
            
            notification.className += ' ' + (typeStyles[type] || typeStyles.info);
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 10);
            
            // Auto remove after 3 seconds
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }

		let keyURIObjGlobal;

		const OTPURI_REGEX =
            /^otpauth:\\/\\/([ht]otp)\\/(.+)\\?([A-Z0-9.~_-]+=[^?&]*(?:&[A-Z0-9.~_-]+=[^?&]*)*)$/i;


        const INTEGER_REGEX = /^[+-]?\d+$/;

        const SECRET_REGEX = /^[2-7A-Z]+=*$/i;

        const ALGORITHM_REGEX = /^SHA(?:1|224|256|384|512|3-224|3-256|3-384|3-512)$/i;

        const POSITIVE_INTEGER_REGEX =  /^\\+?[1-9]\\d*$/;


        // custom keyURI parser
        function parse(uri) {
            // create uriGroups array
            let uriGroups;

            try {
                uriGroups = uri.match(OTPURI_REGEX);
            } catch (_) {
                // handled below
            }
            if (!Array.isArray(uriGroups)) {
                throw new URIError("Invalid URI format");
            }

            // get the uri parameters
            const uriType = uriGroups[1].toLowerCase();
            const uriLabel = uriGroups[2]
                .split(/(?::|%3A) *(.+)/i, 2)
                .map(decodeURIComponent);

            const uriParams = uriGroups[3].split("&").reduce((acc, cur) => {
                const pairArr = cur.split(/=(.*)/, 2).map(decodeURIComponent);
                const pairKey = pairArr[0].toLowerCase();
                const pairVal = pairArr[1];
                const pairAcc = acc;
                pairAcc[pairKey] = pairVal;
                return pairAcc;
            }, {});

            let OTP;
            const config = {};

            if (uriType == "totp") {
                OTP = "TOTP";
                // Period: optional
                if (typeof uriParams.period !== "undefined") {
                    if (POSITIVE_INTEGER_REGEX.test(uriParams.period)) {
                        config.period = parseInt(uriParams.period, 10);
                    } else {
                        throw new TypeError("Invalid 'period' parameter");
                    }
                }
            } else {
                throw new Error("Unknown OTP type");
            }

            // Label: required
            // Issuer: optional
            if (typeof uriParams.issuer !== "undefined") {
                config.issuer = uriParams.issuer;
            }
            if (uriLabel.length === 2) {
                config.label = uriLabel[1];
                if (typeof config.issuer === "undefined" || config.issuer === "") {
                    config.issuer = uriLabel[0];
                } else if (uriLabel[0] === "") {
                    config.issuerInLabel = false;
                }
            } else {
                config.label = uriLabel[0];
                if (typeof config.issuer !== "undefined" && config.issuer !== "") {
                    config.issuerInLabel = false;
                }
            }
            // Secret: required
            if (
                typeof uriParams.secret !== "undefined" &&
                SECRET_REGEX.test(uriParams.secret)
            ) {
                config.secret = uriParams.secret;
            } else {
                throw new TypeError("Missing or invalid 'secret' parameter");
            }
            // Algorithm: optional
            if (typeof uriParams.algorithm !== "undefined") {
                if (ALGORITHM_REGEX.test(uriParams.algorithm)) {
                    config.algorithm = uriParams.algorithm;
                } else {
                    throw new TypeError("Invalid 'algorithm' parameter");
                }
            }
            // Digits: optional
            if (typeof uriParams.digits !== "undefined") {
                if (POSITIVE_INTEGER_REGEX.test(uriParams.digits)) {
                    config.digits = parseInt(uriParams.digits, 10);
                } else {
                    throw new TypeError("Invalid 'digits' parameter");
                }
            }

            // handle all default fields if left unpopulated by above functions
            // default algorithm: SHA1
            if (!config.algorithm) {
                config.algorithm = "SHA1";
            }
            // default digits: 6
            if (!config.digits) {
                config.digits = 6;
            }
            // default period: 30
            if (!config.period) {
                config.period = 30;
            }
            return config;
        }

		async function addToken(keyURIObj) {
            const resp = await fetch("/api/token/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(keyURIObj)
            });

            if (resp.ok) {
                const respJson = await resp.json();
				return respJson;
            } else {
                showNotification("Failed to add token", "error");
            }
        }

		async function saveToken(keyURIObj) {

			// disable the save token button
			document.getElementById('save-token-btn').disabled = true;

			const resp = await fetch("/api/token/save", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(keyURIObj)
			});

			if (resp.ok) {
				const respJson = await resp.json();
				// redirect to the homepage
				window.location.href = "/";
				return respJson;
			}
			else {
				showNotification("Failed to save token", "error");
				// enable the save token button
				document.getElementById('save-token-btn').disabled = false;
			}
		}

		const scanner = new Html5QrcodeScanner('reader', {
            // Scanner will be initialized in DOM inside element with id of 'reader'
            qrbox: {
                width: 250,
                height: 250,
            },  // Sets dimensions of scanning box (set relative to reader element width)
            fps: 20, // Frames per second to attempt a scan
        });


        scanner.render(success, error);
        // Starts scanner

        async function success(result) {

			// clear the scanner instance and remove the scanner element
			scanner.clear();
			
            document.getElementById('myTab').remove();
            document.getElementById('myTabContent').remove();


			// call the api to add the token
			const keyURIObj = parse(result);
			const resp = await addToken(keyURIObj);
			// set the keyURIObj to the global scope
			keyURIObjGlobal = keyURIObj;

            document.getElementById('result').innerHTML = \`
			<div class="mt-8 p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700">
				<h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Scanned Result</h3>
				<div class="mb-4">
					<p class="text-sm text-gray-600 dark:text-gray-400">Issuer:</p>
					<p class="font-medium text-gray-900 dark:text-white">\${keyURIObj.issuer}</p>
				</div>
				<div class="mb-4">
					<p class="text-sm text-gray-600 dark:text-gray-400">Current TOTP:</p>
					<p class="text-2xl font-bold text-blue-600 dark:text-blue-400">\${resp.code}</p>
				</div>
				<button
				id="save-token-btn"
					class="w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500" >
					Save Token
				</button>
			</div>\`;
            document.getElementById('save-token-btn').addEventListener('click', () => saveToken(keyURIObjGlobal));

        }

        function error(err) {
            // Silent error handling - prints errors to console in development only
        }

        const tabs = document.querySelectorAll('#myTab button');
        const tabContents = document.querySelectorAll('#myTabContent > div');

        tabs.forEach(tab => {
            const tabId = tab.id;
            const contentId = tabId.replace('-tab', '-content');
            const content = document.getElementById(contentId);

            tab.addEventListener('click', () => {
                // Deactivate all tabs and hide all content
                tabs.forEach(t => {
                    t.classList.remove('border-blue-500', 'text-blue-600');
                    t.classList.add('border-transparent', 'hover:text-gray-600', 'hover:border-gray-300');
                });
                tabContents.forEach(c => c.classList.add('hidden'));

                // Activate clicked tab and show its content
                tab.classList.add('border-blue-500', 'text-blue-600');
                tab.classList.remove('border-transparent', 'hover:text-gray-600', 'hover:border-gray-300');
                content.classList.remove('hidden');
            });
        });

        // Set default tab
        const defaultTab = document.getElementById('scan-tab');
        defaultTab.classList.add('border-blue-500', 'text-blue-600');
        defaultTab.classList.remove('border-transparent', 'hover:text-gray-600', 'hover:border-gray-300');
        document.getElementById('scan-content').classList.remove('hidden');


        // Add event listener for manual "Add Token" button
        document.getElementById('add-token-btn-uri').addEventListener('click', async function() {
            const manualCode = document.getElementById('manual-code').value.trim();
            
            if (!manualCode) {
                showNotification('Please enter a code', 'warning');
                return;
            }

            try {
                // Parse the manual code (should be an otpauth:// URI)
                const keyURIObj = parse(manualCode);
                
                // Call the API to add the token
                const resp = await addToken(keyURIObj);
                
                // Set the keyURIObj to the global scope
                keyURIObjGlobal = keyURIObj;

                // Remove the manual input elements
                document.getElementById('myTab').remove();
                document.getElementById('myTabContent').remove();
                
                // Also remove the scanner if it exists
                if (document.getElementById('reader')) {
                    scanner.clear();
                }

                // Show the result
                document.getElementById('result').innerHTML = \`
                <div class="mt-8 p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700">
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">URI Entry Result</h3>
                    <div class="mb-4">
                        <p class="text-sm text-gray-600 dark:text-gray-400">Issuer:</p>
                        <p class="font-medium text-gray-900 dark:text-white">\${keyURIObj.issuer}</p>
                    </div>
                    <div class="mb-4">
                        <p class="text-sm text-gray-600 dark:text-gray-400">Current TOTP:</p>
                        <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">\${resp.code}</p>
                    </div>
                    <button
                    id="save-token-btn"
                        class="w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500" >
                        Save Token
                    </button>
                </div>\`;
                document.getElementById('save-token-btn').addEventListener('click', () => saveToken(keyURIObjGlobal));
                
            } catch (error) {
                // Silent error handling - invalid code format
                showNotification('Invalid code format. Please enter a valid otpauth:// URI', 'error');
            }
        });

        document.getElementById('add-token-btn-manual').addEventListener('click', async function() {
            const issuer = document.getElementById('manual-issuer').value.trim();
            const label = document.getElementById('manual-label').value.trim();
            const secret = document.getElementById('manual-secret').value.trim();
            const period = parseInt(document.getElementById('manual-period').value);

            if (!issuer || !label || !secret) {
                showNotification('Please fill all fields', 'warning');
                return;
            }

            if (!SECRET_REGEX.test(secret)) {
                showNotification('Invalid secret format. It should be Base32 encoded.', 'error');
                return;
            }

            const keyURIObj = {
                issuer: issuer,
                label: label,
                secret: secret,
                algorithm: 'SHA1',
                digits: 6,
                period: period
            };

            const resp = await addToken(keyURIObj);
            keyURIObjGlobal = keyURIObj;

            document.getElementById('myTab').remove();
            document.getElementById('myTabContent').remove();
            if (document.getElementById('reader')) {
                scanner.clear();
            }

            document.getElementById('result').innerHTML = \`
            <div class="mt-8 p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Manual Entry Result</h3>
                <div class="mb-4">
                    <p class="text-sm text-gray-600 dark:text-gray-400">Issuer:</p>
                    <p class="font-medium text-gray-900 dark:text-white">\${keyURIObj.issuer}</p>
                </div>
                <div class="mb-4">
                    <p class="text-sm text-gray-600 dark:text-gray-400">Account:</p>
                    <p class="font-medium text-gray-900 dark:text-white">\${keyURIObj.label}</p>
                </div>
                <div class="mb-4">
                    <p class="text-sm text-gray-600 dark:text-gray-400">Period:</p>
                    <p class="font-medium text-gray-900 dark:text-white">\${keyURIObj.period} seconds</p>
                </div>
                <div class="mb-4">
                    <p class="text-sm text-gray-600 dark:text-gray-400">Current TOTP:</p>
                    <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">\${resp.code}</p>
                </div>
                <button
                id="save-token-btn"
                    class="w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500" >
                    Save Token
                </button>
            </div>\`;
            document.getElementById('save-token-btn').addEventListener('click', () => saveToken(keyURIObjGlobal));
        });

        // Dark mode toggle functionality using centralized system
        function initDarkModeToggle() {
            const darkModeToggle = document.getElementById('darkModeToggle');
            if (darkModeToggle && window.darkModeManager) {
                window.darkModeManager.registerToggle(darkModeToggle);
            }
        }
        
        // Legacy compatibility functions
        function updateDarkModeIcon() {
            if (window.darkModeManager) {
                window.darkModeManager.updateAllToggles();
            }
        }

        // Initialize dark mode toggle when page loads
        document.addEventListener('DOMContentLoaded', function() {
            initDarkModeToggle();
        });

    </script>

   		<footer class="bg-white dark:bg-gray-800 border-t dark:border-gray-700 py-4">
    		<div class="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
            SwiftAuth from <a href="https://github.com/briandyy/SwiftAuth" class="text-blue-500 hover:underline dark:text-blue-400" target="_blank">briandyy</a>
        	</div>
     	</footer>

</body>
</html>
	`;
}
