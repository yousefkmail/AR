import { createContext, MutableRefObject, useRef } from "react";
import { ScenePiecesContainerRef } from "../Components/ScenePiecesContainer/ScenePiecesContainer";

interface PlanesContainerProps {
  ContainerRef: MutableRefObject<ScenePiecesContainerRef | null>;
}

export const PlanesContainerContext = createContext<PlanesContainerProps>(
  {} as PlanesContainerProps
);

export const PlanesContainerContextProvider = ({ children }: any) => {
  const ContainerRef = useRef<ScenePiecesContainerRef>(null);
  return (
    <PlanesContainerContext.Provider value={{ ContainerRef }}>
      {children}
    </PlanesContainerContext.Provider>
  );
};
