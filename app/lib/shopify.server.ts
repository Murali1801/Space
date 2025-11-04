import "@shopify/shopify-api/adapters/node";
import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-01";

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY || "",
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  scopes: process.env.SCOPES?.split(",") || [],
  hostName: process.env.SHOPIFY_APP_URL?.replace(/https?:\/\//, "") || "",
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: true,
  restResources,
  // Note: Session storage needs to be configured for production
  // For now, this will use in-memory storage (not recommended for production)
});

export { shopify };

// For Remix authentication - simplified version
// Note: This needs proper session storage implementation for production
export async function authenticateAdmin(request: Request) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");

  if (!shop) {
    throw new Error("Missing shop parameter. Access this app through Shopify Admin.");
  }

  // For now, return a basic session structure
  // In production, you need to implement proper session storage
  // and use shopify.auth.begin() and shopify.auth.callback()
  
  return {
    session: {
      shop,
      accessToken: "", // Will be populated after OAuth
      isOnline: true,
    },
    admin: null, // Will be created after OAuth completes
  };
}

export async function authenticatePublic(request: Request) {
  // For public routes (storefront)
  return {
    session: null,
  };
}

// App load context for Remix
export function appLoadContext(request: Request) {
  return {
    request,
  };
}