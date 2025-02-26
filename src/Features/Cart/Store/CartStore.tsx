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
  removeItem: (item: CartItemType<ProductItem>) => void;
  decreaseItem: (item: CartItemType<ProductItem>) => void;
  initializeCart: () => void;

  productItems: CartItemType<ProductItem>[];
  removedItems: CartItemType<ProductItem>[];
  increaseProductItem: (productItem: CartItemType<ProductItem>) => void;
  decreaseProductItem: (productItem: CartItemType<ProductItem>) => void;
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

  const computerProductItems = () => {
    const updatedProductItems: IncrementalArray<CartItemType<ProductItem>> =
      new IncrementalArray<CartItemType<ProductItem>>(
        (a, b) => a.item.id === b.item.id
      );

    get().items.forEach((cartItem) => {
      if ("children" in cartItem.item) {
        const templateModel = cartItem.item as TemplateModel;

        updatedProductItems.addItem({
          item: templateModel.base,
          quantity: cartItem.quantity,
        });

        templateModel.children.forEach((PieceChild) => {
          updatedProductItems.addItem({
            item: PieceChild.piece,
            quantity: cartItem.quantity,
          });
        });
      } else {
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
    },

    removeItem: (item) => {
      set((state) => ({
        items: state.items.filter(
          (cartItem) => cartItem.item.id !== item.item.id
        ),
      }));
      StoreCart(get().items);
      computerProductItems();
      updateRemovedItems();
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
    },

    removedItems: [],
    productItems: [],
    finalProductItems: [],

    increaseProductItem: (productItem) => {
      const { removedItems } = get();

      const existingItem = get().removedItems.find((entry) =>
        compareFn(entry, productItem)
      );

      if (!existingItem) {
        set({
          removedItems: [
            ...get().removedItems,
            { ...productItem, quantity: -productItem.quantity },
          ],
        });

        return;
      }

      const updatedRemovedItems = removedItems.map((item) =>
        item.item.id === productItem.item.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      set({ removedItems: updatedRemovedItems });
    },

    decreaseProductItem: (productItem) => {
      const { removedItems } = get();

      const existingItem = get().removedItems.find((entry) =>
        compareFn(entry, productItem)
      );

      if (!existingItem) {
        set({
          removedItems: [
            ...get().removedItems,
            { ...productItem, quantity: productItem.quantity },
          ],
        });

        return;
      }

      const updatedRemovedItems = removedItems.map((item) =>
        item.item.id === productItem.item.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      set({ removedItems: updatedRemovedItems });
    },

    resetPieces: () => {
      set({ removedItems: [] });
    },
  };
});

export default useCartStore;
