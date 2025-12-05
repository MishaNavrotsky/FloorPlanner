// App.tsx
import { Stage } from "react-konva";
import Grid from "./components/Grid";
import { useCanvasSize } from "./providers/canvas/size";
import ShapesLayer from "./components/ShapesLayer";
import { useControl } from "./providers/control";
import { useConfig } from "./providers/config";

const CanvasRoot = () => {
  const { config } = useConfig();
  const { size } = useCanvasSize();
  const { onStageReady } = useControl();

  return (
    <Stage width={size.width} height={size.height} ref={(node) => { node && onStageReady?.(node) }} style={{ backgroundColor: config.backgroundColor }}>
      <Grid />
      <ShapesLayer />
    </Stage >
  );
};


export default CanvasRoot;