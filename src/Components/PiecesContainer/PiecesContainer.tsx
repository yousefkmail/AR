import Select from "react-select";
import { OptionType, usePlanesQuery } from "../../Hooks/usePlanesQuery";
import GridLayout from "../../Layout/GridLayout";
import { PiecesSelectStyle } from "../../CustomStyles/react-select/PiecesSelectStyle";
import Spacer from "../../Layout/Spacer";
import DraggableBasis from "../DraggableBasis";
import { DragEvent, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { DraggedPieceContext } from "../../Context/DraggedPieceContext";
import { BasisPlaneViewModel } from "../../Core/Viewmodels/BasisPlaneViewModel";
import { BasisPlane } from "../../Core/BasisPlane";
import { PiecePlaneViewModel } from "../../Core/Viewmodels/PiecePlaneViewModel";
import { PiecePlane } from "../../Core/PiecePlane";

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
  const { setDraggedItem } = useContext(DraggedPieceContext);

  return (
    <div>
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

      <GridLayout cellMinWidth={300}>
        {selectedOption?.value === "Base"
          ? basis?.map(({ assetId, ...item }) => (
              <DraggableBasis
                onDragStart={(event: DragEvent) => {
                  const img = new Image();
                  img.src = "";
                  event.dataTransfer.setDragImage(img, 0, 0);
                  const id = uuidv4();
                  setDraggedItem(
                    new BasisPlaneViewModel(
                      new BasisPlane({ assetId, ...item }, id)
                    )
                  );
                }}
                key={assetId}
                {...item}
              />
            ))
          : activePieces?.map((item) => (
              <DraggableBasis
                onDragStart={(event: DragEvent) => {
                  const img = new Image();
                  img.src = "";
                  event.dataTransfer.setDragImage(img, 0, 0);
                  const id = uuidv4();
                  setDraggedItem(
                    new PiecePlaneViewModel(new PiecePlane(item, id))
                  );
                }}
                key={item.assetId}
                {...item}
              />
            ))}
      </GridLayout>
    </div>
  );
};
