import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useDragPiece } from "./Hooks/useDragPiece";
import { useMousePosition } from "./Hooks/useMousePositiion";
import { usePieces } from "./Hooks/usePieces";
import { NDCToObjectWorld, SetObjectLayerTraverse } from "./Utils/ThreeUtils";

export default function DraggableBehaviour() {
  const raycaster = useRef(new THREE.Raycaster());
  const { mousePos } = useMousePosition();
  const { DraggedRef, HoveredObject } = useDragPiece();
  const { FindSceneObjectWithId, FindObjectWithId } = usePieces();

  useFrame(({ camera, scene }) => {
    //return early if nothing dragged to be handled.
    if (!DraggedRef.current) return;

    const draggedObjectData = FindObjectWithId(DraggedRef.current.userData.id);

    if (draggedObjectData?.parent) {
      const child = FindSceneObjectWithId(DraggedRef.current.userData.id);
      const parent = FindSceneObjectWithId(draggedObjectData.parent.data.id);

      if (parent && child) {
        const position = NDCToObjectWorld(mousePos, parent, camera);

        child.position.set(
          THREE.MathUtils.clamp(
            parent?.worldToLocal(position).x,
            -(draggedObjectData?.parent?.data.data.fields.width ?? 100) / 100,
            (draggedObjectData?.parent?.data.data.fields.width ?? 100) / 100
          ),
          0,
          0
        );
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
