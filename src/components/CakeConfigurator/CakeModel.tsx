"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, OrbitControls, Stage, Text } from "@react-three/drei";

type CakeModelProps = {
  shape: string;
  flavor: string;
  text: string;
  tiers?: number;
  frosting?: string;
  frostingColor?: string;
  decorations?: string[];
};

const OUTER_RING: Array<[number, number]> = [
  [-0.72, -0.38],
  [-0.28, -0.68],
  [0.26, -0.7],
  [0.72, -0.38],
  [0.74, 0.22],
  [0.25, 0.7],
  [-0.34, 0.64],
  [-0.76, 0.12],
];

const INNER_RING: Array<[number, number]> = [
  [-0.48, -0.22],
  [-0.12, -0.44],
  [0.32, -0.38],
  [0.5, 0.05],
  [0.18, 0.44],
  [-0.3, 0.34],
];

function TopLayer({ shape, color, y = 0.335 }: { shape: string; color: string; y?: number }) {
  return shape === "square" ? (
    <mesh castShadow position={[0, y, 0]}>
      <boxGeometry args={[2.12, 0.045, 2.12]} />
      <meshStandardMaterial color={color} roughness={0.2} />
    </mesh>
  ) : (
    <mesh castShadow position={[0, y, 0]}>
      <cylinderGeometry args={[1.17, 1.17, 0.045, 64]} />
      <meshStandardMaterial color={color} roughness={0.2} />
    </mesh>
  );
}

function PipedRing({
  shape,
  color,
  y,
  radius = 1.12,
  tube = 0.035,
}: {
  shape: string;
  color: string;
  y: number;
  radius?: number;
  tube?: number;
}) {
  if (shape === "square") {
    return (
      <group position={[0, y, 0]}>
        <mesh castShadow position={[0, 0, 1.08]}>
          <boxGeometry args={[2.14, tube * 1.8, tube * 2.2]} />
          <meshStandardMaterial color={color} roughness={0.26} />
        </mesh>
        <mesh castShadow position={[0, 0, -1.08]}>
          <boxGeometry args={[2.14, tube * 1.8, tube * 2.2]} />
          <meshStandardMaterial color={color} roughness={0.26} />
        </mesh>
        <mesh castShadow position={[1.08, 0, 0]}>
          <boxGeometry args={[tube * 2.2, tube * 1.8, 2.14]} />
          <meshStandardMaterial color={color} roughness={0.26} />
        </mesh>
        <mesh castShadow position={[-1.08, 0, 0]}>
          <boxGeometry args={[tube * 2.2, tube * 1.8, 2.14]} />
          <meshStandardMaterial color={color} roughness={0.26} />
        </mesh>
      </group>
    );
  }

  return (
    <mesh castShadow position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, tube, 16, 96]} />
      <meshStandardMaterial color={color} roughness={0.25} />
    </mesh>
  );
}

function FrostingStyle({
  shape,
  frosting,
  frostingColor,
}: {
  shape: string;
  frosting: string;
  frostingColor: string;
}) {
  if (frosting === "ganache") {
    const dripColor = "#3d1e11";
    return (
      <>
        <TopLayer shape={shape} color={dripColor} />
        <PipedRing shape={shape} color={dripColor} y={0.31} tube={0.045} />
        {OUTER_RING.slice(0, 7).map(([x, z], index) => {
          const height = index % 3 === 0 ? 0.28 : index % 3 === 1 ? 0.2 : 0.14;
          return (
            <mesh key={`drip-${x}-${z}`} castShadow position={[x * 1.25, 0.31 - height / 2, z * 1.25]}>
              <cylinderGeometry args={[0.035, 0.045, height, 14]} />
              <meshStandardMaterial color={dripColor} roughness={0.18} metalness={0.04} />
            </mesh>
          );
        })}
      </>
    );
  }

  if (frosting === "naked") {
    return (
      <>
        <PipedRing shape={shape} color={frostingColor} y={-0.27} radius={1.04} tube={0.032} />
        <PipedRing shape={shape} color={frostingColor} y={0.02} radius={1.06} tube={0.028} />
        <PipedRing shape={shape} color={frostingColor} y={0.29} radius={1.05} tube={0.032} />
      </>
    );
  }

  if (frosting === "cream-cheese") {
    return (
      <>
        <TopLayer shape={shape} color={frostingColor} />
        <PipedRing shape={shape} color="#fffaf2" y={0.32} tube={0.04} />
        <group position={[0, 0.39, 0]}>
          {OUTER_RING.map(([x, z], index) => (
            <mesh key={`cream-${x}-${z}`} castShadow position={[x * 1.08, 0, z * 1.08]}>
              <sphereGeometry args={[index % 2 ? 0.07 : 0.085, 18, 12]} />
              <meshStandardMaterial color={index % 2 ? "#fff7ed" : frostingColor} roughness={0.34} />
            </mesh>
          ))}
        </group>
      </>
    );
  }

  return (
    <>
      <TopLayer shape={shape} color={frostingColor} />
      <PipedRing shape={shape} color={frostingColor} y={-0.28} tube={0.035} />
      <PipedRing shape={shape} color="#fffaf2" y={0.02} radius={1.08} tube={0.018} />
      <PipedRing shape={shape} color={frostingColor} y={0.31} tube={0.042} />
    </>
  );
}

function CakeTier({
  shape,
  color,
  frostingColor,
  frosting,
  index,
}: {
  shape: string;
  color: string;
  frostingColor: string;
  frosting: string;
  index: number;
}) {
  const tierScale = 1 - index * 0.18;
  const y = 0.45 + index * 0.62;
  const shellColor = frosting === "naked" ? color : frosting === "ganache" ? "#5a2f1a" : frostingColor;

  return (
    <group position={[0, y, 0]} scale={[tierScale, 1, tierScale]}>
      {shape === "square" ? (
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.1, 0.62, 2.1]} />
          <meshStandardMaterial color={shellColor} roughness={frosting === "ganache" ? 0.18 : 0.32} metalness={0.04} />
        </mesh>
      ) : (
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.15, 1.15, 0.62, 64]} />
          <meshStandardMaterial color={shellColor} roughness={frosting === "ganache" ? 0.18 : 0.32} metalness={0.04} />
        </mesh>
      )}

      {frosting !== "naked" && (
        <PipedRing shape={shape} color={color} y={-0.02} radius={1.04} tube={0.018} />
      )}
      <FrostingStyle shape={shape} frosting={frosting} frostingColor={frostingColor} />
    </group>
  );
}

function Fruit({ x, z, y, color, radius = 0.08 }: { x: number; z: number; y: number; color: string; radius?: number }) {
  return (
    <mesh castShadow position={[x, y, z]}>
      <sphereGeometry args={[radius, 20, 12]} />
      <meshStandardMaterial color={color} roughness={0.38} />
    </mesh>
  );
}

function DecorationPreview({ decorations, topY }: { decorations: string[]; topY: number }) {
  const hasDecoration = (id: string) => decorations.includes(id);

  if (decorations.length === 0) {
    return null;
  }

  return (
    <group>
      {hasDecoration("wafer-text") && (
        <mesh castShadow position={[0, topY + 0.026, 0]}>
          <cylinderGeometry args={[0.66, 0.66, 0.03, 64]} />
          <meshStandardMaterial color="#f8e8c8" roughness={0.34} />
        </mesh>
      )}

      {hasDecoration("cream-flowers") && (
        <group>
          {OUTER_RING.map(([x, z], index) => (
            <mesh key={`flower-${x}-${z}`} castShadow position={[x, topY + 0.08, z]}>
              <sphereGeometry args={[index % 2 ? 0.075 : 0.09, 18, 12]} />
              <meshStandardMaterial color={index % 2 ? "#f7d9e4" : "#fff1f2"} roughness={0.42} />
            </mesh>
          ))}
        </group>
      )}

      {hasDecoration("seasonal-berries") && (
        <group>
          {OUTER_RING.map(([x, z], index) => (
            <Fruit
              key={`berry-${x}-${z}`}
              x={x * 0.88}
              z={z * 0.88}
              y={topY + 0.12}
              color={index % 3 === 0 ? "#d91f3c" : index % 3 === 1 ? "#243b8f" : "#b01246"}
              radius={index % 2 ? 0.075 : 0.09}
            />
          ))}
        </group>
      )}

      {hasDecoration("orchard-fruit") && (
        <group>
          {INNER_RING.map(([x, z], index) => (
            <Fruit
              key={`orchard-${x}-${z}`}
              x={x}
              z={z}
              y={topY + 0.105}
              radius={index % 2 ? 0.075 : 0.095}
              color={index % 3 === 0 ? "#f59e0b" : index % 3 === 1 ? "#84cc16" : "#fb7185"}
            />
          ))}
        </group>
      )}
    </group>
  );
}

function Cake({
  shape,
  color,
  frosting,
  frostingColor,
  text,
  tiers,
  decorations,
}: {
  shape: string;
  color: string;
  frosting: string;
  frostingColor: string;
  text: string;
  tiers: number;
  decorations: string[];
}) {
  const topY = 0.76 + (tiers - 1) * 0.62;
  const textOnWafer = decorations.includes("wafer-text");

  return (
    <group dispose={null}>
      <Float speed={1.5} rotationIntensity={0.28} floatIntensity={0.35}>
        {Array.from({ length: tiers }).map((_, index) => (
          <CakeTier
            key={index}
            shape={shape}
            color={color}
            frosting={frosting}
            frostingColor={frostingColor}
            index={index}
          />
        ))}

        <DecorationPreview decorations={decorations} topY={topY} />

        {text && (
          <Text
            position={[0, topY + 0.13, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.14}
            color={textOnWafer ? "#3d1e11" : "#ffffff"}
            maxWidth={1.34}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            outlineWidth={textOnWafer ? 0.004 : 0.014}
            outlineColor={textOnWafer ? "#fff8ed" : "#3d1e11"}
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
  frosting = "buttercream",
  frostingColor = "#fff7ed",
  decorations = [],
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
    <div className="relative h-[420px] w-full cursor-grab overflow-hidden rounded-lg border border-white/50 bg-gradient-to-b from-white to-transcendent-pink/30 shadow-inner active:cursor-grabbing md:h-[520px]">
      <div className="absolute left-4 top-4 z-10 rounded-full border border-white bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-future-dusk shadow-sm backdrop-blur-md">
        Podgląd 3D
      </div>
      <Canvas shadows camera={{ position: [5, 5, 5], fov: 34 }}>
        <Suspense fallback={null}>
          <Stage environment="apartment" intensity={0.6} adjustCamera={false}>
            <Cake
              shape={shape}
              color={color}
              frosting={frosting}
              frostingColor={frostingColor}
              text={text}
              tiers={tiers}
              decorations={decorations}
            />
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
