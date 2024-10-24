import { Plane, useTexture } from "@react-three/drei";
import { forwardRef, useContext, useEffect, useRef } from "react";
import { DragContext } from "../../App";

interface PngPlaneProps {
  id: number;
  path: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  onDrag?: (newPosition: [number, number, number]) => void; // Add onDrag prop
  pivotOffset?: [number, number, number];
}

export default forwardRef(function PngPlane({
  id,
  path,
  position,
  rotation,
  pivotOffset,
}: PngPlaneProps) {
  const planeRef = useRef(null);
  const texture = useTexture(path);

  const { width, height } = texture.image;
  const { setDraggedId } = useContext(DragContext);
  const handlePointerDown = (event: any) => {
    event.stopPropagation(); // Prevents the event from bubbling up
    setDraggedId(id);
  };

  return (
    <group
      ref={planeRef}
      onPointerDown={handlePointerDown}
      position={position}
      rotation={rotation}
    >
      <Plane
        position={pivotOffset ? pivotOffset : [0, 0, 0]}
        args={[width / 1000, height / 1000]}
      >
        {/* Apply the texture to the plane */}
        <meshBasicMaterial transparent={true} side={2} map={texture} />
      </Plane>
    </group>
  );
});
