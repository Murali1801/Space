import { createRequestHandler } from "@remix-run/node";
import * as build from "../build/server/index.js";
import { appLoadContext } from "../app/lib/shopify.server";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const requestHandler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV || "production",
  getLoadContext: (event: { request: Request }) => {
    return appLoadContext(event.request);
  },
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    // Convert Vercel request to Web API Request
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers.host || "";
    const url = `${protocol}://${host}${req.url}`;
    
    // Get request body - Vercel already parses JSON, so we need to handle it properly
    let requestBody: string | undefined = undefined;
    if (req.method !== "GET" && req.method !== "HEAD") {
      if (req.body) {
        // If body is already an object (parsed), stringify it
        // If it's a string, use it as-is
        requestBody = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
      }
    }
    
    const request = new Request(url, {
      method: req.method,
      headers: new Headers(req.headers as Record<string, string>),
      body: requestBody,
    });

    const response = await requestHandler(request);
    
    // Convert Web API Response to Vercel response
    res.status(response.status);
    
    // Copy headers
    response.headers.forEach((value: string, key: string) => {
      res.setHeader(key, value);
    });
    
    // Send response body
    const responseBody = await response.text();
    res.send(responseBody);
  } catch (error) {
    console.error("Remix handler error:", error);
    res.status(500).json({ error: "Internal server error", details: error instanceof Error ? error.message : String(error) });
  }
}
