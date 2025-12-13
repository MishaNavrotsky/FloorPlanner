import { useRef, useLayoutEffect, useState } from "react";
import { CanvasSizeContext, canvasSizeContextDefaults, type ScaleOffsetOrigin } from "./CanvasSizeContext";
import clamp from "lodash.clamp";

export const CanvasSizeProvider = ({ children }: { children: React.ReactNode }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(canvasSizeContextDefaults.size);
  const [scaleOffsetOrigin, setScaleOffsetOrigin] = useState<ScaleOffsetOrigin>({
    scale: canvasSizeContextDefaults.viewport.scale,
    offset: canvasSizeContextDefaults.viewport.offset,
    origin: canvasSizeContextDefaults.viewport.origin,
  });

  const ref = useRef({ ...canvasSizeContextDefaults.viewport.ref });

  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      setSize({
        width: el.clientWidth,
        height: el.clientHeight,
        aspect: el.clientWidth / el.clientHeight,
      });
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const setScaleOffsetOriginOverride = (next: ScaleOffsetOrigin | ((next: ScaleOffsetOrigin) => ScaleOffsetOrigin)) => {
    setScaleOffsetOrigin((old) => {
      const newValue = typeof next === 'function' ? next(old) : next;

      if (newValue.scale < 5 || newValue.scale > 500) {
        newValue.scale = clamp(newValue.scale, 5, 500);
        return old;
      }

      ref.current.scale = newValue.scale;
      ref.current.offset = newValue.offset;
      ref.current.origin = newValue.origin;
      return newValue;
    });
  };

  return (
    <div
      ref={wrapperRef}
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <CanvasSizeContext.Provider value={{
        size,
        viewport: {
          scale: scaleOffsetOrigin.scale,
          offset: scaleOffsetOrigin.offset,
          origin: scaleOffsetOrigin.origin,
          ref: ref.current,
          setScaleOffsetOrigin: setScaleOffsetOriginOverride,
        },
        world: { width: size.width / scaleOffsetOrigin.scale, height: size.height / scaleOffsetOrigin.scale }
      }}>
        {size.width > 0 && children}
      </CanvasSizeContext.Provider>
    </div>
  );
};