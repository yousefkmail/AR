import {
  Edit,
  NumberField,
  required,
  SelectInput,
  SimpleForm,
  TextField,
} from "react-admin";

export const OrderEdit = () => {
  const orderStatusChoices = [
    { id: "Pending", name: "Pending" },
    { id: "Processing", name: "Processing" },
    { id: "Shipped", name: "Shipped" },
    { id: "Delivered", name: "Delivered" },
    { id: "Cancelled", name: "Cancelled" },
    { id: "Returned", name: "Returned" },
  ];

  return (
    <Edit>
      <SimpleForm>
        <TextField source="type" />
        <TextField source="paymentStatus" />
        <TextField source="paymentType" />
        <NumberField source="totalPrice" />
        <NumberField source="productsPrice" />
        <TextField source="shippingType" />
        <SelectInput
          validate={[required()]}
          source="status"
          choices={orderStatusChoices}
          optionText="name"
          optionValue="id"
          label="Preview Image"
        />
      </SimpleForm>
    </Edit>
  );
};
