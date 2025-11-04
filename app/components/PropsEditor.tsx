import React from "react";
import { useFetcher } from "@remix-run/react";
import { useEditorStore } from "~/lib/store";
import { ProductPickerModal } from "./ProductPickerModal";

interface PropsEditorProps {
  nodeId: string;
}

export function PropsEditor({ nodeId }: PropsEditorProps) {
  const { findNode, updateComponent } = useEditorStore();
  const node = findNode(nodeId);
  
  if (!node) return null;

  const handlePropChange = (key: string, value: any) => {
    updateComponent(nodeId, {
      props: {
        ...node.props,
        [key]: value,
      },
    });
  };

  const renderPropsEditor = () => {
    switch (node.type) {
      case "heading":
        return (
          <div>
            <label>Heading Text</label>
            <input
              type="text"
              value={node.props.heading || ""}
              onChange={(e) => handlePropChange("heading", e.target.value)}
            />
            <label>Level</label>
            <select
              value={node.props.level || 1}
              onChange={(e) => handlePropChange("level", parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <option key={level} value={level}>
                  H{level}
                </option>
              ))}
            </select>
          </div>
        );
      
      case "text":
        return (
          <div>
            <label>Text Content</label>
            <textarea
              value={node.props.text || ""}
              onChange={(e) => handlePropChange("text", e.target.value)}
              rows={4}
            />
          </div>
        );
      
      case "button":
        return (
          <div>
            <label>Button Text</label>
            <input
              type="text"
              value={node.props.text || ""}
              onChange={(e) => handlePropChange("text", e.target.value)}
            />
            <label>Link URL</label>
            <input
              type="text"
              value={node.props.href || ""}
              onChange={(e) => handlePropChange("href", e.target.value)}
            />
          </div>
        );
      
      case "image":
        return (
          <div>
            <label>Image URL</label>
            <input
              type="text"
              value={node.props.src || ""}
              onChange={(e) => handlePropChange("src", e.target.value)}
            />
            <label>Alt Text</label>
            <input
              type="text"
              value={node.props.alt || ""}
              onChange={(e) => handlePropChange("alt", e.target.value)}
            />
          </div>
        );
      
      case "product-box":
        return <ProductBoxPropsEditor node={node} onUpdate={handlePropChange} />;
      
      case "grid":
        return (
          <div>
            <label>Columns</label>
            <input
              type="number"
              value={node.props.columns || 3}
              onChange={(e) => handlePropChange("columns", parseInt(e.target.value))}
              min={1}
              max={12}
            />
          </div>
        );
      
      default:
        return <div>No props available for this component</div>;
    }
  };

  return (
    <div style={{ padding: "16px", borderTop: "1px solid #e0e0e0" }}>
      <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>Properties</h3>
      {renderPropsEditor()}
    </div>
  );
}

interface ProductBoxPropsEditorProps {
  node: any;
  onUpdate: (key: string, value: any) => void;
}

function ProductBoxPropsEditor({ node, onUpdate }: ProductBoxPropsEditorProps) {
  const [isPickerOpen, setIsPickerOpen] = React.useState(false);

  return (
    <div>
      <label>Product</label>
      <div style={{ marginBottom: "8px" }}>
        {node.props.productId ? (
          <div>
            <span>Product ID: {node.props.productId}</span>
            <button onClick={() => onUpdate("productId", "")} style={{ marginLeft: "8px" }}>
              Clear
            </button>
          </div>
        ) : (
          <button onClick={() => setIsPickerOpen(true)}>Select Product</button>
        )}
      </div>
      <ProductPickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelect={(productId) => {
          onUpdate("productId", productId);
        }}
      />
    </div>
  );
}

