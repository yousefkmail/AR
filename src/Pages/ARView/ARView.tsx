import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";

export default function ARView() {
  const store = createXRStore();

  return (
    <div style={{ height: "100%", position: "relative", overflow: "hidden" }}>
      <button onClick={() => store.enterAR()}>Enter AR</button>

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
