import { Line } from "react-konva";
import type { ComponentProps } from "react";
import { shapeMetaStore } from "../../stores/shapeMetadata";

export type WorldLineProps = ComponentProps<typeof Line>;

export const WorldLine = (props: WorldLineProps) => {
  return (
    <Line
      strokeScaleEnabled={false}
      perfectDrawEnabled={false}
      hitStrokeWidth="auto"
      {...props}
    />
  );
};


export const WorldLineWithMeta = ({ id, ...props }: WorldLineProps & { id: string }) => {
  return (
    <WorldLine
      id={id}
      onClick={() => {
        const meta = shapeMetaStore.get(id);
        shapeMetaStore.set(id, { selected: !meta.selected });
      }}
      onMouseEnter={() => {
        shapeMetaStore.set(id, { hovered: true })
      }}
      onMouseLeave={() => {
        shapeMetaStore.set(id, { hovered: false })
      }}
      {...props}
    />
  );
}