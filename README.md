# SwiftAuth - Modern TOTP Authenticator

> **A self-hostable, secure, and modern two-factor authentication app built with Cloudflare Workers.**

SwiftAuth is a streamlined TOTP (Time-based One-Time Password) authenticator that you can host yourself. Built with modern web technologies and deployed on Cloudflare's global network, it provides enterprise-grade security with consumer-friendly usability.

![SwiftAuth Logo](https://img.shields.io/badge/SwiftAuth-TOTP%20Authenticator-blue?style=for-the-badge)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

### 🔐 **Security First**
- **Self-hosted**: Complete control over your data
- **End-to-end encryption**: All secrets encrypted with AES-256-GCM
- **Secure storage**: Data stored in Cloudflare D1 database
- **Hide codes**: Optional code hiding with click-to-reveal functionality
- **Invite-only registration**: Secure registration with invite codes

### 📱 **Modern User Experience**
- **Progressive Web App (PWA)**: Install on any device
- **Responsive design**: Optimized for mobile and desktop
- **Dark/Light mode**: Automatic theme switching
- **Touch-friendly**: Optimized for mobile interactions
- **Offline capable**: Works even without internet connection

### 🚀 **Core Features**
- **QR Code scanning**: Add tokens by scanning QR codes from any service
- **Manual token entry**: Add tokens manually with issuer and secret key
- **Real-time TOTP generation**: Automatic token refresh with countdown timers
- **Search functionality**: Find tokens quickly with intelligent search
- **Admin panel**: Advanced token management with secret key access
- **Copy to clipboard**: One-click copying of TOTP codes

### 🌍 **Global Performance**
- **Edge deployment**: Served from Cloudflare's global network
- **Low latency**: Sub-100ms response times worldwide
- **High availability**: 99.99% uptime SLA
- **Scalable**: Handles millions of requests

## 🚀 Quick Start

### Prerequisites
- Cloudflare account (free tier available)
- Node.js 18+ and npm/pnpm
- Basic understanding of Cloudflare Workers

### 1. Clone and Setup
```bash
git clone https://github.com/yourusername/swiftauth.git
cd swiftauth
npm install
# or
pnpm install
```

### 2. Configure Environment
```bash
# Copy the sample configuration
cp wrangler.sample.toml wrangler.toml
```

### 3. Set Environment Variables
Edit `wrangler.toml` with your configuration:

```toml
[vars]
USER_EMAIL = "your-admin@example.com"        # Admin login email
USER_PASSWORD = "your-secure-password"       # Admin login password
ENCRYPTION_KEY = "your-base64-encoded-key"   # 32-byte AES key (base64)
INVITE_CODE = "YOUR_INVITE_CODE"             # Registration invite code
```

#### Generating Encryption Key
```bash
# Generate a secure 32-byte key and encode it
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 4. Create Database
```bash
# Create D1 database
npx wrangler d1 create swiftauth-db

# Copy the database ID to wrangler.toml under [[d1_databases]]
# Then run database migrations
npx wrangler d1 execute swiftauth-db --file=./src/schemas/schema.sql
```

### 5. Deploy
```bash
# Deploy to Cloudflare Workers
npm run deploy

# Or run locally for development
npm run dev
```

## 📖 How It Works

### 🔑 **Authentication System**

SwiftAuth uses a simple but secure authentication system:

1. **Admin Access**: Login with credentials set in `wrangler.toml`
2. **Session Management**: Secure session handling with database storage
3. **Registration**: New users can register with the invite code
4. **Security**: All sessions are validated server-side

### �️ **Encryption & Security**

- **AES-256-GCM**: All TOTP secrets are encrypted before database storage
- **Secure Keys**: Encryption key is stored as environment variable
- **No Plaintext**: Secrets are never stored in plaintext
- **Isolated Storage**: Each user's data is isolated and encrypted

### 📱 **TOTP Generation Process**

1. **Secret Storage**: Encrypted secret keys stored in D1 database
2. **Real-time Generation**: TOTP codes generated client-side using Web Crypto API
3. **Time Synchronization**: Accurate time-based calculations
4. **Multiple Algorithms**: Support for SHA-1, SHA-256, SHA-512
5. **Configurable**: Custom periods (30s default) and digits (6 default)

## 🎯 Core Functionality

### 🏠 **Home Page**
- **Token Grid**: Responsive grid layout showing all your TOTP tokens
- **Live Codes**: Real-time TOTP code generation with countdown timers
- **Copy Function**: Click any code to copy to clipboard
- **Search**: Find tokens quickly with intelligent search
- **Hide Codes**: Optional code hiding with `******` display
- **Auto-refresh**: Codes automatically refresh when expired

### 📷 **Scanner Page**
- **QR Code Scanner**: Camera-based QR code scanning
- **Manual Entry**: Manual token entry with validation
- **Issuer Detection**: Automatic issuer name detection
- **Secret Validation**: Base32 secret key validation
- **Preview**: Preview token before saving

### ⚙️ **Settings Page**
- **Theme Toggle**: Switch between light and dark modes
- **Hide Codes**: Enable/disable code hiding functionality
- **Auto-lock**: Automatic session timeout settings
- **Privacy Controls**: Manage your privacy preferences

### 👑 **Admin Panel**
- **Token Management**: View, edit, and delete tokens
- **Secret Access**: View encrypted secret keys (admin only)
- **User Statistics**: Overview of token counts and activity
- **Bulk Operations**: Manage multiple tokens efficiently

## 🔧 Advanced Features

### 🎫 **Invite Code System**

Registration is protected by invite codes for security:

```toml
# Set in wrangler.toml
INVITE_CODE = "SWIFT2024"
```

- **Secure Registration**: Only users with invite code can register
- **Admin Control**: Admin sets the invite code in configuration
- **No Public Registration**: Prevents unauthorized access

### 🔒 **Hide Codes Feature**

Enhanced privacy with code hiding:

- **Toggle Setting**: Enable/disable in settings
- **Visual Hiding**: Codes show as `******` when hidden
- **Click to Reveal**: Click hidden codes to reveal temporarily
- **Auto-hide**: Codes hide again after 3 seconds
- **Copy Still Works**: Can copy codes even when hidden

### 🛠️ **Admin Features**

Advanced management capabilities:

- **Secret Key Access**: View the actual secret keys used for codes
- **Token Editing**: Modify issuer names and settings
- **Bulk Deletion**: Remove multiple tokens efficiently
- **Security Overview**: Monitor token usage and security

## 🌐 API Endpoints

### Public Endpoints
- `GET /` - Home page (requires auth)
- `GET /login` - Login page
- `POST /login` - Login authentication
- `POST /register` - User registration (requires invite code)

### Scanner & Settings
- `GET /scan` - QR code scanner page
- `GET /settings` - Settings page

### API Endpoints
- `GET /api/tokens/refresh` - Refresh all tokens
- `POST /api/token/new` - Generate new token
- `POST /api/token/save` - Save token to database
- `POST /api/token/decrypt` - Decrypt secret (admin only)

### Admin Endpoints
- `GET /admin` - Admin panel
- `DELETE /admin/token/:id` - Delete token
- `PUT /admin/token/:id` - Update token

## 🚀 Deployment Guide

### Local Development
```bash
# Start development server
npm run dev

# Access at http://localhost:8787
```

### Production Deployment
```bash
# Deploy to Cloudflare Workers
npm run deploy

# Your app will be available at:
# https://your-worker-name.your-subdomain.workers.dev
```

### Custom Domain (Optional)
```bash
# Add custom domain in Cloudflare dashboard
# Or use wrangler
npx wrangler publish --routes="auth.yourdomain.com/*"
```

## 📊 Database Schema

SwiftAuth uses a simple, efficient database schema:

```sql
-- User sessions
CREATE TABLE Sessions (
    SessionId TEXT, 
    UserEmail TEXT
);

-- Registered users
CREATE TABLE Users (
    Id INTEGER PRIMARY KEY AUTOINCREMENT, 
    Email TEXT UNIQUE, 
    Password TEXT, 
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- TOTP tokens
CREATE TABLE Tokens (
    Id INTEGER PRIMARY KEY AUTOINCREMENT, 
    Issuer TEXT, 
    TimeStep INTEGER, 
    EncryptedSecret TEXT, 
    Algorithm TEXT, 
    Digits INTEGER
);
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `USER_EMAIL` | Admin login email | `admin@example.com` |
| `USER_PASSWORD` | Admin login password | `SecurePassword123!` |
| `ENCRYPTION_KEY` | Base64 AES-256 key | `k4mTu2ep7aFDyr+ugvvOr...` |
| `INVITE_CODE` | Registration invite code | `SWIFT2024` |

### PWA Configuration

SwiftAuth is a Progressive Web App with:

- **Installable**: Can be installed on any device
- **Offline Support**: Works without internet connection
- **App-like Experience**: Full-screen, no browser UI
- **Push Notifications**: Security alerts and updates

## 🛡️ Security Considerations

### Best Practices

1. **Strong Passwords**: Use strong admin passwords
2. **Secure Keys**: Generate cryptographically secure encryption keys
3. **Regular Updates**: Keep dependencies updated
4. **Access Control**: Limit admin access and use strong invite codes
5. **HTTPS Only**: Always use HTTPS in production

### Encryption Details

- **Algorithm**: AES-256-GCM
- **Key Management**: Environment-based key storage
- **IV Generation**: Cryptographically secure random IVs
- **No Key Reuse**: Each encryption uses a unique IV

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection**: Ensure D1 database is created and bound correctly
2. **Environment Variables**: Verify all required variables are set
3. **Encryption Key**: Must be valid base64-encoded 32-byte key
4. **Scanner Issues**: Ensure HTTPS for camera access

### Debug Mode
```bash
# Run with debug logging
npm run dev -- --debug
```

## 📱 Mobile Usage

SwiftAuth is optimized for mobile devices:

- **Touch-Friendly**: Large touch targets for easy interaction
- **Responsive Design**: Adapts to all screen sizes
- **Gesture Support**: Swipe and tap gestures
- **Keyboard Shortcuts**: Ctrl/Cmd+K for search

## 🤝 Contributing

SwiftAuth is open source and welcomes contributions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Documentation**: This README
- **Issues**: Report bugs and request features
- **Cloudflare Workers**: [Official Documentation](https://developers.cloudflare.com/workers/)
- **TOTP Standard**: [RFC 6238](https://tools.ietf.org/html/rfc6238)

---

**SwiftAuth** - Secure, Fast, Self-Hosted TOTP Authentication 🚀
3. **Registration**: If enabled, use the invite code to create new accounts

### 📲 **Adding Tokens**

#### Method 1: QR Code Scanning
1. Click the **"Add Token"** button
2. Select **"Scan QR Code"** tab
3. Allow camera access
4. Point camera at the QR code
5. Review the token details
6. Click **"Save Token"**

#### Method 2: Manual Entry
1. Click the **"Add Token"** button
2. Select **"Manual Entry"** tab
3. Fill in the required fields:
   - **Issuer**: The service name (e.g., "Google", "GitHub")
   - **Account**: Your account identifier
   - **Secret**: The base32-encoded secret key
   - **Digits**: Number of digits (usually 6)
   - **Period**: Time period in seconds (usually 30)
4. Click **"Add Token"**

#### Method 3: Import from Backup
1. Go to **Settings** → **Database Management**
2. Click **"Import Database"**
3. Select your backup file
4. Review the tokens to import
5. Click **"Import"**

### 🔢 **Using Tokens**

#### Viewing Codes
- **Token codes** are displayed prominently on each token card
- **Progress bar** shows time remaining before refresh
- **Auto-refresh** generates new codes automatically

#### Copying Codes
- **Click the token code** to copy to clipboard
- **Click the copy icon** for the same action
- **Haptic feedback** confirms successful copy (mobile)

#### Searching Tokens
- Use the **search bar** at the top
- Search by **issuer name** or **account**
- **Keyboard shortcut**: `Ctrl+K` (or `Cmd+K` on Mac)

### ⚙️ **Settings & Management**

#### Theme Settings
- **Toggle dark/light mode** using the moon/sun icon
- **Automatic theme detection** based on system preferences
- **Persistent theme** saved in browser cookies

#### Database Management
- **Export tokens**: Download encrypted backup
- **Import tokens**: Upload backup file
- **View statistics**: See token count and database size

#### Security Features
- **Session management**: Automatic logout after inactivity
- **Secure storage**: All data encrypted at rest
- **No tracking**: No analytics or user tracking

### 👨‍💼 **Admin Panel**

Access the admin panel at `/admin` to:
- **View all tokens** in a table format
- **Edit token details** (issuer, account, period)
- **Delete tokens** individually
- **Bulk operations** for multiple tokens

## 🛠️ Advanced Configuration

### Custom Encryption Key
Generate a secure encryption key:
```bash
# Generate a 32-byte key and encode as base64
openssl rand -base64 32
```

### Database Customization
Modify `src/schemas/schema.sql` to add custom fields:
```sql
-- Add custom columns to tokens table
ALTER TABLE Tokens ADD COLUMN notes TEXT;
ALTER TABLE Tokens ADD COLUMN category TEXT;
```

### Custom Themes
Add custom CSS in the `style.textContent` sections:
```css
/* Custom brand colors */
:root {
  --primary-color: #your-brand-color;
  --secondary-color: #your-secondary-color;
}
```

## 🔧 API Reference

### Token Management
```javascript
// Get all tokens
GET /api/tokens/refresh

// Add new token
POST /api/token/new
{
  "issuer": "Google",
  "secret": "BASE32SECRET",
  "digits": 6,
  "period": 30
}

// Save token
POST /api/token/save
{
  "id": "token-id",
  "issuer": "Google",
  "secret": "encrypted-secret"
}
```

### Database Operations
```javascript
// Export database
GET /api/db/dump

// Admin token operations
DELETE /admin/token/:id
PUT /admin/token/:id
```

## 🔒 Security Considerations

### Data Encryption
- **AES-256-GCM encryption** for all secrets
- **Unique initialization vectors** for each encryption
- **Base64 encoding** for safe storage and transport

### Access Control
- **Session-based authentication** with secure cookies
- **Admin role separation** for privileged operations
- **CSRF protection** via same-origin policy

### Infrastructure Security
- **Cloudflare's security features** (DDoS protection, WAF)
- **HTTPS everywhere** with automatic certificate management
- **Edge-side processing** reduces attack surface

## 📊 Performance Optimization

### Caching Strategy
- **Static assets** cached at CDN edge
- **Database queries** optimized for performance
- **Token generation** cached for 30-second periods

### Mobile Optimization
- **Responsive design** adapts to screen sizes
- **Touch-friendly interfaces** with 44px minimum targets
- **Efficient JavaScript** with lazy loading

### Network Efficiency
- **Minimal payload sizes** with compressed assets
- **Efficient API calls** with request batching
- **Offline capability** with service worker caching

## 🚨 Troubleshooting

### Common Issues

#### "Failed to add token"
- Check if the secret is valid base32
- Verify the QR code is not damaged
- Ensure camera permissions are granted

#### "Database connection failed"
- Verify D1 database configuration
- Check wrangler.toml database ID
- Run database migrations

#### "Encryption key invalid"
- Generate a new 32-byte base64 key
- Update wrangler.toml with the new key
- Redeploy the application

#### "Session expired"
- Clear browser cookies
- Login again with correct credentials
- Check if USER_EMAIL and USER_PASSWORD are correct

### Performance Issues
- **Slow loading**: Check Cloudflare edge locations
- **Token delays**: Verify system time synchronization
- **Database errors**: Monitor D1 usage limits

## 🔄 Migration Guide

### From Google Authenticator
1. **Enable export** in Google Authenticator
2. **Scan QR codes** shown in the export
3. **Use SwiftAuth** to scan the export QR codes
4. **Verify tokens** are working correctly

### From Other Authenticators
1. **Export backup** from your current app
2. **Use manual entry** for each token
3. **Get secrets** from your service providers
4. **Test each token** before removing from old app


### Development Setup
```bash
git clone https://github.com/yourusername/swiftauth.git
cd swiftauth
npm install
npm run dev
```

### Code Style
- **ES6+ JavaScript** with modern syntax
- **Tailwind CSS** for styling
- **Semantic HTML** for accessibility
- **Progressive enhancement** approach

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **RFC 6238** - TOTP algorithm specification
- **Cloudflare Workers** - Serverless platform
- **Tailwind CSS** - Utility-first CSS framework
- **HTML5 QR Code** - QR code scanning library

## 📞 Support

- **Documentation**: Check this README first
- **Issues**: Report bugs on [GitHub Issues](https://github.com/briandyy/swiftauth/issues)
- **Security**: Report vulnerabilities privately
- **Community**: Join our [Discord](https://discord.gg/Sk8KQy5n2U)

## References:

1. Google Authenticator wiki: https://github.com/google/google-authenticator/wiki/Key-Uri-Format
2. RFC 6238: https://datatracker.ietf.org/doc/html/rfc6238
3. EdgeAuth: https://github.com/alanJames00/EdgeAuth

---

<div align="center">
  <strong>Built with ❤️ for the security-conscious community</strong>
  <br>
  <br>
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-how-to-use">How to Use</a> •
  <a href="#-advanced-configuration">Configuration</a> •
  <a href="#-security-considerations">Security</a>
</div>
