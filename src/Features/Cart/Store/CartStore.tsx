import { create } from "zustand";
import { ProductItem } from "@data";
import { CartItemType } from "../Models/CartItemType";
import { IncrementalArray } from "@utils/IncrementalArray";
import { TemplateModel } from "@core/index";
import { pieceService } from "@services/Services";

interface CartStore {
  items: CartItemType<ProductItem>[];
  setItems: (items: CartItemType<ProductItem>[]) => void;
  addItem: (item: CartItemType<ProductItem>) => void;
  removeItem: (item: ProductItem) => void;
  decreaseItem: (item: CartItemType<ProductItem>) => void;
  initializeCart: () => void;

  removedItems: CartItemType<ProductItem>[];
  productItems: CartItemType<ProductItem>[];
  finalProductItems: CartItemType<ProductItem>[];
  setRemovedItems: (items: CartItemType<ProductItem>[]) => void;
  setProductItems: (items: CartItemType<ProductItem>[]) => void;
  setFinalProductItems: (items: CartItemType<ProductItem>[]) => void;
  increaseProductItem: (productItem: ProductItem) => void;
  decreaseProductItem: (productItem: ProductItem) => void;
  resetPieces: () => void;
}

const compareFn: (
  first: CartItemType<ProductItem>,
  second: CartItemType<ProductItem>
) => boolean = (
  first: CartItemType<ProductItem>,
  second: CartItemType<ProductItem>
) => {
  return first.item.id === second.item.id;
};

const StoreCart = (items: CartItemType<ProductItem>[]) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

const useCartStore = create<CartStore>((set, get) => {
  const updateRemovedItems = () => {
    let updatedItems: CartItemType<ProductItem>[] = [];
    for (let removedItem of get().removedItems) {
      const item = get().productItems.find(
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
    set({ removedItems: updatedItems });
  };

  const updateFinalProductItems = () => {
    const updatedProductItems: IncrementalArray<CartItemType<ProductItem>> =
      new IncrementalArray<CartItemType<ProductItem>>(compareFn);

    for (let productItem of get().productItems) {
      updatedProductItems.addItem(productItem);
    }

    for (let removedItem of get().productItems) {
      updatedProductItems.removeQuantity(removedItem);
    }

    set({ finalProductItems: updatedProductItems.getItems() });
  };

  const computerProductItems = () => {
    //everytime the templates or the products changes in the cart, we need to update the final product items.
    const updatedProductItems: IncrementalArray<CartItemType<ProductItem>> =
      new IncrementalArray<CartItemType<ProductItem>>(
        (a, b) => a.item.id === b.item.id
      );

    //we iterate over all items in the cart, and for each template, we add all of its component into the updatedProductItems.
    get().items.forEach((cartItem) => {
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

        templateModel.children.forEach((PieceChild) => {
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

    set({ productItems: updatedProductItems.getItems() });
  };

  return {
    items: [],
    setItems: (items) => {
      set({ items });
    },
    addItem: (item) => {
      set((state) => {
        const existingItem = state.items.find((entry) =>
          compareFn(entry, item)
        );
        let items = [];
        if (existingItem) {
          items = state.items.map((entry) =>
            compareFn(entry, item)
              ? { ...entry, quantity: entry.quantity + item.quantity }
              : entry
          );
        } else {
          items = [...state.items, { ...item }];
        }

        return {
          items,
        };
      });

      StoreCart(get().items);
      computerProductItems();
      updateRemovedItems();
      updateFinalProductItems();
    },

    removeItem: (item) => {
      set((state) => ({
        items: state.items.filter((cartItem) => cartItem.item.id !== item.id),
      }));
      StoreCart(get().items);
      computerProductItems();
      updateRemovedItems();
      updateFinalProductItems();
    },

    decreaseItem: (item) => {
      set((state) => {
        const existingItem = state.items.find((entry) =>
          compareFn(entry, item)
        );
        if (!existingItem) {
          return {};
        }

        const newItems = state.items.map((entry) =>
          compareFn(entry, item)
            ? {
                ...entry,
                quantity: Math.max(0, entry.quantity - 1),
              }
            : entry
        );

        return {
          items: newItems,
        };
      });
      StoreCart(get().items);
      computerProductItems();

      updateRemovedItems();
      updateFinalProductItems();
    },

    initializeCart: async () => {
      const ids = localStorage.getItem("cart");
      if (!ids || ids.length < 1) {
        return [];
      }

      const data = await pieceService.getPiecesByIds(
        JSON.parse(ids).map(
          (item: { item: ProductItem; quantity: number }) => item.item.id
        )
      );
      const items = (JSON.parse(ids) as CartItemType<ProductItem>[]).map(
        ({ ...item }) => ({
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
        })
      );

      set({ items });
      StoreCart(get().items);
      computerProductItems();

      updateRemovedItems();
      updateFinalProductItems();
    },

    removedItems: [],
    productItems: [],
    finalProductItems: [],

    setRemovedItems: (removedItems) => set({ removedItems }),
    setProductItems: (productItems) => set({ productItems }),
    setFinalProductItems: (finalProductItems) => set({ finalProductItems }),

    increaseProductItem: (productItem) => {
      const { removedItems, setRemovedItems } = get();
      const updatedRemovedItems = removedItems.map((item) =>
        item.item.id === productItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setRemovedItems(updatedRemovedItems);
    },

    decreaseProductItem: (productItem) => {
      const { removedItems, setRemovedItems } = get();
      const updatedRemovedItems = removedItems.map((item) =>
        item.item.id === productItem.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setRemovedItems(updatedRemovedItems);
    },

    resetPieces: () => {
      set({ removedItems: [] });
    },
  };
});

export default useCartStore;
