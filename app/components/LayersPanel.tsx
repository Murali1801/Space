import { useEditorStore } from "~/lib/store";
import { ComponentNode } from "~/models/types";
import { getComponentName } from "./ComponentRenderer";

export function LayersPanel() {
  const { pageContent, selectedNodeId, setSelectedNode } = useEditorStore();

  if (!pageContent) {
    return (
      <div style={{ 
        width: "240px", 
        padding: "24px", 
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e5e7eb",
        height: "100vh", 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#9ca3af"
      }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>📋</div>
        <p style={{ fontSize: "14px", textAlign: "center", margin: 0 }}>
          No page content
        </p>
      </div>
    );
  }

  return (
    <div style={{ 
      width: "240px", 
      backgroundColor: "#ffffff",
      borderRight: "1px solid #e5e7eb",
      height: "100vh", 
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>
      {/* Header */}
      <div style={{ padding: "16px", borderBottom: "1px solid #e5e7eb" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "600", margin: 0, color: "#111827" }}>Layers</h2>
      </div>
      
      {/* Layers List */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
        <LayerItem node={pageContent.root} depth={0} selectedNodeId={selectedNodeId} onSelect={setSelectedNode} />
      </div>
    </div>
  );
}

interface LayerItemProps {
  node: ComponentNode;
  depth: number;
  selectedNodeId: string | null;
  onSelect: (id: string) => void;
}

function LayerItem({ node, depth, selectedNodeId, onSelect }: LayerItemProps) {
  const isSelected = selectedNodeId === node.id;
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <div
        onClick={() => onSelect(node.id)}
        style={{
          padding: "8px 12px",
          paddingLeft: `${depth * 16 + 12}px`,
          backgroundColor: isSelected ? "#eff6ff" : "transparent",
          cursor: "pointer",
          borderRadius: "6px",
          marginBottom: "2px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "13px",
          fontWeight: isSelected ? "500" : "400",
          color: isSelected ? "#2563eb" : "#374151",
          border: isSelected ? "1px solid #93c5fd" : "1px solid transparent",
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = "#f9fafb";
          }
        }}
        onMouseLeave={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = "transparent";
          }
        }}
      >
        <span style={{ fontSize: "10px", color: "#9ca3af" }}>
          {hasChildren ? "▾" : "▸"}
        </span>
        <span>{getComponentName(node.type)}</span>
      </div>
      {hasChildren && (
        <div>
          {node.children!.map((child) => (
            <LayerItem
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedNodeId={selectedNodeId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}