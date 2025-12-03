import { Layer } from "react-konva";
import { useEditor } from "../../providers/editor";
import Shape from "../Shape";

const ShapesLayer = () => {
  const editor = useEditor();
  return <Layer>{editor.tempShape ? <Shape shape={editor.tempShape} /> : null}</Layer>
}

export default ShapesLayer;