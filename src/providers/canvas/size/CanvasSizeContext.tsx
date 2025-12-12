import { createContext, useContext } from "react";

export type ScaleOffsetOrigin = {
  scale: number,
  offset: [number, number],
  origin: [number, number],
}

export interface CanvasSize {
  size: {
    width: number,
    height: number,
    aspect: number,
  },
  viewport: {
    scale: number,
    offset: [number, number],
    origin: [number, number],
    setScaleOffsetOrigin: (next: ScaleOffsetOrigin | ((next: ScaleOffsetOrigin) => ScaleOffsetOrigin)) => void;
    ref: {
      scale: number,
      offset: [number, number],
      origin: [number, number],
    }
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
    origin: [0, 0],
    ref: {
      scale: 15,
      offset: [0, 0],
      origin: [0, 0],
    },
    setScaleOffsetOrigin: () => { },
  },
  world: {
    width: 0,
    height: 0,
  }
}

export const CanvasSizeContext = createContext<CanvasSize>(canvasSizeContextDefaults);

export const useCanvasSize = () => useContext(CanvasSizeContext);