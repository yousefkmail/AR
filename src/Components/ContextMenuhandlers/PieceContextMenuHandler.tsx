import { PieceObject } from "@core";
import {
  PieceContextMenu,
  useObjectContextMenu,
} from "../../Features/ContextMenu";
import { useFullPieces } from "@hooks/index";

import { useCartPopup } from "@features/Cart";
import { useEffect, useState } from "react";

interface PieceContextMenuHandlerProps {
  piece: PieceObject;
}
export default function PieceContextMenuHandler({
  piece,
}: PieceContextMenuHandlerProps) {
  const { DispatchCreatedPieces } = useFullPieces();
  const { setMenu } = useObjectContextMenu();
  const [rotation, setRotation] = useState<number>(0);

  const HandleRotationChanged = (rotation: number) => {
    DispatchCreatedPieces({
      type: "rotate",
      payload: {
        rotation: [piece.rotation[0], rotation, 0],
        piece: piece,
      },
    });
    setRotation(rotation);
  };

  const DeleteActivePiece = () => {
    DispatchCreatedPieces({
      type: "delete",
      payload: piece,
    });
    setMenu(null);
  };

  const FlipPiece = () => {
    DispatchCreatedPieces({
      type: "flip",
      payload: { piece },
    });
  };
  const { openPopup } = useCartPopup();

  const OpenAddToCart = () => {
    openPopup(piece.piece);
  };
  useEffect(() => {
    setRotation(piece.rotation[1]);
  }, []);

  return (
    <PieceContextMenu
      OnRotationChangd={HandleRotationChanged}
      OnDelete={DeleteActivePiece}
      OnAddToCartPressed={OpenAddToCart}
      Flipable={piece.piece.isFlipable}
      OnFlip={FlipPiece}
      RotationValue={rotation}
    />
  );
}
