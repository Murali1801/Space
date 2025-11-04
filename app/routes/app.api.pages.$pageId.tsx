import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
// Public API route - no authentication required
import { getPage } from "~/lib/db";
import { SpaceRenderer } from "~/lib/renderer";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const pageId = params.pageId;
  
  if (!pageId) {
    return json({ error: "Page ID required" }, { status: 400 });
  }
  
  // For public API, we don't need shop authentication
  // Extract shop from request if needed
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop") || "";
  
  const page = await getPage(pageId, shop);
  
  if (!page) {
    return json({ error: "Page not found" }, { status: 404 });
  }
  
  return json({ page });
};

export default function PageRenderer() {
  const { page } = useLoaderData<typeof loader>();
  
  if (!page || page.status !== "published") {
    return <div>Page not found or not published</div>;
  }
  
  return <SpaceRenderer pageContent={page.content} />;
}

