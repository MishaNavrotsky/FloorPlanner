import { useEffect, useState } from "react";
import { EditorContext, editorContextDefaults, type ShapeData } from "./EditorContext";
import { useControl } from "../control";

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const { onClick, onDbClick, onMouseDown, onMouseMove, onMouseUp, onWheel } = useControl();
  useEffect(() => {
  }, [])

  const [shapes, setShapes] = useState<ShapeData[]>(editorContextDefaults.shapes);
  const [tempShape, setTShape] = useState<ShapeData | null>(editorContextDefaults.tempShape);

  const addShape = (shape: Partial<ShapeData>) => {
    setShapes(prev => [
      ...prev,
      { id: crypto.randomUUID(), points: shape.points || [] }
    ]);
  };

  const updateShape = (id: string, patch: Partial<ShapeData>) => {
    setShapes(prev =>
      prev.map(s => s.id === id ? { ...s, ...patch } : s)
    );
  };

  const removeShape = (id: string) => {
    setShapes(prev => prev.filter(s => s.id != id))
  }

  const setTempShape = (shape: Partial<ShapeData> | null) => {
    const s: ShapeData | null = shape && {
      id: 'temp',
      points: shape.points ?? [],
    };
    setTShape(s);
  }

  return (
    <EditorContext.Provider value={{ shapes, addShape, updateShape, removeShape, tempShape, setTempShape }}>
      {children}
    </EditorContext.Provider>
  );
};