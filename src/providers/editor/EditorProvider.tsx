import { useEffect, useRef, useState } from "react";
import { EditorContext, editorContextDefaults, type ShapeData } from "./EditorContext";
import { useControl } from "../control";
import { useCanvasSize } from "../canvas";
import type { Vector2d } from "konva/lib/types";

function rectCornersFlat(p1: Vector2d, p2: Vector2d): number[] {
  return [
    p1.x, p1.y,
    p2.x, p1.y,
    p2.x, p2.y,
    p1.x, p2.y,
  ];
}

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const { onClick, onDbClick, onMouseDown, onMouseMove, onMouseUp, onWheel } = useControl();
  const { viewport } = useCanvasSize();

  const [shapes, setShapes] = useState<ShapeData[]>(editorContextDefaults.shapes);
  const [tempShape, setTShape] = useState<ShapeData | null>(editorContextDefaults.tempShape);
  const tempShapeRef = useRef<ShapeData['points'] | null>(null);

  const setTempShape = (shape: Partial<ShapeData> | null) => {
    const s: ShapeData | null = shape && {
      id: 'temp',
      points: shape.points ?? [],
    };
    setTShape(s);
  }

  const addShape = (shape: Partial<ShapeData>) => {
    setShapes(prev => [
      ...prev,
      { id: crypto.randomUUID(), points: shape.points || [] }
    ]);
  };

  useEffect(() => {
    return onMouseDown((ev) => {
      const mouseDP = ev.target.getStage()?.getPointerPosition();
      if (!mouseDP) return;
      mouseDP.x /= viewport.scale;
      mouseDP.y /= viewport.scale;
      mouseDP.x = Math.floor(mouseDP.x);
      mouseDP.y = Math.floor(mouseDP.y);

      const f = onMouseMove((ev) => {
        const mouseP = ev.target.getStage()?.getPointerPosition();
        if (!mouseP) return;
        mouseP.x /= viewport.scale;
        mouseP.y /= viewport.scale;

        mouseP.x = mouseP.x >= mouseDP.x ? Math.ceil(mouseP.x) : Math.floor(mouseP.x);
        mouseP.y = mouseP.y >= mouseDP.y ? Math.ceil(mouseP.y) : Math.floor(mouseP.y);

        tempShapeRef.current = rectCornersFlat(mouseDP, mouseP);
        setTempShape({ points: [...tempShapeRef.current] })
      });

      const ff = onMouseUp(() => {
        f();
        ff();

        setTShape(null);
        tempShapeRef.current && addShape({ points: [...tempShapeRef.current] });
      })
    });
  }, [viewport.scale])

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
    <EditorContext.Provider value={{ shapes, addShape, updateShape, removeShape, tempShape, setTempShape }}>
      {children}
    </EditorContext.Provider>
  );
};