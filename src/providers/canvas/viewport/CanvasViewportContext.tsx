import { createContext, useContext } from "react";

interface CanvasViewportContextValue {
}

export const canvasShapesContextDefaults: CanvasViewportContextValue = {
}

export const CanvasViewportContext = createContext<CanvasViewportContextValue>(canvasShapesContextDefaults);

export const useCanvasViewport = () => useContext(CanvasViewportContext);