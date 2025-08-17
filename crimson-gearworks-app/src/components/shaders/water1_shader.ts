import * as THREE from 'three';
import vertexShader from './water1_vert.glsl';
import fragmentShader from './water1_frag.glsl';

export default class Water1 extends THREE.Mesh {
    material: THREE.ShaderMaterial;
    constructor(options: { resolution: { x: number | undefined; y: number | undefined; }; }) {
        super();
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                // f
                uOpacity:           { value: 0.3 },
                uSurfaceColor:      { value: new THREE.Color(1, 0.224, 0) },
                uTroughColor:       { value: new THREE.Color(0, 0, 0) },
                uPeakColor:         { value: new THREE.Color(0.7, 0.7, 0.7) },
                uReflectionColor:   { value: new THREE.Color(1, 1, 1) },
                uTroughOffset:      { value: -0.001 },
                uTroughTrans:       { value: 0.01 },
                uPeakOffset:        { value: 0.01 },
                uPeakTrans:         { value: 0.01 },
                uFresnelScale:      { value: 0.5 },
                uFresnelPower:      { value: 1.0 },

                // v
                uAmplitude:         { value: 0.07 },
                uTime:              { value: 0.1 },
                uFrequency:         { value: 0.5 },
                uPersistence:       { value: 0.8 },
                uLacunarity:        { value: 2.0 },
                uSpeed:             { value: 0.13 },
                uIterations:        { value: 5 }
            },
            vertexShader,
            fragmentShader,
            transparent: true
        });

        this.geometry = new THREE.PlaneGeometry(2, 2, options.resolution.x, options.resolution.y);
        this.rotation.x = Math.PI / 2;
    }

    update(time: number) {
        this.material.uniforms.uTime.value = time;
    }
}

