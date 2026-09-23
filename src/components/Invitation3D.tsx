"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;

varying vec2 vUv;
varying vec3 vViewPosition;
varying float vElevation;

// Simplex Noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
  // --- REALISTIC SILK / WIND PHYSICS ---
  // The mouse offset drives the "wind", causing ripples to flow across the fabric
  // naturally instead of creating a fake circle.
  vec2 windOffset = uMouse * 0.8;
  
  // Base large folds
  float noiseFreq1 = 0.5;
  float noiseAmp1 = 0.2;
  vec2 pos1 = vec2(modelPosition.x * noiseFreq1 + uTime * 0.15 + windOffset.x, modelPosition.y * noiseFreq1 - uTime * 0.1 + windOffset.y);
  float elevation = snoise(pos1) * noiseAmp1;
  
  // Secondary smaller details (Multi-octave noise) for a very natural cloth look
  float noiseFreq2 = 1.2;
  float noiseAmp2 = 0.05;
  vec2 pos2 = vec2(modelPosition.x * noiseFreq2 - uTime * 0.2 - windOffset.x, modelPosition.y * noiseFreq2 + uTime * 0.15);
  elevation += snoise(pos2) * noiseAmp2;

  modelPosition.z += elevation;
  vElevation = elevation;
  
  vec4 viewPosition = viewMatrix * modelPosition;
  vViewPosition = viewPosition.xyz;
  
  gl_Position = projectionMatrix * viewPosition;
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
varying vec2 vUv;
varying vec3 vViewPosition;
varying float vElevation;

void main() {
  // Real geometric normal based on the noise folds
  vec3 fdx = dFdx(vViewPosition);
  vec3 fdy = dFdy(vViewPosition);
  vec3 normal = normalize(cross(fdx, fdy));
  
  if (!gl_FrontFacing) {
      normal = -normal;
  }

  // Sample texture
  vec4 texColor = texture2D(uTexture, vUv);
  
  // Luminance Masking (Make black background transparent)
  float luminance = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
  float alpha = smoothstep(0.02, 0.1, luminance); // Super clean cut for the lace
  
  // Beautiful Studio Lighting Setup
  vec3 lightDir = normalize(vec3(0.8, 1.0, 2.0)); // Angled top-right light
  vec3 viewDir = normalize(-vViewPosition);
  
  // Ambient (High for that elegant cream color)
  float ambient = 0.85;
  
  // Diffuse
  float diff = max(dot(normal, lightDir), 0.0);
  
  // Specular (Silky smooth reflection, no plastic harshness)
  vec3 halfVector = normalize(lightDir + viewDir);
  float spec = pow(max(dot(normal, halfVector), 0.0), 24.0) * 0.12;
  
  // Very soft shadow in the deep folds
  float shadow = smoothstep(-0.25, 0.25, vElevation);
  
  // Final Silk Material
  vec3 finalColor = texColor.rgb * (ambient + diff * 0.15) * (0.95 + shadow * 0.05) + spec;
  
  gl_FragColor = vec4(finalColor, alpha);
}
`;

const InteractiveNapkin = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const texture = useTexture("/invitation.jpg");
  // Ultra-crisp texture settings
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 16;
  texture.colorSpace = THREE.SRGBColorSpace;

  const { viewport, pointer } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0, 0) }
    }),
    [texture]
  );

  useFrame((state) => {
    // 1. Smooth Uniform Updates
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      const targetMouseX = pointer.x;
      const targetMouseY = pointer.y;
      
      // Interpolate for wind shifting
      materialRef.current.uniforms.uMouse.value.lerp(
        new THREE.Vector2(targetMouseX, targetMouseY),
        0.02 // Very smooth drag
      );
    }

    // 2. Heavy Physical Parallax Tilt
    if (meshRef.current) {
      // The entire physical card tilts gently to face the mouse
      const targetRotX = (pointer.y * Math.PI) / 12;
      const targetRotY = (pointer.x * Math.PI) / 12;
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.04);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.04);
      
      // Add a tiny bit of continuous organic floating
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  const aspect = 1080 / 1440; 
  const width = Math.min(viewport.width * 0.85, 4.8);
  const height = width / aspect;

  return (
    <mesh ref={meshRef}>
      {/* 256x256 resolution is perfect for silky multi-octave noise */}
      <planeGeometry args={[width, height, 256, 256]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        transparent={true} 
        depthWrite={false}
        extensions={{ derivatives: true } as any}
      />
    </mesh>
  );
};

export default function Invitation3D() {
  return (
    <div className="w-full h-full relative cursor-crosshair">
      {/* Increased FOV and pulled camera back for a more majestic presentation */}
      <Canvas camera={{ position: [0, 0, 7], fov: 35 }}>
        <InteractiveNapkin />
      </Canvas>
    </div>
  );
}
