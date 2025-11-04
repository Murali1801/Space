import { useDraggable } from "@dnd-kit/core";
import { COMPONENT_DEFINITIONS, ComponentType } from "~/models/types";
import { nanoid } from "nanoid";

interface ComponentLibraryProps {
  onComponentSelect?: (type: ComponentType) => void;
}

export function ComponentLibrary({ onComponentSelect }: ComponentLibraryProps) {
  const categories = ["layout", "basic", "shopify", "advanced"] as const;
  
  const componentsByCategory = categories.reduce((acc, category) => {
    acc[category] = Object.entries(COMPONENT_DEFINITIONS)
      .filter(([_, def]) => def.category === category)
      .map(([type]) => type as ComponentType);
    return acc;
  }, {} as Record<typeof categories[number], ComponentType[]>);

  return (
    <div className="component-library" style={{ width: "250px", padding: "16px", backgroundColor: "#f5f5f5", height: "100vh", overflowY: "auto" }}>
      <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}>Components</h2>
      
      {categories.map((category) => (
        <div key={category} style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "14px", fontWeight: "600", textTransform: "capitalize", marginBottom: "8px", color: "#666" }}>
            {category}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {componentsByCategory[category].map((type) => (
              <ComponentItem key={type} type={type} onSelect={onComponentSelect} />
            ))}
          </div>
        </div>
      ))}
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
    padding: "8px 12px",
    backgroundColor: "#ffffff",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    cursor: "grab",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      onClick={() => onSelect?.(type)}
    >
      <span>{definition.icon}</span>
      <span style={{ fontSize: "14px" }}>{definition.name}</span>
    </div>
  );
}

