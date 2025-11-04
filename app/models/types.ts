// Database schema types and models

export interface Page {
  id: string;
  shop: string;
  title: string;
  handle: string;
  content: PageContent;
  status: "draft" | "published";
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

export interface PageContent {
  root: ComponentNode;
  metadata: {
    viewport: {
      width: number;
      height: number;
    };
  };
}

export interface ComponentNode {
  id: string;
  type: ComponentType;
  props: ComponentProps;
  children: ComponentNode[];
  styles: ComponentStyles;
  responsiveStyles?: {
    mobile?: ComponentStyles;
    tablet?: ComponentStyles;
    desktop?: ComponentStyles;
  };
}

export type ComponentType =
  | "section"
  | "container"
  | "grid"
  | "heading"
  | "text"
  | "button"
  | "image"
  | "video"
  | "icon"
  | "spacer"
  | "divider"
  | "product-box"
  | "product-grid"
  | "add-to-cart"
  | "slider"
  | "tabs"
  | "accordion"
  | "custom-html";

export interface ComponentProps {
  [key: string]: any;
  // Shopify-specific props
  productId?: string;
  collectionId?: string;
  variantId?: string;
  // Content props
  text?: string;
  heading?: string;
  href?: string;
  src?: string;
  alt?: string;
  // Layout props
  columns?: number;
  gap?: number;
}

export interface ComponentStyles {
  // Layout
  display?: "flex" | "grid" | "block" | "inline-block" | "none";
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  gridTemplateColumns?: string;
  gap?: string;
  // Spacing
  margin?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  padding?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  // Size
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
  // Typography
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string | number;
  color?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  // Background
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  // Borders
  border?: string;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;
  borderRadius?: string;
  // Effects
  opacity?: number;
  boxShadow?: string;
  // States
  hover?: Partial<ComponentStyles>;
  active?: Partial<ComponentStyles>;
}

export interface VersionHistory {
  id: string;
  pageId: string;
  version: number;
  content: PageContent;
  createdAt: Date;
  createdBy: string;
}

export interface ReusableSection {
  id: string;
  shop: string;
  name: string;
  component: ComponentNode;
  createdAt: Date;
  updatedAt: Date;
}

// Component definitions
export const COMPONENT_DEFINITIONS: Record<
  ComponentType,
  {
    name: string;
    category: "layout" | "basic" | "shopify" | "advanced";
    icon: string;
    defaultProps: ComponentProps;
    defaultStyles: ComponentStyles;
  }
> = {
  section: {
    name: "Section",
    category: "layout",
    icon: "📦",
    defaultProps: {},
    defaultStyles: {
      display: "block",
      width: "100%",
      padding: "20px",
    },
  },
  container: {
    name: "Container",
    category: "layout",
    icon: "📦",
    defaultProps: {},
    defaultStyles: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
    },
  },
  grid: {
    name: "Grid",
    category: "layout",
    icon: "⊞",
    defaultProps: {
      columns: 3,
      gap: 20,
    },
    defaultStyles: {
      display: "grid",
      gap: "20px",
    },
  },
  heading: {
    name: "Heading",
    category: "basic",
    icon: "H",
    defaultProps: {
      heading: "Heading",
      level: 1,
    },
    defaultStyles: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#000000",
      marginBottom: "16px",
    },
  },
  text: {
    name: "Text",
    category: "basic",
    icon: "T",
    defaultProps: {
      text: "Text content",
    },
    defaultStyles: {
      fontSize: "16px",
      color: "#333333",
      lineHeight: "1.6",
    },
  },
  button: {
    name: "Button",
    category: "basic",
    icon: "🔘",
    defaultProps: {
      text: "Click me",
      href: "#",
    },
    defaultStyles: {
      display: "inline-block",
      padding: "12px 24px",
      backgroundColor: "#000000",
      color: "#ffffff",
      borderRadius: "4px",
      textAlign: "center",
      cursor: "pointer",
      hover: {
        backgroundColor: "#333333",
      },
    },
  },
  image: {
    name: "Image",
    category: "basic",
    icon: "🖼️",
    defaultProps: {
      src: "",
      alt: "Image",
    },
    defaultStyles: {
      width: "100%",
      height: "auto",
    },
  },
  video: {
    name: "Video",
    category: "basic",
    icon: "🎥",
    defaultProps: {
      src: "",
    },
    defaultStyles: {
      width: "100%",
      height: "auto",
    },
  },
  icon: {
    name: "Icon",
    category: "basic",
    icon: "⭐",
    defaultProps: {
      name: "star",
    },
    defaultStyles: {
      width: "24px",
      height: "24px",
    },
  },
  spacer: {
    name: "Spacer",
    category: "basic",
    icon: "↕️",
    defaultProps: {
      height: 40,
    },
    defaultStyles: {
      width: "100%",
      height: "40px",
    },
  },
  divider: {
    name: "Divider",
    category: "basic",
    icon: "➖",
    defaultProps: {},
    defaultStyles: {
      width: "100%",
      height: "1px",
      backgroundColor: "#e0e0e0",
      margin: "20px 0",
    },
  },
  "product-box": {
    name: "Product Box",
    category: "shopify",
    icon: "🛍️",
    defaultProps: {
      productId: "",
    },
    defaultStyles: {
      display: "flex",
      flexDirection: "column",
      padding: "16px",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
    },
  },
  "product-grid": {
    name: "Product Grid",
    category: "shopify",
    icon: "📊",
    defaultProps: {
      collectionId: "",
      columns: 4,
    },
    defaultStyles: {
      display: "grid",
      gap: "20px",
    },
  },
  "add-to-cart": {
    name: "Add to Cart",
    category: "shopify",
    icon: "🛒",
    defaultProps: {
      variantId: "",
      text: "Add to Cart",
    },
    defaultStyles: {
      display: "inline-block",
      padding: "12px 24px",
      backgroundColor: "#000000",
      color: "#ffffff",
      borderRadius: "4px",
      cursor: "pointer",
      hover: {
        backgroundColor: "#333333",
      },
    },
  },
  slider: {
    name: "Slider",
    category: "advanced",
    icon: "🎠",
    defaultProps: {
      slides: [],
    },
    defaultStyles: {
      width: "100%",
      overflow: "hidden",
    },
  },
  tabs: {
    name: "Tabs",
    category: "advanced",
    icon: "📑",
    defaultProps: {
      tabs: [],
    },
    defaultStyles: {
      width: "100%",
    },
  },
  accordion: {
    name: "Accordion",
    category: "advanced",
    icon: "📋",
    defaultProps: {
      items: [],
    },
    defaultStyles: {
      width: "100%",
    },
  },
  "custom-html": {
    name: "Custom HTML",
    category: "advanced",
    icon: "⚙️",
    defaultProps: {
      html: "",
    },
    defaultStyles: {},
  },
};

