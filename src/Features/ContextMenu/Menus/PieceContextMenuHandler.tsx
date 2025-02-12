import { PieceObject } from "@data/R3F";
import PieceContextMenu from "./PieceContextMenu";
import { useFullPieces } from "@hooks/index";
import { useObjectContextMenu } from "../useObjectContextMenu";
import { useCartPopup } from "@features/Cart/AddItemWindow/CartPopupContext";

interface PieceContextMenuHandlerProps {
  piece: PieceObject;
}
export default function PieceContextMenuHandler({
  piece,
}: PieceContextMenuHandlerProps) {
  const { DispatchCreatedPieces } = useFullPieces();
  const { setMenu } = useObjectContextMenu();
  const HandleRotationChanged = (rotation: number) => {
    DispatchCreatedPieces({
      type: "rotate",
      payload: {
        rotation: [piece.rotation[0], rotation, 0],
        piece: piece,
      },
    });
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

  return (
    <PieceContextMenu
      OnRotationChangd={HandleRotationChanged}
      OnDelete={DeleteActivePiece}
      OnAddToCartPressed={OpenAddToCart}
      Flipable={piece.piece.isFlipable}
      OnFlip={FlipPiece}
    />
  );
}
