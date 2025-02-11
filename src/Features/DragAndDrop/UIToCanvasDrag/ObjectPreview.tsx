import {
  createContext,
  ReactNode,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { useUIDraggedWigit } from "../Hooks/useDraggedWigit";
import { GetWigitType } from "@utils/Wigits";
import { PieceObject, TemplateObject } from "@data/R3F";
import PngPlane, { PngPlaneRef } from "../../../Components/PngPlane/PngPlane";
import { Raycaster, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useMousePosition } from "@hooks/useMousePositiion";

// Define context shape
interface ObjectPreviewContextProps {
  preview: ReactNode | null;
}

export const ObjectPreviewContext = createContext<ObjectPreviewContextProps>({
  preview: null,
});

export const ObjectPreviewContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [preview, setPreview] = useState<ReactNode | null>(null);
  const { DraggedItem } = useUIDraggedWigit();
  const previewRef = useRef<PngPlaneRef | null>(null);
  const raycaster = useRef(new Raycaster());

  useEffect(() => {
    if (!DraggedItem) {
      setPreview(null);
      return;
    }

    const wigitType = GetWigitType(DraggedItem as any);
    let newPreview: ReactNode | null = null;
    switch (wigitType) {
      case "PieceObject": {
        const pieceObject = DraggedItem as PieceObject;
        newPreview = (
          <PngPlane
            layer={1}
            ref={previewRef}
            {...pieceObject.piece}
            position={new Vector3(1, 1, 1)}
            applyOffset
          />
        );
        break;
      }
      case "TemplateObject": {
        const templateObject = DraggedItem as TemplateObject;
        newPreview = (
          <PngPlane
            layer={1}
            ref={previewRef}
            {...templateObject.templateModel.base}
            position={new Vector3(1, 1, 1)}
            rotation={new Vector3(90, 0, 0)}
          >
            {templateObject.templateModel.children.map((item) => (
              <PngPlane
                layer={1}
                {...item.piece}
                position={new Vector3(...item.position)}
                rotation={new Vector3(-90, 0, 0)}
                applyOffset
              ></PngPlane>
            ))}
          </PngPlane>
        );
        break;
      }
      default:
        newPreview = null;
    }
    setPreview(newPreview);
  }, [DraggedItem]);

  const { mousePos } = useMousePosition();

  useFrame(({ camera, scene }) => {
    if (!previewRef.current) return;
    raycaster.current.setFromCamera(mousePos, camera);
    const intersects = raycaster.current.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
      const intersectionPoint = intersects[0].point;
      previewRef.current.container.position.set(
        intersectionPoint.x,
        intersectionPoint.y + 0.01,
        intersectionPoint.z
      );
    }
  });

  return (
    <ObjectPreviewContext.Provider value={{ preview }}>
      {children}
      <Suspense>{preview}</Suspense>
    </ObjectPreviewContext.Provider>
  );
};
