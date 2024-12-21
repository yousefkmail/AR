import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useDragPiece } from "./Hooks/useDragPiece";
import { useMousePosition } from "./Hooks/useMousePositiion";
import { useFullPieces } from "./Hooks/useFullPieces";
import { NDCToObjectWorld, SetObjectLayerTraverse } from "./Utils/ThreeUtils";
import { useObjectContextMenu } from "./Features/ContextMenu/useObjectContextMenu";

export default function DraggableBehaviour() {
  const raycaster = useRef(new THREE.Raycaster());
  const { mousePos } = useMousePosition();
  const { DraggedRef, HoveredObject, HandleDroppedPlane } = useDragPiece();
  const {
    FindSceneObjectWithId,
    FindPieceWithId,
    FindBaseWithId,
    DispatchCreatedBasis,
    DispatchCreatedPieces,
    createdBasis,
    createdPieces,
  } = useFullPieces();
  const { gl } = useThree();
  const { open, setMenuPosition, close, setActivePiece, setActiveBasis } =
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
      setMenuPosition({ x: offsetX - 80, y: offsetY - 80 });
      const piece = FindPieceWithId(DraggedRef.current?.userData.id) ?? null;
      setActivePiece(piece);

      setActiveBasis(FindBaseWithId(DraggedRef.current?.userData.id) ?? null);
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
  }, [createdBasis, createdPieces, FindPieceWithId, FindBaseWithId]);

  useFrame(({ camera, scene }) => {
    //return early if nothing dragged to be handled.
    if (!DraggedRef.current) return;

    const draggedPieceData = FindPieceWithId(DraggedRef.current.userData.id);

    if (draggedPieceData && draggedPieceData?.parent) {
      const parent = FindSceneObjectWithId(
        draggedPieceData.parent.BasisPlane.id
      );

      if (!parent) return;
      const position = NDCToObjectWorld(mousePos, parent, camera);
      let xPos = parent?.worldToLocal(position).x;

      const rightOffset =
        (draggedPieceData.parent.BasisPlane.width / 2 -
          draggedPieceData.baseRight()) /
        50;

      const leftOffset =
        -(
          draggedPieceData.parent.BasisPlane.width / 2 -
          draggedPieceData.baseLeft()
        ) / 50;

      const basis = FindBaseWithId(draggedPieceData.parent.BasisPlane.id);

      if (!basis) return;

      let [leftChild, rightChild] = basis.getNeighbours(draggedPieceData);

      if (draggedPieceData.PiecePlane.position.x - xPos > 0) {
        if (leftChild) {
          const minPosX = leftChild.rightPosition();
          xPos = THREE.MathUtils.clamp(
            xPos,
            minPosX + draggedPieceData.PiecePlane.width / 100,
            Infinity
          );
        }
      } else {
        if (rightChild) {
          const maxPosX = rightChild.leftPosition();

          xPos = THREE.MathUtils.clamp(
            xPos,
            -Infinity,
            maxPosX - draggedPieceData.PiecePlane.width / 100
          );
        }
      }
      DispatchCreatedBasis({
        type: "move_child",
        payload: {
          piece: draggedPieceData,
          position: new THREE.Vector3(
            THREE.MathUtils.clamp(xPos, leftOffset, rightOffset),
            draggedPieceData.PiecePlane.position.y,
            0
          ),
        },
      });
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
        const basis = FindBaseWithId(DraggedRef.current.userData.id);
        if (basis)
          DispatchCreatedBasis({
            type: "move",
            payload: {
              basis,
              position: new THREE.Vector3(
                intersectionPoint.x,
                intersectionPoint.y + 0.01,
                intersectionPoint.z
              ),
            },
          });

        const piece = FindPieceWithId(DraggedRef.current.userData.id);
        if (piece)
          DispatchCreatedPieces({
            type: "move",
            payload: {
              piece,
              position: new THREE.Vector3(
                intersectionPoint.x,
                intersectionPoint.y + 0.01,
                intersectionPoint.z
              ),
            },
          });
      } else SetObjectLayerTraverse(DraggedRef.current, 0);
    }
  });
  return <></>;
}
