import FontawesomeIconButton from "../../Components/Button/FontawesomeIconButton";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import InputField from "../../Pages/UserInfoFilling/Forms/InputField";
import { Button, TextField } from "@mui/material";

interface AddTemplateProps {
  isShown: boolean;
  onClose?: () => void;
  onAddTemplatePressed?: (
    name: string,
    description: string,
    previewImage: File
  ) => void;
}

interface AddTemplateFormProps {
  name: string;
  description: string;
  previewImage: FileList;
}

export default function AddTemplatePopup({
  isShown,
  onClose,
  onAddTemplatePressed,
}: AddTemplateProps) {
  const { register, handleSubmit } = useForm<AddTemplateFormProps>();

  const OnSubmit = ({
    description,
    name,
    previewImage,
  }: AddTemplateFormProps) => {
    onAddTemplatePressed?.(name, description, previewImage[0]);
  };

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
        pointerEvents: "all",
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
        <h3>Add template</h3>
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
          autoComplete="off"
        />

        <TextField
          {...register("description")}
          style={{ margin: "10px", minWidth: "200px", flexGrow: 1 }}
          type="text"
          label="Description"
        />
        <TextField
          type="file"
          slotProps={{
            input: { inputProps: { accept: ".png, .jpg, .jpeg, .pdf" } },
          }} // Corrected usage
          // label="Upload preview image"
          {...register("previewImage")}
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
