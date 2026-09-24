import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

const RISK_COLOR = {
  Low: "#10b981",
  Medium: "#f59e0b",
  High: "#f97316",
  Critical: "#ef4444",
  Unknown: "#64748b",
};

/**
 * A stylized generic industrial machine: base plinth, a rotating drum
 * (speed driven by live RPM), a status ring that glows/pulses by risk
 * level, and a small side control panel. Built entirely from primitive
 * geometry so it needs no external model files.
 */
export default function MachineModel({
  position = [0, 0, 0],
  riskLevel = "Unknown",
  rpm = 0,
  vibration = 0,
  selected = false,
  hovered = false,
  scale = 1,
  onClick,
  onPointerOver,
  onPointerOut,
}) {
  const drumRef = useRef();
  const ringRef = useRef();
  const groupRef = useRef();

  const color = RISK_COLOR[riskLevel] || RISK_COLOR.Unknown;
  const rotationSpeed = useMemo(() => Math.min(rpm / 400, 6), [rpm]);
  const vibAmp = useMemo(() => Math.min(vibration / 60, 0.06), [vibration]);
  const isCritical = riskLevel === "Critical";

  useFrame((state, delta) => {
    if (drumRef.current) {
      drumRef.current.rotation.y += rotationSpeed * delta;
    }
    if (groupRef.current && vibAmp > 0) {
      const t = state.clock.elapsedTime;
      groupRef.current.position.x =
        position[0] + Math.sin(t * 40) * vibAmp;
      groupRef.current.position.z =
        position[2] + Math.cos(t * 33) * vibAmp;
    }
    if (ringRef.current) {
      const pulse = isCritical
        ? 1.4 + Math.sin(state.clock.elapsedTime * 6) * 0.6
        : 1;
      ringRef.current.material.emissiveIntensity = pulse;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      scale={selected || hovered ? scale * 1.12 : scale}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* base plinth */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.95, 1.05, 0.3, 24]} />
        <meshStandardMaterial color="#dfe3f5" metalness={0.3} roughness={0.6} />
      </mesh>

      {/* housing */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.3, 0.9, 1.3]} />
        <meshStandardMaterial color="#f5f6ff" metalness={0.2} roughness={0.4} />
      </mesh>

      {/* rotating drum on top */}
      <mesh ref={drumRef} position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.55, 20]} />
        <meshStandardMaterial color="#1e2a55" metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh position={[0, 1.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.05, 10, 24]} />
        <meshStandardMaterial color="#a8b3d9" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* status ring (glows by risk level) */}
      <mesh ref={ringRef} position={[0, 0.31, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.98, 1.12, 40]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1}
          toneMapped={false}
        />
      </mesh>

      {/* side control panel */}
      <mesh position={[0.78, 0.65, 0]} castShadow>
        <boxGeometry args={[0.18, 0.5, 0.4]} />
        <meshStandardMaterial color="#0f1a3d" metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh position={[0.88, 0.75, 0]}>
        <boxGeometry args={[0.02, 0.12, 0.12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
      </mesh>

      <pointLight position={[0, 1, 0]} color={color} intensity={isCritical ? 2.2 : 0.8} distance={3} />
    </group>
  );
}
