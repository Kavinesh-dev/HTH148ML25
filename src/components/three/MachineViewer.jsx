import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import MachineModel from "./MachineModel";
import Floor from "./Floor";

/** Large single-machine "digital twin" view for the machine detail page. */
export default function MachineViewer({ riskLevel, rpm = 0, vibration = 0 }) {
  return (
    <div className="h-full w-full overflow-hidden rounded-2xl bg-gradient-to-b from-surface-container-low to-surface-container-lowest">
      <Canvas shadows dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[3.2, 2.6, 3.6]} fov={42} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[4, 6, 3]} intensity={1.1} castShadow />
          <Floor size={8} />
          <MachineModel
            position={[0, 0, 0]}
            riskLevel={riskLevel}
            rpm={rpm}
            vibration={vibration}
            scale={1.5}
          />
          <OrbitControls
            autoRotate
            autoRotateSpeed={1.2}
            enablePan={false}
            minDistance={2.5}
            maxDistance={8}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
