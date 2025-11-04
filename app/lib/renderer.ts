// Theme App Extension - renders pages on the storefront

import { ComponentNode, ComponentStyles } from "~/models/types";

interface RendererProps {
  pageContent: {
    root: ComponentNode;
  };
}

export function SpaceRenderer({ pageContent }: RendererProps) {
  return renderComponent(pageContent.root);
}

function renderComponent(node: ComponentNode): string {
  const styles = node.styles || {};
  const cssStyles = buildStyles(styles);
  
  switch (node.type) {
    case "section":
      return `<section class="space-section" style="${cssStyles}">${renderChildren(node)}</section>`;
    
    case "container":
      return `<div class="space-container" style="${cssStyles}">${renderChildren(node)}</div>`;
    
    case "grid":
      const columns = node.props.columns || 3;
      return `<div class="space-grid" style="${cssStyles}; grid-template-columns: repeat(${columns}, 1fr);">${renderChildren(node)}</div>`;
    
    case "heading":
      const level = node.props.level || 1;
      const heading = node.props.heading || "";
      return `<h${level} class="space-heading" style="${cssStyles}">${heading}</h${level}>`;
    
    case "text":
      const text = node.props.text || "";
      return `<p class="space-text" style="${cssStyles}">${text}</p>`;
    
    case "button":
      const buttonText = node.props.text || "Button";
      const href = node.props.href || "#";
      return `<a href="${href}" class="space-button" style="${cssStyles}">${buttonText}</a>`;
    
    case "image":
      const src = node.props.src || "";
      const alt = node.props.alt || "";
      return `<img src="${src}" alt="${alt}" class="space-image" style="${cssStyles}" />`;
    
    case "product-box":
      const productId = node.props.productId;
      if (productId) {
        return renderProductBox(productId, cssStyles, node);
      }
      return `<div class="space-product-box" style="${cssStyles}">Select a product</div>`;
    
    case "product-grid":
      const collectionId = node.props.collectionId;
      if (collectionId) {
        return renderProductGrid(collectionId, cssStyles, node);
      }
      return `<div class="space-product-grid" style="${cssStyles}">Select a collection</div>`;
    
    case "add-to-cart":
      const variantId = node.props.variantId;
      const addToCartText = node.props.text || "Add to Cart";
      if (variantId) {
        return `<button class="space-add-to-cart" data-variant-id="${variantId}" style="${cssStyles}">${addToCartText}</button>`;
      }
      return `<button class="space-add-to-cart" style="${cssStyles}">${addToCartText}</button>`;
    
    default:
      return `<div class="space-${node.type}" style="${cssStyles}">${renderChildren(node)}</div>`;
  }
}

function renderChildren(node: ComponentNode): string {
  if (!node.children || node.children.length === 0) {
    return "";
  }
  
  return node.children.map((child) => renderComponent(child)).join("");
}

function buildStyles(styles: ComponentStyles): string {
  const css: string[] = [];
  
  // Layout
  if (styles.display) css.push(`display: ${styles.display}`);
  if (styles.flexDirection) css.push(`flex-direction: ${styles.flexDirection}`);
  if (styles.flexWrap) css.push(`flex-wrap: ${styles.flexWrap}`);
  if (styles.alignItems) css.push(`align-items: ${styles.alignItems}`);
  if (styles.justifyContent) css.push(`justify-content: ${styles.justifyContent}`);
  if (styles.gridTemplateColumns) css.push(`grid-template-columns: ${styles.gridTemplateColumns}`);
  if (styles.gap) css.push(`gap: ${styles.gap}`);
  
  // Spacing
  if (styles.margin) css.push(`margin: ${styles.margin}`);
  if (styles.marginTop) css.push(`margin-top: ${styles.marginTop}`);
  if (styles.marginRight) css.push(`margin-right: ${styles.marginRight}`);
  if (styles.marginBottom) css.push(`margin-bottom: ${styles.marginBottom}`);
  if (styles.marginLeft) css.push(`margin-left: ${styles.marginLeft}`);
  if (styles.padding) css.push(`padding: ${styles.padding}`);
  if (styles.paddingTop) css.push(`padding-top: ${styles.paddingTop}`);
  if (styles.paddingRight) css.push(`padding-right: ${styles.paddingRight}`);
  if (styles.paddingBottom) css.push(`padding-bottom: ${styles.paddingBottom}`);
  if (styles.paddingLeft) css.push(`padding-left: ${styles.paddingLeft}`);
  
  // Size
  if (styles.width) css.push(`width: ${styles.width}`);
  if (styles.height) css.push(`height: ${styles.height}`);
  if (styles.minWidth) css.push(`min-width: ${styles.minWidth}`);
  if (styles.minHeight) css.push(`min-height: ${styles.minHeight}`);
  if (styles.maxWidth) css.push(`max-width: ${styles.maxWidth}`);
  if (styles.maxHeight) css.push(`max-height: ${styles.maxHeight}`);
  
  // Typography
  if (styles.fontFamily) css.push(`font-family: ${styles.fontFamily}`);
  if (styles.fontSize) css.push(`font-size: ${styles.fontSize}`);
  if (styles.fontWeight) css.push(`font-weight: ${styles.fontWeight}`);
  if (styles.color) css.push(`color: ${styles.color}`);
  if (styles.lineHeight) css.push(`line-height: ${styles.lineHeight}`);
  if (styles.letterSpacing) css.push(`letter-spacing: ${styles.letterSpacing}`);
  if (styles.textAlign) css.push(`text-align: ${styles.textAlign}`);
  
  // Background
  if (styles.backgroundColor) css.push(`background-color: ${styles.backgroundColor}`);
  if (styles.backgroundImage) css.push(`background-image: ${styles.backgroundImage}`);
  if (styles.backgroundSize) css.push(`background-size: ${styles.backgroundSize}`);
  if (styles.backgroundPosition) css.push(`background-position: ${styles.backgroundPosition}`);
  if (styles.backgroundRepeat) css.push(`background-repeat: ${styles.backgroundRepeat}`);
  
  // Borders
  if (styles.border) css.push(`border: ${styles.border}`);
  if (styles.borderWidth) css.push(`border-width: ${styles.borderWidth}`);
  if (styles.borderStyle) css.push(`border-style: ${styles.borderStyle}`);
  if (styles.borderColor) css.push(`border-color: ${styles.borderColor}`);
  if (styles.borderRadius) css.push(`border-radius: ${styles.borderRadius}`);
  
  // Effects
  if (styles.opacity !== undefined) css.push(`opacity: ${styles.opacity}`);
  if (styles.boxShadow) css.push(`box-shadow: ${styles.boxShadow}`);
  
  return css.join("; ");
}

function renderProductBox(productId: string, styles: string, node: ComponentNode): string {
  // This will be rendered server-side with Liquid
  return `
    <div class="space-product-box" style="${styles}">
      {% assign product = all_products['${productId}'] %}
      {% if product %}
        <img src="{{ product.featured_image | img_url: 'large' }}" alt="{{ product.title }}" />
        <h3>{{ product.title }}</h3>
        <p>{{ product.price | money }}</p>
        <form action="/cart/add" method="post">
          <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}" />
          <button type="submit">Add to Cart</button>
        </form>
      {% endif %}
      ${renderChildren(node)}
    </div>
  `;
}

function renderProductGrid(collectionId: string, styles: string, node: ComponentNode): string {
  // This will be rendered server-side with Liquid
  return `
    <div class="space-product-grid" style="${styles}">
      {% assign collection = collections['${collectionId}'] %}
      {% if collection %}
        {% for product in collection.products limit: ${node.props.columns || 4} %}
          <div class="space-product-item">
            <img src="{{ product.featured_image | img_url: 'medium' }}" alt="{{ product.title }}" />
            <h4>{{ product.title }}</h4>
            <p>{{ product.price | money }}</p>
            <a href="{{ product.url }}">View Product</a>
          </div>
        {% endfor %}
      {% endif %}
      ${renderChildren(node)}
    </div>
  `;
}

