import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useActionData, Form } from "@remix-run/react";
import { authenticateAdmin } from "~/lib/shopify.server";
import { Page, PageContent } from "~/models/types";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticateAdmin(request);
  
  // Fetch pages from database (implement with your database)
  // For now, return empty array
  const pages: Page[] = [];
  
  return json({ pages });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin, session } = await authenticateAdmin(request);
  
  if (request.method === "POST") {
    const formData = await request.formData();
    const action = formData.get("action");
    
    if (action === "save") {
      const pageId = formData.get("pageId") as string;
      const content = JSON.parse(formData.get("content") as string) as PageContent;
      
      // Save to database (implement with your database)
      // For now, just return success
      
      return json({ success: true, pageId });
    }
    
    if (action === "publish") {
      const pageId = formData.get("pageId") as string;
      const content = JSON.parse(formData.get("content") as string) as PageContent;
      
      // Save and publish page
      // Create page in Shopify using Admin API
      // Update database status to "published"
      
      return json({ success: true, pageId });
    }
  }
  
  return json({ error: "Invalid action" }, { status: 400 });
};

export default function PagesIndex() {
  const { pages } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <div style={{ padding: "24px" }}>
      <h1>Pages</h1>
      <a href="/app/editor">Create New Page</a>
      
      {pages.length === 0 ? (
        <p>No pages yet. Create your first page!</p>
      ) : (
        <ul>
          {pages.map((page) => (
            <li key={page.id}>
              <a href={`/app/pages/${page.id}`}>{page.title}</a>
              <span> - {page.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

