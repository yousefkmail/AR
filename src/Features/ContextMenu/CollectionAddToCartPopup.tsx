import { Button, TextField } from "@mui/material";
import InputField from "../../Pages/UserInfoFilling/Forms/InputField";
import FontawesomeIconButton from "../../Components/Button/FontawesomeIconButton";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

export interface CollectionAddToCartPopupProps {
  name?: string;
  nameEditable?: boolean;
  onAddToCartPressed?: (amount: number, name: string) => void;
  onClose?: () => void;
  isShown: boolean;
}

interface AddToCartFormProps {
  name: string;
  quantity: number;
}
export default function CollectionAddToCartPopup({
  name,
  nameEditable,
  onAddToCartPressed,
  isShown,
  onClose,
}: CollectionAddToCartPopupProps) {
  const { register, handleSubmit, watch } = useForm<AddToCartFormProps>();

  const OnSubmit = ({ name, quantity }: AddToCartFormProps) => {
    onAddToCartPressed?.(Number(quantity), name);
  };

  const nameValue = watch("name");
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "white",
        maxWidth: "350px",
        width: "100%",
        left: "50%",
        transform: "translate(-50%,0)",
        padding: "20px",
        borderRadius: "7px",
        overflow: "hidden",
        transition: "all ease-in-out 0.4s",
        top: isShown ? "50px" : "-500px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0 10px",
          alignItems: "center",
        }}
      >
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
