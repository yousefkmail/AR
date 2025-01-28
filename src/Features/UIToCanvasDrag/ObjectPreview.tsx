import {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { Object3D, Object3DEventMap } from "three";

interface ObjectPreviewContextProps {
  preview: object | null;
  setPreview: Dispatch<SetStateAction<object | null>>;
  previewRef: MutableRefObject<Object3D<Object3DEventMap> | null>;
}

export const ObjectPreviewContext = createContext<ObjectPreviewContextProps>(
  {} as ObjectPreviewContextProps
);

export const ObjectPreviewContextProvider = ({ children }: any) => {
  const [preview, setPreview] = useState<object | null>(null);
  const previewRef = useRef<Object3D<Object3DEventMap>>(null);
  return (
    <ObjectPreviewContext.Provider value={{ preview, setPreview, previewRef }}>
      {children}
    </ObjectPreviewContext.Provider>
  );
};
