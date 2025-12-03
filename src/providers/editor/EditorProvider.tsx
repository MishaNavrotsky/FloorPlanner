import { useState } from "react";
import { EditorContext, type ShapeData } from "./EditorContext";

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [shapes, setShapes] = useState<ShapeData[]>([]);

  const addShape = (shape: Partial<ShapeData>) => {
    setShapes(prev => [
      ...prev,
      { id: crypto.randomUUID(), x: 0, y: 0, width: 1, height: 1, ...shape }
    ]);
  };

  const updateShape = (id: string, patch: Partial<ShapeData>) => {
    setShapes(prev =>
      prev.map(s => s.id === id ? { ...s, ...patch } : s)
    );
  };

  return (
    <EditorContext.Provider value={{ shapes, addShape, updateShape }}>
      {children}
    </EditorContext.Provider>
  );
};