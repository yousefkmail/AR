import { useGLTF } from "@react-three/drei";

export function Environment() {
  const { scene } = useGLTF("../public/Room/scene.gltf");

  return <primitive object={scene} scale={1} />;
}
