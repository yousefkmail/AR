import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useMousePosition } from "./Hooks/useMousePositiion";
import { useFullPieces } from "./Hooks/useFullPieces";
import { NDCToObjectWorld, SetObjectLayerTraverse } from "./Utils/ThreeUtils";
import { useObjectContextMenu } from "./Features/ContextMenu/useObjectContextMenu";
import { PieceChild } from "./DataService/Models/TemplateModel";
import { GetPieceLeft, GetPieceRight } from "./Utils/WigitsUtils/PieceUtils";

export default function DraggableBehaviour() {
  const raycaster = useRef(new THREE.Raycaster());
  const { mousePos } = useMousePosition();
  const {
    FindSceneObjectWithId,
    FindPieceWithId,
    FindTemplateWithId,
    DispatchCreatedPieces,
    createdTemplates,
    DispatchCreatedTemplates,
    createdPieces,
    FindParent,
  } = useFullPieces();
  const { gl } = useThree();
  const { open, setMenuPosition, close, setActivePiece, setActiveTemplate } =
    useObjectContextMenu();

  const HandleDrop = (event: MouseEvent) => {
    if (DraggedRef.current && HoveredObject.current) {
      HandleDroppedPlane(DraggedRef.current, HoveredObject.current);
    }
    if (event.button === 0 && DraggedRef.current) {
      open();
      const offsetX =
        event.clientX - gl.domElement.getBoundingClientRect().left;
      const offsetY = event.clientY - gl.domElement.getBoundingClientRect().top;
      setMenuPosition({ x: offsetX, y: offsetY - 80 });
      const piece = FindPieceWithId(DraggedRef.current?.userData.id) ?? null;
      setActivePiece(piece);

      setActiveTemplate(
        FindTemplateWithId(DraggedRef.current?.userData.id) ?? null
      );
    }
    DraggedRef.current = null;
  };

  const HandlePointerDown = () => {
    close();
  };
  useEffect(() => {
    gl.domElement.addEventListener("pointerup", HandleDrop);
    gl.domElement.addEventListener("drop", HandleDrop);
    gl.domElement.addEventListener("pointerdown", HandlePointerDown);

    return () => {
      gl.domElement.removeEventListener("pointerup", HandleDrop);
      gl.domElement.removeEventListener("drop", HandleDrop);
      gl.domElement.removeEventListener("pointerdown", HandlePointerDown);
    };
  }, [createdTemplates, createdPieces, FindPieceWithId, FindTemplateWithId]);

  useFrame(({ camera, scene }) => {
    //return early if nothing dragged to be handled.
    if (!DraggedRef.current) return;

    const draggedPieceData = FindPieceWithId(DraggedRef.current.userData.id);

    if (draggedPieceData && "layer" in draggedPieceData) {
      const piece = draggedPieceData as PieceChild;
      const parentTemplate = FindParent(piece);
      if (!parentTemplate) return;

      const parent = FindSceneObjectWithId(parentTemplate.id);
      if (!parent) return;

      const position = NDCToObjectWorld(mousePos, parent, camera);
      console.log(position);
      let xPos = parent?.worldToLocal(position).x;

      const rightOffset =
        (parentTemplate.templateModel.base.width / 2 -
          GetPieceRight(draggedPieceData.piece)) /
        50;

      const leftOffset =
        -(
          parentTemplate.templateModel.base.width / 2 -
          GetPieceLeft(draggedPieceData.piece)
        ) / 50;

      DispatchCreatedTemplates({
        type: "move_child",
        payload: {
          piece: piece,
          position: [
            THREE.MathUtils.clamp(xPos, leftOffset, rightOffset),
            piece.position[1],
            0,
          ],
        },
      });

      // const basis = FindBaseWithId(draggedPieceData.parent.id);

      // if (!basis) return;

      // let [leftChild, rightChild] = basis.getNeighbours(draggedPieceData);

      // if (draggedPieceData.PiecePlane.position.x - xPos > 0) {
      //   if (leftChild) {
      //     const minPosX = leftChild.rightPosition();
      //     xPos = THREE.MathUtils.clamp(
      //       xPos,
      //       minPosX + draggedPieceData.PiecePlane.width / 100,
      //       Infinity
      //     );
      //   }
      // } else {
      //   if (rightChild) {
      //     const maxPosX = rightChild.leftPosition();

      //     xPos = THREE.MathUtils.clamp(
      //       xPos,
      //       -Infinity,
      //       maxPosX - draggedPieceData.PiecePlane.width / 100
      //     );
      //   }
      // }
    } else {
      raycaster.current.setFromCamera(mousePos, camera);
      SetObjectLayerTraverse(DraggedRef.current, 1);

      const intersects = raycaster.current.intersectObjects(
        scene.children,
        true
      );

      if (intersects.length > 0) {
        const intersectionPoint = intersects[0].point;

        HoveredObject.current = intersects[0].object;
        SetObjectLayerTraverse(DraggedRef.current, 0);
        const basis = FindTemplateWithId(DraggedRef.current.userData.id);
        if (basis) {
          DispatchCreatedTemplates({
            type: "move",
            payload: {
              basis,
              position: [
                intersectionPoint.x,
                intersectionPoint.y + 0.01,
                intersectionPoint.z,
              ],
            },
          });
        }
        const piece = FindPieceWithId(DraggedRef.current.userData.id);

        if (piece && "rotation" in piece) {
          DispatchCreatedPieces({
            type: "move",
            payload: {
              piece,
              position: [
                intersectionPoint.x,
                intersectionPoint.y + 0.01,
                intersectionPoint.z,
              ],
            },
          });
        }
      } else SetObjectLayerTraverse(DraggedRef.current, 0);
    }
  });
  return <></>;
}
