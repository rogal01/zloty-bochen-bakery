"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, ContactShadows, Text, Float } from "@react-three/drei";

type CakeModelProps = {
  shape: string;
  flavor: string;
  text: string;
  tiers?: number;
  frostingColor?: string;
};

function CakeTier({
  shape,
  color,
  frostingColor,
  index,
  tiers,
}: {
  shape: string;
  color: string;
  frostingColor: string;
  index: number;
  tiers: number;
}) {
  const tierScale = 1 - index * 0.18;
  const y = 0.45 + index * 0.62;

  return (
    <group position={[0, y, 0]} scale={[tierScale, 1, tierScale]}>
      {shape === "square" ? (
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.1, 0.62, 2.1]} />
          <meshStandardMaterial color={color} roughness={0.32} metalness={0.08} />
        </mesh>
      ) : (
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.15, 1.15, 0.62, 64]} />
          <meshStandardMaterial color={color} roughness={0.32} metalness={0.08} />
        </mesh>
      )}

      <mesh position={[0, 0.33, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[shape === "square" ? 1.0 : 1.1, 0.045, 16, 96]} />
        <meshStandardMaterial color={frostingColor} roughness={0.22} />
      </mesh>

      {index === tiers - 1 && (
        <mesh position={[0, 0.36, 0]}>
          <sphereGeometry args={[0.12, 24, 12]} />
          <meshStandardMaterial color="#c69c6d" roughness={0.28} />
        </mesh>
      )}
    </group>
  );
}

function Cake({
  shape,
  color,
  frostingColor,
  text,
  tiers,
}: {
  shape: string;
  color: string;
  frostingColor: string;
  text: string;
  tiers: number;
}) {
  return (
    <group dispose={null}>
      <Float speed={1.5} rotationIntensity={0.28} floatIntensity={0.35}>
        {Array.from({ length: tiers }).map((_, index) => (
          <CakeTier
            key={index}
            shape={shape}
            color={color}
            frostingColor={frostingColor}
            index={index}
            tiers={tiers}
          />
        ))}

        {text && (
          <Text
            position={[0, 0.83 + (tiers - 1) * 0.62, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.14}
            color="#ffffff"
            maxWidth={1.6}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.012}
            outlineColor="#3d1e11"
          >
            {text}
          </Text>
        )}
      </Float>

      <mesh receiveShadow position={[0, -0.05, 0]}>
        <cylinderGeometry args={[1.55, 1.65, 0.1, 64]} />
        <meshStandardMaterial color="#f4f0e8" roughness={0.12} />
      </mesh>
    </group>
  );
}

export default function CakeModel({
  shape,
  flavor,
  text,
  tiers = 1,
  frostingColor = "#fff7ed",
}: CakeModelProps) {
  const flavorColors: Record<string, string> = {
    "Royal Choco": "#3d1e11",
    Oreo: "#1a1a1a",
    Pistacja: "#93c572",
    Rafaello: "#fff5f5",
    Bueno: "#d2b48c",
    Malina: "#e30b5d",
  };

  const color = flavorColors[flavor] || "#f3e5ab";

  return (
    <div className="h-[420px] md:h-[520px] w-full bg-gradient-to-b from-white to-transcendent-pink/30 rounded-lg overflow-hidden border border-white/50 shadow-inner cursor-grab active:cursor-grabbing relative">
      <div className="absolute top-4 left-4 z-10 bg-white/85 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-future-dusk shadow-sm border border-white">
        Podgląd 3D Live
      </div>
      <Canvas shadows camera={{ position: [5, 5, 5], fov: 34 }}>
        <Suspense fallback={null}>
          <Stage environment="apartment" intensity={0.6} adjustCamera={false}>
            <Cake shape={shape} color={color} frostingColor={frostingColor} text={text} tiers={tiers} />
          </Stage>
          <ContactShadows resolution={1024} scale={10} blur={2.5} opacity={0.4} far={10} color="#3d1e11" />
          <OrbitControls
            enablePan={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.15}
            minDistance={4}
            maxDistance={8}
            autoRotate
            autoRotateSpeed={0.45}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
