"use client";
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, ContactShadows, Text, Float } from '@react-three/drei';

function Cake({ shape, color, text }: { shape: string, color: string, text: string }) {
  // Simple representation of a cake using basic Three.js primitives
  // In a real app, this would be a loaded GLTF model with dynamic textures
  return (
    <group dispose={null}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {shape === 'round' && (
          <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
            <cylinderGeometry args={[1.2, 1.2, 1, 64]} />
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
          </mesh>
        )}
        {shape === 'square' && (
          <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
            <boxGeometry args={[2, 1, 2]} />
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
          </mesh>
        )}
        
        {/* Dynamic Text on Cake */}
        {text && (
          <Text
            position={[0, 1.02, 0]} // Slightly above the cake top
            rotation={[-Math.PI / 2, 0, 0]} // Flat on top
            fontSize={0.15}
            color="#ffffff"
            font="/fonts/PlayfairDisplay-Bold.ttf" // We'll assume a path or default
            maxWidth={1.8}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.01}
            outlineColor="#3d1e11"
          >
            {text}
          </Text>
        )}

        {/* Cream details (visual improvement) */}
        <mesh position={[0, 1, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[shape === 'round' ? 1.15 : 1.0, 0.05, 16, 100]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </Float>

      {/* Plate */}
      <mesh receiveShadow position={[0, -0.05, 0]}>
        <cylinderGeometry args={[1.5, 1.6, 0.1, 64]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.1} />
      </mesh>
    </group>
  );
}

export default function CakeModel({ shape, flavor, text }: { shape: string, flavor: string, text: string }) {
  const flavorColors: Record<string, string> = {
    'Royal Choco': '#3d1e11',
    'Oreo': '#1a1a1a',
    'Pistacja': '#93c572',
    'Rafaello': '#fff5f5',
    'Bueno': '#d2b48c',
    'Malina': '#e30b5d',
  };

  const color = flavorColors[flavor] || '#f3e5ab';

  return (
    <div className="h-[400px] md:h-[500px] w-full bg-gradient-to-b from-white to-transcendent-pink/30 rounded-3xl overflow-hidden border border-white/50 shadow-inner cursor-grab active:cursor-grabbing relative">
      <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-future-dusk shadow-sm border border-white">
        Podgląd 3D Live
      </div>
      <Canvas shadows camera={{ position: [5, 5, 5], fov: 35 }}>
        <Suspense fallback={null}>
          <Stage environment="apartment" intensity={0.6} adjustCamera={false}>
             <Cake shape={shape} color={color} text={text} />
          </Stage>
          <ContactShadows resolution={1024} scale={10} blur={2.5} opacity={0.4} far={10} color="#3d1e11" />
          <OrbitControls 
            enablePan={false} 
            minPolarAngle={Math.PI / 6} 
            maxPolarAngle={Math.PI / 2.2} 
            minDistance={4} 
            maxDistance={8}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}