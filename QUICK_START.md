# Quick Start Guide

## 🚀 Fastest Way to Run

```bash
# 1. Install dependencies
npm install

# 2. Run development server (Shopify CLI will guide you through setup)
npm run dev
```

The Shopify CLI will automatically:
- ✅ Create/configure your app
- ✅ Set up authentication
- ✅ Create a development tunnel
- ✅ Install the app on your store

## 📋 Manual Setup (If Needed)

1. **Create Shopify App**:
   - Go to https://partners.shopify.com
   - Create a new app
   - Copy API credentials

2. **Create `.env` file**:
   ```env
   SHOPIFY_API_KEY=your_key
   SHOPIFY_API_SECRET=your_secret
   SCOPES=write_products,read_products,write_themes,read_themes,write_content,read_content
   ```

3. **Update `shopify.app.toml`**:
   - Add your `client_id`
   - Add your `dev_store_url`

4. **Run**:
   ```bash
   npm run dev
   ```

## 🎯 Access the Editor

Once running, visit:
- Editor: `/app/editor`
- Pages List: `/app/pages`
- Products: `/app/products`

## ⚠️ Troubleshooting

**Port in use?**
```bash
PORT=3001 npm run dev
```

**Missing dependencies?**
```bash
rm -rf node_modules && npm install
```

**Authentication issues?**
- Check `.env` file exists
- Verify API credentials in Shopify Partner Dashboard
- Ensure `shopify.app.toml` is configured correctly

## 📚 Full Documentation

See `SETUP_GUIDE.md` for detailed instructions.

