# Where to Get Shopify API Credentials

## Quick Answer

You can get your Shopify API credentials from the **Shopify Partner Dashboard**.

## Step-by-Step Guide

### Option 1: If You Already Have an App (Recommended)

Since you already have a `client_id` in your `shopify.app.space.toml`, you likely already created an app. Here's how to get the credentials:

1. **Go to Shopify Partner Dashboard**
   - Visit: https://partners.shopify.com
   - Log in with your Shopify Partner account

2. **Navigate to Your App**
   - Click on **"Apps"** in the left sidebar
   - Find your app named **"space"** (or whatever you named it)
   - Click on it to open the app details

3. **Get API Credentials**
   - In the app details page, look for **"Client credentials"** or **"API credentials"** section
   - You'll see:
     - **API Key** (this is your `SHOPIFY_API_KEY`)
     - **API Secret** (this is your `SHOPIFY_API_SECRET`)
     - **Client ID** (this is already in your `shopify.app.space.toml` as `client_id`)

4. **Copy the Values**
   - Click **"Reveal"** or **"Show"** next to the API Secret to view it
   - Copy both the API Key and API Secret

### Option 2: Create a New App

If you don't have an app yet:

1. **Go to Shopify Partner Dashboard**
   - Visit: https://partners.shopify.com
   - Log in or create a free account

2. **Create a New App**
   - Click **"Apps"** → **"Create app"**
   - Choose **"Custom app"**
   - Name it "Space" (or any name you prefer)
   - Click **"Create app"**

3. **Get Your Credentials**
   - The app will be created and you'll see:
     - **API Key** (`SHOPIFY_API_KEY`)
     - **API Secret** (`SHOPIFY_API_SECRET`)
     - **Client ID** (already in your config file)

## Setting Up Environment Variables

Once you have the credentials, add them to Vercel:

### In Vercel Dashboard:

1. Go to your Vercel project
2. Click **Settings** → **Environment Variables**
3. Add these variables:

```
SHOPIFY_API_KEY=your_api_key_here
SHOPIFY_API_SECRET=your_api_secret_here
SCOPES=write_products,read_products,write_themes,read_themes,write_content,read_content
SHOPIFY_APP_URL=https://your-app.vercel.app
NODE_ENV=production
```

**Important Notes:**
- Replace `your_api_key_here` with your actual API Key from the Partner Dashboard
- Replace `your_api_secret_here` with your actual API Secret
- Replace `your-app.vercel.app` with your actual Vercel deployment URL
- The `client_id` from your `shopify.app.space.toml` is the same as what you see in the Partner Dashboard

## What Each Credential Is Used For

- **SHOPIFY_API_KEY** (`apiKey`): Public identifier for your app
- **SHOPIFY_API_SECRET** (`apiSecretKey`): Private key for authentication (keep secret!)
- **Client ID** (`client_id`): Same as API Key, used in OAuth flows
- **SCOPES**: Permissions your app needs (already set in your config)
- **SHOPIFY_APP_URL**: Your production URL (Vercel deployment URL)

## Visual Guide

In the Shopify Partner Dashboard, the credentials page looks like:

```
┌─────────────────────────────────────────┐
│ App: Space                              │
├─────────────────────────────────────────┤
│                                         │
│ Client credentials                      │
│ ┌─────────────────────────────────┐   │
│ │ API Key                          │   │
│ │ abc123def456ghi789...            │   │
│ │ [Copy]                           │   │
│ └─────────────────────────────────┘   │
│                                         │
│ ┌─────────────────────────────────┐   │
│ │ API Secret                       │   │
│ │ ******************************** │   │
│ │ [Reveal] [Copy]                  │   │
│ └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

## Troubleshooting

**Can't find your app?**
- Make sure you're logged into the correct Partner account
- Check if the app was created under a different organization
- Look in **"Apps"** → **"All apps"**

**API Secret is hidden?**
- Click **"Reveal"** or **"Show"** button next to the API Secret
- Some dashboards require you to click **"Reveal"** before showing it

**Need to create a new app?**
- Go to **"Apps"** → **"Create app"** → **"Custom app"**
- Fill in the app name and create it
- The credentials will be shown immediately after creation

## Security Note

⚠️ **Never commit these credentials to Git!**
- They should only be in your `.env` file locally (which is gitignored)
- They should only be in Vercel's environment variables
- Never share them publicly or commit them to your repository
