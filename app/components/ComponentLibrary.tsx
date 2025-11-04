import { useDraggable } from "@dnd-kit/core";
import { COMPONENT_DEFINITIONS, ComponentType } from "~/models/types";
import { nanoid } from "nanoid";
import React, { useState } from "react";

interface ComponentLibraryProps {
  onComponentSelect?: (type: ComponentType) => void;
}

export function ComponentLibrary({ onComponentSelect }: ComponentLibraryProps) {
  const categories = ["layout", "basic", "shopify", "advanced"] as const;
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(categories));
  
  const componentsByCategory = categories.reduce((acc, category) => {
    acc[category] = Object.entries(COMPONENT_DEFINITIONS)
      .filter(([_, def]) => def.category === category)
      .map(([type]) => type as ComponentType)
      .filter((type) => {
        const def = COMPONENT_DEFINITIONS[type];
        return def.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
    return acc;
  }, {} as Record<typeof categories[number], ComponentType[]>);

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const categoryLabels: Record<string, string> = {
    layout: "Layout",
    basic: "Basic",
    shopify: "Shopify",
    advanced: "Advanced",
  };

  return (
    <div style={{ 
      width: "280px", 
      backgroundColor: "#ffffff",
      borderRight: "1px solid #e5e7eb",
      height: "100vh", 
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>
      {/* Header */}
      <div style={{ padding: "16px", borderBottom: "1px solid #e5e7eb" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 12px 0", color: "#111827" }}>Components</h2>
        
        {/* Search */}
        <input
          type="text"
          placeholder="Search components..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #e5e7eb",
            borderRadius: "6px",
            fontSize: "13px",
            backgroundColor: "#f9fafb",
            outline: "none",
            transition: "all 0.2s",
          }}
          onFocus={(e) => {
            e.target.style.backgroundColor = "#ffffff";
            e.target.style.borderColor = "#667eea";
          }}
          onBlur={(e) => {
            e.target.style.backgroundColor = "#f9fafb";
            e.target.style.borderColor = "#e5e7eb";
          }}
        />
      </div>
      
      {/* Components List */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
        {categories.map((category) => {
          const components = componentsByCategory[category];
          if (components.length === 0 && searchQuery) return null;
          
          return (
            <div key={category} style={{ marginBottom: "8px" }}>
              <button
                onClick={() => toggleCategory(category)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  backgroundColor: "transparent",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <span>{categoryLabels[category]}</span>
                <span style={{ fontSize: "10px" }}>
                  {expandedCategories.has(category) ? "▼" : "▶"}
                </span>
              </button>
              
              {expandedCategories.has(category) && (
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "4px" }}>
                  {components.map((type) => (
                    <ComponentItem key={type} type={type} onSelect={onComponentSelect} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface ComponentItemProps {
  type: ComponentType;
  onSelect?: (type: ComponentType) => void;
}

function ComponentItem({ type, onSelect }: ComponentItemProps) {
  const definition = COMPONENT_DEFINITIONS[type];
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `library-${type}`,
    data: {
      component: {
        id: nanoid(),
        type,
        props: definition.defaultProps,
        styles: definition.defaultStyles,
        children: [],
      },
    },
  });

  const style: React.CSSProperties = {
    padding: "10px 12px",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    cursor: isDragging ? "grabbing" : "grab",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1,
    transition: "all 0.2s",
    boxShadow: isDragging ? "0 4px 12px rgba(0,0,0,0.15)" : "0 1px 2px rgba(0,0,0,0.05)",
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      onClick={() => onSelect?.(type)}
      onMouseEnter={(e) => {
        if (!isDragging) {
          e.currentTarget.style.backgroundColor = "#f9fafb";
          e.currentTarget.style.borderColor = "#667eea";
        }
      }}
      onMouseLeave={(e) => {
        if (!isDragging) {
          e.currentTarget.style.backgroundColor = "#ffffff";
          e.currentTarget.style.borderColor = "#e5e7eb";
        }
      }}
    >
      <span style={{ fontSize: "16px" }}>{definition.icon}</span>
      <span style={{ fontSize: "13px", fontWeight: "500", color: "#111827" }}>{definition.name}</span>
    </div>
  );
}