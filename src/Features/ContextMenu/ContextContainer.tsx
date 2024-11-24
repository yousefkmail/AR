import { MathUtils, Vector3 } from "three";
import { usePieces } from "../../Hooks/usePieces";
import ObjectContextMenu from "./ObjectContextMenu";
import { useObjectContextMenu } from "./useObjectContextMenu";
import { BasisPlane } from "../../Core/BasisPlane";
import { PiecePlane } from "../../Core/PiecePlane";
export default function ContextContainer() {
  const { isOpened, menuPosition } = useObjectContextMenu();

  const { managedId, close } = useObjectContextMenu();
  const {
    FindSceneObjectWithId,
    FindObjectWithId,
    createdPlanes,
    setCreatedPlanes,
  } = usePieces();
  const HandleRotationChanged = (rotation: number) => {
    const piece = FindObjectWithId(managedId);

    const Group = FindSceneObjectWithId(managedId);
    if (piece instanceof BasisPlane) {
      Group?.rotation.set(Group.rotation.x, 0, MathUtils.degToRad(rotation));
    } else if (piece instanceof PiecePlane && !piece.parent) {
      Group?.rotation.set(0, MathUtils.degToRad(rotation), 0);
    }
  };

  const HandleLayerChanged = (layer: number) => {
    const childToUpdate = FindObjectWithId(managedId);
    setCreatedPlanes((prevData) =>
      prevData.map((parent) => {
        if (
          parent instanceof BasisPlane &&
          childToUpdate instanceof PiecePlane
        ) {
          const plane = new BasisPlane({ ...parent }, parent.id);

          const parentObj = FindSceneObjectWithId(parent.id);
          if (parentObj) plane.position = parentObj.position;

          plane.layers = parent.layers;
          plane.children = parent.children;

          const sceneObj = FindSceneObjectWithId(childToUpdate.id);
          if (sceneObj) childToUpdate.position = sceneObj.position;

          plane.UpdateChildLayer(childToUpdate, layer);
          return plane;
        } else {
          return parent;
        }
      })
    );
    close();
  };

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
