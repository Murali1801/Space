# Troubleshooting Blank Page on Vercel

## Changes Made

1. **Added root route** (`app/routes/_index.tsx`) - Handles root path redirect
2. **Improved error handling** in `app/routes/app.editor.tsx` - Shows authentication errors instead of blank page
3. **Enhanced API handler** - Better error logging and static asset handling
4. **Updated vercel.json** - Better static asset routing

## Common Causes of Blank Page

### 1. Missing Environment Variables
**Symptom**: Blank page or authentication error

**Solution**: Add these to Vercel Environment Variables:
```
SHOPIFY_API_KEY=your_api_key_here
SHOPIFY_API_SECRET=your_api_secret_here
SCOPES=write_products,read_products,write_themes,read_themes,write_content,read_content
SHOPIFY_APP_URL=https://your-app.vercel.app
NODE_ENV=production
```

### 2. Build Issues
**Check**: Vercel build logs for errors

**Common issues**:
- Missing dependencies
- TypeScript errors
- Build path issues

### 3. Authentication Errors
**Symptom**: Page loads but shows "Authentication Error"

**Solution**: 
- Verify environment variables are set correctly
- Check that `SHOPIFY_APP_URL` matches your Vercel deployment URL
- Ensure API credentials are correct

### 4. Static Assets Not Loading
**Symptom**: Page loads but styles/scripts don't work

**Solution**: The updated `vercel.json` should handle this, but check:
- Build output exists in `build/` directory
- Static assets are being served correctly

## Debugging Steps

1. **Check Vercel Logs**:
   - Go to Vercel Dashboard → Your Project → Functions → Runtime Logs
   - Look for errors in the console

2. **Check Browser Console**:
   - Open browser DevTools (F12)
   - Check Console tab for JavaScript errors
   - Check Network tab for failed requests

3. **Verify Build**:
   - Check that `npm run build` completes successfully
   - Verify `build/` directory exists and has content

4. **Test Routes**:
   - `/` - Should redirect to `/app/editor`
   - `/app/editor` - Should show editor or authentication error
   - Check if you see any error messages instead of blank page

## Next Steps

After pushing these changes:
1. Push to GitHub
2. Vercel will auto-deploy
3. Check Vercel logs if still blank
4. Verify environment variables are set
5. Check browser console for errors
