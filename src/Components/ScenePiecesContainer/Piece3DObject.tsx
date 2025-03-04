import React, { Suspense, useContext, useRef } from "react";
import { Piece3DObjectContext } from "./Piece3DObjectContext";
import { ArrayToVector3 } from "@utils/Math";
import { Vector3 } from "three";
import { useObjectContextMenu } from "@features/ContextMenu/Hooks/useObjectContextMenu";
import { PngPlaneRef } from "../PngPlane/PngPlane";
import { PieceObject } from "@core";
import { useMouseRaycaster } from "@hooks";
import { useThree } from "@react-three/fiber";
import { useFullPieces, useMousePosition } from "@hooks/index";
import { NDCToObjectWorld } from "@utils/ThreeUtils";
import PieceContextMenuHandler from "../../Features/ContextMenu/Components/ContextMenuhandlers/PieceContextMenuHandler";
import { useCameraControlStore } from "../../Pages/3DBuilder/CameraControlStore";
const PngPlane = React.lazy(() => import("../PngPlane/PngPlane"));

export default function Piece3DObject() {
  const { pieceObject } = useContext(Piece3DObjectContext);
  const { camera, scene, gl } = useThree();

  const { open: openMenu, setMenuPosition, setMenu } = useObjectContextMenu();

  const { getFirstObject, setIgnoredArray } = useMouseRaycaster(camera, scene);

  const setCameraControl = useCameraControlStore(
    (state) => state.setCameraControl
  );

  const { DispatchCreatedPieces } = useFullPieces();
  const ref = useRef<PngPlaneRef>(null!);
  const handlePieceDrag = (object: PngPlaneRef, pieceObject: PieceObject) => {
    setIgnoredArray([object.container]);
    const obj = getFirstObject();

    if (!obj) return;
    DispatchCreatedPieces({
      type: "move",
      payload: {
        piece: pieceObject,
        position: [obj.point.x, obj.point.y + 0.01, obj.point.z],
      },
    });
  };

  const { mousePos } = useMousePosition();
  const {
    FindTemplateWithId,
    FindSceneObjectWithId,
    HandlePieceDroppedOnPlane,
  } = useFullPieces();
  const handlePieceDropped = (
    piece: PieceObject,
    piece3DObject: PngPlaneRef
  ) => {
    setIgnoredArray([piece3DObject.container]);
    const obj = getFirstObject();
    if (obj?.object.userData.id) {
      const template = FindTemplateWithId(obj?.object.userData.id);
      if (template) {
        const tempalate3DObject = FindSceneObjectWithId(template.id);

        if (!tempalate3DObject) {
          setMenu(
            <PieceContextMenuHandler
              piece={pieceObject}
            ></PieceContextMenuHandler>
          );
          openMenu();
          return;
        }
        const position = NDCToObjectWorld(mousePos, tempalate3DObject, camera);
        HandlePieceDroppedOnPlane(
          piece,
          template,
          tempalate3DObject.worldToLocal(position)
        );
      }
    } else {
      setMenu(
        <PieceContextMenuHandler piece={pieceObject}></PieceContextMenuHandler>
      );
      openMenu();
    }
  };

  const PlaceMenuAtMouseposition = (event: MouseEvent) => {
    const offsetX = event.clientX - gl.domElement.getBoundingClientRect().left;
    const offsetY = event.clientY - gl.domElement.getBoundingClientRect().top;
    setMenuPosition(offsetX, offsetY);
  };

  return (
    <Suspense>
      <PngPlane
        key={pieceObject.id}
        ref={ref}
        onDrag={() => {
          setCameraControl(false);
          handlePieceDrag(ref.current, pieceObject);
        }}
        onDrop={(event: MouseEvent) => {
          setCameraControl(true);

          handlePieceDropped(pieceObject, ref.current);
          PlaceMenuAtMouseposition(event);
        }}
        {...pieceObject.piece}
        id={pieceObject.id}
        position={ArrayToVector3(pieceObject.position)}
        rotation={ArrayToVector3(pieceObject.rotation)}
        scale={
          pieceObject.piece.isFlipable && pieceObject.piece.isFlipped
            ? new Vector3(-1, 1, 1)
            : new Vector3(1, 1, 1)
        }
        applyOffset
      />
    </Suspense>
  );
}
