import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { authenticateAdmin } from "~/lib/shopify.server";
import { savePage, getPage } from "~/lib/db";
import { Page, PageContent } from "~/models/types";
import { nanoid } from "nanoid";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session, admin } = await authenticateAdmin(request);
  
  if (request.method === "POST") {
    const formData = await request.formData();
    const action = formData.get("action") as string;
    
    if (action === "save") {
      const pageId = formData.get("pageId") as string;
      const content = JSON.parse(formData.get("content") as string) as PageContent;
      const title = formData.get("title") as string || "Untitled Page";
      
      let page: Page;
      
      if (pageId) {
        const existingPage = await getPage(pageId, session.shop);
        if (existingPage) {
          page = {
            ...existingPage,
            content,
            title,
            updatedAt: new Date(),
            version: existingPage.version + 1,
          };
        } else {
          return json({ error: "Page not found" }, { status: 404 });
        }
      } else {
        page = {
          id: nanoid(),
          shop: session.shop,
          title,
          handle: title.toLowerCase().replace(/\s+/g, "-"),
          content,
          status: "draft",
          createdAt: new Date(),
          updatedAt: new Date(),
          version: 1,
        };
      }
      
      const savedPage = await savePage(page);
      
      return json({ success: true, page: savedPage });
    }
    
    if (action === "publish") {
      const pageId = formData.get("pageId") as string;
      const content = JSON.parse(formData.get("content") as string) as PageContent;
      const title = formData.get("title") as string || "Untitled Page";
      
      const existingPage = await getPage(pageId, session.shop);
      if (!existingPage) {
        return json({ error: "Page not found" }, { status: 404 });
      }
      
      // Update page to published
      const page: Page = {
        ...existingPage,
        content,
        title,
        status: "published",
        publishedAt: new Date(),
        updatedAt: new Date(),
        version: existingPage.version + 1,
      };
      
      const savedPage = await savePage(page);
      
      // Create/update page in Shopify using Admin API
      const mutation = `
        mutation pageCreate($page: PageInput!) {
          pageCreate(page: $page) {
            page {
              id
              title
              handle
            }
            userErrors {
              field
              message
            }
          }
        }
      `;
      
      try {
        const response = await admin.graphql(mutation, {
          variables: {
            page: {
              title: title,
              handle: page.handle,
              bodyHtml: generatePageHTML(content),
            },
          },
        });
        
        const data = await response.json();
        
        if (data.data?.pageCreate?.userErrors?.length > 0) {
          return json({ error: data.data.pageCreate.userErrors[0].message }, { status: 400 });
        }
      } catch (error) {
        console.error("Error creating page in Shopify:", error);
        // Continue anyway - page is saved in our database
      }
      
      return json({ success: true, page: savedPage });
    }
  }
  
  return json({ error: "Invalid action" }, { status: 400 });
};

function generatePageHTML(content: PageContent): string {
  // Convert page content to HTML
  // This is a simplified version - use the full renderer in production
  return `
    <div class="space-page">
      <!-- Page content will be rendered by Theme App Extension -->
      <div data-space-page-id="PLACEHOLDER" class="space-page-wrapper"></div>
    </div>
  `;
}

