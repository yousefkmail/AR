import Select from "react-select";
import { OptionType, usePlanesQuery } from "../../Hooks/usePlanesQuery";
import GridLayout from "../../Layout/GridLayout";
import { PiecesSelectStyle } from "../../CustomStyles/react-select/PiecesSelectStyle";
import Spacer from "../../Layout/Spacer";
import DraggablePiece from "../DraggablePiece";
import DraggableBasis from "../DraggableBasis";

export const PiecesContainer = () => {
  const {
    activePieces,
    basis,
    selectedOption,
    setSelectedOption,
    categories,
    SetPiecesCategoryAsActivePlanes,
  } = usePlanesQuery();

  const handleChange = (option: OptionType | null) => {
    if (option) {
      SetPiecesCategoryAsActivePlanes(option.value);
      setSelectedOption(option);
    }
  };

  return (
    <Spacer padding={20}>
      <Spacer padding={4} margin={3}>
        <label className="pieces-container-select-label">Pieces Category</label>
      </Spacer>

      <Select
        options={categories}
        placeholder="Select the piece type"
        onChange={handleChange}
        defaultValue={{ label: "Base", value: "Base" }}
        isSearchable
        styles={PiecesSelectStyle}
      />

      <GridLayout cellMinWidth={200}>
        {selectedOption?.value === "Base"
          ? basis?.map((item) => (
              <DraggableBasis key={item.assetId} item={item} />
            ))
          : activePieces?.map((item) => (
              <DraggablePiece key={item.assetId} item={item} />
            ))}
      </GridLayout>
    </Spacer>
  );
};
