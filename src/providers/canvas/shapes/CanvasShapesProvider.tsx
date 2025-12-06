import { useEffect, useState } from "react";
import { CanvasShapesContext, canvasShapesContextDefaults, type ShapeData } from "./CanvasShapesContext";
import { useControlEvents } from "../../control/events";
import { useCanvasSize } from "../size";

export const CanvasShapesProvider = ({ children }: { children: React.ReactNode }) => {
  const { onClick, onDbClick, onMouseDown, onMouseMove, onMouseUp, onWheel } = useControlEvents();
  const { viewport } = useCanvasSize();

  const [shapes, setShapes] = useState<ShapeData[]>(canvasShapesContextDefaults.shapes);

  const addShape = (shape: Partial<ShapeData>) => {
    setShapes(prev => [
      ...prev,
      { id: crypto.randomUUID(), points: shape.points || [] }
    ]);
  };


  useEffect(() => {
    return onWheel((ev) => {
      ev.evt.preventDefault();
      viewport.setScale((scale) => scale - Math.sign(ev.evt.deltaY) * 1.1);
    })
  }, [])

  const updateShape = (id: string, patch: Partial<ShapeData>) => {
    setShapes(prev =>
      prev.map(s => s.id === id ? { ...s, ...patch } : s)
    );
  };

  const removeShape = (id: string) => {
    setShapes(prev => prev.filter(s => s.id != id))
  }

  return (
    <CanvasShapesContext.Provider value={{ shapes, addShape, updateShape, removeShape }}>
      {children}
    </CanvasShapesContext.Provider>
  );
};