import { MathUtils } from "three";
import { useFullPieces } from "../../Hooks/useFullPieces";
import { useObjectContextMenu } from "./useObjectContextMenu";
import PieceContextMenu, { LayerOption } from "./PieceContextMenu";
import BasisContextMenu from "./BasisContextMenu";
import { useEffect, useState } from "react";
export default function ContextContainer() {
  const { isOpened, menuPosition, activeBasis, activePiece } =
    useObjectContextMenu();
  const [rotation, setRotation] = useState<number>(0);
  const [layer, setLayer] = useState<LayerOption>({ label: "1", value: 1 });
  const { close } = useObjectContextMenu();
  const {
    FindSceneObjectWithId,
    DispatchCreatedBasis,
    DispatchCreatedPieces,
    Deattach_Piece,
  } = useFullPieces();

  const HandleRotationChanged = (rotation: number) => {
    if (activeBasis) {
      const Group = FindSceneObjectWithId(activeBasis.BasisPlane.id);
      Group?.rotation.set(Group.rotation.x, 0, MathUtils.degToRad(rotation));
      setRotation(rotation);
    }
    if (activePiece && !activePiece.parent) {
      const Group = FindSceneObjectWithId(activePiece.PiecePlane.id);
      Group?.rotation.set(0, MathUtils.degToRad(rotation), 0);
      setRotation(rotation);
    }
  };

  useEffect(() => {
    if (activeBasis) {
      const Group = FindSceneObjectWithId(activeBasis.BasisPlane.id);
      setRotation(MathUtils.radToDeg(Group?.rotation.x ?? 0));
    }
    if (activePiece) {
      const Group1 = FindSceneObjectWithId(activePiece.PiecePlane.id);
      setRotation(MathUtils.radToDeg(Group1?.rotation.y ?? 0));
    }
  }, [activeBasis, activePiece]);

  const HandleLayerChanged = (layer: number) => {
    if (!activePiece) return;
    DispatchCreatedBasis({
      type: "changeLayer",
      payload: { layer, piece: activePiece },
    });

    close();
  };

  const DeleteActiveBasis = () => {
    if (!activeBasis) return;
    DispatchCreatedBasis({ type: "delete", payload: activeBasis });

    close();
  };

  const DeleteActivePiece = () => {
    if (!activePiece) return;
    DispatchCreatedPieces({ type: "delete", payload: activePiece });
    DispatchCreatedBasis({
      type: "delete_child",
      payload: { piece: activePiece },
    });
    close();
  };

  const DeattachActiveObject = () => {
    if (!activePiece) return;
    Deattach_Piece(activePiece);
    close();
  };

  return (
    <div className="contextMenu_container">
      {isOpened &&
        (activeBasis === null ? (
          <PieceContextMenu
            OnRotationChangd={HandleRotationChanged}
            OnLayerChanged={HandleLayerChanged}
            OnDelete={DeleteActivePiece}
            OnDeattach={DeattachActiveObject}
            layer={layer}
            posX={menuPosition.x}
            posY={menuPosition.y}
            RotationValue={rotation}
          />
        ) : (
          <BasisContextMenu
            OnRotationChangd={HandleRotationChanged}
            OnDelete={DeleteActiveBasis}
            RotationValue={rotation}
            posX={menuPosition.x}
            posY={menuPosition.y}
          />
        ))}
    </div>
  );
}
