import type { LineConfig } from "konva/lib/shapes/Line";
import { useShape, type ShapeData } from "../../stores/shape";
import { Group } from "react-konva";
import { WorldLine, WorldLineWithMeta } from "../WorldLine";
import { memo, useEffect } from "react";
import { useShapeMeta } from "../../stores/shapeMetadata";

export const ShapeLocal = ({ shape, lineConfig }: { shape: ShapeData, lineConfig?: Partial<LineConfig> }) => {
  return (
    <Group id={shape.id}>
      <WorldLine id={shape.id} points={shape.points} {...lineConfig} />
    </Group>
  );
}

export const ShapeLocalWithMeta = ({ shape, lineConfig }: { shape: ShapeData, lineConfig?: Partial<LineConfig> }) => {
  return (
    <Group id={shape.id}>
      <WorldLineWithMeta id={shape.id} points={shape.points} {...lineConfig} />
    </Group>
  );
}

const Shape = memo(({ id, lineConfig }: { id: string, lineConfig?: Partial<LineConfig> }) => {
  const shape = useShape(id);
  const shapeMeta = useShapeMeta(id);
  useEffect(() => { console.log(id, 'mount') }, [])

  if (!shape) return null;

  console.log("Shape render", id);
  console.log("Shape meta", id, shapeMeta);
  return <ShapeLocalWithMeta shape={shape} lineConfig={lineConfig} />
})

export default Shape;