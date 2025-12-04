// App.tsx
import { Stage } from "react-konva";
import Grid from "./components/Grid";
import { useCanvasSize } from "./providers/canvas";
import ShapesLayer from "./components/ShapesLayer";
import { useControl } from "./providers/control";

const CanvasRoot = () => {
  const { size } = useCanvasSize();
  const { onStageReady } = useControl();

  return (
    <Stage width={size.width} height={size.height} ref={(node) => { node && onStageReady?.(node) }}>
      <Grid />
      <ShapesLayer />
    </Stage >
  );
};


export default CanvasRoot;