import { Edges, Plane, useTexture } from "@react-three/drei";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Color, Group, MathUtils, Vector3 } from "three";

import { ThreeEvent } from "@react-three/fiber";
import { use3DDrag } from "../../Hooks/use3DDrag";

export type PngPlaneRef = {
  container: Group;
  props: {
    id: string;
    applyOffset?: boolean;
    children?: React.ReactNode;
    previewImage?: string;
    position?: Vector3;
    rotation?: Vector3;
    scale?: Vector3;
    width: number;
    height: number;
  };
};

interface PngPlaneProps {
  id: string;
  applyOffset?: boolean;
  children?: React.ReactNode;
  previewImage?: string;
  position?: Vector3;
  rotation?: Vector3;
  scale?: Vector3;
  width: number;
  height: number;
  onDrag?: () => void;
  onDrop?: (event: MouseEvent) => void;
}

export const PngPlane = forwardRef<PngPlaneRef, PngPlaneProps>(
  (props: PngPlaneProps, ref) => {
    const { id } = props;
    const texture = useTexture(props.previewImage ?? "");
    const groupref = useRef<Group | null>(null);

    useImperativeHandle(ref, () => ({
      container: groupref.current!,
      props: props,
    }));

    const [hover, setHovered] = useState<boolean>(false);

    const handlePointerEnter = (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      setHovered(true);
    };
    const { events } = use3DDrag(
      () => props.onDrag?.(),
      (event) => {
        props.onDrop?.(event);
      }
    );

    return (
      <>
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
          onPointerDown={(event: ThreeEvent<PointerEvent>) => {
            events.onPointerDown();
            event.stopPropagation();
            event.stopPropagation();
          }}
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
      </>
    );
  }
);
