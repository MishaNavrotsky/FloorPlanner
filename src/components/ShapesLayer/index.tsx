import { Layer } from "react-konva";
import Shape from "../Shape";
import TempShape from "../TempShape";
import { useConfig } from "../../providers/config";
import { useShapeIds } from "../../stores/shape";

const ShapesLayer = () => {
  const { config } = useConfig()
  const shapeIds = useShapeIds();
  console.log("ShapesLayer render", shapeIds);

  return <Layer>
    {shapeIds.map(id =>
      <Shape
        key={id}
        id={id}
        lineConfig={config.shapeLine}
      />)}
    <TempShape />
  </Layer>
}

export default ShapesLayer;