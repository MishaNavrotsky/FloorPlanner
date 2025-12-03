// App.tsx
import { Stage } from "react-konva";
import Grid from "./components/Grid";
import { useCanvasSize } from "./providers/canvas";
import ShapesLayer from "./components/ShapesLayer";

const CanvasRoot = () => {
  const { size } = useCanvasSize();

  return (
    <Stage width={size.width} height={size.height} pixelRatio={1}>
      <Grid />
      <ShapesLayer />
    </Stage>
  );
};


export default CanvasRoot;