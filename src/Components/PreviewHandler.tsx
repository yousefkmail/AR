import { useEffect, useRef } from "react";
import { useObjectPreview } from "../Features/UIToCanvasDrag/Hooks/useObjectPreview";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMousePosition } from "../Hooks/useMousePositiion";
import { PngPlaneRef } from "./PngPlane/PngPlane";
import { SetObjectLayerTraverse } from "../Utils/ThreeUtils";

export default function PreviewHandler() {
  const { preview, previewRef: previewReference } = useObjectPreview();
  const raycaster = useRef(new THREE.Raycaster());
  const { mousePos } = useMousePosition();

  const previewRef = useRef<PngPlaneRef | null>(null);
  useFrame(({ camera, scene }) => {
    if (!previewRef.current) return;
    SetObjectLayerTraverse(previewRef.current.container, 1);

    raycaster.current.setFromCamera(mousePos, camera);

    const intersects = raycaster.current.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
      const intersectionPoint = intersects[0].point;

      previewRef.current.container.position.set(
        intersectionPoint.x,
        intersectionPoint.y + 0.01,
        intersectionPoint.z
      );

      SetObjectLayerTraverse(previewRef.current.container, 0);
    }
  });

  useEffect(() => {
    if (previewRef.current)
      previewReference.current = previewRef.current.container;
  }, [preview]);

  return preview && <preview.Render ref={previewRef}></preview.Render>;
}
