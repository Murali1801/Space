import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useActionData } from "@remix-run/react";
import { authenticate } from "~/lib/shopify.server";
import { admin } from "@shopify/shopify-api";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);
  
  // Fetch products from Shopify
  const response = await admin.graphql(`
    query {
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `);
  
  const data = await response.json();
  
  return json({
    products: data.data.products.edges.map((edge: any) => edge.node),
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  
  if (request.method === "POST") {
    const formData = await request.formData();
    const query = formData.get("query") as string;
    
    // Search products
    const response = await admin.graphql(`
      query searchProducts($query: String!) {
        products(first: 50, query: $query) {
          edges {
            node {
              id
              title
              handle
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    `, {
      variables: { query },
    });
    
    const data = await response.json();
    
    return json({
      products: data.data.products.edges.map((edge: any) => edge.node),
    });
  }
  
  return json({ error: "Invalid method" }, { status: 400 });
};

export default function ProductPicker() {
  const { products } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <div style={{ padding: "24px" }}>
      <h1>Select Product</h1>
      <input type="text" placeholder="Search products..." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px", marginTop: "16px" }}>
        {products.map((product: any) => (
          <div key={product.id} style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "8px", cursor: "pointer" }}>
            {product.images.edges[0] && (
              <img src={product.images.edges[0].node.url} alt={product.images.edges[0].node.altText} style={{ width: "100%", height: "auto" }} />
            )}
            <h3>{product.title}</h3>
            <p>{product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

