import { MathUtils, Vector3 } from "three";
import { usePieces } from "../../Hooks/usePieces";
import { useObjectContextMenu } from "./useObjectContextMenu";
import { BasisPlane } from "../../Core/BasisPlane";
import PieceContextMenu from "./PieceContextMenu";
import BasisContextMenu from "./BasisContextMenu";
import { BasisPlaneViewModel } from "../../Core/Viewmodels/BasisPlaneViewModel";
import { useState } from "react";
export default function ContextContainer() {
  const { isOpened, menuPosition, activeBasis, activePiece } =
    useObjectContextMenu();
  const [rotation, setRotation] = useState<number>(0);
  const { close } = useObjectContextMenu();
  const {
    FindSceneObjectWithId,
    setCreatedBasis,
    FindPieceWithId,
    createdBasis,
    setCreatedPieces,
  } = usePieces();
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

  const HandleLayerChanged = (layer: number) => {
    if (!activePiece) return;

    setCreatedBasis((prevData) =>
      prevData.map((parent) => {
        const plane = new BasisPlane(
          { ...parent.BasisPlane },
          parent.BasisPlane.id
        );
        const planeViewModel = new BasisPlaneViewModel(plane);
        const parentObj = FindSceneObjectWithId(parent.BasisPlane.id);
        if (parentObj) plane.position = parentObj.position;

        plane.layers = parent.BasisPlane.layers;
        planeViewModel.children = parent.children;

        const sceneObj = FindSceneObjectWithId(activePiece.PiecePlane.id);
        if (sceneObj) activePiece.PiecePlane.position = sceneObj.position;

        planeViewModel.UpdateChildLayer(activePiece, layer);
        return planeViewModel;
      })
    );
    close();
  };

  const DeleteActiveBasis = () => {
    setCreatedBasis((prevData) =>
      prevData.filter(
        (item) => item.BasisPlane.id !== activeBasis?.BasisPlane.id
      )
    );
    close();
  };

  const DeleteActivePiece = () => {
    setCreatedPieces((prevData) =>
      prevData.filter(
        (item) => item.PiecePlane.id !== activePiece?.PiecePlane.id
      )
    );
    close();
  };

  const DeattachActiveObject = () => {
    if (!activePiece) return;
    const child = FindPieceWithId(activePiece.PiecePlane.id);
    if (child && child.parent !== null) {
      let result = createdBasis.map((item) => {
        if (item.BasisPlane.id === child.parent?.BasisPlane.id) {
          item.children = item.children.filter(
            (item) => item.child.PiecePlane.id !== child.PiecePlane.id
          );
          return item;
        } else return item;
      });
      setCreatedBasis(result);
      child.parent = null;
      child.PiecePlane.position = new Vector3(1, 1, 1);
      child.PiecePlane.rotation = new Vector3();
      setCreatedPieces((prev) => [...prev, child]);
    }
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
            posX={menuPosition.x}
            posY={menuPosition.y}
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
