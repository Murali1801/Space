# Vercel Environment Variables Setup

## ✅ Credentials Found

Based on your Shopify Partner Dashboard:

- **Client ID (API Key)**: `c615ebe42455811e026d0ba3d7486b86`
- **Client Secret (API Secret)**: `shpss_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (Get from Partner Dashboard)

## 🚀 Next Steps: Add to Vercel

### Step 1: Go to Vercel Dashboard

1. Open your Vercel project
2. Go to **Settings** → **Environment Variables**

### Step 2: Add These Variables

Add each variable one by one:

```
SHOPIFY_API_KEY=c615ebe42455811e026d0ba3d7486b86
```

```
SHOPIFY_API_SECRET=your_client_secret_from_dashboard
```

```
SCOPES=write_products,read_products,write_themes,read_themes,write_content,read_content
```

```
SHOPIFY_APP_URL=https://your-app.vercel.app
```
(Replace `your-app.vercel.app` with your actual Vercel deployment URL)

```
NODE_ENV=production
```

### Step 3: Select Environment

For each variable, make sure to select:
- ✅ **Production**
- ✅ **Preview** (optional, for preview deployments)
- ✅ **Development** (optional, for local dev)

### Step 4: Redeploy

After adding all variables:
1. Go to **Deployments** tab
2. Click the **"⋯"** (three dots) on your latest deployment
3. Click **"Redeploy"**

Or push a new commit to trigger automatic redeployment.

## 📝 Quick Copy-Paste for Vercel

Here's what you need to add to Vercel (replace the URL):

```
SHOPIFY_API_KEY=c615ebe42455811e026d0ba3d7486b86
SHOPIFY_API_SECRET=your_client_secret_from_dashboard
SCOPES=write_products,read_products,write_themes,read_themes,write_content,read_content
SHOPIFY_APP_URL=https://YOUR-VERCEL-URL.vercel.app
NODE_ENV=production
```

## ✅ Verification

After redeploying, check:
1. The deployment should succeed
2. Visit your Vercel URL - it should load without 500 errors
3. Check Vercel logs if there are still issues

## 🔐 Security Note

Your credentials are now visible in this screenshot. After setting up Vercel:
- ✅ Keep them secure
- ✅ Never commit them to Git
- ✅ Only use them in Vercel environment variables
