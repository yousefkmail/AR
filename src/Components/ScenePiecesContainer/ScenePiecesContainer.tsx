import { forwardRef, Suspense, useImperativeHandle, useRef } from "react";
import { useFullPieces } from "../../Hooks/useFullPieces";
import { PngPlaneRef } from "../PngPlane/PngPlane";
import { Group } from "three";
import { GroupProps } from "@react-three/fiber";
import PreviewHandler from "../PreviewHandler";

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

  const { createdBasis, createdPieces } = useFullPieces();
  return (
    <Suspense>
      <group ref={groupRef}>
        {createdBasis.map((item, index) => {
          return (
            <item.Render
              key={item.id}
              ref={(item) => (basisRefs.current[index] = item!)}
            ></item.Render>
          );
        })}

        {createdPieces.map((piece, index) => (
          <piece.Render
            key={piece.id}
            ref={(item) => (piecesRefs.current[index] = item!)}
          ></piece.Render>
        ))}
        <PreviewHandler></PreviewHandler>
      </group>
    </Suspense>
  );
});
