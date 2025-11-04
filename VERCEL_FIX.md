# Vercel Deployment Fixes

## Changes Made

1. **Created `api/index.ts`** - Proper Vercel serverless function handler for Remix
2. **Removed `functions/index.ts`** - Cloudflare Workers format doesn't work on Vercel
3. **Updated `remix.config.js`** - Added ESM and Node.js configuration
4. **Updated `vercel.json`** - Added rewrites to route all traffic to the API handler
5. **Added dependencies** - `@vercel/node` and `@types/node`

## Required Environment Variables in Vercel

Go to your Vercel project → Settings → Environment Variables and add:

```
SHOPIFY_API_KEY=your_api_key_here
SHOPIFY_API_SECRET=your_api_secret_here
SCOPES=write_products,read_products,write_themes,read_themes,write_content,read_content
SHOPIFY_APP_URL=https://your-app.vercel.app
NODE_ENV=production
```

## Next Steps

1. **Add environment variables** in Vercel dashboard
2. **Redeploy** - Push your changes or trigger a new deployment
3. **Check logs** - If it still fails, check Vercel's function logs for the specific error

## Troubleshooting

If you still get a 500 error:
- Check Vercel's function logs (Runtime Logs tab)
- Verify all environment variables are set
- Ensure `SHOPIFY_APP_URL` matches your Vercel deployment URL
- Check that the build completes successfully

The error details will now be logged to help diagnose issues.
