import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { useState } from "react";

// Create the XR store
const store = createXRStore();

export const ARView = () => {
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
  };

  const [red, setRed] = useState(false);

  return (
    <>
      {/* Ensure the button directly calls enterAR */}
      <button onClick={enterAR}>Enter AR</button>
      <Canvas>
        {/* Pass the store to the XR component */}
        <XR store={store}>
          <mesh onClick={() => setRed(!red)} position={[0, 1, -1]}>
            <boxGeometry />
            <meshBasicMaterial color={red ? "red" : "blue"} />
          </mesh>
        </XR>
      </Canvas>
    </>
  );
};
