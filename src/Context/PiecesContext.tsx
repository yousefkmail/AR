import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

export const PiecesContext = createContext<PiecesContextProps>(
  {} as PiecesContextProps
);

interface PiecesContextProps {
  planes: PlaneProps[];
  createdPlanes: PlaneProps[];
  setCreatedPlanes: Dispatch<SetStateAction<PlaneProps[]>>;
}

interface PiecesContextProviderProps {
  children: React.ReactNode;
}

interface PlaneProps {
  id: number;
  path: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  pivotOffset?: [number, number, number];
}

export const PiecesContextProvider = ({
  children,
}: PiecesContextProviderProps) => {
  const [planes, setPlanes] = useState<PlaneProps[]>([
    {
      id: 0,
      path: "../Textures/Base_8.89x46.99_L _10KD.png",
      position: [1.6, 0.5, 0.8],
      rotation: [1.62, 0, 0],
    },
    {
      id: 1,
      position: [0, 2.21, 0],
      pivotOffset: [0, 0.19, 0],
      path: "../Textures/Alf Mabrook txt_14.811x27.9058_L_7KD.png",
    },
  ]);

  const [createdPlanes, setCreatedPlanes] = useState<PlaneProps[]>([
    {
      id: 0,
      path: "../Textures/Base_8.89x46.99_L _10KD.png",
      position: [1.6, 0.5, 0.8],
      rotation: [1.62, 0, 0],
    },
  ]);

  return (
    <PiecesContext.Provider value={{ planes, createdPlanes, setCreatedPlanes }}>
      {children}
    </PiecesContext.Provider>
  );
};
