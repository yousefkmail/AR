import { Canvas } from "@react-three/fiber";
import { useParams } from "react-router-dom";
import { XR, createXRStore } from "@react-three/xr";

export default function ARView() {
  const { id } = useParams();
  console.log(id);
  const store = createXRStore();
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
