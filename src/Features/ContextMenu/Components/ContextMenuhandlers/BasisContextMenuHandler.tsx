import { useEffect, useState } from "react";
import { BasisContextMenu, useObjectContextMenu } from "@features/ContextMenu";
import { TemplateObject } from "@core";
import { useFullPieces } from "@hooks";
import { useTemplateStore } from "@features/Templates/AddTemplateWindow/AddTemplateStore";
import { useCartPopup } from "@features/Cart/Store/CartPopupStore";

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

  const setIsOpened = useCartPopup((state) => state.setIsOpen);
  const setItem = useCartPopup((state) => state.setItem);

  const openTemplatePopup = useTemplateStore((state) => state.openPopup);

  const OpenAddToCart = () => {
    setItem(template.templateModel);
    setIsOpened(true);
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
