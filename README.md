# Space - High-Performance Visual Page Builder for Shopify

Space is a modern, WYSIWYG page builder for Shopify that empowers merchants to create custom landing pages, product pages, and theme sections without writing code.

## Architecture

Space is built on a decoupled, three-part architecture:

1. **The Editor (Frontend)**: React-based SPA that loads inside Shopify Admin
2. **The Backend (API & Database)**: Node.js server handling authentication, page storage, and Shopify API communication
3. **The Renderer (Storefront)**: Shopify Theme App Extension for high-performance page rendering

## Features

### Visual Editor
- Real-time WYSIWYG editing
- Drag & drop interface with dnd-kit
- Responsive previews (Desktop, Tablet, Mobile)
- Component nesting
- Element hierarchy/tree (Layers panel)

### Component Library
- **Layout**: Section, Container, Grid
- **Basic**: Heading, Text, Button, Image, Video, Icon, Spacer, Divider
- **Shopify-Native**: Product Box, Product Grid, Add to Cart Button
- **Advanced**: Slider/Carousel, Tabs, Accordion, Custom HTML/Liquid

### Style Inspector
- Full Flexbox and Grid controls
- Granular spacing controls (Margin, Padding)
- Typography controls
- Background (solid, image, gradient)
- Borders and border radius
- State styling (Hover, Active)

### Shopify Integration
- Product picker with catalog search
- Collection picker
- Dynamic data binding

### Publishing
- Theme App Extension for rendering
- JSON-to-HTML server-side rendering
- Standalone page creation

## Getting Started

### Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev
```

The Shopify CLI will guide you through the setup process automatically.

### Detailed Setup

For detailed setup instructions, see:
- **[QUICK_START.md](./QUICK_START.md)** - Quick reference guide
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete step-by-step instructions

### Prerequisites

- Node.js v18 or higher
- Shopify CLI (`npm install -g @shopify/cli`)
- Shopify Partner account (free at https://partners.shopify.com)
- Development store (free, created via Partner dashboard)

## Project Structure

```
space/
├── app/
│   ├── routes/          # Remix routes
│   ├── components/      # React components
│   ├── lib/            # Utilities and helpers
│   └── models/         # Data models
├── extensions/
│   └── theme-app-extension/  # Theme App Extension
└── public/             # Static assets
```

## License

MIT

