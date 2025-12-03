import { createContext, useContext } from "react";

export interface ShapeData {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface EditorContextValue {
  shapes: ShapeData[];
  addShape: (shape: Partial<ShapeData>) => void;
  updateShape: (id: string, patch: Partial<ShapeData>) => void;
}

export const EditorContext = createContext<EditorContextValue | null>(null);

export const useEditor = () => useContext(EditorContext);