// Zustand store for editor state management

import { create } from "zustand";
import { ComponentNode, PageContent, ComponentStyles } from "~/models/types";
import { nanoid } from "nanoid";

interface EditorState {
  // Current page state
  pageContent: PageContent | null;
  selectedNodeId: string | null;
  selectedViewport: "mobile" | "tablet" | "desktop";
  
  // Actions
  setPageContent: (content: PageContent) => void;
  setSelectedNode: (nodeId: string | null) => void;
  setViewport: (viewport: "mobile" | "tablet" | "desktop") => void;
  
  // Component manipulation
  addComponent: (parentId: string, component: ComponentNode) => void;
  removeComponent: (nodeId: string) => void;
  updateComponent: (nodeId: string, updates: Partial<ComponentNode>) => void;
  moveComponent: (nodeId: string, newParentId: string, index: number) => void;
  
  // Style updates
  updateStyles: (nodeId: string, styles: Partial<ComponentStyles>) => void;
  
  // Helper to find node by ID
  findNode: (nodeId: string, node?: ComponentNode) => ComponentNode | null;
  
  // Helper to update node recursively
  updateNodeRecursive: (
    node: ComponentNode,
    nodeId: string,
    updater: (node: ComponentNode) => ComponentNode
  ) => ComponentNode | null;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  pageContent: null,
  selectedNodeId: null,
  selectedViewport: "desktop",
  
  setPageContent: (content) => set({ pageContent: content }),
  
  setSelectedNode: (nodeId) => set({ selectedNodeId: nodeId }),
  
  setViewport: (viewport) => set({ selectedViewport: viewport }),
  
  findNode: (nodeId, node) => {
    const root = node || get().pageContent?.root;
    if (!root) return null;
    
    if (root.id === nodeId) return root;
    
    for (const child of root.children || []) {
      const found = get().findNode(nodeId, child);
      if (found) return found;
    }
    
    return null;
  },
  
  updateNodeRecursive: (node, nodeId, updater) => {
    if (node.id === nodeId) {
      return updater(node);
    }
    
    if (node.children && node.children.length > 0) {
      return {
        ...node,
        children: node.children
          .map((child) => get().updateNodeRecursive(child, nodeId, updater))
          .filter((child): child is ComponentNode => child !== null),
      };
    }
    
    return null;
  },
  
  addComponent: (parentId, component) => {
    const { pageContent } = get();
    if (!pageContent) return;
    
    const parent = get().findNode(parentId);
    if (!parent) return;
    
    const updatedRoot = get().updateNodeRecursive(pageContent.root, parentId, (node) => ({
      ...node,
      children: [...(node.children || []), component],
    }));
    
    if (updatedRoot) {
      set({
        pageContent: {
          ...pageContent,
          root: updatedRoot,
        },
      });
    }
  },
  
  removeComponent: (nodeId) => {
    const { pageContent } = get();
    if (!pageContent) return;
    
    const removeFromParent = (node: ComponentNode): ComponentNode | null => {
      if (!node.children) return node;
      
      const filteredChildren = node.children
        .filter((child) => child.id !== nodeId)
        .map((child) => removeFromParent(child))
        .filter((child): child is ComponentNode => child !== null);
      
      return {
        ...node,
        children: filteredChildren,
      };
    };
    
    const updatedRoot = removeFromParent(pageContent.root);
    
    if (updatedRoot) {
      set({
        pageContent: {
          ...pageContent,
          root: updatedRoot,
        },
        selectedNodeId: null,
      });
    }
  },
  
  updateComponent: (nodeId, updates) => {
    const { pageContent } = get();
    if (!pageContent) return;
    
    const updatedRoot = get().updateNodeRecursive(pageContent.root, nodeId, (node) => ({
      ...node,
      ...updates,
    }));
    
    if (updatedRoot) {
      set({
        pageContent: {
          ...pageContent,
          root: updatedRoot,
        },
      });
    }
  },
  
  moveComponent: (nodeId, newParentId, index) => {
    const { pageContent } = get();
    if (!pageContent) return;
    
    const nodeToMove = get().findNode(nodeId);
    if (!nodeToMove) return;
    
    // First, remove from old parent
    const removeFromTree = (node: ComponentNode): ComponentNode => {
      return {
        ...node,
        children: (node.children || [])
          .filter((child) => child.id !== nodeId)
          .map((child) => removeFromTree(child)),
      };
    };
    
    // Then add to new parent
    const addToParent = (node: ComponentNode): ComponentNode | null => {
      if (node.id === newParentId) {
        const children = [...(node.children || [])];
        children.splice(index, 0, nodeToMove);
        return {
          ...node,
          children,
        };
      }
      
      return {
        ...node,
        children: (node.children || []).map((child) => addToParent(child)).filter((child): child is ComponentNode => child !== null),
      };
    };
    
    let updatedRoot = removeFromTree(pageContent.root);
    updatedRoot = addToParent(updatedRoot) || updatedRoot;
    
    set({
      pageContent: {
        ...pageContent,
        root: updatedRoot,
      },
    });
  },
  
  updateStyles: (nodeId, styles) => {
    const { pageContent, selectedViewport } = get();
    if (!pageContent) return;
    
    const updatedRoot = get().updateNodeRecursive(pageContent.root, nodeId, (node) => {
      if (selectedViewport === "desktop") {
        return {
          ...node,
          styles: {
            ...node.styles,
            ...styles,
          },
        };
      } else {
        return {
          ...node,
          responsiveStyles: {
            ...node.responsiveStyles,
            [selectedViewport]: {
              ...node.responsiveStyles?.[selectedViewport],
              ...styles,
            },
          },
        };
      }
    });
    
    if (updatedRoot) {
      set({
        pageContent: {
          ...pageContent,
          root: updatedRoot,
        },
      });
    }
  },
}));

