import { createContext, useContext } from "react";

export interface ShapeData {
  id: string;
  points: number[];
}

interface EditorContextValue {
  shapes: ShapeData[];
  addShape: (shape: Partial<ShapeData>) => void;
  updateShape: (id: string, patch: Partial<ShapeData>) => void;
  removeShape: (id: string) => void;

  tempShape: ShapeData | null;
  setTempShape: (shape: Partial<ShapeData> | null) => void;
}

export const editorContextDefaults: EditorContextValue = {
  shapes: [],
  addShape(shape) { },
  updateShape(id, patch) { },
  removeShape(id) { },

  tempShape: { id: 'temp', points: [10, 10, 20, 10, 20, 30, 10, 30] },
  setTempShape(shape) { },
}

export const EditorContext = createContext<EditorContextValue>(editorContextDefaults);

export const useEditor = () => useContext(EditorContext);