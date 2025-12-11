import { useEffect, useRef, useState } from "react";
import { useControlEvents } from "../../providers/control/events";
import { useCanvasSize } from "../../providers/canvas/size";
import { useCanvasShapes, type ShapeData } from "../../providers/canvas/shapes";
import { type Vector2d } from "konva/lib/types";
import Shape from "../Shape";
import { useConfig } from "../../providers/config";
import { TOOL_TYPE, useControlTools } from "../../providers/control/tools";

function rectCornersFlat(p1: Vector2d, p2: Vector2d): number[] {
  return [
    p1.x, p1.y,
    p2.x, p1.y,
    p2.x, p2.y,
    p1.x, p2.y,
  ];
}

const TempShape = () => {
  const { config } = useConfig();
  const { selectedTool } = useControlTools();
  const { onMouseDown, onMouseMove, onMouseUp } = useControlEvents();
  const { viewport } = useCanvasSize();
  const { addShape } = useCanvasShapes();

  const [tempShape, setTShape] = useState<ShapeData | null>(null);
  const tempShapeRef = useRef<ShapeData['points'] | null>(null);

  const setTempShape = (shape: Partial<ShapeData> | null) => {
    const s: ShapeData | null = shape && {
      id: 'temp',
      points: shape.points ?? [],
    };
    setTShape(s);
  }

  useEffect(() => {
    if (selectedTool === TOOL_TYPE.INSERT_RECT)
      return onMouseDown((ev) => {
        if (ev.evt.button !== 0) return;
        const mouseDP = ev.target.getStage()?.getPointerPosition();
        if (!mouseDP) return;

        mouseDP.x = (mouseDP.x + viewport.offset[0]) / viewport.scale;
        mouseDP.y = (mouseDP.y + viewport.offset[1]) / viewport.scale;

        mouseDP.x = Math.floor(mouseDP.x);
        mouseDP.y = Math.floor(mouseDP.y);

        const f = onMouseMove((ev) => {
          const mouseP = ev.target.getStage()?.getPointerPosition();
          if (!mouseP) return;

          mouseP.x = (mouseP.x + viewport.offset[0]) / viewport.scale;
          mouseP.y = (mouseP.y + viewport.offset[1]) / viewport.scale;

          mouseP.x = mouseP.x >= mouseDP.x ? Math.ceil(mouseP.x) : Math.floor(mouseP.x);
          mouseP.y = mouseP.y >= mouseDP.y ? Math.ceil(mouseP.y) : Math.floor(mouseP.y);

          tempShapeRef.current = rectCornersFlat(mouseDP, mouseP);
          setTempShape({ points: [...tempShapeRef.current] });
        });

        const ff = onMouseUp((ev) => {
          if (ev.evt.button !== 0) return;
          f();
          ff();

          setTShape(null);
          tempShapeRef.current && addShape({ points: [...tempShapeRef.current] });
        })
      });
  }, [viewport.scale, viewport.offset, selectedTool])

  return <>
    {tempShape ? <Shape shape={tempShape} lineConfig={{ ...config.tempShapeLine, closed: true }} /> : null}
  </>;
};


export default TempShape;