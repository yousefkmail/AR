import { Edges, Plane, useTexture } from "@react-three/drei";
import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { DragContext } from "../../Context/DragContext";
import { Color, Group, MathUtils } from "three";
import { ThreeEvent } from "@react-three/fiber";
import { useSceneSettings } from "../../Hooks/useSceneSettings";
import { MovementMode } from "../../Context/SceneSettingsContext";
import { PlaneBase } from "../../Core/PlaneBase";

export type PngPlaneRef = {
  container: Group;
  props: Partial<PlaneBase>;
};

interface PngPlaneProps extends Partial<PlaneBase> {
  applyOffset?: boolean;
  children?: React.ReactNode;
}

export const PngPlane = forwardRef<PngPlaneRef, PngPlaneProps>(
  (props: PngPlaneProps, ref) => {
    const { id } = props;

    const texture = useTexture(props.previewImage ?? "");
    const groupref = useRef<Group>(null);
    const { DraggedRef } = useContext(DragContext);
    const { movementMode } = useSceneSettings();
    const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
      if (event.button !== 0) return;
      if (movementMode === MovementMode.Child) event.stopPropagation();
      DraggedRef.current = groupref.current;
    };

    useImperativeHandle(ref, () => ({
      container: groupref.current!,
      props: props,
    }));

    const [hover, setHovered] = useState<boolean>(false);

    const handlePointerEnter = (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      setHovered(true);
    };

    return (
      <group
        scale={[
          props?.scale?.x ?? 1,
          props?.scale?.y ?? 1,
          props?.scale?.z ?? 1,
        ]}
        ref={groupref}
        position={[
          props?.position?.x ?? 0,
          props?.position?.y ?? 0,
          props?.position?.z ?? 0,
        ]}
        onPointerDown={handlePointerDown}
        rotation={[
          MathUtils.degToRad(props?.rotation?.x ?? 0),
          MathUtils.degToRad(props?.rotation?.y ?? 0),
          MathUtils.degToRad(props?.rotation?.z ?? 0),
        ]}
        userData={{ id: id }}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={() => {
          setHovered(false);
        }}
      >
        <Plane
          position={[
            0,
            props.applyOffset ? ((props?.height ?? 0) + 0.1) / 100 : 0,
            0,
          ]}
          args={[(props?.width ?? 0) / 50, (props?.height ?? 0) / 50]}
          userData={{ id: id }}
        >
          <meshBasicMaterial
            transparent={true}
            side={2}
            map={texture}
            depthTest={true}
            alphaTest={0.5}
            userData={{ id: id }}
          />
          {hover && <Edges side={2} color={Color.NAMES.yellow} />}
        </Plane>
        {props.children}
      </group>
    );
  }
);
