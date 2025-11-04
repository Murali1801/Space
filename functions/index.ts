import { createRemixHandler } from "@remix-run/serve";
import { appLoadContext } from "./app/lib/shopify.server";

export default {
  async fetch(request: Request, env: any, context: any) {
    const remixHandler = createRemixHandler({
      // @ts-ignore
      build: await import("../build/server/index.js"),
      mode: process.env.NODE_ENV,
      getLoadContext: appLoadContext,
    });
    return remixHandler(request, env, context);
  },
};
