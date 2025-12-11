import { createContext, useContext } from "react";

export interface CanvasSize {
  size: {
    width: number,
    height: number,
    aspect: number,
  },
  viewport: {
    scale: number,
    offset: [number, number],
    setOffset: (nextOffset: [number, number] | ((offset: [number, number]) => [number, number])) => void;
    setScale: (nextScale: number | ((scale: number) => number)) => void;
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
    offset: [0, 0],
    setOffset(_) { },
    setScale(_) { },
  },
  world: {
    width: 0,
    height: 0,
  }
}

export const CanvasSizeContext = createContext<CanvasSize>(canvasSizeContextDefaults);

export const useCanvasSize = () => useContext(CanvasSizeContext);