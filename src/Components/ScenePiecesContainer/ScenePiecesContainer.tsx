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
import { NDCToObjectWorld } from "@utils/ThreeUtils";

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
  const {
    createdPieces,
    createdTemplates,
    FindTemplateWithId,
    FindSceneObjectWithId,
  } = useFullPieces();
  const { setMenu } = useObjectContextMenu();
  const { DispatchCreatedPieces, DispatchCreatedTemplates } = useFullPieces();
  const { DraggedItem, setDraggedItem } = useUIDraggedWigit();
  const raycaster = useRef(new Raycaster());

  const onDrop = (_event: MouseEvent) => {
    raycaster.current.setFromCamera(mousePos, camera);
    const intersects = raycaster.current.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
      if (DraggedItem && "piece" in DraggedItem) {
        const template = FindTemplateWithId(intersects[0]?.object.userData.id);
        if (template) {
          const tempalate3DObject = FindSceneObjectWithId(template.id);
          const item = DraggedItem as PieceObject;

          if (!tempalate3DObject) return;
          const position = NDCToObjectWorld(
            mousePos,
            tempalate3DObject,
            camera
          );
          const localPos = tempalate3DObject.worldToLocal(position);
          DispatchCreatedTemplates({
            type: "add_child",
            payload: {
              template,
              layer: 0,
              position: [localPos.x, localPos.y, localPos.z],
              piece: item,
            },
          });
        } else {
          if (DraggedItem && "piece" in DraggedItem) {
            const intersectionPoint = intersects[0].point;

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
        }
      }

      const intersectionPoint = intersects[0].point;

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

  const CloseMenu = () => {
    setMenu(null);
  };

  useEffect(() => {
    gl.domElement.addEventListener("pointerdown", CloseMenu);
    return () => {
      gl.domElement.removeEventListener("pointerdown", CloseMenu);
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
          <Piece3DObjectContext.Provider
            key={pieceObject.id}
            value={{ pieceObject }}
          >
            <Piece3DObject />
          </Piece3DObjectContext.Provider>
        ))}
        {createdTemplates.map((item) => (
          <Template3DObjectContext.Provider
            key={item.id}
            value={{ templateObject: item }}
          >
            <Template3DObject />
          </Template3DObjectContext.Provider>
        ))}
      </group>
    </Suspense>
  );
});
