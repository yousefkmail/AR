import React, {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Object3D, Object3DEventMap } from "three";
import { PlanesContainerContext } from "./PlanesContainerContext";
import { useTemplatesQuery } from "../Hooks/useTemplatesQuery";
import { BasisPlaneViewModel } from "../Core/Viewmodels/BasisPlaneViewModel";
import { PiecePlaneViewModel } from "../Core/Viewmodels/PiecePlaneViewModel";
export const PiecesContext = createContext<PiecesContextProps>(
  {} as PiecesContextProps
);

interface PiecesContextProps {
  createdBasis: BasisPlaneViewModel[];
  setCreatedBasis: Dispatch<SetStateAction<BasisPlaneViewModel[]>>;
  createdPieces: PiecePlaneViewModel[];
  setCreatedPieces: Dispatch<SetStateAction<PiecePlaneViewModel[]>>;
  FindPieceWithId: (id: string) => PiecePlaneViewModel | null;
  FindBaseWithId: (id: string) => BasisPlaneViewModel | null;
  FindSceneObjectWithId: (id: string) => Object3D<Object3DEventMap> | null;
  HandleAddTemplate: (index: number) => void;
}

interface PiecesContextProviderProps {
  children: React.ReactNode;
}

export const PiecesContextProvider = ({
  children,
}: PiecesContextProviderProps) => {
  const [createdBasis, setCreatedBasis] = useState<BasisPlaneViewModel[]>([]);
  const [createdPieces, setCreatedPieces] = useState<PiecePlaneViewModel[]>([]);
  const { ContainerRef } = useContext(PlanesContainerContext);

  const counterRef = useRef(0);

  const FindSceneObjectWithId = (
    id: string
  ): Object3D<Object3DEventMap> | null => {
    let foundObject: Object3D<Object3DEventMap> | null = null;
    ContainerRef.current?.group?.traverse((object) => {
      if (object.userData.id === id && foundObject === null) {
        foundObject = object;
      }
    });
    return foundObject;
  };

  const FindBaseWithId = (id: string): BasisPlaneViewModel | null => {
    for (const base of createdBasis) {
      if (base.BasisPlane.id === id) return base;
    }
    return null;
  };

  const FindPieceWithId = (id: string): PiecePlaneViewModel | null => {
    for (const piece of createdPieces) {
      if (piece.PiecePlane.id === id) return piece;
    }

    for (const base of createdBasis) {
      for (const child of base.children) {
        if (child.child.PiecePlane.id === id) return child.child;
      }
    }

    return null;
  };

  useEffect(() => {
    console.log(createdBasis);
  }, [createdBasis]);

  const { templates } = useTemplatesQuery();

  const HandleAddTemplate = (index: number) => {
    // if (!templates) return;
    // if (!templates[index].loadedData) return;
    // const data = templates[index].loadedData.basis;
    // let id = counterRef.current;
    // counterRef.current++;
    // const base = new BasisPlaneViewModel(new BasisPlane(data, id));
    // for (let child of templates[index].loadedData.children) {
    //   const childPlane = new PiecePlane({ ...child.data }, counterRef.current);
    //   counterRef.current++;
    //   childPlane.setParent(base.BasisPlane);
    //   base.BasisPlane.addChild(childPlane, child.layer, child.position[0]);
    // }
    // setCreatedBasis((prev) => [...prev, base]);
  };

  return (
    <PiecesContext.Provider
      value={{
        createdBasis,
        createdPieces,
        setCreatedBasis,
        setCreatedPieces,
        FindPieceWithId,
        HandleAddTemplate,
        FindBaseWithId,
        FindSceneObjectWithId,
      }}
    >
      {children}
    </PiecesContext.Provider>
  );
};
