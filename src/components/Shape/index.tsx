import { useCanvasSize } from "../../providers/canvas";
import { type ShapeData } from "../../providers/editor";
import { Group, Line, Rect } from "react-konva";
const Shape = ({ shape }: { shape: ShapeData }) => {
  const canvas = useCanvasSize();
  return (
    <Group id={shape.id}>
      <Line points={shape.points.map(p => p * canvas.viewport.scale)} stroke={'black'} strokeWidth={1} closed />
    </Group>
  );
}

export default Shape;