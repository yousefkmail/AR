import { Plane, useTexture } from "@react-three/drei";
import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import { DragContext } from "../../App";
import { Group } from "three";

export interface PngPlaneProps {
  id: number;
  path: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  onDrag?: (newPosition: [number, number, number]) => void; // Add onDrag prop
  pivotOffset?: [number, number, number];
}

export default function PngPlane({
  id,
  path,
  position,
  rotation,
  pivotOffset,
}: PngPlaneProps) {
  const texture = useTexture(path);

  const ref = useRef<Group>(null);
  const { width, height } = texture.image;
  const { DraggedRef } = useContext(DragContext);
  const handlePointerDown = (event: any) => {
    event.stopPropagation(); // Prevents the event from bubbling up
    DraggedRef.current = ref.current;
  };

  useEffect(() => {
    DraggedRef.current = ref.current;
  }, []);

  return (
    <group
      ref={ref}
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
}
