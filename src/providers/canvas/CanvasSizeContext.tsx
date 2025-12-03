import { createContext, useContext } from "react";

export interface CanvasSize {
    size: {
        width: number,
        height: number,
        aspect: number,
    },
    viewport: {
        scale: number,
        setScale: (nextScale: number) => void;
    },
    world: {
        width: number,
        height: number,
    }
 
}

export const canvasSizeContextDefaults: CanvasSize = {
    size: {
        width: 0,
        height: 0,
        aspect: 0,
    },
    viewport: {
        scale: 15,
        setScale(nextScale) {},
    },
    world: {
        width: 0,
        height: 0,
    }
}

export const CanvasSizeContext = createContext<CanvasSize>(canvasSizeContextDefaults);

export const useCanvasSize = () => useContext(CanvasSizeContext);