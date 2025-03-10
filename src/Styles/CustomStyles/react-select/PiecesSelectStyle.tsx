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
    color: "var(--text-color)",
  }),

  container: (provided: CSSObjectWithLabel) => ({
    ...provided,
    cursor: "pointer",
    maxWidth: "500px",
    color: "var(--color-secondary)",
  }),

  option: (provided: CSSObjectWithLabel, state) => ({
    ...provided,
    color: "var(--text-color)",
    backgroundColor: state.isSelected
      ? "var(--active-secondary)"
      : "var(--color-secondary)",

    ":hover": {
      backgroundColor: "var(--hover-secondary)",
    },
  }),
};
