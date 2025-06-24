// Dark Mode System Tests
// This file tests the dark mode functionality

describe('Dark Mode Manager', () => {
    let darkModeManager;
    
    beforeEach(() => {
        // Reset DOM
        document.documentElement.className = '';
        localStorage.clear();
        document.cookie = '';
        
        // Create fresh instance
        darkModeManager = new DarkModeManager();
    });
    
    test('should initialize with system preference', () => {
        // Mock system preference for dark mode
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: query === '(prefers-color-scheme: dark)',
                media: query,
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
        
        darkModeManager.preloadTheme();
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
    
    test('should toggle between light and dark modes', () => {
        expect(document.documentElement.classList.contains('dark')).toBe(false);
        
        darkModeManager.toggle();
        expect(document.documentElement.classList.contains('dark')).toBe(true);
        
        darkModeManager.toggle();
        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
    
    test('should save theme preference', () => {
        darkModeManager.setTheme('dark');
        
        expect(localStorage.getItem('theme')).toBe('dark');
        expect(document.cookie).toContain('darkMode=true');
    });
    
    test('should update toggle icons', () => {
        // Create mock toggle element
        const toggle = document.createElement('button');
        toggle.id = 'darkModeToggle';
        toggle.innerHTML = '<svg><path d="initial"></path></svg>';
        document.body.appendChild(toggle);
        
        darkModeManager.registerToggle(toggle);
        
        // Test light mode icon
        darkModeManager.setTheme('light');
        const lightIcon = toggle.querySelector('path');
        expect(lightIcon.getAttribute('d')).toContain('M20.354');
        
        // Test dark mode icon
        darkModeManager.setTheme('dark');
        const darkIcon = toggle.querySelector('path');
        expect(darkIcon.getAttribute('d')).toContain('M12 3v1m0 16v1');
        
        document.body.removeChild(toggle);
    });
    
    test('should apply global transition styles', () => {
        darkModeManager.addGlobalTransitionStyles();
        
        const styleElement = document.getElementById('dark-mode-transitions');
        expect(styleElement).toBeTruthy();
        expect(styleElement.textContent).toContain('transition-property');
    });
    
    test('should handle theme listeners', () => {
        const mockListener = jest.fn();
        const removeListener = darkModeManager.addListener(mockListener);
        
        darkModeManager.setTheme('dark');
        expect(mockListener).toHaveBeenCalledWith('dark');
        
        removeListener();
        darkModeManager.setTheme('light');
        expect(mockListener).toHaveBeenCalledTimes(1);
    });
    
    test('should prevent theme flashing', () => {
        // Set dark mode in storage
        localStorage.setItem('theme', 'dark');
        
        // Create new manager instance
        const newManager = new DarkModeManager();
        
        // Should immediately apply dark mode without transition
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
    
    test('should sync across tabs', () => {
        const mockEvent = new StorageEvent('storage', {
            key: 'theme',
            newValue: 'dark'
        });
        
        // Simulate storage event from another tab
        window.dispatchEvent(mockEvent);
        
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
    
    test('should update meta theme color', () => {
        // Create meta theme-color element
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = '#ffffff';
        document.head.appendChild(meta);
        
        darkModeManager.setTheme('dark');
        expect(meta.getAttribute('content')).toBe('#1f2937');
        
        darkModeManager.setTheme('light');
        expect(meta.getAttribute('content')).toBe('#ffffff');
        
        document.head.removeChild(meta);
    });
});

// Integration Tests
describe('Dark Mode Integration', () => {
    test('should work with all view files', () => {
        // Test that all view files can access the dark mode manager
        expect(window.darkModeManager).toBeDefined();
        expect(typeof window.darkModeManager.toggle).toBe('function');
        expect(typeof window.darkModeManager.setTheme).toBe('function');
        expect(typeof window.darkModeManager.registerToggle).toBe('function');
    });
    
    test('should maintain backward compatibility', () => {
        // Legacy functions should still work
        expect(typeof window.initDarkMode).toBe('function');
        expect(typeof window.initDarkModeToggle).toBe('function');
        expect(typeof window.updateDarkModeIcon).toBe('function');
    });
    
    test('should handle multiple toggles', () => {
        const toggle1 = document.createElement('button');
        const toggle2 = document.createElement('button');
        
        toggle1.innerHTML = '<svg><path></path></svg>';
        toggle2.innerHTML = '<svg><path></path></svg>';
        
        document.body.appendChild(toggle1);
        document.body.appendChild(toggle2);
        
        darkModeManager.registerToggle(toggle1);
        darkModeManager.registerToggle(toggle2);
        
        // Both toggles should work
        toggle1.click();
        expect(document.documentElement.classList.contains('dark')).toBe(true);
        
        toggle2.click();
        expect(document.documentElement.classList.contains('dark')).toBe(false);
        
        document.body.removeChild(toggle1);
        document.body.removeChild(toggle2);
    });
});

// Performance Tests
describe('Dark Mode Performance', () => {
    test('should toggle themes quickly', () => {
        const start = performance.now();
        
        for (let i = 0; i < 100; i++) {
            darkModeManager.toggle();
        }
        
        const end = performance.now();
        const duration = end - start;
        
        // Should complete 100 toggles in less than 100ms
        expect(duration).toBeLessThan(100);
    });
    
    test('should not leak memory', () => {
        const initialListeners = darkModeManager.listeners.size;
        
        // Add and remove many listeners
        const removeCallbacks = [];
        for (let i = 0; i < 100; i++) {
            const callback = () => {};
            const remove = darkModeManager.addListener(callback);
            removeCallbacks.push(remove);
        }
        
        // Remove all listeners
        removeCallbacks.forEach(remove => remove());
        
        expect(darkModeManager.listeners.size).toBe(initialListeners);
    });
});

// Export for use in other test files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DarkModeManager
    };
}
