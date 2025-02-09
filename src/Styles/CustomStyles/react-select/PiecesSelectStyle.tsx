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
    color: "var(--text-primary)",
  }),

  container: (provided: CSSObjectWithLabel) => ({
    ...provided,
    cursor: "pointer",
    maxWidth: "500px",
    color: "var(--color-primary)",
  }),

  option: (provided: CSSObjectWithLabel, state) => ({
    ...provided,
    color: "var(--text-primary)",
    backgroundColor: state.isSelected
      ? "var(--active-primary)"
      : "var(--color-primary)",

    ":hover": {
      backgroundColor: "var(--hover-primary)",
    },
  }),
};
