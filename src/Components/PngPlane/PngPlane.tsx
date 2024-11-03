import { Plane, useTexture } from "@react-three/drei";
import React, { useContext, useEffect, useRef } from "react";
import { DragContext } from "../../Context/DragContext";
import { Group } from "three";
import { ThreeEvent } from "@react-three/fiber";
import { Entry } from "contentful";
import { Piece } from "../../Contentful/Types/PieceType";
import { MathUtils } from "three";

interface PngPlaneProps {
  planeData: Entry<Piece, "WITHOUT_UNRESOLVABLE_LINKS", string>;
  children?: React.ReactNode;
}

export default function PngPlane({ children, planeData }: PngPlaneProps) {
  const texture = useTexture(planeData.fields.texture?.fields.file?.url ?? "");

  const ref = useRef<Group>(null);
  const { DraggedRef } = useContext(DragContext);
  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation(); // Prevents the event from bubbling up
    if (event.button !== 0) return;
    DraggedRef.current = ref.current;
  };

  useEffect(() => {
    DraggedRef.current = ref.current;
  }, []);

  return (
    <group
      name={planeData.fields.isBase ? "base" : "piece"}
      ref={ref}
      onPointerDown={handlePointerDown}
      rotation={[
        MathUtils.degToRad(planeData.fields.rotationX),
        MathUtils.degToRad(planeData.fields.rotationY),
        MathUtils.degToRad(planeData.fields.rotationZ),
      ]}
    >
      <Plane
        position={[
          0,
          planeData.fields.isBase ? 0 : planeData.fields.height / 100,
          0,
        ]}
        args={[planeData.fields.width / 50, planeData.fields.height / 50]}
      >
        {/* Apply the texture to the plane */}
        <meshBasicMaterial
          transparent={true}
          side={2}
          map={texture}
          depthWrite={false}
        />
      </Plane>
      {children}
    </group>
  );
}
