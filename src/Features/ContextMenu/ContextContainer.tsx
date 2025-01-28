import { useFullPieces } from "../../Hooks/useFullPieces";
import { useObjectContextMenu } from "./useObjectContextMenu";
import PieceContextMenu, { LayerOption } from "./PieceContextMenu";
import BasisContextMenu from "./BasisContextMenu";
import { useEffect, useState } from "react";
import { useCart } from "../Cart/useCart";
import { v4 as uuidv4 } from "uuid";
import { TemplateModel } from "../../DataService/Models/TemplateModel";
import { TemplateObject } from "../../Core/Template";
import { PieceObject } from "../../Core/PiecePlane";
import CollectionAddToCartPopup from "./CollectionAddToCartPopup";
import { Piece } from "../../DataService/Models/PieceModel";

export default function ContextContainer() {
  const { isOpened, menuPosition, close, activeObject } =
    useObjectContextMenu();

  const [rotation, setRotation] = useState<number>(0);
  const [layerOptions, setLayerOptions] = useState<LayerOption[]>([]);
  const [layer, setLayer] = useState<LayerOption>({ label: "1", value: 1 });

  const [addToCartOpened, setAddToCartOpened] = useState<boolean>(false);
  const {
    DispatchCreatedPieces,
    Deattach_Piece,
    DispatchCreatedTemplates,
    FindParent,
  } = useFullPieces();

  const HandleRotationChanged = (rotation: number) => {
    if (activeObject) {
      if ("templateModel" in activeObject)
        DispatchCreatedTemplates({
          type: "rotate",
          payload: {
            rotation: [activeObject.rotation[0], 0, rotation],
            template: activeObject,
          },
        });

      setRotation(rotation);
    }
  };

  useEffect(() => {
    if (!activeObject) return;
    if ("templateModel" in activeObject) {
      setRotation(activeObject.rotation[2]);
    } else if ("layer" in activeObject) {
      const parentTemplate = FindParent(activeObject);
      if (!parentTemplate) return;
      setLayerOptions(
        parentTemplate.templateModel.base.layers.map((item, index) => ({
          label: item.name,
          value: index,
        }))
      );
      setLayer({
        label:
          parentTemplate.templateModel.base.layers[activeObject.layer].name,
        value: parentTemplate.templateModel.base.layers.findIndex(
          (item) =>
            item.name ===
            parentTemplate.templateModel.base.layers[activeObject.layer].name
        ),
      });
    }
  }, [activeObject]);

  const HandleLayerChanged = (layer: number) => {
    if (!activeObject) return;
    if ("layer" in activeObject)
      DispatchCreatedTemplates({
        type: "changeLayer",
        payload: { layer, piece: activeObject },
      });

    close();
  };

  const DeleteActiveBasis = () => {
    if (!activeObject) return;
    DispatchCreatedTemplates({
      type: "delete",
      payload: activeObject as TemplateObject,
    });
    close();
  };

  const DeleteActivePiece = () => {
    if (!activeObject) return;
    if ("layer" in activeObject)
      DispatchCreatedTemplates({
        type: "delete_child",
        payload: { piece: activeObject },
      });
    else
      DispatchCreatedPieces({
        type: "delete",
        payload: activeObject as PieceObject,
      });

    close();
  };

  const DeattachActiveObject = () => {
    if (!activeObject) return;
    if ("layer" in activeObject) Deattach_Piece(activeObject);
    close();
  };

  const FlipActivePiece = () => {
    if (!activeObject) return;
    if ("layer" in activeObject) {
      DispatchCreatedTemplates({
        type: "flip_child",
        payload: { piece: activeObject },
      });
    } else if ("piece" in activeObject) {
      DispatchCreatedPieces({ type: "flip", payload: { piece: activeObject } });
    }
  };
  const { addItem } = useCart();

  const AddToCart = (quantity: number, name: string) => {
    console.log(typeof quantity);

    if (activeObject && "templateModel" in activeObject) {
      const template: TemplateModel = {
        ...activeObject.templateModel,

        id: uuidv4(),
      };
      template.name = name;
      template.price =
        template.base.price +
        template.children.reduce((prev, next) => prev + next.piece.price, 0);
      addItem({ quantity: quantity, item: template });
    }
    if (activeObject && "piece" in activeObject && !("layer" in activeObject)) {
      const piece: Piece = { ...activeObject.piece };

      addItem({ quantity: quantity, item: piece });
    }
    setAddToCartOpened(false);
  };

  const OpenAddToCart = () => {
    setAddToCartOpened(true);
  };

  return (
    <div className="contextMenu_container" style={{ zIndex: 5200 }}>
      {isOpened &&
        activeObject &&
        ("templateModel" in activeObject ? (
          <BasisContextMenu
            OnRotationChangd={HandleRotationChanged}
            OnDelete={DeleteActiveBasis}
            RotationValue={rotation}
            posX={menuPosition.x}
            posY={menuPosition.y}
            onAddToCartPressed={OpenAddToCart}
          />
        ) : (
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
            Flipable={activeObject?.piece.isFlipable}
            layersOptions={layerOptions}
            OnAddToCartPressed={OpenAddToCart}
          />
        ))}
      <div>
        {addToCartOpened && (
          <div
            style={{
              backgroundColor: "rgba(128,128,128,0.2)",
              position: "fixed",
              inset: "0",
            }}
          ></div>
        )}

        <CollectionAddToCartPopup
          isShown={addToCartOpened}
          name={(() => {
            console.log(activeObject);
            if (activeObject && "templateModel" in activeObject) {
              return activeObject.templateModel.name;
            }
            if (activeObject && "piece" in activeObject) {
              return activeObject.piece.name;
            }
            return "";
          })()}
          nameEditable={activeObject ? "templateModel" in activeObject : false}
          onAddToCartPressed={(amount: number, name: string) => {
            AddToCart(amount, name);
          }}
          onClose={() => setAddToCartOpened(false)}
        />
      </div>
    </div>
  );
}
