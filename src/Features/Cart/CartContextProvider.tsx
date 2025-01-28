import { useEffect, useState } from "react";
import { ProductItem } from "../../DataService/Models/ProductItem";
import { backendDataService as dataService } from "../../Services/Services";
import { TemplateModel } from "../../DataService/Models/TemplateModel";
import { IncrementalArray } from "../../Utils/IncrementalArray";
import {
  DecrementItemAddition,
  IncrementalArrayThreshouldBehaviour,
  useIncrementalArray,
} from "../../Hooks/useIncrementalArray";
import { useCartItems } from "./useCartItems";
import { CartContext } from "./CartContext";
import { CartItem } from "./CartItem";

export function CartContextProvider({ children }: any) {
  const [updated, setUpdated] = useState(false);

  const getInitialCart = async () => {
    const ids = localStorage.getItem("cart");
    if (!ids || ids.length < 1) {
      setUpdated(true);
      return [];
    }

    const data = await dataService.GetPiecesById(
      JSON.parse(ids).map(
        (item: { item: ProductItem; quantity: number }) => item.item.id
      )
    );
    setUpdated(true);

    setitemsState(
      (JSON.parse(ids) as CartItem<ProductItem>[]).map(({ ...item }) => ({
        quantity: item.quantity,
        item: {
          ...item.item,
          price:
            data.find((itemm) => itemm.id === item.item.id)?.price ??
            item.item.price,
          previewImage:
            data.find((itemm) => itemm.id === item.item.id)?.previewImage ??
            item.item.previewImage,
        },
      }))
    );
  };

  useEffect(() => {
    getInitialCart();
  }, []);

  const compareFn: (
    first: CartItem<ProductItem>,
    second: CartItem<ProductItem>
  ) => boolean = (
    first: CartItem<ProductItem>,
    second: CartItem<ProductItem>
  ) => {
    return first.item.id === second.item.id;
  };

  const {
    addItem: increaseRemovedItem,
    decreaseItem: decreaseRemovedItem,
    clearItems: clearRemovedItems,
    items: removedItems,
  } = useIncrementalArray<CartItem<ProductItem>>(
    compareFn,
    IncrementalArrayThreshouldBehaviour.AllowNegative
  );

  const [basesItems, setBasesItems] = useState<CartItem<ProductItem>[]>();
  const [piecesItems, setPiecesItems] = useState<CartItem<ProductItem>[]>();
  const {
    addItem: addItemState,
    decreaseItem: decreaseItemState,
    items: itemsState,
    setItems: setitemsState,
    removeItem: removeItemState,
  } = useCartItems();

  useEffect(() => {
    //everytime the templates or the products changes in the cart, we need to update the final product items.
    const updatedPiecesItems: IncrementalArray<CartItem<ProductItem>> =
      new IncrementalArray<CartItem<ProductItem>>(compareFn);

    const updatedBasisItems: IncrementalArray<CartItem<ProductItem>> =
      new IncrementalArray<CartItem<ProductItem>>(compareFn);

    //we iterate over all items in the cart, and for each template, we add all of its component into the updatedProductItems.
    itemsState.forEach((cartItem) => {
      //lets first check if the item is template.
      if ("children" in cartItem.item) {
        const templateModel = cartItem.item as TemplateModel;

        //lets first add the base to the final products, we first check if it was previously added,
        //  if so we increment the quantity by the templates amout, since each template can only have 1 base, if not, we
        //add a new product item with the quantity of how many of that templates we have.

        updatedBasisItems.addItem({
          item: templateModel.base,
          quantity: cartItem.quantity,
        });

        //now we handle the rest of the children for each template, and do the same operation as bases, but this time iterating over all children.

        templateModel.children.forEach((PieceChild) => {
          updatedPiecesItems.addItem({
            item: PieceChild.piece,
            quantity: cartItem.quantity,
          });
        });
      } else {
        //if the product item is not a template, then it is a native product, so we just check it and add it directly.
        if ("layers" in cartItem) {
          updatedBasisItems.addItem({
            ...cartItem,
          });
        } else {
          updatedPiecesItems.addItem({
            ...cartItem,
          });
        }
      }
    });
    //finally, we remove all product items that the user chose to decrease.
    for (let item of removedItems) {
      updatedPiecesItems.removeQuantity(item);
      updatedBasisItems.removeQuantity(item);
    }

    setPiecesItems(updatedPiecesItems.getItems());
    setBasesItems(updatedBasisItems.getItems());
  }, [itemsState, removedItems]);

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

  const addItem = (item: CartItem<ProductItem>) => {
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
        removeItem,
        items: itemsState,
        increaseItem,
        decreaseItem,
        increaseProductItem,
        decreaseProductItem,
        resetPieces,
        basesItems,
        piecesItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
