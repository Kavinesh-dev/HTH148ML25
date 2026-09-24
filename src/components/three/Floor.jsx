export default function Floor({ size = 20 }) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial color="#eef0ff" metalness={0.05} roughness={0.9} />
      </mesh>
      <gridHelper args={[size, size, "#c4c5d5", "#dae2fd"]} position={[0, 0.005, 0]} />
    </group>
  );
}
