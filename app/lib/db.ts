// Database utilities for storing and retrieving pages
// This is a placeholder implementation - replace with your actual database

import { Page, PageContent, VersionHistory } from "~/models/types";

// In-memory storage for development (replace with actual database)
const pagesStorage: Map<string, Page> = new Map();
const versionHistoryStorage: Map<string, VersionHistory[]> = new Map();

export async function savePage(page: Page): Promise<Page> {
  // In production, save to your database (Firestore, PostgreSQL, etc.)
  pagesStorage.set(page.id, page);
  return page;
}

export async function getPage(pageId: string, shop: string): Promise<Page | null> {
  // In production, fetch from your database
  const page = pagesStorage.get(pageId);
  if (page && page.shop === shop) {
    return page;
  }
  return null;
}

export async function getPagesByShop(shop: string): Promise<Page[]> {
  // In production, query your database
  return Array.from(pagesStorage.values()).filter((page) => page.shop === shop);
}

export async function deletePage(pageId: string, shop: string): Promise<boolean> {
  const page = pagesStorage.get(pageId);
  if (page && page.shop === shop) {
    pagesStorage.delete(pageId);
    return true;
  }
  return false;
}

export async function saveVersion(pageId: string, version: VersionHistory): Promise<void> {
  // In production, save to your database
  const versions = versionHistoryStorage.get(pageId) || [];
  versions.push(version);
  versionHistoryStorage.set(pageId, versions);
}

export async function getVersionHistory(pageId: string): Promise<VersionHistory[]> {
  // In production, fetch from your database
  return versionHistoryStorage.get(pageId) || [];
}

// Initialize database schema (for SQL databases)
export const PAGE_SCHEMA = `
  CREATE TABLE IF NOT EXISTS pages (
    id VARCHAR(255) PRIMARY KEY,
    shop VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    handle VARCHAR(255) NOT NULL,
    content JSONB NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'draft',
    published_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    version INTEGER NOT NULL DEFAULT 1
  );

  CREATE INDEX IF NOT EXISTS idx_pages_shop ON pages(shop);
  CREATE INDEX IF NOT EXISTS idx_pages_status ON pages(status);
`;

