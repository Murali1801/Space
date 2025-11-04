# How to Run Space - Step-by-Step Guide

## Prerequisites

Before running the app, make sure you have:

1. **Node.js** (v18 or higher)
   ```bash
   node --version  # Should show v18.x or higher
   ```

2. **npm** or **yarn**
   ```bash
   npm --version
   ```

3. **Shopify CLI** (v3.55.1 or higher)
   ```bash
   npm install -g @shopify/cli @shopify/theme
   ```

4. **A Shopify Partner Account** (free at https://partners.shopify.com)
   - You'll need this to create a development store

5. **A Shopify Development Store** (free)
   - Create one at https://partners.shopify.com

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React, Remix, and Shopify dependencies
- dnd-kit for drag & drop
- Zustand for state management
- And all other dependencies

## Step 2: Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

Then edit `.env` and add your values (you'll get these in Step 3):

```env
SHOPIFY_API_KEY=your_api_key_here
SHOPIFY_API_SECRET=your_api_secret_here
SCOPES=write_products,read_products,write_themes,read_themes,write_content,read_content
SHOPIFY_APP_URL=https://your-app-url.ngrok.io

# Database (choose one)
# For development, you can skip this - it uses in-memory storage
DATABASE_URL=postgresql://user:password@localhost:5432/space

# App Environment
NODE_ENV=development
```

## Step 3: Create a Shopify App

### Option A: Using Shopify CLI (Recommended)

The easiest way is to let Shopify CLI create the app for you:

```bash
shopify app generate
```

This will:
- Create a new app in your Partner account
- Generate API credentials
- Update `shopify.app.toml` automatically
- Set up OAuth redirects

### Option B: Manual Setup

1. Go to https://partners.shopify.com
2. Navigate to **Apps** → **Create app**
3. Choose **Custom app**
4. Name it "Space" (or any name you prefer)
5. Copy the **API Key** and **API Secret** to your `.env` file
6. Set the **App URL** (you'll get this from ngrok in Step 4)

## Step 4: Set Up Local Development Tunnel

For local development, you need a public URL. Shopify CLI can handle this automatically, but if you need manual setup:

### Using ngrok (Alternative)

```bash
# Install ngrok
npm install -g ngrok

# Start ngrok tunnel
ngrok http 3000
```

Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`) and:
- Add it to `.env` as `SHOPIFY_APP_URL`
- Update `shopify.app.toml` with the URL

## Step 5: Update shopify.app.toml

Edit `shopify.app.toml`:

```toml
name = "space"
client_id = "YOUR_CLIENT_ID"  # From Shopify Partner Dashboard
application_url = "https://YOUR_APP_URL"  # Your ngrok URL or Shopify CLI URL
embedded = true

[access_scopes]
scopes = "write_products,read_products,write_themes,read_themes,write_content,read_content"

[auth]
redirect_urls = [
  "https://YOUR_APP_URL/auth/callback",
  "https://YOUR_APP_URL/auth/shopify/callback",
  "https://YOUR_APP_URL/api/auth/callback"
]

[build]
automatically_update_urls_on_dev = true
dev_store_url = "YOUR_DEV_STORE.myshopify.com"  # Your development store URL
include_config_on_deploy = true
```

## Step 6: Run the Development Server

```bash
npm run dev
```

This will:
- Start the Remix development server
- Automatically set up a tunnel (if using Shopify CLI)
- Open your browser to the app installation page
- Install the app on your development store

## Step 7: Access the App

Once the server is running:

1. **Install the app** on your development store (if prompted)
2. **Navigate to the editor**: The app should open automatically, or go to:
   - `http://localhost:3000/app/editor` (if running locally)
   - Or use the URL provided by Shopify CLI

3. **Start building**: You should see the Space editor interface with:
   - Component Library (left panel)
   - Canvas (center)
   - Layers Panel (right)
   - Style Inspector (right)

## Troubleshooting

### Issue: "Cannot find module" errors

**Solution**: Make sure all dependencies are installed:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Shopify authentication fails

**Solution**: 
- Check that `SHOPIFY_API_KEY` and `SHOPIFY_API_SECRET` are correct in `.env`
- Verify the `application_url` in `shopify.app.toml` matches your tunnel URL
- Make sure redirect URLs are properly configured

### Issue: Port already in use

**Solution**: 
```bash
# Use a different port
PORT=3001 npm run dev
```

### Issue: Database connection errors

**Solution**: 
- For development, the app uses in-memory storage by default
- Database is only needed for production
- If you want to use a database, set up PostgreSQL/Firestore and update `app/lib/db.ts`

### Issue: TypeScript errors

**Solution**:
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

## Common Commands

```bash
# Development
npm run dev          # Start development server

# Build
npm run build        # Build for production

# Deploy
npm run deploy       # Deploy to Shopify

# Linting
npm run lint         # Check code style

# Testing
npm test             # Run tests
```

## Development Workflow

1. **Make changes** to code in `app/` directory
2. **Hot reload** - Changes should reflect automatically
3. **Test in editor** - Use the visual editor to test components
4. **Save drafts** - Use the Save button to persist changes
5. **Publish** - Use Publish button to create a Shopify page

## Next Steps

After successfully running the app:

1. ✅ Test the drag & drop functionality
2. ✅ Try adding components to the canvas
3. ✅ Test the style inspector
4. ✅ Try publishing a page
5. ✅ Install the Theme App Extension in your store theme

## Additional Resources

- [Shopify CLI Documentation](https://shopify.dev/docs/apps/tools/cli)
- [Remix Documentation](https://remix.run/docs)
- [Shopify App Development](https://shopify.dev/docs/apps)

## Need Help?

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure Shopify CLI is up to date: `npm update -g @shopify/cli`
4. Check Shopify Partner Dashboard for app status

