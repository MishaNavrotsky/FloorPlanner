import { useEffect, useRef } from "react";
import { CanvasViewportContext } from "./CanvasViewportContext";
import { useControlEvents } from "../../control/events";
import { useCanvasSize } from "../size";
import type { Vector2d } from "konva/lib/types";

export const CanvasViewportProvider = ({ children }: { children: React.ReactNode }) => {
  const { onMouseDown, onMouseMove, onMouseUp, onWheel } = useControlEvents();
  const { viewport } = useCanvasSize();

  useEffect(() => {
    return onWheel((ev) => {
      ev.evt.preventDefault();

      const stage = ev.target.getStage();
      if (!stage) return;

      // mouse pos in screen pixels
      const origin = stage.getPointerPosition();
      if (!origin) return;

      const originPx = [origin.x, origin.y] as [number, number];
      viewport.setScaleOffsetOrigin(({ scale: oldScale, offset: oldOffset }) => {
        const zoomFactor = 1.05;
        const newScale =
          ev.evt.deltaY < 0
            ? oldScale * zoomFactor
            : oldScale / zoomFactor;

        const worldBefore = [
          (originPx[0] + oldOffset[0]) / oldScale,
          (originPx[1] + oldOffset[1]) / oldScale,
        ] as [number, number];

        const newOffset = [
          worldBefore[0] * newScale - originPx[0],
          worldBefore[1] * newScale - originPx[1],
        ] as [number, number];

        return {
          scale: newScale,
          offset: newOffset,
          origin: originPx,
        }
      });
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

        viewport.setScaleOffsetOrigin(({ scale: oldScale, offset: oldOffset, origin: oldOrigin }) => ({
          scale: oldScale,
          offset: [oldOffset[0] - dx, oldOffset[1] - dy],
          origin: oldOrigin,
        }));

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

  return (
    <CanvasViewportContext.Provider value={{}}>
      {children}
    </CanvasViewportContext.Provider>
  );
};