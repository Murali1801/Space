# Space - Production Deployment Guide

## Architecture Overview

Space follows the same architecture as Replo:

1. **Editor (Your Server)**: React-based visual editor hosted on your server
   - URL: `https://your-domain.com` (e.g., `https://space.app`)
   - Embedded inside Shopify Admin via iframe
   - Merchants build pages here

2. **Backend API (Your Server)**: Handles page storage, Shopify API calls
   - Same server as the editor
   - Stores page JSON in your database
   - Communicates with Shopify Admin API

3. **Renderer (Shopify Store)**: Theme App Extension installed in merchant's theme
   - Fetches page JSON from your API
   - Renders as server-side HTML (fast, no layout shift)

## Production Setup Steps

### 1. Update Shopify App Configuration

When you have your production URL (e.g., `https://space.app`), update `shopify.app.space.toml`:

```toml
client_id = "c615ebe42455811e026d0ba3d7486b86"
name = "space"
application_url = "https://space.app"  # Your production URL
embedded = true

[access_scopes]
scopes = "write_products,read_products,write_themes,read_themes,write_content,read_content"

[auth]
redirect_urls = [
  "https://space.app/api/auth/callback",
  "https://space.app/api/auth/shopify/callback"
]
```

### 2. Environment Variables (Production)

Set on your hosting platform:

```env
SHOPIFY_API_KEY=your_production_api_key
SHOPIFY_API_SECRET=your_production_api_secret
SHOPIFY_APP_URL=https://space.app
DATABASE_URL=your_database_connection_string
NODE_ENV=production
```

### 3. Database Setup

Replace in-memory storage in `app/lib/db.ts` with your production database.

### 4. Build & Deploy

```bash
npm run build
npm start
```

## Merchant Flow (Like Replo)

1. Merchant installs Space from Shopify App Store
2. Opens Space → Embedded editor loads at `https://space.app/app/editor`
3. Builds page → Drag & drop components, style them
4. Saves page → Stored in your database
5. Publishes → Page created in Shopify
6. Storefront → Theme App Extension renders the page

