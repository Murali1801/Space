import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticateAdmin } from "~/lib/shopify.server";
import { Editor } from "~/components/Editor";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticateAdmin(request);
  
  return json({
    shop: session.shop,
  });
};

export default function EditorPage() {
  const { shop } = useLoaderData<typeof loader>();

  return (
    <div>
      <Editor />
    </div>
  );
}

