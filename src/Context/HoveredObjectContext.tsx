import { createContext, MutableRefObject, useRef } from "react";
import { Object3D, Object3DEventMap } from "three";

interface HoveredObjectContextProps {
  HoveredObject: MutableRefObject<Object3D<Object3DEventMap> | undefined>;
}

export const HoveredObjectContext = createContext<HoveredObjectContextProps>(
  {} as HoveredObjectContextProps
);

export const HoveredObjectContextProvider = ({ children }: any) => {
  const HoveredObject = useRef<Object3D<Object3DEventMap> | undefined>();
  return (
    <HoveredObjectContext.Provider value={{ HoveredObject }}>
      {children}
    </HoveredObjectContext.Provider>
  );
};
