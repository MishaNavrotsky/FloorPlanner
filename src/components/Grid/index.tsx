import type { LineConfig } from 'konva/lib/shapes/Line';
import { useMemo } from 'react';
import { Layer, Line } from 'react-konva';
import { useCanvasSize } from '../../providers/canvas/size';
import { useConfig } from '../../providers/config';

const Grid = () => {
  const canvasSize = useCanvasSize();
  const { config } = useConfig();

  const gridLines = useMemo<LineConfig[]>(() => {
    const lines: LineConfig[] = [];
    for (let x = 0; x <= canvasSize.world.width; x++) {
      const dx = x * canvasSize.viewport.scale;
      lines.push({ points: [dx, 0, dx, canvasSize.size.height] })
    }

    for (let y = 0; y <= canvasSize.world.height; y++) {
      const dy = y * canvasSize.viewport.scale
      lines.push({ points: [0, dy, canvasSize.size.width, dy] })
    }
    return lines
  }, [canvasSize])
  return (
    <Layer >
      {gridLines.map((cfg) => <Line {...config.gridLine} {...cfg}></Line>)}
    </Layer>
  );
};

export default Grid;
