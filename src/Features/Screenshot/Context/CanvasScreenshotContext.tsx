import { Html } from "@react-three/drei";
import { createContext, RefObject, useRef } from "react";

interface CanvasScreneshotContextProps {
  anchorRef: RefObject<HTMLAnchorElement> | null;
}

export const CanvasScreneshotContext =
  createContext<CanvasScreneshotContextProps>({
    anchorRef: null,
  });

export const CanvasScreneshotContextProvider = ({ children }: any) => {
  const anchorRef = useRef<HTMLAnchorElement>(null);

  return (
    <CanvasScreneshotContext.Provider value={{ anchorRef }}>
      <>{children}</>
      <Html>
        <a ref={anchorRef} style={{ display: "none" }} />
      </Html>
    </CanvasScreneshotContext.Provider>
  );
};
