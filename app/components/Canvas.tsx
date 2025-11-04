import { DndContext, DragEndEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useEditorStore } from "~/lib/store";
import { ComponentNode } from "~/models/types";
import { ComponentRenderer } from "./ComponentRenderer";
import { nanoid } from "nanoid";

export function Canvas() {
  const { pageContent, selectedNodeId, selectedViewport, setSelectedNode, addComponent } = useEditorStore();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || !pageContent) return;

    const draggedComponent = active.data.current?.component as ComponentNode;
    if (!draggedComponent) return;

    const targetId = over.id as string;
    
    // If dragging onto canvas or a container, add it
    if (targetId === "canvas" || targetId.startsWith("component-")) {
      const parentId = targetId === "canvas" ? pageContent.root.id : targetId.replace("component-", "");
      const newComponent: ComponentNode = {
        ...draggedComponent,
        id: nanoid(),
        children: [],
      };
      addComponent(parentId, newComponent);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    // Handle drag start if needed
  };

  const getViewportStyles = () => {
    switch (selectedViewport) {
      case "mobile":
        return { maxWidth: "375px", margin: "20px auto", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" };
      case "tablet":
        return { maxWidth: "768px", margin: "20px auto", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" };
      default:
        return { maxWidth: "100%", margin: "0" };
    }
  };

  if (!pageContent) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        color: "#9ca3af",
        fontSize: "14px"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>✨</div>
          <p>No page content loaded. Create a new page to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div style={{ 
        padding: selectedViewport === "desktop" ? "0" : "20px",
        minHeight: "100%",
        ...getViewportStyles()
      }}>
        <div
          id="canvas"
          onClick={() => setSelectedNode(null)}
          style={{
            minHeight: selectedViewport === "desktop" ? "100vh" : "600px",
            backgroundColor: "#ffffff",
            position: "relative",
            borderRadius: selectedViewport !== "desktop" ? "8px" : "0",
            overflow: "hidden",
          }}
        >
          <ComponentRenderer
            node={pageContent.root}
            isSelected={selectedNodeId === pageContent.root.id}
            onSelect={(id) => setSelectedNode(id)}
          />
        </div>
      </div>
    </DndContext>
  );
}