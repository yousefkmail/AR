import { forwardRef, useImperativeHandle, useRef } from "react";
import { usePieces } from "../../Hooks/usePieces";
import { PngPlane, PngPlaneRef } from "../PngPlane/PngPlane";
import { Group, Vector3 } from "three";
import { GroupProps } from "@react-three/fiber";
import { BasisPlane } from "../../Core/BasisPlane";

export type ScenePiecesContainerRef = {
  group: Group;
  Pieces: (PngPlaneRef | null)[];
};

export const ScenePiecesContainer = forwardRef<
  ScenePiecesContainerRef,
  GroupProps
>((_props, ref) => {
  const childrenRefs = useRef<PngPlaneRef[]>([]);

  const groupRef = useRef<Group>(null);
  // Expose childrenRefs array through the parent ref
  useImperativeHandle(ref, () => ({
    group: groupRef.current!,
    Pieces: childrenRefs.current,
  }));

  const { createdPlanes } = usePieces();

  return (
    <group ref={groupRef}>
      {createdPlanes.map((item, index) => {
        if (item instanceof BasisPlane)
          return (
            <PngPlane
              ref={(item) => (childrenRefs.current[index] = item!)}
              key={item.id}
              {...item}
              rotation={new Vector3(90, 0, 0)}
            >
              {item.layers.map((layer) =>
                layer.children.map((itemm) => (
                  <PngPlane key={itemm.id} {...itemm} applyOffset />
                ))
              )}
            </PngPlane>
          );
        else {
          return (
            <PngPlane
              ref={(item) => (childrenRefs.current[index] = item!)}
              key={item.id}
              {...item}
              applyOffset
            />
          );
        }
      })}
    </group>
  );
});
