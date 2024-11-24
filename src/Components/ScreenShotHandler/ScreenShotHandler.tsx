import { useThree } from "@react-three/fiber";
import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { Html } from "@react-three/drei";
import { EnvironmentContext } from "../../Context/EnvironmentContext";
export interface ScreenShotHandlerRef {
  Screenshot: () => void;
}

export const ScreenShotHandler = forwardRef<ScreenShotHandlerRef>(
  (_props, ref) => {
    const { gl, scene, camera } = useThree();
    const { environment } = useContext(EnvironmentContext);
    const Screenshot = () => {
      environment.current?.traverse((child) => {
        child.visible = false;
      });

      gl.clear();

      gl.render(scene, camera);

      const imageDataUrl = gl.domElement.toDataURL("image/png");

      if (anchorRef.current) {
        anchorRef.current.href = imageDataUrl;
        anchorRef.current.download = "screenshot.png";
        anchorRef.current?.click();
      }

      environment.current?.traverse((child) => {
        child.visible = true;
      });
    };

    useImperativeHandle(ref, () => ({
      Screenshot: Screenshot,
    }));

    const anchorRef = useRef<HTMLAnchorElement>(null);
    return (
      <Html>
        <a ref={anchorRef} style={{ display: "none" }} />
      </Html>
    );
  }
);
