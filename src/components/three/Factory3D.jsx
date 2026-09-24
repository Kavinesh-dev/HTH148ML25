import { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import MachineModel from "./MachineModel";
import Floor from "./Floor";

/**
 * Arranges every machine on a factory floor grid. `machines` items need:
 * { id, riskLevel, rpm, vibration }. Clicking a machine calls onSelect(id).
 */
export default function Factory3D({ machines = [], selectedId, onSelect }) {
  const [hoveredId, setHoveredId] = useState(null);

  const positions = useMemo(() => {
    const cols = Math.ceil(Math.sqrt(machines.length || 1));
    const spacing = 3.2;
    const offset = ((cols - 1) * spacing) / 2;
    return machines.map((m, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      return [col * spacing - offset, 0, row * spacing - offset];
    });
  }, [machines]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-b from-surface-container-low to-surface-container-lowest">
      <Canvas shadows dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[9, 8, 9]} fov={45} />
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[6, 10, 4]}
            intensity={1}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <Floor size={Math.max(20, positions.length * 3)} />
          {machines.map((m, i) => (
            <MachineModel
              key={m.id}
              position={positions[i]}
              riskLevel={m.riskLevel}
              rpm={m.rpm}
              vibration={m.vibration}
              selected={selectedId === m.id}
              hovered={hoveredId === m.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(m.id);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredId(m.id);
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                setHoveredId(null);
                document.body.style.cursor = "auto";
              }}
            />
          ))}
          <OrbitControls
            enablePan={false}
            minDistance={5}
            maxDistance={22}
            maxPolarAngle={Math.PI / 2.2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
