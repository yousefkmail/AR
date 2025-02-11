import { TemplateObject } from "@data/R3F";
import PieceContextMenu, { LayerOption } from "./PieceContextMenu";
import { useState } from "react";
import { useFullPieces } from "@hooks/index";
import { useObjectContextMenu } from "../useObjectContextMenu";
import { PieceChild } from "@data/Models";

interface PieceChildContextMenuHandlerProps {
  piece: PieceChild;
  template: TemplateObject;
}
export default function PieceChildContextMenuHandler({
  piece,
}: PieceChildContextMenuHandlerProps) {
  const [layer, _setLayer] = useState<LayerOption>({ label: "1", value: 1 });
  const { DispatchCreatedTemplates, Deattach_Piece } = useFullPieces();
  const { setMenu } = useObjectContextMenu();

  const DeleteActivePiece = () => {
    DispatchCreatedTemplates({
      type: "delete_child",
      payload: { piece: piece },
    });
    setMenu(null);
  };

  const HandleLayerChanged = (layer: number) => {
    DispatchCreatedTemplates({
      type: "changeLayer",
      payload: { layer, piece: piece },
    });
    close();
  };

  const DeattachActiveObject = () => {
    Deattach_Piece(piece);
    setMenu(null);
    close();
  };
  return (
    <PieceContextMenu
      OnLayerChanged={HandleLayerChanged}
      OnDelete={DeleteActivePiece}
      OnDeattach={DeattachActiveObject}
      layer={layer}
      //   posX={menuPosition.x}
      //   posY={menuPosition.y}
      //   RotationValue={rotation}
      //   OnFlip={FlipActivePiece}
      //   Flipable={activeObject?.piece.isFlipable}
      //   layersOptions={layerOptions}
      //   OnAddToCartPressed={OpenAddToCart}
    />
  );
}
