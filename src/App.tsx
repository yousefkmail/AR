import React, { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { ARButton } from "three/examples/jsm/webxr/ARButton";

navigator.xr.isSessionSupported("immersive-ar").then((supported) => {
  if (supported) {
    console.log("AR is supported");
  } else {
    console.log("AR is not supported on this device");
  }
});

const ARScene: React.FC = () => {
  const { gl } = useThree();

  useEffect(() => {
    // Enable WebXR in the renderer
    gl.xr.enabled = true;

    // Create the AR button and append to the document
    const arButton = ARButton.createButton(gl);
    document.body.appendChild(arButton);
  }, [gl]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Canvas
      style={{
        height: "100vh",
        width: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
      }}
      camera={{ position: [0, 1.6, 3] }} // Typical camera position for AR
    >
      <ARScene />
    </Canvas>
  );
};

export default App;
