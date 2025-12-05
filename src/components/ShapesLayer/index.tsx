import { Layer } from "react-konva";
import { useCanvasShapes } from "../../providers/canvas/shapes";
import Shape from "../Shape";
import TempShape from "../TempShape";
import { useConfig } from "../../providers/config";

const ShapesLayer = () => {
  const { config } = useConfig()
  const editor = useCanvasShapes();
  return <Layer>
    {editor.shapes.map(sd => <Shape key={sd.id} shape={sd} lineConfig={{
      ...config.shapeLine, closed: true
    }} />)}
    <TempShape />
  </Layer>
}

export default ShapesLayer;