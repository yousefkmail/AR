import { PieceObject } from "@data/R3F";
import PieceContextMenu, { LayerOption } from "./PieceContextMenu";
import { useState } from "react";
import { useFullPieces } from "@hooks/index";
import { useObjectContextMenu } from "../useObjectContextMenu";

interface PieceContextMenuHandlerProps {
  piece: PieceObject;
}
export default function PieceContextMenuHandler({
  piece,
}: PieceContextMenuHandlerProps) {
  const [layer, _setLayer] = useState<LayerOption>({ label: "1", value: 1 });
  const { DispatchCreatedPieces } = useFullPieces();
  const { setMenu } = useObjectContextMenu();
  const HandleRotationChanged = (_rotation: number) => {
    // DispatchCreatedPieces({
    //   type: "rotate",
    //   payload: {
    //     rotation: [activeObject.rotation[0], 0, rotation],
    //     template: activeObject,
    //   },
    // });
  };

  const DeleteActivePiece = () => {
    DispatchCreatedPieces({
      type: "delete",
      payload: piece,
    });
    setMenu(null);
  };

  const HandleLayerChanged = (_layer: number) => {
    // DispatchCreatedTemplates({
    //   type: "changeLayer",
    //   payload: { layer, piece: piece },
    // });
    // close();
  };

  const DeattachActiveObject = () => {
    // if (!activeObject) return;
    // if ("layer" in activeObject) Deattach_Piece(activeObject);
    // close();
  };
  return (
    <PieceContextMenu
      OnRotationChangd={HandleRotationChanged}
      OnLayerChanged={HandleLayerChanged}
      OnDelete={DeleteActivePiece}
      OnDeattach={DeattachActiveObject}
      layer={layer}
      //   posX={menuPosition.x}
      //   posY={menuPosition.y}
      //   RotationValue={rotation}
      //   OnFlip={FlipActivePiece}
      Flipable={piece.piece.isFlipable}
      //   layersOptions={layerOptions}
      //   OnAddToCartPressed={OpenAddToCart}
    />
  );
}
