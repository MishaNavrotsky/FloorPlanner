import { createContext, useContext } from "react";

export interface ShapeData {
  id: string;
  points: number[];
}

interface CanvasShapesContextValue {
  shapes: ShapeData[];
  addShape: (shape: Partial<ShapeData>) => void;
  updateShape: (id: string, patch: Partial<ShapeData>) => void;
  removeShape: (id: string) => void;
}

export const canvasShapesContextDefaults: CanvasShapesContextValue = {
  shapes: [],
  addShape(shape) { },
  updateShape(id, patch) { },
  removeShape(id) { },
}

export const CanvasShapesContext = createContext<CanvasShapesContextValue>(canvasShapesContextDefaults);

export const useCanvasShapes = () => useContext(CanvasShapesContext);