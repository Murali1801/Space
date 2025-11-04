import { useEditorStore } from "~/lib/store";
import { ComponentStyles } from "~/models/types";
import { PropsEditor } from "./PropsEditor";
import React, { useState } from "react";

function getComponentName(type: string): string {
  const names: Record<string, string> = {
    section: "Section",
    container: "Container",
    heading: "Heading",
    text: "Text",
    button: "Button",
    image: "Image",
    grid: "Grid",
    "product-box": "Product Box",
    "product-grid": "Product Grid",
  };
  return names[type] || type;
}

export function StyleInspector() {
  const { selectedNodeId, updateStyles, findNode } = useEditorStore();
  const [activeTab, setActiveTab] = useState<"styles" | "props">("styles");
  
  if (!selectedNodeId) {
    return (
      <div style={{ 
        width: "320px", 
        padding: "24px", 
        backgroundColor: "#ffffff", 
        height: "100vh", 
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#9ca3af"
      }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎨</div>
        <p style={{ fontSize: "14px", textAlign: "center", margin: 0 }}>
          Select a component to edit styles
        </p>
      </div>
    );
  }

  const node = findNode(selectedNodeId);
  if (!node) return null;

  const styles = node.styles || {};

  return (
    <div style={{ 
      width: "320px", 
      backgroundColor: "#ffffff", 
      height: "100vh", 
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>
      {/* Header with Tabs */}
      <div style={{ padding: "16px", borderBottom: "1px solid #e5e7eb" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 12px 0", color: "#111827" }}>
          {getComponentName(node.type)}
        </h2>
        
        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", backgroundColor: "#f3f4f6", padding: "4px", borderRadius: "6px" }}>
          <button
            onClick={() => setActiveTab("styles")}
            style={{
              flex: 1,
              padding: "6px 12px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: activeTab === "styles" ? "#ffffff" : "transparent",
              color: activeTab === "styles" ? "#111827" : "#6b7280",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: activeTab === "styles" ? "600" : "400",
              boxShadow: activeTab === "styles" ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
            }}
          >
            Styles
          </button>
          <button
            onClick={() => setActiveTab("props")}
            style={{
              flex: 1,
              padding: "6px 12px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: activeTab === "props" ? "#ffffff" : "transparent",
              color: activeTab === "props" ? "#111827" : "#6b7280",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: activeTab === "props" ? "600" : "400",
              boxShadow: activeTab === "props" ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
            }}
          >
            Properties
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
        {activeTab === "styles" ? (
          <>
            {/* Layout */}
            <StyleSection title="Layout">
              <StyleSelect
                label="Display"
                value={styles.display || "block"}
                onChange={(value) => updateStyles(selectedNodeId, { display: value as any })}
                options={["block", "flex", "grid", "inline-block", "none"]}
              />
              {styles.display === "flex" && (
                <>
                  <StyleSelect
                    label="Flex Direction"
                    value={styles.flexDirection || "row"}
                    onChange={(value) => updateStyles(selectedNodeId, { flexDirection: value as any })}
                    options={["row", "column", "row-reverse", "column-reverse"]}
                  />
                  <StyleSelect
                    label="Align Items"
                    value={styles.alignItems || "stretch"}
                    onChange={(value) => updateStyles(selectedNodeId, { alignItems: value as any })}
                    options={["flex-start", "flex-end", "center", "stretch", "baseline"]}
                  />
                  <StyleSelect
                    label="Justify Content"
                    value={styles.justifyContent || "flex-start"}
                    onChange={(value) => updateStyles(selectedNodeId, { justifyContent: value as any })}
                    options={["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"]}
                  />
                </>
              )}
              {styles.display === "grid" && (
                <StyleInput
                  label="Grid Template Columns"
                  value={styles.gridTemplateColumns || ""}
                  onChange={(value) => updateStyles(selectedNodeId, { gridTemplateColumns: value })}
                  placeholder="e.g., repeat(3, 1fr)"
                />
              )}
              <StyleInput
                label="Gap"
                value={styles.gap || ""}
                onChange={(value) => updateStyles(selectedNodeId, { gap: value })}
                placeholder="e.g., 20px"
              />
            </StyleSection>

            {/* Spacing */}
            <StyleSection title="Spacing">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <StyleInput
                  label="Margin Top"
                  value={styles.marginTop || ""}
                  onChange={(value) => updateStyles(selectedNodeId, { marginTop: value })}
                  placeholder="0px"
                />
                <StyleInput
                  label="Margin Right"
                  value={styles.marginRight || ""}
                  onChange={(value) => updateStyles(selectedNodeId, { marginRight: value })}
                  placeholder="0px"
                />
                <StyleInput
                  label="Margin Bottom"
                  value={styles.marginBottom || ""}
                  onChange={(value) => updateStyles(selectedNodeId, { marginBottom: value })}
                  placeholder="0px"
                />
                <StyleInput
                  label="Margin Left"
                  value={styles.marginLeft || ""}
                  onChange={(value) => updateStyles(selectedNodeId, { marginLeft: value })}
                  placeholder="0px"
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "8px" }}>
                <StyleInput
                  label="Padding Top"
                  value={styles.paddingTop || ""}
                  onChange={(value) => updateStyles(selectedNodeId, { paddingTop: value })}
                  placeholder="0px"
                />
                <StyleInput
                  label="Padding Right"
                  value={styles.paddingRight || ""}
                  onChange={(value) => updateStyles(selectedNodeId, { paddingRight: value })}
                  placeholder="0px"
                />
                <StyleInput
                  label="Padding Bottom"
                  value={styles.paddingBottom || ""}
                  onChange={(value) => updateStyles(selectedNodeId, { paddingBottom: value })}
                  placeholder="0px"
                />
                <StyleInput
                  label="Padding Left"
                  value={styles.paddingLeft || ""}
                  onChange={(value) => updateStyles(selectedNodeId, { paddingLeft: value })}
                  placeholder="0px"
                />
              </div>
            </StyleSection>

            {/* Size */}
            <StyleSection title="Size">
              <StyleInput
                label="Width"
                value={styles.width || ""}
                onChange={(value) => updateStyles(selectedNodeId, { width: value })}
                placeholder="e.g., 100%, 500px"
              />
              <StyleInput
                label="Height"
                value={styles.height || ""}
                onChange={(value) => updateStyles(selectedNodeId, { height: value })}
                placeholder="e.g., auto, 300px"
              />
              <StyleInput
                label="Max Width"
                value={styles.maxWidth || ""}
                onChange={(value) => updateStyles(selectedNodeId, { maxWidth: value })}
                placeholder="e.g., 1200px"
              />
            </StyleSection>

            {/* Typography */}
            <StyleSection title="Typography">
              <StyleInput
                label="Font Family"
                value={styles.fontFamily || ""}
                onChange={(value) => updateStyles(selectedNodeId, { fontFamily: value })}
                placeholder="e.g., Arial, sans-serif"
              />
              <StyleInput
                label="Font Size"
                value={styles.fontSize || ""}
                onChange={(value) => updateStyles(selectedNodeId, { fontSize: value })}
                placeholder="e.g., 16px, 1.2em"
              />
              <StyleInput
                label="Font Weight"
                value={styles.fontWeight?.toString() || ""}
                onChange={(value) => updateStyles(selectedNodeId, { fontWeight: value })}
                placeholder="e.g., 400, bold"
              />
              <StyleInput
                label="Color"
                type="color"
                value={styles.color || "#000000"}
                onChange={(value) => updateStyles(selectedNodeId, { color: value })}
              />
              <StyleInput
                label="Line Height"
                value={styles.lineHeight || ""}
                onChange={(value) => updateStyles(selectedNodeId, { lineHeight: value })}
                placeholder="e.g., 1.5"
              />
              <StyleSelect
                label="Text Align"
                value={styles.textAlign || "left"}
                onChange={(value) => updateStyles(selectedNodeId, { textAlign: value as any })}
                options={["left", "center", "right", "justify"]}
              />
            </StyleSection>

            {/* Background */}
            <StyleSection title="Background">
              <StyleInput
                label="Background Color"
                type="color"
                value={styles.backgroundColor || "#ffffff"}
                onChange={(value) => updateStyles(selectedNodeId, { backgroundColor: value })}
              />
              <StyleInput
                label="Background Image"
                value={styles.backgroundImage || ""}
                onChange={(value) => updateStyles(selectedNodeId, { backgroundImage: value ? `url(${value})` : undefined })}
                placeholder="URL or none"
              />
            </StyleSection>

            {/* Borders */}
            <StyleSection title="Borders">
              <StyleInput
                label="Border Width"
                value={styles.borderWidth || ""}
                onChange={(value) => updateStyles(selectedNodeId, { borderWidth: value })}
                placeholder="e.g., 1px"
              />
              <StyleInput
                label="Border Color"
                type="color"
                value={styles.borderColor || "#000000"}
                onChange={(value) => updateStyles(selectedNodeId, { borderColor: value })}
              />
              <StyleInput
                label="Border Radius"
                value={styles.borderRadius || ""}
                onChange={(value) => updateStyles(selectedNodeId, { borderRadius: value })}
                placeholder="e.g., 4px, 50%"
              />
            </StyleSection>
          </>
        ) : (
          <PropsEditor nodeId={selectedNodeId} />
        )}
      </div>
    </div>
  );
}

function getComponentName(type: string): string {
  const names: Record<string, string> = {
    section: "Section",
    container: "Container",
    heading: "Heading",
    text: "Text",
    button: "Button",
    image: "Image",
    grid: "Grid",
    "product-box": "Product Box",
    "product-grid": "Product Grid",
  };
  return names[type] || type;
}

interface StyleSectionProps {
  title: string;
  children: React.ReactNode;
}

function StyleSection({ title, children }: StyleSectionProps) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h3 style={{ fontSize: "12px", fontWeight: "600", marginBottom: "12px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

interface StyleInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "color";
}

function StyleInput({ label, value, onChange, placeholder, type = "text" }: StyleInputProps) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <label style={{ display: "block", fontSize: "12px", marginBottom: "6px", color: "#374151", fontWeight: "500" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "8px 12px",
          border: "1px solid #e5e7eb",
          borderRadius: "6px",
          fontSize: "13px",
          backgroundColor: "#ffffff",
          outline: "none",
          transition: "all 0.2s",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#667eea";
          e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#e5e7eb";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

interface StyleSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

function StyleSelect({ label, value, onChange, options }: StyleSelectProps) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <label style={{ display: "block", fontSize: "12px", marginBottom: "6px", color: "#374151", fontWeight: "500" }}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "8px 12px",
          border: "1px solid #e5e7eb",
          borderRadius: "6px",
          fontSize: "13px",
          backgroundColor: "#ffffff",
          outline: "none",
          cursor: "pointer",
          transition: "all 0.2s",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#667eea";
          e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#e5e7eb";
          e.target.style.boxShadow = "none";
        }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}