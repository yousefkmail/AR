import { useGLTF } from "@react-three/drei";
import { useContext, useEffect, useRef } from "react";
import { EnvironmentContext } from "./Features/Screenshot/Context/EnvironmentContext";

export default function Environment() {
  const { scene } = useGLTF("../Room/scene.gltf");

  const ref = useRef(scene);

  const { environment } = useContext(EnvironmentContext);
  useEffect(() => {
    environment.current = ref.current;
  }, []);

  return <primitive object={scene} scale={1} />;
}
