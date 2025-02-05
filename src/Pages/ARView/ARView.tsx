import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { useEffect } from "react";

export default function ARView() {
  const store = createXRStore();

  useEffect(() => {
    store.enterAR();
  }, []);
  return (
    <div style={{ height: "100%", position: "relative", overflow: "hidden" }}>
      <Canvas>
        <XR store={store}>
          <mesh pointerEventsType={{ deny: "grab" }} position={[0, 1, -1]}>
            <boxGeometry />
            <meshBasicMaterial color={"red"} />
          </mesh>
        </XR>
      </Canvas>
    </div>
  );
}
