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
        return { maxWidth: "375px", margin: "0 auto" };
      case "tablet":
        return { maxWidth: "768px", margin: "0 auto" };
      default:
        return { maxWidth: "100%" };
    }
  };

  if (!pageContent) {
    return (
      <div className="canvas-empty">
        <p>No page content loaded. Create a new page to get started.</p>
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="canvas-container" style={getViewportStyles()}>
        <div
          id="canvas"
          className="canvas"
          onClick={() => setSelectedNode(null)}
          style={{
            minHeight: "100vh",
            backgroundColor: "#ffffff",
            position: "relative",
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

