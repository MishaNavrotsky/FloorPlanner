import { useRef, useLayoutEffect, useState } from "react";
import { CanvasSizeContext, canvasSizeContextDefaults } from "./CanvasSizeContext";

export const CanvasSizeProvider = ({ children }: { children: React.ReactNode }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(canvasSizeContextDefaults.size);
  const [scale, setScale] = useState(canvasSizeContextDefaults.viewport.scale);

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
      <CanvasSizeContext.Provider value={{ size, viewport: { scale, setScale }, world: { width: size.width / scale, height: size.height / scale } }}>
        {size.width > 0 && children}
      </CanvasSizeContext.Provider>
    </div>
  );
};