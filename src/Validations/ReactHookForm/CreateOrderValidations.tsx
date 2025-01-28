import { RequiredField } from "./Shared";

export const CreateOrderValidationRules = {
  email: {
    required: RequiredField,
  },
  name: {
    required: RequiredField,
  },
  phoneNo: {
    required: RequiredField,
  },
  address: {
    country: {
      required: RequiredField,
    },
    city: {
      required: RequiredField,
    },
    street: {
      required: RequiredField,
    },
    houseNo: {},
    ZIPCode: {
      required: RequiredField,
    },
  },
};
