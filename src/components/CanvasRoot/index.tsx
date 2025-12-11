// App.tsx
import { Stage } from "react-konva";
import Grid from "../Grid";
import { useCanvasSize } from "../../providers/canvas/size";
import ShapesLayer from "../ShapesLayer";
import { useControlEvents } from "../../providers/control/events";
import { useConfig } from "../../providers/config";

const CanvasRoot = () => {
  const { config } = useConfig();
  const { size } = useCanvasSize();
  const { onStageReady } = useControlEvents();

  return (
    <Stage width={size.width} height={size.height} ref={(node) => { node && onStageReady?.(node) }} style={{ backgroundColor: config.backgroundColor }}>
      <ShapesLayer />
    </Stage >
  );
};


export default CanvasRoot;