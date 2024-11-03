import { useGLTF } from "@react-three/drei";

export function Environment() {
  const { scene } = useGLTF("../Room/scene.gltf");

  return <primitive object={scene} scale={1} />;
}
