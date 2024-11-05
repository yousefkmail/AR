import { createContext, MutableRefObject, useRef } from "react";
import { Group } from "three";

interface PlanesContainerProps {
  ContainerRef: MutableRefObject<Group | null>;
}

export const PlanesContainerContext = createContext<PlanesContainerProps>(
  {} as PlanesContainerProps
);

export const PlanesContainerContextProvider = ({ children }: any) => {
  const ContainerRef = useRef<Group>(null);
  return (
    <PlanesContainerContext.Provider value={{ ContainerRef }}>
      {children}
    </PlanesContainerContext.Provider>
  );
};
