#version 300 es
precision highp float;

out vec4 outColor;

uniform vec2 uResolution;
uniform float uScale;      // pixels per cell
uniform vec2 uOffset;      // pan in pixels
uniform vec2 uOrigin;      // origin in pixels

uniform vec3 uLineColor;
uniform float uLineWidth;
uniform vec3 uBackgroundColor;

float gridLineAA(float worldCoord, float width) {
  float g = fract(worldCoord);
  float d = min(g, 1.0f - g);
  return 1.0f - smoothstep(0.0f, width, d);
}

void main() {
  // Flip Y so 0,0 is top-left
  vec2 frag = vec2(gl_FragCoord.x, uResolution.y - gl_FragCoord.y);

  vec2 world = (frag + uOffset) / uScale;

  float px = uLineWidth / uScale;

  float gx = gridLineAA(world.x, px);
  float gy = gridLineAA(world.y, px);
  float line = max(gx, gy);

  outColor = vec4(mix(uBackgroundColor, uLineColor, line), 1.0f);
}