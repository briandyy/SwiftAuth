import { Hono } from 'hono';
import { createMiddleware } from 'hono/factory';
import { getCookie, getSignedCookie, setCookie, setSignedCookie, deleteCookie } from 'hono/cookie';
import renderHomepage from './views/home';
import renderLoginPage from './views/login';
import renderScannerPage from './views/scanner';
import renderSettingsPage from './views/settings';
import renderAdminPage from './views/admin';
import generateTotp from './utils/generateTotp';
import { encrypt, decrypt } from './utils/storeKey';

const app = new Hono();

// Serve static files for PWA directly as endpoints
app.get('/manifest.json', (c) => {
	const manifest = {
		"name": "SwiftAuth - TOTP Authenticator",
		"short_name": "SwiftAuth",
		"description": "Secure TOTP 2FA authenticator with advanced features",
		"start_url": "/",
		"display": "standalone",
		"background_color": "#ffffff",
		"theme_color": "#3b82f6",
		"orientation": "portrait-primary",
		"categories": ["security", "utilities", "productivity"],
		"lang": "en",
		"dir": "ltr",
		"scope": "/",
		"icons": [
			{
				"src": "/icons/icon-192x192.png",
				"sizes": "192x192",
				"type": "image/png",
				"purpose": "any maskable"
			}
		],
		"prefer_related_applications": false,
		"related_applications": []
	};
	return c.json(manifest);
});

app.get('/sw.js', (c) => {
	const swContent = `
// Service Worker for SwiftAuth PWA
const CACHE_NAME = 'swiftauth-v1.0.0';
const urlsToCache = [
  '/',
  '/login',
  '/scanner',
  '/settings',
  '/src/utils/darkMode.js',
  'https://cdn.tailwindcss.com'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
`;
	return new Response(swContent, {
		headers: {
			'Content-Type': 'application/javascript',
		},
	});
});

// Serve a simple icon placeholder
app.get('/icons/:filename', (c) => {
	// Return a simple SVG icon as placeholder
	const svgIcon = `<svg width="192" height="192" xmlns="http://www.w3.org/2000/svg">
		<rect width="192" height="192" fill="#3b82f6"/>
		<text x="96" y="110" font-family="Arial" font-size="24" fill="white" text-anchor="middle">SwiftAuth</text>
	</svg>`;
	
	return new Response(svgIcon, {
		headers: {
			'Content-Type': 'image/svg+xml',
		},
	});
});

// session authentication middleware

const authWare = createMiddleware(async (c, next) => {
	const session = await getCookie(c, 'session');

	if (!session) {
		return c.redirect('/login');
	}
	const { results: serverSession } = await c.env.DB.prepare(`SELECT * FROM Sessions WHERE SessionId = ? AND UserEmail = ?`)
		.bind(session, c.env.USER_EMAIL)
		.all();
	if (serverSession.length === 0) {
		// session not found in session store
		return c.redirect('/login');
	}
	if (serverSession[0].SessionId !== session) {
		// session not found in session store
		return c.redirect('/login');
	}

	await next();
});

// Admin authentication middleware (requires the same login credentials)
const adminWare = createMiddleware(async (c, next) => {
	const session = await getCookie(c, 'session');

	if (!session) {
		return c.redirect('/login');
	}
	const { results: serverSession } = await c.env.DB.prepare(`SELECT * FROM Sessions WHERE SessionId = ? AND UserEmail = ?`)
		.bind(session, c.env.USER_EMAIL)
		.all();
	if (serverSession.length === 0) {
		return c.redirect('/login');
	}
	if (serverSession[0].SessionId !== session) {
		return c.redirect('/login');
	}

	await next();
});

app.use('/', authWare);
app.use('/scan', authWare);
app.use('/settings', authWare);
app.use('/api/token/new', authWare);
app.use('/api/token/save', authWare);
app.use('/api/token/decrypt', authWare);
app.use('/api/tokens/refresh', authWare);
app.use('/api/db/dump', authWare);
app.use('/admin', adminWare);
app.use('/admin/*', adminWare);
app.use('/logout', authWare);

app.get('/', async (c) => {
	// get all the tokens from the database
	const { results: tokens } = await c.env.DB.prepare(`SELECT * FROM Tokens`).all();

	// iterate over the tokens and generate the totp
	let results = [];
	for (let token of tokens) {
		const secret = await decrypt({
			base64Combined: token.EncryptedSecret,
			key: c.env.ENCRYPTION_KEY,
		});

		// generate totp
		const otp = await generateTotp({
			algorithm: token.Algorithm,
			digits: token.Digits,
			period: token.TimeStep,
			secret,
		});

		// calculate remaining time for this period
		const now = Math.floor(Date.now() / 1000);
		const timeStep = now % token.TimeStep;
		const remainingTime = token.TimeStep - timeStep;

		results.push({
			id: token.Id,
			issuer: token.Issuer,
            label: token.Label,
			otp,
			timeStep: remainingTime,
			period: token.TimeStep,
		});
	}

	return c.render(renderHomepage({ tokens: results }));
});

app.get('/login', (c) => {
	const mode = c.req.query('mode') || 'login';
	return c.render(renderLoginPage({ wrongCred: false, mode }));
});

app.post('/login', async (c) => {
	const { email, password } = await c.req.parseBody();
	// authenticate user
	const isMatched = email === c.env.USER_EMAIL && password === c.env.USER_PASSWORD;
	// if successful, create a session

	if (isMatched) {
		const session = await crypto.randomUUID();

		// insert to sessions table
		const { result } = await c.env.DB.prepare(`UPDATE Sessions SET SessionId = ? WHERE UserEmail = ?`).bind(session, email).all();

		await setCookie(c, 'session', session, { httpOnly: true, maxAge: 60 * 10 });
		return c.redirect('/');
	} else {
		return c.render(renderLoginPage({ wrongCred: true }));
	}
});

app.post('/logout', async (c) => {
    // delete the session cookie
    await deleteCookie(c, 'session');
    return c.render(renderLoginPage({ wrongCred: true }));
});

app.post('/register', async (c) => {
	const { email, password, inviteCode } = await c.req.parseBody();
	
	// Check invite code
	if (inviteCode !== c.env.INVITE_CODE) {
		return c.render(renderLoginPage({ 
			mode: 'register', 
			error: 'Invalid invite code. Please check your invite code and try again.' 
		}));
	}

	// Check if user already exists (using the configured email)
	if (email === c.env.USER_EMAIL) {
		return c.render(renderLoginPage({ 
			mode: 'register', 
			error: 'An account with this email already exists. Please login instead.' 
		}));
	}

	// For this simple implementation, we only allow one user (the configured one)
	// In a real app, you'd store the new user in a Users table
	return c.render(renderLoginPage({ 
		mode: 'register', 
		error: 'Registration is currently limited. Please use the configured account to login.' 
	}));
});

app.get('/scan', async (c) => {
	return c.render(renderScannerPage());
});

app.get('/settings', async (c) => {
	return c.render(renderSettingsPage());
});

// API endpoint to refresh all tokens
app.get('/api/tokens/refresh', async (c) => {
	try {
		const { results: tokens } = await c.env.DB.prepare(`SELECT * FROM Tokens`).all();

		let results = [];
		for (let token of tokens) {
			const secret = await decrypt({
				base64Combined: token.EncryptedSecret,
				key: c.env.ENCRYPTION_KEY,
			});

			const otp = await generateTotp({
				algorithm: token.Algorithm,
				digits: token.Digits,
				period: token.TimeStep,
				secret,
			});

			const now = Math.floor(Date.now() / 1000);
			const timeStep = now % token.TimeStep;
			const remainingTime = token.TimeStep - timeStep;

			results.push({
				id: token.Id,
				issuer: token.Issuer,
				otp,
				timeStep: remainingTime,
				period: token.TimeStep,
			});
		}

		return c.json({ tokens: results });
	} catch (error) {
		return c.json({ error: 'Failed to refresh tokens' }, 500);
	}
});

// generate a totp token before storing it
app.post('/api/token/new', async (c) => {
	const { algorithm, digits, issuer, label, secret, period } = await c.req.json();

	const otp = await generateTotp({
		algorithm,
		digits,
		period,
		secret,
	});

	// calculate the code and show the code in the user
	return c.json({
		code: otp,
	});
});

// save the token to the database
app.post('/api/token/save', async (c) => {
	const { algorithm, digits, issuer, label, secret, period } = await c.req.json();

	// encrypt the secret
	const encryptedSecret = await encrypt({
		data: secret,
		keyB64: c.env.ENCRYPTION_KEY,
	});

	// check if the issuer already exist in the database, then update the token
	const { results: issuerExists } = await c.env.DB.prepare(`SELECT * FROM Tokens WHERE Issuer = ? AND Label = ?`).bind(issuer, label).all();
	if (issuerExists.length > 0) {
		const { result } = await c.env.DB.prepare(
			`UPDATE Tokens SET TimeStep = ?, EncryptedSecret = ?, Algorithm = ?, Digits = ? WHERE Issuer = ? AND Label = ?`,
		)
			.bind(period, encryptedSecret, algorithm, digits, issuer, label)
			.all();
		return c.json({
			info: 'Issuer and Account combo already exists, updated the token.',
		});
	}

	// insert the token to the database
	const { result } = await c.env.DB.prepare(
		`INSERT INTO Tokens (Issuer, Label, TimeStep, EncryptedSecret, Algorithm, Digits) VALUES (?, ?, ?, ?, ?, ?)`,
	)
		.bind(issuer, label, period, encryptedSecret, algorithm, digits)
		.all();
	return c.json({
		info: 'Token saved successfully.',
	});
});

// decrypt encrypted secret for admin panel
app.post('/api/token/decrypt', async (c) => {
	try {
		const { encryptedSecret } = await c.req.json();
		const decryptedSecret = await decrypt({ base64Combined: encryptedSecret, key: c.env.ENCRYPTION_KEY });
		return c.json({ secret: decryptedSecret });
	} catch (error) {
		return c.json({ error: 'Failed to decrypt secret' }, 500);
	}
});

// creates a dump of current tokens table
app.get('/api/db/dump', async (c) => {
	try {
		// fetch all rows from the table
		const { results } = await c.env.DB.prepare(`SELECT * FROM Tokens`).all();

		const jsonString = JSON.stringify(results, null, 2);

		const file = new Blob([jsonString], { type: 'application/json' });

		return new Response(file, {
			headers: {
				'Content-Type': 'application/json',
				'Content-Disposition': 'attachment; filename="tokens-dump.json"', // Forces download as a file
			},
		});
	} catch (e) {
		return c.json({
			err: e.message,
		});
	}
});

// Admin routes
app.get('/admin', async (c) => {
	const { results: tokens } = await c.env.DB.prepare(`SELECT * FROM Tokens`).all();
	return c.render(renderAdminPage({ tokens }));
});

// Admin API - Delete token
app.delete('/admin/token/:id', async (c) => {
	const id = c.req.param('id');
	try {
		await c.env.DB.prepare(`DELETE FROM Tokens WHERE Id = ?`).bind(id).run();
		return c.json({ success: true });
	} catch (error) {
		return c.json({ error: 'Failed to delete token' }, 500);
	}
});

// Admin API - Update token
app.put('/admin/token/:id', async (c) => {
	const id = c.req.param('id');
	const { issuer, secret } = await c.req.json();
	
	try {
		// Encrypt the new secret
		const encryptedSecret = await encrypt({
			data: secret,
			keyB64: c.env.ENCRYPTION_KEY,
		});

		await c.env.DB.prepare(
			`UPDATE Tokens SET Issuer = ?, EncryptedSecret = ? WHERE Id = ?`
		).bind(issuer, encryptedSecret, id).run();

		return c.json({ success: true });
	} catch (error) {
		return c.json({ error: 'Failed to update token' }, 500);
	}
});

// Serve dark mode utility
app.get('/src/utils/darkMode.js', (c) => {
	const darkModeScript = `
// Dark Mode Utility for SwiftAuth
// Provides synchronized dark/light mode transitions across all elements

class DarkModeManager {
    constructor() {
        this.listeners = new Set();
        this.transitionDuration = 300; // ms
        this.isTransitioning = false;
        
        // Initialize on construction
        this.init();
    }
    
    init() {
        // Apply saved theme immediately without transition to prevent flashing
        this.applySavedTheme(false);
        
        // Add global transition styles after a brief delay
        setTimeout(() => {
            this.addGlobalTransitionStyles();
        }, 50);
        
        // Listen for system theme changes
        this.setupSystemThemeListener();
        
        // Listen for messages from other windows/tabs
        this.setupCrossTabSync();
    }
    
    applySavedTheme(withTransition = true) {
        const savedTheme = this.getSavedTheme();
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldBeDark = savedTheme === 'dark' || (savedTheme === 'system' && systemPrefersDark);
        
        if (withTransition && !this.isTransitioning) {
            this.setTheme(shouldBeDark ? 'dark' : 'light');
        } else {
            // Apply immediately without transition
            if (shouldBeDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }
    
    addGlobalTransitionStyles() {
        if (document.getElementById('dark-mode-transitions')) return;
        
        const style = document.createElement('style');
        style.id = 'dark-mode-transitions';
        style.textContent = \`
            /* Dark mode transitions for all elements */
            *,
            *::before,
            *::after {
                transition-property: background-color, border-color, color, fill, stroke, box-shadow;
                transition-duration: \${this.transitionDuration}ms;
                transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            /* Faster transitions for interactive elements */
            button,
            input,
            select,
            textarea,
            [role="button"],
            .btn {
                transition-duration: 200ms;
            }
            
            /* Preserve specific animations */
            .animate-spin,
            .animate-ping,
            .animate-pulse,
            .animate-bounce,
            [class*="animate-"] {
                transition: none !important;
            }
            
            /* Enhanced transitions for common elements */
            .bg-white,
            .bg-gray-50,
            .bg-gray-100,
            .bg-gray-200,
            .bg-gray-300,
            .bg-gray-400,
            .bg-gray-500,
            .bg-gray-600,
            .bg-gray-700,
            .bg-gray-800,
            .bg-gray-900,
            .dark\\\\:bg-gray-800,
            .dark\\\\:bg-gray-900,
            .dark\\\\:bg-gray-700 {
                transition-property: background-color, border-color, box-shadow;
                transition-duration: \${this.transitionDuration}ms;
            }
            
            /* Text color transitions */
            .text-gray-300,
            .text-gray-400,
            .text-gray-500,
            .text-gray-600,
            .text-gray-700,
            .text-gray-800,
            .text-gray-900,
            .dark\\\\:text-white,
            .dark\\\\:text-gray-300,
            .dark\\\\:text-gray-400 {
                transition-property: color;
                transition-duration: \${this.transitionDuration}ms;
            }
            
            /* Border transitions */
            .border-gray-200,
            .border-gray-300,
            .border-gray-400,
            .border-gray-500,
            .border-gray-600,
            .border-gray-700,
            .dark\\\\:border-gray-600,
            .dark\\\\:border-gray-700 {
                transition-property: border-color;
                transition-duration: \${this.transitionDuration}ms;
            }
            
            /* Special handling for progress bars and animations */
            .timer-bar,
            .progress-bar {
                transition-property: width, background-color !important;
                transition-duration: 900ms, \${this.transitionDuration}ms !important;
            }
            
            /* Smooth transitions for modals and overlays */
            .modal,
            .overlay,
            .backdrop-blur-lg {
                transition-property: background-color, backdrop-filter, opacity;
                transition-duration: \${this.transitionDuration}ms;
            }
        \`;
        document.head.appendChild(style);
    }
    
    setTheme(theme) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        const isDark = theme === 'dark';
        
        // Update DOM
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        // Save preference
        this.saveTheme(theme);
        
        // Update meta theme-color for mobile browsers
        this.updateMetaThemeColor(isDark);
        
        // Update all registered dark mode toggles
        this.updateAllToggles();
        
        // Notify listeners
        this.notifyListeners(theme);
        
        // Sync across tabs
        this.syncAcrossTabs(theme);
        
        // Reset transition flag
        setTimeout(() => {
            this.isTransitioning = false;
        }, this.transitionDuration);
    }
    
    toggle() {
        const currentTheme = this.getCurrentTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
    
    getCurrentTheme() {
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    
    getSavedTheme() {
        // Check cookie first
        const cookieTheme = this.getCookie('darkMode');
        if (cookieTheme === 'true') return 'dark';
        if (cookieTheme === 'false') return 'light';
        
        // Check localStorage
        const localTheme = localStorage.getItem('theme');
        if (localTheme) return localTheme;
        
        // Default to system preference
        return 'system';
    }
    
    saveTheme(theme) {
        // Save to cookie for server-side rendering
        this.setCookie('darkMode', theme === 'dark');
        
        // Save to localStorage for client-side preference
        localStorage.setItem('theme', theme);
    }
    
    updateMetaThemeColor(isDark) {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', isDark ? '#1f2937' : '#ffffff');
        }
    }
    
    registerToggle(toggleElement) {
        if (!toggleElement) return;
        
        toggleElement.addEventListener('click', () => {
            this.toggle();
        });
        
        // Update initial state
        this.updateToggleIcon(toggleElement);
    }
    
    updateAllToggles() {
        // Find all dark mode toggles and update them
        const toggles = document.querySelectorAll('#darkModeToggle, [data-dark-mode-toggle]');
        toggles.forEach(toggle => this.updateToggleIcon(toggle));
    }
    
    updateToggleIcon(toggleElement) {
        if (!toggleElement) return;
        
        const icon = toggleElement.querySelector('svg path');
        const isDark = this.getCurrentTheme() === 'dark';
        
        if (icon) {
            if (isDark) {
                // Sun icon (switch to light mode)
                icon.setAttribute('d', 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z');
            } else {
                // Moon icon (switch to dark mode)
                icon.setAttribute('d', 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z');
            }
        }
    }
    
    addListener(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }
    
    notifyListeners(theme) {
        this.listeners.forEach(callback => {
            try {
                callback(theme);
            } catch (error) {
                console.warn('Dark mode listener error:', error);
            }
        });
    }
    
    setupSystemThemeListener() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addListener((e) => {
            if (this.getSavedTheme() === 'system') {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    setupCrossTabSync() {
        // Listen for storage changes from other tabs
        window.addEventListener('storage', (e) => {
            if (e.key === 'theme') {
                this.applySavedTheme(true);
            }
        });
        
        // Listen for messages from other windows
        window.addEventListener('message', (e) => {
            if (e.data && e.data.type === 'themeChanged') {
                this.applySavedTheme(true);
            }
        });
    }
    
    syncAcrossTabs(theme) {
        // Dispatch storage event for same-domain tabs
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'theme',
            newValue: theme
        }));
        
        // Post message for cross-origin communication
        if (window.parent !== window) {
            window.parent.postMessage({
                type: 'themeChanged',
                theme: theme
            }, '*');
        }
    }
    
    // Utility methods
    setCookie(name, value, days = 365) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = \`\${name}=\${value};expires=\${expires.toUTCString()};path=/;SameSite=Strict\`;
    }
    
    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    // Enhanced functionality
    preloadTheme() {
        // Preload theme before page render to prevent flash
        const savedTheme = this.getSavedTheme();
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldBeDark = savedTheme === 'dark' || (savedTheme === 'system' && systemPrefersDark);
        
        if (shouldBeDark) {
            document.documentElement.classList.add('dark');
        }
    }
    
    // Animation helpers
    async animateThemeChange() {
        if (this.isTransitioning) return;
        
        // Add a subtle animation during theme change
        document.body.style.transition = \`opacity \${this.transitionDuration / 2}ms ease\`;
        document.body.style.opacity = '0.95';
        
        setTimeout(() => {
            document.body.style.opacity = '';
            document.body.style.transition = '';
        }, this.transitionDuration / 2);
    }
}

// Create global instance
const darkModeManager = new DarkModeManager();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = darkModeManager;
}

// Global access
window.darkModeManager = darkModeManager;

// Legacy compatibility functions
window.initDarkMode = () => darkModeManager.applySavedTheme(false);
window.initDarkModeToggle = () => {
    const toggle = document.getElementById('darkModeToggle');
    if (toggle) {
        darkModeManager.registerToggle(toggle);
    }
};
window.updateDarkModeIcon = () => darkModeManager.updateAllToggles();
	`;
	
	return new Response(darkModeScript, {
		headers: {
			'Content-Type': 'application/javascript',
			'Cache-Control': 'public, max-age=3600'
		}
	});
});

export default app;
