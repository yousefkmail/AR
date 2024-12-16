import { MathUtils, Vector3 } from "three";
import { usePieces } from "../../Hooks/usePieces";
import { useObjectContextMenu } from "./useObjectContextMenu";
import { BasisPlane } from "../../Core/BasisPlane";
import PieceContextMenu from "./PieceContextMenu";
import BasisContextMenu from "./BasisContextMenu";
export default function ContextContainer() {
  const { isOpened, menuPosition, activeBasis, activePiece } =
    useObjectContextMenu();

  const { close } = useObjectContextMenu();
  const {
    FindSceneObjectWithId,
    setCreatedBasis,
    FindPieceWithId,
    createdBasis,
    FindBaseWithId,
    setCreatedPieces,
  } = usePieces();
  const HandleRotationChanged = (rotation: number) => {
    // if (activeBasis) {
    //   const Group = FindSceneObjectWithId(activeBasis.id);
    //   Group?.rotation.set(Group.rotation.x, 0, MathUtils.degToRad(rotation));
    // }
    // if (activePiece && !activePiece.) {
    //   const Group = FindSceneObjectWithId(activePiece.id);
    //   Group?.rotation.set(0, MathUtils.degToRad(rotation), 0);
    // }
  };

  // const HandleLayerChanged = (layer: number) => {
  //   if (!activePiece) return;

  //   setCreatedBasis((prevData) =>
  //     prevData.map((parent) => {
  //       const plane = new BasisPlane({ ...parent }, parent.id);

  //       const parentObj = FindSceneObjectWithId(parent.id);
  //       if (parentObj) plane.position = parentObj.position;

  //       plane.layers = parent.layers;
  //       plane.children = parent.children;

  //       const sceneObj = FindSceneObjectWithId(activePiece.id);
  //       if (sceneObj) activePiece.position = sceneObj.position;

  //       plane.UpdateChildLayer(activePiece, layer);
  //       return plane;
  //     })
  //   );
  //   close();
  // };

  const DeleteActiveBasis = () => {
    // setCreatedBasis((prevData) =>
    //   prevData.filter((item) => item.id !== activeBasis?.id)
    // );
    // close();
  };

  const DeleteActivePiece = () => {
    // setCreatedPieces((prevData) =>
    //   prevData.filter((item) => item.id !== activePiece?.id)
    // );
    // close();
  };

  const DeattachActiveObject = () => {
    // if (!activePiece) return;
    // const child = FindPieceWithId(activePiece.id);
    // if (child && child.parent !== null) {
    //   let result = createdBasis.map((item) => {
    //     if (item.id === child.parent?.id) {
    //       item.children = item.children.filter(
    //         (item) => item.child.id !== child.id
    //       );
    //       return item;
    //     } else return item;
    //   });
    //   setCreatedBasis(result);
    //   child.parent = null;
    //   child.position = new Vector3(1, 1, 1);
    //   child.rotation = new Vector3();
    //   setCreatedPieces((prev) => [...prev, child]);
    // }
    // close();
  };

  return (
    <div className="contextMenu_container">
      {/* {isOpened &&
        (activeBasis === null ? (
          <PieceContextMenu
            OnRotationChangd={HandleRotationChanged}
            OnLayerChanged={HandleLayerChanged}
            OnDelete={DeleteActivePiece}
            OnDeattach={DeattachActiveObject}
            posX={menuPosition.x}
            posY={menuPosition.y}
          />
        ) : (
          <BasisContextMenu
            OnRotationChangd={HandleRotationChanged}
            OnDelete={DeleteActiveBasis}
            posX={menuPosition.x}
            posY={menuPosition.y}
          />
        ))} */}
    </div>
  );
}
