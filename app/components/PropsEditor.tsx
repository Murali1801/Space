import { useEditorStore } from "~/lib/store";
import React from "react";

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
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", marginBottom: "6px", color: "#374151", fontWeight: "500" }}>
                Heading Text
              </label>
              <input
                type="text"
                value={node.props.heading || ""}
                onChange={(e) => handlePropChange("heading", e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  fontSize: "13px",
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", marginBottom: "6px", color: "#374151", fontWeight: "500" }}>
                Level
              </label>
              <select
                value={node.props.level || 1}
                onChange={(e) => handlePropChange("level", parseInt(e.target.value))}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  fontSize: "13px",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                {[1, 2, 3, 4, 5, 6].map((level) => (
                  <option key={level} value={level}>
                    H{level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );
      
      case "text":
        return (
          <div>
            <label style={{ display: "block", fontSize: "12px", marginBottom: "6px", color: "#374151", fontWeight: "500" }}>
              Text Content
            </label>
            <textarea
              value={node.props.text || ""}
              onChange={(e) => handlePropChange("text", e.target.value)}
              rows={4}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                fontSize: "13px",
                outline: "none",
                fontFamily: "inherit",
                resize: "vertical",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
              }}
            />
          </div>
        );
      
      case "button":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", marginBottom: "6px", color: "#374151", fontWeight: "500" }}>
                Button Text
              </label>
              <input
                type="text"
                value={node.props.text || ""}
                onChange={(e) => handlePropChange("text", e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  fontSize: "13px",
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", marginBottom: "6px", color: "#374151", fontWeight: "500" }}>
                Link URL
              </label>
              <input
                type="text"
                value={node.props.href || ""}
                onChange={(e) => handlePropChange("href", e.target.value)}
                placeholder="https://..."
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  fontSize: "13px",
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                }}
              />
            </div>
          </div>
        );
      
      case "image":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", marginBottom: "6px", color: "#374151", fontWeight: "500" }}>
                Image URL
              </label>
              <input
                type="text"
                value={node.props.src || ""}
                onChange={(e) => handlePropChange("src", e.target.value)}
                placeholder="https://..."
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  fontSize: "13px",
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", marginBottom: "6px", color: "#374151", fontWeight: "500" }}>
                Alt Text
              </label>
              <input
                type="text"
                value={node.props.alt || ""}
                onChange={(e) => handlePropChange("alt", e.target.value)}
                placeholder="Description"
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  fontSize: "13px",
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                }}
              />
            </div>
          </div>
        );
      
      case "product-box":
        return <ProductBoxPropsEditor node={node} onUpdate={handlePropChange} />;
      
      case "grid":
        return (
          <div>
            <label style={{ display: "block", fontSize: "12px", marginBottom: "6px", color: "#374151", fontWeight: "500" }}>
              Columns
            </label>
            <input
              type="number"
              value={node.props.columns || 3}
              onChange={(e) => handlePropChange("columns", parseInt(e.target.value))}
              min={1}
              max={12}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                fontSize: "13px",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
              }}
            />
          </div>
        );
      
      default:
        return (
          <div style={{ color: "#9ca3af", fontSize: "13px", textAlign: "center", padding: "20px" }}>
            No props available for this component
          </div>
        );
    }
  };

  return (
    <div style={{ paddingTop: "16px", borderTop: "1px solid #e5e7eb", marginTop: "16px" }}>
      <h3 style={{ fontSize: "12px", fontWeight: "600", marginBottom: "12px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>
        Properties
      </h3>
      {renderPropsEditor()}
    </div>
  );
}

interface ProductBoxPropsEditorProps {
  node: any;
  onUpdate: (key: string, value: any) => void;
}

function ProductBoxPropsEditor({ node, onUpdate }: ProductBoxPropsEditorProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div>
        <label style={{ display: "block", fontSize: "12px", marginBottom: "6px", color: "#374151", fontWeight: "500" }}>
          Product ID
        </label>
        <input
          type="text"
          value={node.props.productId || ""}
          onChange={(e) => onUpdate("productId", e.target.value)}
          placeholder="gid://shopify/Product/..."
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #e5e7eb",
            borderRadius: "6px",
            fontSize: "13px",
            outline: "none",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#667eea";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e5e7eb";
          }}
        />
      </div>
      <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>
        Use the product picker to select a product
      </p>
    </div>
  );
}