import { Button, TextField } from "@mui/material";
import InputField from "../../../Pages/UserInfoFilling/Forms/InputField";
import FontawesomeIconButton from "@components/Button/FontawesomeIconButton";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { HTMLAttributes } from "react";
import { ClassnameMerge } from "@utils/CssUtils";

export interface CollectionAddToCartPopupProps
  extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  nameEditable?: boolean;
  onAddToCartPressed?: (amount: number, name: string) => void;
  onClose?: () => void;
}

interface AddToCartFormProps {
  name: string;
  quantity: number;
}
export function CollectionAddToCartPopup({
  name,
  nameEditable,
  onAddToCartPressed,
  onClose,
  className,
  ...rest
}: CollectionAddToCartPopupProps) {
  const { register, handleSubmit, watch } = useForm<AddToCartFormProps>();

  const OnSubmit = ({ name, quantity }: AddToCartFormProps) => {
    onAddToCartPressed?.(Number(quantity), name);
  };

  const nameValue = watch("name");
  return (
    <div
      className={ClassnameMerge("add-to-cart-conatiner", className)}
      {...rest}
    >
      <div className="cart-add-item-header">
        <h3>Add item to cart</h3>
        <FontawesomeIconButton
          onClick={() => onClose?.()}
          icon={faXmark}
          size="2x"
          isActive={false}
        />
      </div>
      <form
        onSubmit={handleSubmit(OnSubmit)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <InputField
          {...register("name")}
          label="Collection name"
          value={nameEditable ? nameValue : name}
          disabled={!nameEditable}
          slotProps={{
            inputLabel: { shrink: !!(nameEditable ? nameValue : name) },
          }}
          autoComplete="off"
        />

        <TextField
          {...register("quantity")}
          style={{ margin: "10px", minWidth: "200px", flexGrow: 1 }}
          type="number"
          label="Quantity"
        />
        <Button
          type="submit"
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "#333", // Optional hover effect
            },
          }}
          style={{ flexGrow: "1", margin: "10px" }}
          variant="outlined"
        >
          Add to cart
        </Button>
      </form>
    </div>
  );
}
