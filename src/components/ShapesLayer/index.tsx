import { Layer } from "react-konva";
import { useEditor } from "../../providers/editor";
import Shape from "../Shape";

const ShapesLayer = () => {
  const editor = useEditor();
  return <Layer>
    {editor.shapes.map(sd => <Shape shape={sd} lineConfig={{
      fill: '#fefefe', strokeWidth: 10, stroke: '#e8eaffff', closed: true
    }} />)}
    {editor.tempShape ? <Shape shape={editor.tempShape} lineConfig={{ stroke: '#4da3ff', strokeWidth: 1, dashEnabled: true, dash: [10], closed: true }} /> : null}
  </Layer>
}

export default ShapesLayer;