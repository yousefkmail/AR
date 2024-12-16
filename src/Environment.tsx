import { useGLTF } from "@react-three/drei";
import { useContext, useEffect, useRef } from "react";
import { EnvironmentContext } from "./Context/EnvironmentContext";

export function Environment() {
  const { scene } = useGLTF("../Room/scene.gltf");

  const ref = useRef(scene);

  const { environment } = useContext(EnvironmentContext);

  useEffect(() => {
    environment.current = ref.current;
    console.log(environment.current.layers);
  }, []);

  return <primitive object={scene} scale={1} />;
}
