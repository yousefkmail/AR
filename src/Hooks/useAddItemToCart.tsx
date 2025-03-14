import { ProductItem } from "@data/ProductItem";
import { CartItemType } from "@features/Cart";
import useCartStore from "@features/Cart/Store/CartStore";
import { useNotificationStore } from "@features/NotificationService/Store/NotificationStore";

export const useAddItemToCart = () => {
  const addItem = useCartStore((state) => state.addItem);
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const addItemWithNotification = (item: CartItemType<ProductItem>) => {
    addItem(item);
    addNotification(
      `Item ${item.item.name} has been added to your cart.`,
      "info"
    );
  };

  return { addItemWithNotification };
};
