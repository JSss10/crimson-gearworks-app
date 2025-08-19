/*

This "water1_shader.ts was written by
Dan Greenheck on Youtube (2025). 
Source: https://www.youtube.com/watch?v=jK4uXGY07vA&t=1585s

*/

precision mediump float;

uniform vec3 uSurfaceColor;
uniform vec3 uTroughColor;
uniform vec3 uPeakColor;
uniform vec3 uReflectionColor;
uniform float uOpacity;
uniform float uTroughOffset;
uniform float uTroughTrans;
uniform float uPeakOffset;
uniform float uPeakTrans;
uniform float uFresnelScale;
uniform float uFresnelPower;

varying vec3 vWorldPosition;
varying vec3 vNormal;

float toSurface(float offset, float trans, float elevation) {
    return smoothstep(
        offset - trans, 
        offset + trans,
        elevation
    );
}

void main() {
    vec3 viewDir = normalize(vWorldPosition - cameraPosition);
    vec3 reflected = reflect(viewDir, vNormal);
    reflected.x *= -1.0;

    float fresnel = uFresnelScale * pow(1.0 - clamp(dot(viewDir, vNormal), 0.0, 1.0), uFresnelPower);

    float troughToSurface = toSurface(uTroughOffset, uTroughTrans, vWorldPosition.y);
    float peakToSurface = toSurface(uPeakOffset, uPeakTrans, vWorldPosition.y);

    vec3 mixedColor1 = mix(uTroughColor, uSurfaceColor, troughToSurface);
    vec3 mixedColor2 = mix(mixedColor1, uPeakColor, peakToSurface);
    vec3 finalColor = mix(mixedColor2, uReflectionColor, fresnel);
    gl_FragColor = vec4(finalColor, uOpacity);
}