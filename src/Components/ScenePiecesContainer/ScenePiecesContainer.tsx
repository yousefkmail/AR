import { forwardRef, useImperativeHandle, useRef } from "react";
import { usePieces } from "../../Hooks/usePieces";
import { PngPlane, PngPlaneRef } from "../PngPlane/PngPlane";
import { Group, Vector3 } from "three";
import { GroupProps } from "@react-three/fiber";

export type ScenePiecesContainerRef = {
  group: Group;
  Pieces: (PngPlaneRef | null)[];
  Basis: (PngPlaneRef | null)[];
};

export const ScenePiecesContainer = forwardRef<
  ScenePiecesContainerRef,
  GroupProps
>((_props, ref) => {
  const basisRefs = useRef<PngPlaneRef[]>([]);
  const piecesRefs = useRef<PngPlaneRef[]>([]);

  const groupRef = useRef<Group>(null);
  // Expose childrenRefs array through the parent ref
  useImperativeHandle(ref, () => ({
    group: groupRef.current!,
    Pieces: piecesRefs.current,
    Basis: basisRefs.current,
  }));

  const { createdBasis, createdPieces } = usePieces();

  return (
    <group ref={groupRef}>
      {createdBasis.map((item, index) => {
        return (
          <PngPlane
            ref={(item) => (basisRefs.current[index] = item!)}
            key={item.id}
            {...item}
            rotation={new Vector3(90, 0, 0)}
          >
            {item.children.map((child, index) => (
              <PngPlane
                key={child.child.id}
                {...child.child}
                applyOffset
                position={
                  new Vector3(
                    child.child.position.x,
                    ((item.layers[child.layerIndex - 1]?.positionOffset ?? 0) +
                      index * 0.01) /
                      50,
                    child.child.position.z
                  )
                }
              />
            ))}
          </PngPlane>
        );
      })}

      {createdPieces.map((piece, index) => (
        <PngPlane
          ref={(item) => (piecesRefs.current[index] = item!)}
          key={piece.id}
          {...piece}
          applyOffset
        />
      ))}
    </group>
  );
});
