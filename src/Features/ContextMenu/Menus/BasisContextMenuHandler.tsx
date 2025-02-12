import { useEffect, useState } from "react";
import BasisContextMenu from "./BasisContextMenu";
import { TemplateObject } from "@data/R3F";
import { useFullPieces } from "@hooks/index";
import { useObjectContextMenu } from "../useObjectContextMenu";
import { useCartPopup } from "@features/Cart";
import { useAddTemplatePopup } from "@features/Templates/AddTemplateWindow/AddTemplateWindowContext";

interface BasisContextMenuHandlerProps {
  template: TemplateObject;
}

export default function BasisContextMenuHandler({
  template,
}: BasisContextMenuHandlerProps) {
  const { DispatchCreatedTemplates } = useFullPieces();
  const [rotation, setRotation] = useState<number>(0);
  const { setMenu } = useObjectContextMenu();

  const HandleRotationChanged = (rotation: number) => {
    DispatchCreatedTemplates({
      type: "rotate",
      payload: {
        rotation: [template.rotation[0], 0, rotation],
        template: template,
      },
    });

    setRotation(rotation);
  };

  const DeleteActiveBasis = () => {
    DispatchCreatedTemplates({
      type: "delete",
      payload: template,
    });
    setMenu(null);
  };

  const { openPopup } = useCartPopup();

  const { openPopup: openTemplatePopup } = useAddTemplatePopup();

  const OpenAddToCart = () => {
    openPopup(template.templateModel);
  };
  useEffect(() => {
    setRotation(template.rotation[2]);
  }, []);

  return (
    <>
      <BasisContextMenu
        OnRotationChangd={HandleRotationChanged}
        OnDelete={DeleteActiveBasis}
        RotationValue={rotation}
        onAddToCartPressed={OpenAddToCart}
        onAddToSiteAsTemplate={() => openTemplatePopup(template.templateModel)}
      />
    </>
  );
}
