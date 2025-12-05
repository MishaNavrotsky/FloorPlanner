import type { LineConfig } from "konva/lib/shapes/Line";
import { useCanvasSize } from "../../providers/canvas/size";
import { type ShapeData } from "../../providers/canvas/shapes";
import { Group, Line } from "react-konva";
const Shape = ({ shape, lineConfig }: { shape: ShapeData, lineConfig?: Partial<LineConfig> }) => {
  const canvas = useCanvasSize();
  return (
    <Group id={shape.id}>
      <Line points={shape.points.map(p => p * canvas.viewport.scale)} {...lineConfig} />
    </Group>
  );
}

export default Shape;