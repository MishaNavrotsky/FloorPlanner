// App.tsx
import { Stage } from "react-konva";
import Grid from "./components/Grid/Grid";
import { useCanvasSize } from "./providers/canvas";

const CanvasRoot = () => {
  const { size } = useCanvasSize();

  return (
    <Stage width={size.width} height={size.height} pixelRatio={1}>
      <Grid />
    </Stage>
  );
};


export default CanvasRoot;