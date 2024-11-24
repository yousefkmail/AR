import DragableImage from "../DragableImage";
import Select from "react-select";
import { OptionType, usePlanesQuery } from "../../Hooks/usePlanesQuery";
import GridLayout from "../../Layout/GridLayout";
import { PiecesSelectStyle } from "../../CustomStyles/react-select/PiecesSelectStyle";
import Spacer from "../../Layout/Spacer";

export const PiecesContainer = () => {
  const {
    SetBasisAsActivePlanes,
    SetPiecesCategoryAsActivePlanes,
    activePlanes,
    categories,
  } = usePlanesQuery();

  const handleChange = (option: OptionType | null) => {
    option?.value === "Base"
      ? SetBasisAsActivePlanes()
      : SetPiecesCategoryAsActivePlanes(option?.value ?? "");
  };

  return (
    <Spacer padding={20}>
      <Spacer padding={4} margin={3}>
        <label className="pieces-container-select-label">Pieces Category</label>
      </Spacer>

      <Select
        options={categories} // The list of options
        placeholder="Select the piece type" // Placeholder text
        onChange={handleChange}
        defaultValue={{ label: "Base", value: "Base" }}
        isSearchable
        styles={PiecesSelectStyle}
      />

      <GridLayout cellMinWidth={200}>
        {activePlanes?.map((item) => (
          <DragableImage key={item.assetId} item={item} id={item.assetId} />
        ))}
      </GridLayout>
    </Spacer>
  );
};
