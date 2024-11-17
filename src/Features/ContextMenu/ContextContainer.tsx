import { MathUtils } from "three";
import { usePieces } from "../../Hooks/usePieces";
import ObjectContextMenu from "./ObjectContextMenu";
import { useObjectContextMenu } from "./useObjectContextMenu";
import { BasisPlane } from "../../Core/BasisPlane";
import { PiecePlane } from "../../Core/PiecePlane";
export default function ContextContainer() {
  const { isOpened, menuPosition } = useObjectContextMenu();

  const { managedId } = useObjectContextMenu();
  const { FindSceneObjectWithId, FindObjectWithId } = usePieces();
  const HandleRotationChanged = (rotation: number) => {
    const piece = FindObjectWithId(managedId);

    const Group = FindSceneObjectWithId(managedId);
    if (piece instanceof BasisPlane) {
      Group?.rotation.set(Group.rotation.x, 0, MathUtils.degToRad(rotation));
    } else if (piece instanceof PiecePlane && !piece.parent) {
      Group?.rotation.set(0, MathUtils.degToRad(rotation), 0);
    }
  };

  const HandleLayerChanged = (layer: number) => {};
  return (
    <div className="contextMenu_container">
      {isOpened && (
        <ObjectContextMenu
          OnRotationChangd={HandleRotationChanged}
          OnLayerChanged={HandleLayerChanged}
          posX={menuPosition.x}
          posY={menuPosition.y}
        />
      )}
    </div>
  );
}
