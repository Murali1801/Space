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
    // If authentication fails, return error info
    console.error("Authentication error:", error);
    return json({
      error: "Authentication failed",
      message: error instanceof Error ? error.message : "Unknown error",
      shop: null,
    }, { status: 401 });
  }
};

export default function EditorPage() {
  const data = useLoaderData<typeof loader>();
  
  if ("error" in data) {
    return (
      <div style={{ padding: "24px", fontFamily: "system-ui" }}>
        <h1>Authentication Error</h1>
        <p>{data.message}</p>
        <p style={{ color: "#666", fontSize: "14px" }}>
          Make sure you have set up your environment variables correctly.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Editor />
    </div>
  );
}

