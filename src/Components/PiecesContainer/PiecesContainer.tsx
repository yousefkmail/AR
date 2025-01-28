import Select from "react-select";
import { OptionType, usePlanesQuery } from "../../Hooks/usePlanesQuery";
import GridLayout from "../../Layout/GridLayout";
import { PiecesSelectStyle } from "../../CustomStyles/react-select/PiecesSelectStyle";
import DraggableBasis from "../DraggableBasis";
import { DragEvent, useContext } from "react";
import { DraggedPieceContext } from "../../Context/DraggedPieceContext";
import { PieceObject } from "../../Core/PiecePlane";
import { useFullPieces } from "../../Hooks/useFullPieces";
import { TemplateObject } from "../../Core/Template";
import { v4 as uuidv4 } from "uuid";
export const PiecesContainer = () => {
  const {
    activePieces,
    basis,
    selectedOption,
    setSelectedOption,
    categories,
    SetPiecesCategoryAsActivePlanes,
  } = usePlanesQuery();

  const { DispatchCreatedPieces, DispatchCreatedTemplates } = useFullPieces();
  const handleChange = (option: OptionType | null) => {
    if (option) {
      SetPiecesCategoryAsActivePlanes(option.value);
      setSelectedOption(option);
    }
  };
  const { setDraggedItem } = useContext(DraggedPieceContext);

  return (
    <div>
      <div style={{ padding: " 5px 20px" }}>
        <label className="pieces-container-select-label">Pieces Category</label>
      </div>

      <div style={{ padding: "0 20px" }}>
        <Select
          options={categories}
          placeholder="Select the piece type"
          onChange={handleChange}
          defaultValue={{ label: "Base", value: "Base" }}
          isSearchable
          styles={PiecesSelectStyle}
        />
      </div>

      <GridLayout cellMinWidth={250}>
        {selectedOption?.value === "Base"
          ? basis?.map(({ ...item }) => (
              <DraggableBasis
                onDragStart={(event: DragEvent) => {
                  const img = new Image();
                  img.src = "";
                  event.dataTransfer.setDragImage(img, 0, 0);
                  const newTemplate: TemplateObject = {
                    id: uuidv4(),
                    position: [1, 1, 1],
                    rotation: [90, 0, 0],
                    scale: [1, 1, 1],
                    templateModel: {
                      children: [],
                      description: "",
                      base: item,
                      id: uuidv4(),
                      name: "Tempolate",
                      previewImage: "",
                      price: 0,
                      tags: [],
                    },
                  };

                  setDraggedItem(newTemplate);
                }}
                onClick={() => {
                  const newTemplate: TemplateObject = {
                    id: uuidv4(),
                    position: [1, 1, 1],
                    rotation: [90, 0, 0],
                    scale: [1, 1, 1],
                    templateModel: {
                      children: [],
                      description: "",
                      base: item,
                      id: uuidv4(),
                      name: "Tempolate",
                      previewImage: "",
                      price: 0,
                      tags: [],
                    },
                  };
                  DispatchCreatedTemplates({
                    type: "add",
                    payload: newTemplate,
                  });
                }}
                key={item.id}
                {...item}
              />
            ))
          : activePieces?.map((item) => (
              <DraggableBasis
                onDragStart={(event: DragEvent) => {
                  const img = new Image();
                  img.src = "";
                  event.dataTransfer.setDragImage(img, 0, 0);

                  const newPiece: PieceObject = {
                    id: uuidv4(),
                    piece: item,
                    position: [1, 1, 1],
                    rotation: [0, 0, 0],
                    scale: [1, 1, 1],
                  };

                  setDraggedItem(newPiece);
                }}
                onClick={() => {
                  const newPiece: PieceObject = {
                    id: uuidv4(),
                    piece: item,
                    position: [1, 1, 1],
                    rotation: [0, 0, 0],
                    scale: [1, 1, 1],
                  };

                  DispatchCreatedPieces({ type: "add", payload: newPiece });
                }}
                key={item.id}
                {...item}
              />
            ))}
      </GridLayout>
    </div>
  );
};
