import {
  forwardRef,
  Suspense,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { useFullPieces } from "../../Hooks/useFullPieces";
import { Group, Raycaster } from "three";
import { GroupProps, useThree } from "@react-three/fiber";
import { useObjectContextMenu } from "../../Features/ContextMenu/useObjectContextMenu";
import { Piece3DObjectContext } from "./Piece3DObjectContext";
import Piece3DObject from "./Piece3DObject";
import { Template3DObjectContext } from "./Template3DObjectContext";
import Template3DObject from "./Template3DObject";
import { useUIDraggedWigit } from "@features/DragAndDrop";
import { PieceObject, TemplateObject } from "@data/R3F";
import { useMousePosition } from "@hooks/useMousePositiion";

export type ScenePiecesContainerRef = {
  group: Group;
};

export const ScenePiecesContainer = forwardRef<
  ScenePiecesContainerRef,
  GroupProps
>((_props, ref) => {
  const groupRef = useRef<Group>(null);
  useImperativeHandle(ref, () => ({
    group: groupRef.current!,
  }));
  const { gl, camera, scene } = useThree();
  const { mousePos } = useMousePosition();
  const { createdPieces, createdTemplates } = useFullPieces();
  const { close } = useObjectContextMenu();
  const { DispatchCreatedPieces, DispatchCreatedTemplates } = useFullPieces();
  const { DraggedItem, setDraggedItem } = useUIDraggedWigit();
  const raycaster = useRef(new Raycaster());

  const onDrop = (_event: MouseEvent) => {
    raycaster.current.setFromCamera(mousePos, camera);
    const intersects = raycaster.current.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
      const intersectionPoint = intersects[0].point;

      if (DraggedItem && "piece" in DraggedItem) {
        const item = DraggedItem as PieceObject;
        item.position = [
          intersectionPoint.x,
          intersectionPoint.y + 0.01,
          intersectionPoint.z,
        ];
        DispatchCreatedPieces({
          type: "add",
          payload: item,
        });
      }
      if (DraggedItem && "templateModel" in DraggedItem) {
        const item = DraggedItem as TemplateObject;
        item.position = [
          intersectionPoint.x,
          intersectionPoint.y + 0.01,
          intersectionPoint.z,
        ];
        DispatchCreatedTemplates({
          type: "add",
          payload: item,
        });
      }
      setDraggedItem(null);
    }
  };

  useEffect(() => {
    gl.domElement.addEventListener("pointerdown", close);
    return () => {
      gl.domElement.removeEventListener("pointerdown", close);
      gl.domElement.removeEventListener("drop", onDrop);
    };
  }, []);

  useEffect(() => {
    gl.domElement.addEventListener("drop", onDrop);
    return () => {
      gl.domElement.removeEventListener("drop", onDrop);
    };
  }, [DraggedItem, DispatchCreatedTemplates]);

  return (
    <Suspense>
      <group ref={groupRef}>
        {createdPieces.map((pieceObject) => (
          <Piece3DObjectContext.Provider value={{ pieceObject }}>
            <Piece3DObject />\
          </Piece3DObjectContext.Provider>
        ))}
        {createdTemplates.map((item) => (
          <Template3DObjectContext.Provider value={{ templateObject: item }}>
            <Template3DObject />
          </Template3DObjectContext.Provider>
        ))}
      </group>
    </Suspense>
  );
});
