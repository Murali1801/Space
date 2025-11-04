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
});

export { shopify };

// For Remix authentication
export async function authenticateAdmin(request: Request) {
  const session = await shopify.auth.callback({
    rawRequest: request,
    rawResponse: new Response(),
  });

  return {
    session,
    admin: new shopify.clients.Graphql({ session }),
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
