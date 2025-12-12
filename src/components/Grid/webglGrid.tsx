import vs from './shaders/vs.glsl?raw'
import fs from './shaders/fs.glsl?raw'
import type { RGBA } from 'konva/lib/types';

function toFloatRGB({ r, g, b, a = 1 }: { r: number, g: number, b: number, a: number }) {
  return [r / 255, g / 255, b / 255, a];
}

export default class WebGlGrid {
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram | null = null;
  private uResolution: WebGLUniformLocation | null = null;
  private uScale: WebGLUniformLocation | null = null;
  private uOffset: WebGLUniformLocation | null = null;
  private uOrigin: WebGLUniformLocation | null = null;

  private uLineColor: WebGLUniformLocation | null = null;
  private uLineWidth: WebGLUniformLocation | null = null;
  private uBackgroundColor: WebGLUniformLocation | null = null;

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl;
  }

  private createShader(type: number, src: string): WebGLShader {
    const s = this.gl.createShader(type);
    if (!s) throw alert('Error creating shader')
    this.gl.shaderSource(s, src);
    this.gl.compileShader(s);
    if (!this.gl.getShaderParameter(s, this.gl.COMPILE_STATUS)) {
      console.error(this.gl.getShaderInfoLog(s));
      if (!s) throw alert('Error compiling shader')
    }

    return s;
  }

  init() {
    const vsObj = this.createShader(this.gl.VERTEX_SHADER, vs);
    const fsObj = this.createShader(this.gl.FRAGMENT_SHADER, fs);

    this.program = this.gl.createProgram();
    this.gl.attachShader(this.program, vsObj);
    this.gl.attachShader(this.program, fsObj);
    this.gl.linkProgram(this.program);

    this.gl.useProgram(this.program);

    this.uResolution = this.gl.getUniformLocation(this.program, "uResolution");
    this.uScale = this.gl.getUniformLocation(this.program, "uScale");
    this.uOffset = this.gl.getUniformLocation(this.program, "uOffset");
    this.uOrigin = this.gl.getUniformLocation(this.program, "uOrigin");

    this.uLineColor = this.gl.getUniformLocation(this.program, "uLineColor");
    this.uLineWidth = this.gl.getUniformLocation(this.program, "uLineWidth");
    this.uBackgroundColor = this.gl.getUniformLocation(this.program, "uBackgroundColor");
  }

  draw({ scale, offset, resolution, origin }: { scale: number, offset: [number, number], resolution: [number, number], origin: [number, number] }, { backgroundColor, lineColor, lineWidth }: { backgroundColor: RGBA, lineColor: RGBA, lineWidth: number }) {
    this.gl.viewport(0, 0, resolution[0], resolution[1]);

    this.gl.useProgram(this.program);

    this.gl.uniform2f(this.uResolution, resolution[0], resolution[1]);
    this.gl.uniform1f(this.uScale, scale);
    this.gl.uniform2f(this.uOffset, offset[0], offset[1]);
    this.gl.uniform2f(this.uOrigin, origin[0], origin[1]);

    const bc = toFloatRGB(backgroundColor);
    const lc = toFloatRGB(lineColor);

    this.gl.uniform3f(this.uBackgroundColor, bc[0], bc[1], bc[2]);
    this.gl.uniform3f(this.uLineColor, lc[0], lc[1], lc[2]);
    this.gl.uniform1f(this.uLineWidth, lineWidth);


    this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
  }
}