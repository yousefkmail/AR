import { MathUtils } from "three";
import { useFullPieces } from "../../Hooks/useFullPieces";
import { useObjectContextMenu } from "./useObjectContextMenu";
import PieceContextMenu, { LayerOption } from "./PieceContextMenu";
import BasisContextMenu from "./BasisContextMenu";
import { useEffect, useState } from "react";
import { useCart } from "../Cart/useCart";
import { TemplateModel } from "../../DataService/Models/TemplateModel";
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
    createdBasis,
    FindBaseWithId,
  } = useFullPieces();

  const HandleRotationChanged = (rotation: number) => {
    if (activeBasis) {
      const Group = FindSceneObjectWithId(activeBasis.id);
      Group?.rotation.set(Group.rotation.x, 0, MathUtils.degToRad(rotation));
      setRotation(rotation);
    }
    if (activePiece && !activePiece.parent) {
      const Group = FindSceneObjectWithId(activePiece.id);
      Group?.rotation.set(0, MathUtils.degToRad(rotation), 0);
      setRotation(rotation);
    }
  };

  useEffect(() => {
    if (activeBasis) {
      const Group = FindSceneObjectWithId(activeBasis.id);
      setRotation(MathUtils.radToDeg(Group?.rotation.x ?? 0));
    }
    if (activePiece) {
      const Group1 = FindSceneObjectWithId(activePiece.id);
      setRotation(MathUtils.radToDeg(Group1?.rotation.y ?? 0));
    }
  }, [activeBasis, activePiece]);

  useEffect(() => {
    if (!activePiece) return;
    let layerIndex = 1;
    createdBasis.forEach((basis) => {
      basis.children.forEach((piece) => {
        if (piece.child.id === activePiece.id) {
          layerIndex = piece.layerIndex;
        }
      });
    });

    if (activePiece.parent) {
      const base = FindBaseWithId(activePiece.parent.id ?? "");

      if (base) {
        setLayerOptions(
          base.BasisPlane.layers.map((layer, index) => ({
            label: layer.name,
            value: index + 1,
          }))
        );
      }
    } else {
      setLayerOptions([]);
    }

    setLayer({
      label: layerIndex.toString(),
      value: layerIndex,
    });
  }, [activePiece, createdBasis]);

  const HandleLayerChanged = (layer: number) => {
    if (!activePiece) return;
    DispatchCreatedBasis({
      type: "changeLayer",
      payload: { layer, piece: activePiece },
    });

    setLayer({
      label: layer.toString(),
      value: layer,
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

  const FlipActivePiece = () => {
    if (!activePiece) return;
    DispatchCreatedPieces({ type: "flip", payload: { piece: activePiece } });

    DispatchCreatedBasis({
      type: "flip_child",
      payload: { piece: activePiece },
    });
  };
  const { addItem } = useCart();

  const AddToCart = (quantity: number) => {
    if (activeBasis) {
      const template: TemplateModel = {
        description: "",
        name: "Collection",
        id: activeBasis.id,
        previewImage: "",
        price:
          activeBasis.children.reduce(
            (prev, next) => prev + next.child.PiecePlane.price,
            0
          ) + activeBasis.BasisPlane.price,
        tags: [],
        data: undefined,
        loadedData: {
          basis: { ...activeBasis.BasisPlane },
          children: activeBasis.children.map((item) => ({
            data: { ...item.child.PiecePlane },
            layer: item.layerIndex,
            position: [
              item.child.PiecePlane.position.x,
              item.child.PiecePlane.position.y,
              item.child.PiecePlane.position.z,
            ],
          })),
        },
      };
      addItem({ quantity: quantity, item: template });
    }
  };

  const [layerOptions, setLayerOptions] = useState<LayerOption[]>([]);

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
            OnFlip={FlipActivePiece}
            Flipable={activePiece?.PiecePlane.isFlipable}
            layersOptions={layerOptions}
          />
        ) : (
          <BasisContextMenu
            OnRotationChangd={HandleRotationChanged}
            OnDelete={DeleteActiveBasis}
            RotationValue={rotation}
            posX={menuPosition.x}
            posY={menuPosition.y}
            onAddToCartPressed={AddToCart}
          />
        ))}
    </div>
  );
}
