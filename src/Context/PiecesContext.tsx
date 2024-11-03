import { Entry } from "contentful";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { Piece } from "../Contentful/Types/PieceType";
import { PlaneNode } from "../Core/PlaneObject";

export const PiecesContext = createContext<PiecesContextProps>(
  {} as PiecesContextProps
);

interface PiecesContextProps {
  createdPlanes: Entry<Piece, "WITHOUT_UNRESOLVABLE_LINKS", string>[];
  setCreatedPlanes: Dispatch<
    SetStateAction<Entry<Piece, "WITHOUT_UNRESOLVABLE_LINKS", string>[]>
  >;

  objects: PlaneNode[];
  createdObjects: Dispatch<SetStateAction<PlaneNode[]>>;
}

interface PiecesContextProviderProps {
  children: React.ReactNode;
}

export const PiecesContextProvider = ({
  children,
}: PiecesContextProviderProps) => {
  const [createdPlanes, setCreatedPlanes] = useState<
    Entry<Piece, "WITHOUT_UNRESOLVABLE_LINKS", string>[]
  >([]);

  const [objects, createdObjects] = useState<PlaneNode[]>([]);

  return (
    <PiecesContext.Provider
      value={{ createdPlanes, setCreatedPlanes, objects, createdObjects }}
    >
      {children}
    </PiecesContext.Provider>
  );
};
