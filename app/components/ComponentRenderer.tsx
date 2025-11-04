import { useDraggable } from "@dnd-kit/core";
import { ComponentNode, ComponentStyles } from "~/models/types";
import { COMPONENT_DEFINITIONS } from "~/models/types";
import { useEditorStore } from "~/lib/store";
import { CSSProperties } from "react";

interface ComponentRendererProps {
  node: ComponentNode;
  isSelected: boolean;
  onSelect: (id: string) => void;
  depth?: number;
}

export function ComponentRenderer({ node, isSelected, onSelect, depth = 0 }: ComponentRendererProps) {
  const { selectedViewport, selectedNodeId } = useEditorStore();
  
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `component-${node.id}`,
    data: {
      component: node,
    },
  });

  const getStyles = (): ComponentStyles => {
    const baseStyles = node.styles || {};
    const responsiveStyles = node.responsiveStyles?.[selectedViewport] || {};
    return { ...baseStyles, ...responsiveStyles };
  };

  const styles = getStyles();
  const cssStyles: CSSProperties = {
    ...styles,
    position: "relative",
    outline: isSelected ? "2px solid #0066cc" : "none",
    outlineOffset: "2px",
    cursor: isSelected ? "pointer" : "default",
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(node.id);
  };

  const renderComponent = () => {
    switch (node.type) {
      case "section":
        return (
          <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            onClick={handleClick}
            style={cssStyles}
            className="component-section"
          >
            {renderChildren()}
          </div>
        );
      case "container":
        return (
          <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            onClick={handleClick}
            style={cssStyles}
            className="component-container"
          >
            {renderChildren()}
          </div>
        );
      case "grid":
        return (
          <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            onClick={handleClick}
            style={{
              ...cssStyles,
              gridTemplateColumns: `repeat(${node.props.columns || 3}, 1fr)`,
            }}
            className="component-grid"
          >
            {renderChildren()}
          </div>
        );
      case "heading":
        const level = node.props.level || 1;
        const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            onClick={handleClick}
            style={cssStyles}
            className="component-heading"
          >
            {node.props.heading || "Heading"}
          </HeadingTag>
        );
      case "text":
        return (
          <p
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            onClick={handleClick}
            style={cssStyles}
            className="component-text"
          >
            {node.props.text || "Text content"}
          </p>
        );
      case "button":
        return (
          <a
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            onClick={handleClick}
            href={node.props.href || "#"}
            style={cssStyles}
            className="component-button"
          >
            {node.props.text || "Button"}
          </a>
        );
      case "image":
        return (
          <img
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            onClick={handleClick}
            src={node.props.src || ""}
            alt={node.props.alt || ""}
            style={cssStyles}
            className="component-image"
          />
        );
      case "product-box":
        return (
          <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            onClick={handleClick}
            style={cssStyles}
            className="component-product-box"
          >
            {node.props.productId ? (
              <div>
                <p>Product: {node.props.productId}</p>
                {/* Product data will be rendered here */}
              </div>
            ) : (
              <div style={{ padding: "20px", border: "2px dashed #ccc", textAlign: "center" }}>
                Select a product
              </div>
            )}
            {renderChildren()}
          </div>
        );
      default:
        return (
          <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            onClick={handleClick}
            style={cssStyles}
            className={`component-${node.type}`}
          >
            {renderChildren()}
          </div>
        );
    }
  };

  const renderChildren = () => {
    if (!node.children || node.children.length === 0) return null;
    
    return (
      <>
        {node.children.map((child) => (
          <ComponentRenderer
            key={child.id}
            node={child}
            isSelected={selectedNodeId === child.id}
            onSelect={onSelect}
            depth={depth + 1}
          />
        ))}
      </>
    );
  };

  return renderComponent();
}

// Export helper to get component name
export function getComponentName(type: ComponentNode["type"]): string {
  return COMPONENT_DEFINITIONS[type]?.name || type;
}

