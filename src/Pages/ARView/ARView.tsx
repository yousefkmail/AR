import { Canvas } from "@react-three/fiber";
import {
  XR,
  XRPlaneModel,
  createXRStore,
  XRSpace,
  useXRPlanes,
} from "@react-three/xr";
import { useRef, useState } from "react";

// Create the XR store
const store = createXRStore();

export const ARView = () => {
  const ref = useRef<HTMLHeadingElement | null>(null);

  function RedWalls() {
    const wallPlanes = useXRPlanes();
    if (ref.current) {
      ref.current.innerHTML = wallPlanes.length.toString();
    }
    return (
      <>
        {wallPlanes.map((plane) => (
          <XRSpace space={plane.planeSpace}>
            <XRPlaneModel plane={plane}>
              <meshBasicMaterial color="red" />
            </XRPlaneModel>
          </XRSpace>
        ))}
      </>
    );
  }

  const enterAR = async () => {
    if (navigator.xr) {
      try {
        const supported = await navigator.xr.isSessionSupported("immersive-ar");
        if (supported) {
          // Enter AR mode using the store
          await store.enterAR(); // Ensure this is awaited
        } else {
          alert("AR is not supported on this device.");
        }
      } catch (error) {
        console.error("Error entering AR:", error);
        alert("Failed to start AR session.");
      }
    } else {
      alert("WebXR is not supported.");
    }
    await store.enterAR();
  };

  const [red, setRed] = useState(false);

  return (
    <>
      {/* Ensure the button directly calls enterAR */}
      <button onClick={enterAR}>Enter AR</button>
      <h2 ref={ref}>asd</h2>
      <Canvas>
        {/* Pass the store to the XR component */}
        <XR store={store}>
          <RedWalls />
          <mesh onClick={() => setRed(!red)} position={[0, 1, -1]}>
            <boxGeometry />
            <meshBasicMaterial color={red ? "red" : "blue"} />
          </mesh>
        </XR>
      </Canvas>
    </>
  );
};
