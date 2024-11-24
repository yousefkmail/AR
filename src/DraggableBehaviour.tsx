import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useDragPiece } from "./Hooks/useDragPiece";
import { useMousePosition } from "./Hooks/useMousePositiion";
import { usePieces } from "./Hooks/usePieces";
import { NDCToObjectWorld, SetObjectLayerTraverse } from "./Utils/ThreeUtils";
import { PiecePlane } from "./Core/PiecePlane";
import { useObjectContextMenu } from "./Features/ContextMenu/useObjectContextMenu";

export default function DraggableBehaviour() {
  const raycaster = useRef(new THREE.Raycaster());
  const { mousePos } = useMousePosition();
  const { DraggedRef, HoveredObject, HandleDroppedPlane } = useDragPiece();
  const { FindSceneObjectWithId, FindObjectWithId } = usePieces();
  const { gl } = useThree();
  const { open, setMenuPosition, setManagedId, close } = useObjectContextMenu();
  const HandleDrop = (event: MouseEvent) => {
    if (DraggedRef.current && HoveredObject.current) {
      HandleDroppedPlane(DraggedRef.current, HoveredObject.current);
    }

    if (event.button === 0 && DraggedRef.current) {
      open();
      console.log("Opened");
      const offsetX =
        event.clientX - gl.domElement.getBoundingClientRect().left;
      const offsetY = event.clientY - gl.domElement.getBoundingClientRect().top;
      setMenuPosition({ x: offsetX - 80, y: offsetY - 80 });
      setManagedId(DraggedRef.current?.userData.id);
    }

    DraggedRef.current = null;
  };

  const { createdPlanes } = usePieces();
  const HandlePointerDown = () => {
    close();
  };
  useEffect(() => {
    gl.domElement.addEventListener("mouseup", HandleDrop);
    gl.domElement.addEventListener("drop", HandleDrop);
    gl.domElement.addEventListener("pointerdown", HandlePointerDown);

    return () => {
      gl.domElement.removeEventListener("mouseup", HandleDrop);
      gl.domElement.removeEventListener("drop", HandleDrop);
      gl.domElement.removeEventListener("pointerdown", HandlePointerDown);
    };
  }, [createdPlanes]);
  useFrame(({ camera, scene }) => {
    //return early if nothing dragged to be handled.
    if (!DraggedRef.current) return;

    const draggedObjectData = FindObjectWithId(DraggedRef.current.userData.id);
    console.log(draggedObjectData);
    if (draggedObjectData instanceof PiecePlane && draggedObjectData?.parent) {
      const child = FindSceneObjectWithId(DraggedRef.current.userData.id);
      const parent = FindSceneObjectWithId(draggedObjectData.parent.id);

      if (parent && child) {
        const position = NDCToObjectWorld(mousePos, parent, camera);

        const rightOffset =
          (draggedObjectData.parent.width / 2 -
            draggedObjectData.width / 2 +
            (draggedObjectData.width -
              draggedObjectData.baseWidth -
              draggedObjectData.baseOffset)) /
          50;

        const leftOffset =
          -(
            draggedObjectData.parent.width -
            (draggedObjectData.width - draggedObjectData.baseOffset)
          ) / 100;

        child.position.set(
          THREE.MathUtils.clamp(
            parent?.worldToLocal(position).x,
            leftOffset,
            rightOffset
          ),
          child.position.y,
          0
        );
        console.log(child.position);
      }
    } else {
      raycaster.current.setFromCamera(mousePos, camera);
      //set the layer other than 0 so the raycast doesn't detect the object itself
      SetObjectLayerTraverse(DraggedRef.current, 1);

      const intersects = raycaster.current.intersectObjects(
        scene.children,
        true
      );

      if (intersects.length > 0) {
        const intersectionPoint = intersects[0].point;
        DraggedRef.current.position.set(
          intersectionPoint.x,
          intersectionPoint.y + 0.01,
          intersectionPoint.z
        );

        HoveredObject.current = intersects[0].object;
      }
      SetObjectLayerTraverse(DraggedRef.current, 0);
    }
  });
  return <></>;
}
