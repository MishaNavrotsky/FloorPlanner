// App.tsx
import { Stage } from "react-konva";
import { useCanvasSize } from "../../providers/canvas/size";
import ShapesLayer from "../ShapesLayer";
import { useControlEvents } from "../../providers/control/events";

const CanvasRoot = () => {
  const { size, viewport } = useCanvasSize();
  const { onStageReady } = useControlEvents();

  return (
    <Stage
      width={size.width}
      height={size.height}
      ref={(node) => { node && onStageReady?.(node) }}
      offsetX={viewport.offset[0] / viewport.scale}
      offsetY={viewport.offset[1] / viewport.scale}
      strokeScaleEnabled={false}
      scaleX={viewport.scale}
      scaleY={viewport.scale}
    >
      <ShapesLayer />
    </Stage >
  );
};


export default CanvasRoot;