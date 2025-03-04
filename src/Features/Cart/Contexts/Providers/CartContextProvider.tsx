import { useEffect, useState } from "react";
import { pieceService } from "../../../../Services/Services";
import { TemplateModel } from "@core";
import { IncrementalArray } from "@utils";
import {
  DecrementItemAddition,
  IncrementalArrayThreshouldBehaviour,
  useIncrementalArray,
} from "@hooks";
import { useCartItems } from "../../Hooks/useCartItems";
import { CartContext } from "../CartContext";
import { CartItemType } from "../../Models/CartItemType";
import { ProductItem } from "@data";

export function CartContextProvider({ children }: any) {
  const [updated, setUpdated] = useState(false);

  const getInitialCart = async () => {
    const ids = localStorage.getItem("cart");
    if (!ids || ids.length < 1) {
      setUpdated(true);
      return [];
    }

    const data = await pieceService.getPiecesByIds(
      JSON.parse(ids).map(
        (item: { item: ProductItem; quantity: number }) => item.item.id
      )
    );
    setUpdated(true);

    setitemsState(
      (JSON.parse(ids) as CartItemType<ProductItem>[]).map(({ ...item }) => ({
        quantity: item.quantity,
        item: {
          ...item.item,
          price:
            data?.find((itemm) => itemm.id === item.item.id)?.price ??
            item.item.price,
          previewImage:
            data?.find((itemm) => itemm.id === item.item.id)?.previewImage ??
            item.item.previewImage,
        },
      }))
    );
  };

  useEffect(() => {
    getInitialCart();
  }, []);

  const compareFn: (
    first: CartItemType<ProductItem>,
    second: CartItemType<ProductItem>
  ) => boolean = (
    first: CartItemType<ProductItem>,
    second: CartItemType<ProductItem>
  ) => {
    return first.item.id === second.item.id;
  };

  const {
    addItem: increaseRemovedItem,
    decreaseItem: decreaseRemovedItem,
    clearItems: clearRemovedItems,
    items: removedItems,
    setItems: setRemovedItems,
  } = useIncrementalArray<CartItemType<ProductItem>>(
    compareFn,
    IncrementalArrayThreshouldBehaviour.AllowNegative
  );

  const [productItems, setProductItems] = useState<CartItemType<ProductItem>[]>(
    []
  );

  const [finalProductItems, setFinalProductItems] = useState<
    CartItemType<ProductItem>[]
  >([]);

  const {
    addItem: addItemState,
    decreaseItem: decreaseItemState,
    items: itemsState,
    setItems: setitemsState,
    removeItem: removeItemState,
  } = useCartItems();

  useEffect(() => {
    //everytime the templates or the products changes in the cart, we need to update the final product items.
    const updatedProductItems: IncrementalArray<CartItemType<ProductItem>> =
      new IncrementalArray<CartItemType<ProductItem>>(compareFn);

    //we iterate over all items in the cart, and for each template, we add all of its component into the updatedProductItems.
    itemsState.forEach((cartItem) => {
      //lets first check if the item is template.
      if ("children" in cartItem.item) {
        const templateModel = cartItem.item as TemplateModel;

        //lets first add the base to the final products, we first check if it was previously added,
        //  if so we increment the quantity by the templates amout, since each template can only have 1 base, if not, we
        //add a new product item with the quantity of how many of that templates we have.

        updatedProductItems.addItem({
          item: templateModel.base,
          quantity: cartItem.quantity,
        });

        //now we handle the rest of the children for each template, and do the same operation as bases, but this time iterating over all children.

        templateModel.pieces.forEach((PieceChild) => {
          updatedProductItems.addItem({
            item: PieceChild.piece,
            quantity: cartItem.quantity,
          });
        });
      } else {
        //if the product item is not a template, then it is a native product, so we just check it and add it directly.
        if ("layers" in cartItem) {
          updatedProductItems.addItem({
            ...cartItem,
          });
        } else {
          updatedProductItems.addItem({
            ...cartItem,
          });
        }
      }
    });

    setProductItems(updatedProductItems.getItems());
  }, [itemsState]);

  useEffect(() => {
    let updatedItems: CartItemType<ProductItem>[] = [];
    for (let removedItem of removedItems) {
      const item = productItems.find(
        (productItem) => productItem.item.id === removedItem.item.id
      );
      if (item) {
        if (removedItem.quantity > item.quantity) {
          updatedItems.push({
            ...removedItem,
            quantity: item.quantity,
          });
        } else {
          updatedItems.push(removedItem);
        }
      }
    }
    setRemovedItems(updatedItems);
  }, [productItems]);

  useEffect(() => {
    const updatedProductItems: IncrementalArray<CartItemType<ProductItem>> =
      new IncrementalArray<CartItemType<ProductItem>>(compareFn);

    for (let productItem of productItems) {
      updatedProductItems.addItem(productItem);
    }

    for (let removedItem of removedItems) {
      updatedProductItems.removeQuantity(removedItem);
    }

    setFinalProductItems(updatedProductItems.getItems());
  }, [removedItems, productItems]);

  const decreaseProductItem = (productItem: ProductItem) => {
    increaseRemovedItem({ item: productItem, quantity: 1 });
  };

  const increaseProductItem = (productItem: ProductItem) => {
    decreaseRemovedItem(
      { item: productItem, quantity: 1 },
      DecrementItemAddition.Add
    );
  };

  useEffect(() => {
    if (!updated) return;
    localStorage.setItem("cart", JSON.stringify(itemsState));
  }, [updated, itemsState]);

  const addItem = (item: CartItemType<ProductItem>) => {
    addItemState(item);
  };

  const removeItem = (item: ProductItem) => {
    removeItemState({ item, quantity: 0 });
  };

  const increaseItem = (item: ProductItem) => {
    addItemState({ item, quantity: 1 });
  };

  const decreaseItem = (item: ProductItem) => {
    decreaseItemState({ item, quantity: 1 });
  };

  const resetPieces = () => {
    clearRemovedItems();
  };
  return (
    <CartContext.Provider
      value={{
        addItem,
        finalProductItems,
        removeItem,
        items: itemsState,
        increaseItem,
        decreaseItem,
        increaseProductItem,
        decreaseProductItem,
        resetPieces,
        productItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
