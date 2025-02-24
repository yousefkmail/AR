import { PieceObject } from "@core";
import { PieceContextMenu, useObjectContextMenu } from "../..";
import { useFullPieces } from "@hooks/index";

import { useEffect, useState } from "react";
import { useCartPopup } from "@features/Cart/Store/CartPopupStore";

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
  const setIsOpened = useCartPopup((state) => state.setIsOpen);
  const setItem = useCartPopup((state) => state.setItem);

  const OpenAddToCart = () => {
    setItem(piece.piece);
    setIsOpened(true);
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
