import { useFrame, useThree } from "@react-three/fiber";
import { useContext, useRef } from "react";
import { DragContext } from "./App";
import * as THREE from "three";

export default function DraggableBehaviour({ SetIdPosition }: any) {
  const { draggedId, setDraggedId } = useContext(DragContext);

  const { camera, gl, scene } = useThree(); // Get the camera and renderer from R3F
  const raycaster = useRef(new THREE.Raycaster()); // Create a raycaster
  const mouse = useRef(new THREE.Vector2()); // Store normalized mouse coordinates

  // Function to update mouse coordinates based on mouse movement
  const updateMousePosition = (event: any) => {
    const rect = gl.domElement.getBoundingClientRect();
    mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  };

  const UpdateMouseUp = () => {
    setDraggedId(-1);
  };

  // Add an event listener for mouse movement
  document.addEventListener("mousemove", updateMousePosition);
  document.addEventListener("mouseup", UpdateMouseUp);
  useFrame(() => {
    if (draggedId >= 0) {
      // Set the ray from the camera and the current mouse position
      raycaster.current.setFromCamera(mouse.current, camera);

      // Find intersections with the objects array
      const intersects = raycaster.current.intersectObjects(
        scene.children,
        true
      );

      if (intersects.length > 0) {
        // Get the intersection point
        const intersectionPoint = intersects[0].point;
        // Update DraggedRef's position to the intersection point

        console.log(SetIdPosition);
        SetIdPosition(draggedId, [
          intersectionPoint.x,
          intersectionPoint.y + 0.01,
          intersectionPoint.z,
        ]);
        // DraggedRef.current.position.set(
        //   intersectionPoint.x,
        //   intersectionPoint.y + 0.01,
        //   intersectionPoint.z
        // );
      }
    }
  });
  return <></>;
}
