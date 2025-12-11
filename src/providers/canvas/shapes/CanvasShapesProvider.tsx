import { useEffect, useRef, useState } from "react";
import { CanvasShapesContext, canvasShapesContextDefaults, type ShapeData } from "./CanvasShapesContext";
import { useControlEvents } from "../../control/events";
import { useCanvasSize } from "../size";
import type { Vector2d } from "konva/lib/types";

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
      viewport.setScale((scale) => scale - Math.sign(ev.evt.deltaY) * 1.05);
    })
  }, [])

  const lastPos = useRef<Vector2d | undefined>(null);

  useEffect(() => {
    return onMouseDown((ev) => {
      if (ev.evt.button !== 1) return;

      lastPos.current = ev.target.getStage()?.getPointerPosition();
      if (!lastPos.current) return;

      const stopMove = onMouseMove((ev) => {
        const p = ev.target.getStage()?.getPointerPosition();
        if (!p || !lastPos.current) return;

        const dx = p.x - lastPos.current.x;
        const dy = p.y - lastPos.current.y;

        viewport.setOffset(old => [old[0] - dx, old[1] - dy]);

        lastPos.current = p;
      });

      const stopUp = onMouseUp((ev) => {
        if (ev.evt.button !== 1) return;
        stopMove();
        stopUp();
        lastPos.current = null;
      });
    });
  }, []);

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