import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrderInfo } from "../../Data/Customer";
import { CreateOrderValidationRules } from "../../Validations/ReactHookForm/CreateOrderValidations";
import InputField from "./Forms/InputField";
import FormRow from "./Forms/FormRow";
import { CartItemMobile } from "@features/Cart";
import { Order } from "@data/Order";
import PageWidthLayout from "@components/Layout/PageWidthLayout";
import Button from "@components/Button/Button";
import useCartStore from "@features/Cart/Store/CartStore";
import { CalculatePrice } from "@utils/CurrencyUtils";

export default function UserInfoFilling() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<OrderInfo>();

  const [isloading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const initializeCart = useCartStore((state) => state.initializeCart);
  const products = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const decreaseItem = useCartStore((state) => state.decreaseItem);
  const productItems = useCartStore((state) => state.productItems);

  useEffect(() => {
    initializeCart();
  }, []);

  const onSubmit = async (orderInfo: OrderInfo) => {
    setIsLoading(true);
    const createdOrder = await fetch(
      import.meta.env.VITE_FUNCTIION_CREATE_ORDER_URL,
      {
        method: "POST",
        body: JSON.stringify({
          ...orderInfo,
          pieces: productItems.filter((item) => item.type === "piece"),
          bases: productItems.filter((item) => item.type === "base"),
          collectons: products.filter((item) => item.type === "collection"),
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (createdOrder.status === 400) {
      const errors = await createdOrder.json();
      Object.entries(errors.errors).forEach(([field, error]) => {
        setError(field as any, {
          type: "manual",
          message: (error as any).message,
        });
      });
      setIsLoading(false);
      return;
    }
    const responseJson = await createdOrder.json();
    setIsLoading(false);
    if (createdOrder.ok) {
      if ((responseJson.data.order as Order).paymentType === "Online")
        navigate(`/order/${responseJson.data.order.id}`);
      else navigate(`/order-purchase-success`);
    }
  };

  const paymentType = watch("paymentType");
  const shippingType = watch("shippingType");

  return (
    <PageWidthLayout maxWidth={1600}>
      <div style={{ display: "flex" }}>
        <form
          style={{ flexGrow: 1, maxWidth: "50%", padding: "40px" }}
          onSubmit={handleSubmit(onSubmit)}
          action=""
        >
          <div>
            <h2>Customer info</h2>
            <FormRow>
              <InputField
                {...register("customer.name", CreateOrderValidationRules.name)}
                error={errors.customer?.name?.message}
                label="Name  *"
              />

              <InputField
                {...register(
                  "customer.email",
                  CreateOrderValidationRules.email
                )}
                error={errors.customer?.email?.message}
                label="Email *"
              />
            </FormRow>
          </div>
          <FormRow>
            <InputField
              {...register(
                "customer.phone",
                CreateOrderValidationRules.phoneNo
              )}
              error={errors.customer?.phone?.message}
              label="Phone no *"
            />
          </FormRow>
          <div>
            <h2>Address</h2>

            <FormRow>
              <InputField
                {...register(
                  "customer.address.country",
                  CreateOrderValidationRules.address.country
                )}
                error={errors.customer?.address?.country?.message}
                label="Country *"
              />

              <InputField
                {...register(
                  "customer.address.city",
                  CreateOrderValidationRules.address.city
                )}
                error={errors.customer?.address?.city?.message}
                label="City *"
              />
            </FormRow>

            <FormRow>
              <InputField
                {...register(
                  "customer.address.street",
                  CreateOrderValidationRules.address.street
                )}
                error={errors.customer?.address?.street?.message}
                label="Street *"
              />
            </FormRow>

            <FormRow>
              <InputField
                {...register(
                  "customer.address.houseNo",
                  CreateOrderValidationRules.address.houseNo
                )}
                error={errors.customer?.address?.houseNo?.message}
                label="House Number"
              />
              <InputField
                {...register(
                  "customer.address.ZIPCode",
                  CreateOrderValidationRules.address.ZIPCode
                )}
                error={errors.customer?.address?.ZIPCode?.message}
                label="ZIP Code *"
              />
            </FormRow>
          </div>
          <div>
            <h2>Payment</h2>
            <RadioGroup
              value={paymentType}
              onChange={(value) =>
                setValue("paymentType", value.target.value as any)
              }
            >
              <FormControlLabel
                value="Online"
                control={<Radio />}
                label="Online payment (Visa, Master cart, G pay, KNET, and more)"
              />
              <FormControlLabel
                value="OnReceipt"
                control={<Radio />}
                label="Payment upon receipt"
              />

              <div></div>
            </RadioGroup>
          </div>
          <div>
            <h2>Shipping</h2>
            <FormControl>
              <RadioGroup
                value={shippingType}
                onChange={(value) =>
                  setValue("shippingType", value.target.value as any)
                }
              >
                <FormControlLabel
                  value="Local"
                  control={<Radio />}
                  label="Kuwait local shipping : 10$"
                />
                <FormControlLabel
                  value="Global"
                  control={<Radio />}
                  label="Worldwide shipping (Custom pricing)"
                />

                <p style={{ maxWidth: "600px", fontSize: "0.875rem" }}>
                  Note : For worldwide shipping, you will be contacted using
                  what's app or email with the shipping cost and more.
                </p>
                <div></div>
              </RadioGroup>
            </FormControl>
          </div>

          <Button
            style={{ fontSize: "1rem" }}
            type="submit"
            disabled={isloading}
          >
            {isloading
              ? "Loading..."
              : paymentType === "Online"
              ? "CHECKOUT"
              : "Confirm order"}
          </Button>
        </form>
        <div style={{ flexGrow: 1, padding: "40px" }}>
          <h2>Purchased products</h2>

          {
            <div className="cart-items">
              {products.map((item) => {
                return (
                  <CartItemMobile
                    onIncrease={() =>
                      addItem({ item: item.item, quantity: 1, type: "base" })
                    }
                    onDecrease={() =>
                      decreaseItem({
                        item: item.item,
                        quantity: 1,
                        type: "base",
                      })
                    }
                    className="cart-item-container cart-item-container-mobile"
                    quantity={item.quantity}
                    {...item.item}
                    price={CalculatePrice(item.item.price)}
                    totalPrice={CalculatePrice(item.item.price, item.quantity)}
                    key={item.item.id}
                  ></CartItemMobile>
                );
              })}
            </div>
          }
        </div>
      </div>
    </PageWidthLayout>
  );
}
