import { useEffect, useLayoutEffect, useRef } from 'react';
import { useCanvasSize } from '../../providers/canvas/size';
import { useConfig } from '../../providers/config';
import WebGlGrid from './webglGrid';
import tinycolor2 from 'tinycolor2';

const Grid = () => {
  const canvasSize = useCanvasSize();
  const { config } = useConfig();

  console.log(config.gridLine)

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webGlGrid = useRef<WebGlGrid>(null);

  useLayoutEffect(() => {
    const gl = canvasRef.current?.getContext("webgl2");
    if (!gl) throw alert('Something gone wrong');

    webGlGrid.current = new WebGlGrid(gl);
    webGlGrid.current.init();
  }, [])

  useLayoutEffect(() => {
    if (!webGlGrid.current) return;

    webGlGrid.current.draw({
      scale: canvasSize.viewport.scale, offset: [0, 0], resolution: [canvasSize.size.width, canvasSize.size.height]
    }, {
      lineColor: tinycolor2(config.gridLine.stroke?.toString()).toRgb(),
      lineWidth: config.gridLine.strokeWidth || 1,
      backgroundColor: tinycolor2(config.backgroundColor).toRgb(),
    }
    )
  }, [canvasSize.size.width, canvasSize.size.height, canvasSize.viewport.scale, config])


  return (
    <canvas style={{ position: 'absolute', }} height={canvasSize.size.height} width={canvasSize.size.width} ref={canvasRef} />
  );
};

export default Grid;
