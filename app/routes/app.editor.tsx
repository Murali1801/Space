import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticateAdmin } from "~/lib/shopify.server";
import { Editor } from "~/components/Editor";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { session } = await authenticateAdmin(request);
    
    return json({
      shop: session?.shop || "unknown",
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    // Check if it's a missing shop parameter
    if (errorMessage.includes("shop") || errorMessage.includes("Missing")) {
      return json({
        error: "Missing shop parameter",
        message: "Access this app through Shopify Admin to authenticate.",
        shop: null,
      }, { status: 400 });
    }
    
    return json({
      error: "Authentication failed",
      message: errorMessage,
      shop: null,
    }, { status: 401 });
  }
};

export default function EditorPage() {
  const data = useLoaderData<typeof loader>();
  
  if ("error" in data) {
    return (
      <div style={{ padding: "24px", fontFamily: "system-ui", maxWidth: "600px", margin: "50px auto" }}>
        <h1>Authentication Required</h1>
        <p style={{ color: "#d32f2f", marginBottom: "16px" }}>{data.message}</p>
        <div style={{ backgroundColor: "#f5f5f5", padding: "16px", borderRadius: "8px", marginTop: "24px" }}>
          <h3 style={{ marginTop: "0" }}>How to Access This App:</h3>
          <ol>
            <li>Go to your Shopify Admin at <code>https://your-store.myshopify.com/admin</code></li>
            <li>Navigate to <strong>Apps</strong> in the sidebar</li>
            <li>Click on the <strong>"Space"</strong> app</li>
            <li>The app will authenticate automatically through Shopify's OAuth flow</li>
          </ol>
          <p style={{ fontSize: "14px", color: "#666", marginTop: "16px" }}>
            <strong>Note:</strong> This app must be accessed through Shopify Admin. Direct URL access is not supported.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Editor />
    </div>
  );
}