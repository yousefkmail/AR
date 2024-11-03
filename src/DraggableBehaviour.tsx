import { useFrame, useThree } from "@react-three/fiber";
import { useContext, useRef } from "react";
import { DragContext } from "./Context/DragContext";
import * as THREE from "three";

export default function DraggableBehaviour() {
  const { camera, gl, scene, get } = useThree(); // Get the camera and renderer from R3F
  const raycaster = useRef(new THREE.Raycaster()); // Create a raycaster
  const mouse = useRef(new THREE.Vector2()); // Store normalized mouse coordinates

  const { DraggedRef } = useContext(DragContext);
  // Function to update mouse coordinates based on mouse movement
  const updateMousePosition = (event: any) => {
    const rect = gl.domElement.getBoundingClientRect();
    mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  };

  const UpdateMouseUp = () => {
    DraggedRef.current = null;
  };

  // Add an event listener for mouse movement
  document.addEventListener("dragover", updateMousePosition);
  document.addEventListener("pointermove", updateMousePosition);
  document.addEventListener("mouseup", UpdateMouseUp);
  document.addEventListener("dragend", UpdateMouseUp);
  useFrame(() => {
    if (DraggedRef.current) {
      // get().gl.domElement.style.cursor = "grabbing";
      raycaster.current.setFromCamera(mouse.current, camera);

      if (DraggedRef.current) {
        // Assign a different layer for this group (and all its children)
        if (DraggedRef.current !== null)
          DraggedRef.current.traverse((object) => {
            object.layers.set(1); // Layer 1
          });
      }

      const intersects = raycaster.current.intersectObjects(
        scene.children,
        true
      );

      if (intersects.length > 0) {
        const intersectionPoint = intersects[0].point;
        DraggedRef.current;
        DraggedRef.current.position.set(
          intersectionPoint.x,
          intersectionPoint.y + 0.01,
          intersectionPoint.z
        );

        console.log(intersects[0].object.parent?.name);

        if (DraggedRef.current) {
          // Assign a different layer for this group (and all its children)
          DraggedRef.current.traverse((object) => {
            object.layers.set(0); // Layer 1
          });
        }
      }
    } else {
      // get().gl.domElement.style.cursor = "default";
    }
  });
  return <></>;
}
