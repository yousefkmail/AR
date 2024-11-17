import { CSSObjectWithLabel, GroupBase, StylesConfig } from "react-select";

export const PiecesSelectStyle: StylesConfig<
  {
    label: string;
    value: string;
  },
  false,
  GroupBase<{
    label: string;
    value: string;
  }>
> = {
  control: (provided: CSSObjectWithLabel) => ({
    ...provided,
    cursor: "pointer",
    maxWidth: "500px",
    backgroundColor: "transparent",
    border: "1px solid black",
  }),
  singleValue: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: "black",
  }),

  container: (provided: CSSObjectWithLabel) => ({
    ...provided,
    cursor: "pointer",
    maxWidth: "500px",
    color: "white",
  }),

  option: (provided: CSSObjectWithLabel, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "black",
    backgroundColor: state.isSelected ? "var(--color-secondary)" : "white",

    ":hover": {
      backgroundColor: "gray",
      color: "white",
    },
    ":active": {
      backgroundColor: "black",
    },
  }),
};
