import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useDragPiece } from "./Hooks/useDragPiece";
import { useMousePosition } from "./Hooks/useMousePositiion";
import { usePieces } from "./Hooks/usePieces";
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
  } = usePieces();
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

  const { createdBasis, createdPieces } = usePieces();
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
    // console.log(preview);
    //return early if nothing dragged to be handled.
    if (!DraggedRef.current) return;

    const draggedPieceData = FindPieceWithId(DraggedRef.current.userData.id);

    if (draggedPieceData && draggedPieceData?.parent) {
      const child = FindSceneObjectWithId(DraggedRef.current.userData.id);
      const parent = FindSceneObjectWithId(
        draggedPieceData.parent.BasisPlane.id
      );

      if (parent && child) {
        const position = NDCToObjectWorld(mousePos, parent, camera);
        const xPos = parent?.worldToLocal(position).x;
        const rightOffset =
          (draggedPieceData.parent.BasisPlane.width / 2 -
            draggedPieceData.PiecePlane.width / 2 +
            (draggedPieceData.PiecePlane.width -
              draggedPieceData.PiecePlane.baseWidth -
              draggedPieceData.PiecePlane.baseOffset)) /
          50;

        const leftOffset =
          -(
            draggedPieceData.parent.BasisPlane.width -
            (draggedPieceData.PiecePlane.width -
              draggedPieceData.PiecePlane.baseOffset)
          ) / 100;

        const basis = FindBaseWithId(draggedPieceData.parent.BasisPlane.id);

        let leftChild: THREE.Object3D<THREE.Object3DEventMap> | null = null;
        let rightChild: THREE.Object3D<THREE.Object3DEventMap> | null = null;

        if (!basis) return;

        for (let i = 0; i < basis.children.length; i++) {
          if (
            basis.children[i].child.PiecePlane.id !==
              draggedPieceData.PiecePlane.id &&
            basis.children[i].layerIndex ===
              basis.children.filter(
                (item) =>
                  item.child.PiecePlane.id === draggedPieceData.PiecePlane.id
              )[0].layerIndex
          ) {
            const childObject = FindSceneObjectWithId(
              basis.children[i].child.PiecePlane.id
            );

            if (childObject) {
              if (child.position.x - childObject.position.x > 0) {
                if (leftChild === null) {
                  leftChild = childObject;
                }
                if (
                  leftChild &&
                  childObject.position.x > leftChild.position.x
                ) {
                  leftChild = childObject;
                }
              } else {
                if (rightChild === null) {
                  rightChild = childObject;
                }

                if (
                  rightChild &&
                  childObject.position.x < rightChild.position.x
                ) {
                  rightChild = childObject;
                }
              }
            }
          }
        }

        if (child.position.x - xPos > 0) {
          if (!leftChild) {
            child.position.set(
              THREE.MathUtils.clamp(xPos, leftOffset, rightOffset),
              child.position.y,
              0
            );
          } else {
            if (
              child.position.x - draggedPieceData.PiecePlane.width / 100 >
              leftChild.position.x +
                (FindPieceWithId(leftChild?.userData.id)?.PiecePlane.width ??
                  0) /
                  100
            ) {
              child.position.set(
                THREE.MathUtils.clamp(xPos, leftOffset, rightOffset),
                child.position.y,
                0
              );
            }
          }
        } else {
          if (!rightChild) {
            child.position.set(
              THREE.MathUtils.clamp(xPos, leftOffset, rightOffset),
              child.position.y,
              0
            );
          } else if (
            child.position.x + draggedPieceData.PiecePlane.width / 100 <
            rightChild?.position.x -
              (FindPieceWithId(rightChild?.userData.id)?.PiecePlane.width ??
                0) /
                100
          ) {
            child.position.set(
              THREE.MathUtils.clamp(xPos, leftOffset, rightOffset),
              child.position.y,
              0
            );
          }
        }
      }
    } else {
      raycaster.current.setFromCamera(mousePos, camera);
      //set the layer other than 0 so the raycast doesn't detect the object itself
      SetObjectLayerTraverse(DraggedRef.current, 1);

      const intersects = raycaster.current.intersectObjects(
        scene.children,
        true
      );
      const basis = FindBaseWithId(DraggedRef.current.userData.id);

      if (intersects.length > 0 && basis) {
        const intersectionPoint = intersects[0].point;

        HoveredObject.current = intersects[0].object;
        SetObjectLayerTraverse(DraggedRef.current, 0);

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
      } else SetObjectLayerTraverse(DraggedRef.current, 0);
    }
  });
  return <></>;
}
