# How to Create a Shopify App in Partner Dashboard

## Step-by-Step Guide

### Step 1: Access the Dashboard

1. Go to: https://dev.shopify.com/dashboard/190532629/apps/new
   - Or navigate to: https://partners.shopify.com → **Apps** → **Create app**

### Step 2: Choose App Type

You'll see options to create:
- **Custom app** ← Choose this one
- **Public app** (for App Store)
- **App extension** (for existing apps)

Select **"Custom app"** for your Space page builder.

### Step 3: Configure Your App

Fill in the app details:

1. **App Name**: `Space` (or your preferred name)
2. **App URL**: 
   - For development: Use `https://shopify.dev/apps/default-app-home` temporarily
   - For production: `https://your-app.vercel.app` (your Vercel URL)
3. **Allowed redirection URL(s)**: 
   ```
   https://your-app.vercel.app/api/auth/callback
   https://your-app.vercel.app/api/auth/shopify/callback
   ```
   (Replace with your actual Vercel URL)

### Step 4: Set Up API Scopes

After creating the app, go to **"Configuration"** → **"API scopes"** and add:

```
write_products
read_products
write_themes
read_themes
write_content
read_content
```

### Step 5: Get Your Credentials

Once the app is created, you'll see:

- **Client ID** (API Key) - This is your `SHOPIFY_API_KEY`
- **Client Secret** (API Secret) - This is your `SHOPIFY_API_SECRET`

### Step 6: Update Your Configuration Files

1. **Update `shopify.app.space.toml`**:
   ```toml
   client_id = "your_client_id_here"
   name = "space"
   application_url = "https://your-app.vercel.app"
   embedded = true
   
   [access_scopes]
   scopes = "write_products,read_products,write_themes,read_themes,write_content,read_content"
   
   [auth]
   redirect_urls = [
     "https://your-app.vercel.app/api/auth/callback",
     "https://your-app.vercel.app/api/auth/shopify/callback"
   ]
   ```

2. **Add to Vercel Environment Variables**:
   ```
   SHOPIFY_API_KEY=your_client_id
   SHOPIFY_API_SECRET=your_client_secret
   SCOPES=write_products,read_products,write_themes,read_themes,write_content,read_content
   SHOPIFY_APP_URL=https://your-app.vercel.app
   NODE_ENV=production
   ```

## Alternative: Using Shopify CLI (Easier)

Instead of manually creating the app, you can use Shopify CLI which does it automatically:

```bash
# Make sure you're in your project directory
cd C:\Users\mural\Music\Modus

# Run this command - it will guide you through creating the app
shopify app dev --reset
```

This will:
- ✅ Create the app automatically
- ✅ Set up all credentials
- ✅ Update your config files
- ✅ Handle OAuth redirects

## Quick Reference

**Dashboard URL**: https://dev.shopify.com/dashboard/190532629/apps/new

**After Creation, You'll Get**:
- Client ID (API Key)
- Client Secret (API Secret)
- App URL configuration
- OAuth redirect URLs

**Important**: 
- Keep your API Secret secure
- Never commit it to Git
- Only add it to Vercel environment variables
