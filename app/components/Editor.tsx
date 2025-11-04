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
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Component Library */}
      <ComponentLibrary />

      {/* Main Editor Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Toolbar */}
        <div style={{ padding: "12px 16px", backgroundColor: "#ffffff", borderBottom: "1px solid #e0e0e0", display: "flex", alignItems: "center", gap: "16px" }}>
          <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>Space Editor</h1>
          
          {/* Viewport Toggles */}
          <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
            <button
              onClick={() => setViewport("mobile")}
              style={{
                padding: "6px 12px",
                border: selectedViewport === "mobile" ? "2px solid #0066cc" : "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: selectedViewport === "mobile" ? "#e3f2fd" : "#fff",
                cursor: "pointer",
              }}
            >
              📱 Mobile
            </button>
            <button
              onClick={() => setViewport("tablet")}
              style={{
                padding: "6px 12px",
                border: selectedViewport === "tablet" ? "2px solid #0066cc" : "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: selectedViewport === "tablet" ? "#e3f2fd" : "#fff",
                cursor: "pointer",
              }}
            >
              📱 Tablet
            </button>
            <button
              onClick={() => setViewport("desktop")}
              style={{
                padding: "6px 12px",
                border: selectedViewport === "desktop" ? "2px solid #0066cc" : "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: selectedViewport === "desktop" ? "#e3f2fd" : "#fff",
                cursor: "pointer",
              }}
            >
              💻 Desktop
            </button>
          </div>

          {/* Save Button */}
          <SaveButton />

          {/* Publish Button */}
          <PublishButton />
        </div>

        {/* Canvas Area */}
        <div style={{ flex: 1, overflow: "auto", backgroundColor: "#f0f0f0" }}>
          <Canvas />
        </div>
      </div>

      {/* Layers Panel */}
      <LayersPanel />

      {/* Style Inspector */}
      <StyleInspector />
    </div>
  );
}

