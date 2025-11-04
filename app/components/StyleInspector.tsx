import { useEditorStore } from "~/lib/store";
import { ComponentStyles } from "~/models/types";
import { PropsEditor } from "./PropsEditor";

export function StyleInspector() {
  const { selectedNodeId, updateStyles, findNode } = useEditorStore();
  
  if (!selectedNodeId) {
    return (
      <div className="style-inspector" style={{ width: "300px", padding: "16px", backgroundColor: "#f5f5f5", height: "100vh", overflowY: "auto" }}>
        <p style={{ color: "#999", textAlign: "center", marginTop: "40px" }}>
          Select a component to edit styles
        </p>
      </div>
    );
  }

  const node = findNode(selectedNodeId);
  if (!node) return null;

  const styles = node.styles || {};

  return (
    <div className="style-inspector" style={{ width: "300px", padding: "16px", backgroundColor: "#f5f5f5", height: "100vh", overflowY: "auto" }}>
      <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}>Styles</h2>
      
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
        <StyleInput
          label="Margin Top"
          value={styles.marginTop || ""}
          onChange={(value) => updateStyles(selectedNodeId, { marginTop: value })}
          placeholder="e.g., 20px"
        />
        <StyleInput
          label="Margin Right"
          value={styles.marginRight || ""}
          onChange={(value) => updateStyles(selectedNodeId, { marginRight: value })}
          placeholder="e.g., 20px"
        />
        <StyleInput
          label="Margin Bottom"
          value={styles.marginBottom || ""}
          onChange={(value) => updateStyles(selectedNodeId, { marginBottom: value })}
          placeholder="e.g., 20px"
        />
        <StyleInput
          label="Margin Left"
          value={styles.marginLeft || ""}
          onChange={(value) => updateStyles(selectedNodeId, { marginLeft: value })}
          placeholder="e.g., 20px"
        />
        <StyleInput
          label="Padding Top"
          value={styles.paddingTop || ""}
          onChange={(value) => updateStyles(selectedNodeId, { paddingTop: value })}
          placeholder="e.g., 20px"
        />
        <StyleInput
          label="Padding Right"
          value={styles.paddingRight || ""}
          onChange={(value) => updateStyles(selectedNodeId, { paddingRight: value })}
          placeholder="e.g., 20px"
        />
        <StyleInput
          label="Padding Bottom"
          value={styles.paddingBottom || ""}
          onChange={(value) => updateStyles(selectedNodeId, { paddingBottom: value })}
          placeholder="e.g., 20px"
        />
        <StyleInput
          label="Padding Left"
          value={styles.paddingLeft || ""}
          onChange={(value) => updateStyles(selectedNodeId, { paddingLeft: value })}
          placeholder="e.g., 20px"
        />
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
      
      {/* Component Props */}
      {selectedNodeId && <PropsEditor nodeId={selectedNodeId} />}
    </div>
  );
}

interface StyleSectionProps {
  title: string;
  children: React.ReactNode;
}

function StyleSection({ title, children }: StyleSectionProps) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "8px", color: "#666" }}>
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
    <div style={{ marginBottom: "8px" }}>
      <label style={{ display: "block", fontSize: "12px", marginBottom: "4px", color: "#666" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "6px 8px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          fontSize: "12px",
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
    <div style={{ marginBottom: "8px" }}>
      <label style={{ display: "block", fontSize: "12px", marginBottom: "4px", color: "#666" }}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "6px 8px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          fontSize: "12px",
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

