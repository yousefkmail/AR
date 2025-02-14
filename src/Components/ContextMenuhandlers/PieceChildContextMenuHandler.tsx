import {
  useObjectContextMenu,
  PieceChildContextMenu,
  LayerOption,
} from "@features/ContextMenu";
import { useEffect, useState } from "react";
import { useFullPieces } from "@hooks/index";
import { PieceChild, TemplateObject } from "../../Core";

interface PieceChildContextMenuHandlerProps {
  piece: PieceChild;
  template: TemplateObject;
}
export default function PieceChildContextMenuHandler({
  piece,
  template,
}: PieceChildContextMenuHandlerProps) {
  const [layer, setLayer] = useState<LayerOption>({ label: "1", value: 1 });
  const { DispatchCreatedTemplates, Deattach_Piece } = useFullPieces();
  const [layerOptions, setLayerOptions] = useState<LayerOption[]>([]);

  const { setMenu } = useObjectContextMenu();

  const DeleteActivePiece = () => {
    DispatchCreatedTemplates({
      type: "delete_child",
      payload: { piece: piece },
    });
    setMenu(null);
  };

  const HandleLayerChanged = (layer: number) => {
    DispatchCreatedTemplates({
      type: "changeLayer",
      payload: { layer, piece: piece },
    });
    setLayer({
      label: template.templateModel.base.layers[layer].name,
      value: layer,
    });
  };

  const DeattachActiveObject = () => {
    Deattach_Piece(piece);
    setMenu(null);
    close();
  };

  const FlipActivePiece = () => {
    DispatchCreatedTemplates({
      type: "flip_child",
      payload: { piece },
    });
  };

  useEffect(() => {
    setLayerOptions(
      template.templateModel.base.layers.map((item, index) => ({
        label: item.name,
        value: index,
      }))
    );
  }, [piece]);

  useEffect(() => {
    const templateLayers = template.templateModel.base.layers;
    setLayer({ label: templateLayers[piece.layer].name, value: piece.layer });
  }, []);

  return (
    <PieceChildContextMenu
      OnLayerChanged={HandleLayerChanged}
      OnDelete={DeleteActivePiece}
      OnDeattach={DeattachActiveObject}
      layer={layer}
      layersOptions={layerOptions}
      OnFlip={FlipActivePiece}
      Flipable={piece.piece.isFlipable}
    />
  );
}
