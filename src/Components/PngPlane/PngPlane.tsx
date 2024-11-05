import { Plane, useTexture } from "@react-three/drei";
import { useContext, useRef } from "react";
import { DragContext } from "../../Context/DragContext";
import { Group } from "three";
import { ThreeEvent } from "@react-three/fiber";
import { MathUtils } from "three";
import { PlaneNode } from "../../Core/PlaneObject";

export default function PngPlane({ children, data }: Partial<PlaneNode>) {
  const texture = useTexture(data?.data.fields.texture?.fields.file?.url ?? "");
  const ref = useRef<Group>(null);
  const { DraggedRef } = useContext(DragContext);
  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    if (event.button !== 0) return;

    DraggedRef.current = ref.current;
  };

  return (
    <group
      name={data?.data.fields.isBase ? "base" : "piece"}
      ref={ref}
      position={[
        data?.position.x ?? 0,
        data?.position.y ?? 0,
        data?.position.z ?? 0,
      ]}
      onPointerDown={handlePointerDown}
      rotation={[
        MathUtils.degToRad(data?.rotation.x ?? 0),
        MathUtils.degToRad(data?.rotation.y ?? 0),
        MathUtils.degToRad(data?.rotation.z ?? 0),
      ]}
      userData={{ id: data?.id }}
    >
      <Plane
        name={data?.data.fields.isBase ? "base" : "piece"}
        position={[
          0,
          data?.data.fields.isBase ? 0 : (data?.data.fields.height ?? 0) / 100,
          0,
        ]}
        args={[
          (data?.data.fields.width ?? 0) / 50,
          (data?.data.fields.height ?? 0) / 50,
        ]}
        userData={{ id: data?.id }}
      >
        {/* Apply the texture to the plane */}
        <meshBasicMaterial
          transparent={true}
          side={2}
          map={texture}
          depthWrite={false}
          userData={{ id: data?.id }}
        />
      </Plane>
      {children?.map((item) => (
        <PngPlane key={item.data.id} {...item} />
      ))}
    </group>
  );
}
