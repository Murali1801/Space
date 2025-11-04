import { useEditorStore } from "~/lib/store";
import { ComponentNode } from "~/models/types";
import { getComponentName } from "./ComponentRenderer";

export function LayersPanel() {
  const { pageContent, selectedNodeId, setSelectedNode } = useEditorStore();

  if (!pageContent) {
    return (
      <div className="layers-panel" style={{ width: "250px", padding: "16px", backgroundColor: "#f5f5f5", height: "100vh", overflowY: "auto" }}>
        <p style={{ color: "#999", textAlign: "center", marginTop: "40px" }}>
          No page content
        </p>
      </div>
    );
  }

  return (
    <div className="layers-panel" style={{ width: "250px", padding: "16px", backgroundColor: "#f5f5f5", height: "100vh", overflowY: "auto" }}>
      <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}>Layers</h2>
      <LayerItem node={pageContent.root} depth={0} selectedNodeId={selectedNodeId} onSelect={setSelectedNode} />
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
          padding: "6px 8px",
          paddingLeft: `${depth * 16 + 8}px`,
          backgroundColor: isSelected ? "#e3f2fd" : "transparent",
          cursor: "pointer",
          borderRadius: "4px",
          marginBottom: "2px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "12px",
        }}
      >
        <span style={{ fontSize: "10px" }}>{hasChildren ? "▾" : "▸"}</span>
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

