import React from "react";
import { useEditorStore } from "~/lib/store";
import { Canvas } from "./Canvas";
import { ComponentLibrary } from "./ComponentLibrary";
import { StyleInspector } from "./StyleInspector";
import { LayersPanel } from "./LayersPanel";
import { SaveButton, PublishButton } from "./ActionButtons";
import { PageContent, ComponentNode } from "~/models/types";
import { nanoid } from "nanoid";

export function Editor() {
  const { pageContent, setPageContent, selectedViewport, setViewport } = useEditorStore();

  // Initialize with default page if none exists
  React.useEffect(() => {
    if (!pageContent) {
      const defaultRoot: ComponentNode = {
        id: nanoid(),
        type: "section",
        props: {},
        children: [],
        styles: {
          display: "block",
          width: "100%",
          padding: "20px",
        },
      };

      const defaultContent: PageContent = {
        root: defaultRoot,
        metadata: {
          viewport: {
            width: 1920,
            height: 1080,
          },
        },
      };

      setPageContent(defaultContent);
    }
  }, [pageContent, setPageContent]);

  return (
    <div style={{ 
      display: "flex", 
      height: "100vh", 
      overflow: "hidden",
      backgroundColor: "#f8f9fa",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    }}>
      {/* Component Library */}
      <ComponentLibrary />

      {/* Main Editor Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", backgroundColor: "#ffffff" }}>
        {/* Modern Toolbar */}
        <div style={{ 
          padding: "0 24px", 
          height: "64px",
          backgroundColor: "#ffffff", 
          borderBottom: "1px solid #e5e7eb", 
          display: "flex", 
          alignItems: "center", 
          gap: "24px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
        }}>
          {/* Logo/Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ 
              width: "32px", 
              height: "32px", 
              borderRadius: "6px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "18px"
            }}>
              S
            </div>
            <h1 style={{ fontSize: "18px", fontWeight: "600", margin: 0, color: "#111827" }}>Space</h1>
          </div>
          
          {/* Divider */}
          <div style={{ width: "1px", height: "32px", backgroundColor: "#e5e7eb" }} />

          {/* Viewport Toggles */}
          <div style={{ display: "flex", gap: "4px", backgroundColor: "#f3f4f6", padding: "4px", borderRadius: "8px" }}>
            <button
              onClick={() => setViewport("mobile")}
              style={{
                padding: "6px 12px",
                border: "none",
                borderRadius: "6px",
                backgroundColor: selectedViewport === "mobile" ? "#ffffff" : "transparent",
                color: selectedViewport === "mobile" ? "#111827" : "#6b7280",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: selectedViewport === "mobile" ? "600" : "400",
                boxShadow: selectedViewport === "mobile" ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
                transition: "all 0.2s",
              }}
            >
              📱 Mobile
            </button>
            <button
              onClick={() => setViewport("tablet")}
              style={{
                padding: "6px 12px",
                border: "none",
                borderRadius: "6px",
                backgroundColor: selectedViewport === "tablet" ? "#ffffff" : "transparent",
                color: selectedViewport === "tablet" ? "#111827" : "#6b7280",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: selectedViewport === "tablet" ? "600" : "400",
                boxShadow: selectedViewport === "tablet" ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
                transition: "all 0.2s",
              }}
            >
              📱 Tablet
            </button>
            <button
              onClick={() => setViewport("desktop")}
              style={{
                padding: "6px 12px",
                border: "none",
                borderRadius: "6px",
                backgroundColor: selectedViewport === "desktop" ? "#ffffff" : "transparent",
                color: selectedViewport === "desktop" ? "#111827" : "#6b7280",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: selectedViewport === "desktop" ? "600" : "400",
                boxShadow: selectedViewport === "desktop" ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
                transition: "all 0.2s",
              }}
            >
              💻 Desktop
            </button>
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <SaveButton />
            <PublishButton />
          </div>
        </div>

        {/* Canvas Area */}
        <div style={{ 
          flex: 1, 
          overflow: "auto", 
          backgroundColor: "#f9fafb",
          backgroundImage: "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}>
          <Canvas />
        </div>
      </div>

      {/* Right Sidebar - Layers & Styles */}
      <div style={{ 
        display: "flex", 
        width: "320px",
        backgroundColor: "#ffffff",
        borderLeft: "1px solid #e5e7eb"
      }}>
        {/* Layers Panel */}
        <LayersPanel />

        {/* Style Inspector */}
        <StyleInspector />
      </div>
    </div>
  );
}