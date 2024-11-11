import DragableImage from "../DragableImage";
import Window from "../DraggableComponent/Window";
import { useEffect, useState } from "react";
import { PlaneModel } from "../../Models/PlaneModel";
import Select from "react-select";
import { useQueryData } from "../../Hooks/useQueryData";
export default function PiecesContainer() {
  type OptionType = {
    value: string;
    label: string;
  };

  const { basis, pieces } = useQueryData();

  const [items, setItems] = useState<PlaneModel[]>([]);

  const [categories, setCategories] = useState<OptionType[]>([]);

  const handleChange = (option: OptionType | null) => {
    // setSelectedOption(option);
    if (option?.value === "Base") {
      ShowBasis();
    } else {
      HandleSetItems(option?.value ?? "");
    }
  };

  useEffect(() => {
    SetCategories();
    ShowBasis();
  }, [basis, pieces]);

  const SetCategories = () => {
    const cats: string[] = [];
    const options: OptionType[] = [];
    options.push({ label: "Base", value: "Base" });
    pieces?.forEach((item) => {
      if (!cats.includes(item.category)) {
        cats.push(item.category);
        options.push({
          value: item.category,
          label: item.category[0].toUpperCase() + item.category.slice(1),
        });
      }
    });

    setCategories(options);
  };
  const HandleSetItems = (category: string) => {
    if (!pieces) return;

    const items = pieces.filter((item) => item.category === category);

    setItems(items);
  };

  const ShowBasis = () => {
    if (basis) setItems(basis);
  };

  return (
    <Window>
      <div style={{ padding: "20px" }}>
        <div>
          <div style={{ margin: "0 0 3px 0", padding: "4px" }}>
            <label htmlFor="select">Pieces Category</label>
          </div>

          <Select
            id="select"
            options={categories} // The list of options
            placeholder="Select the piece type" // Placeholder text
            onChange={handleChange}
            defaultValue={{ label: "Base", value: "Base" }}
            isSearchable
            styles={{
              control: (provided) => ({
                ...provided,
                cursor: "pointer",
                maxWidth: "500px",
              }),

              container: (provided) => ({
                ...provided,
                cursor: "pointer",
                maxWidth: "500px",
              }),

              option: (provided, state) => ({
                ...provided,
                color: state.isSelected ? "white" : provided.color,
                backgroundColor: state.isSelected
                  ? "black"
                  : provided.backgroundColor,

                ":hover": {
                  backgroundColor: "gray",
                  color: "white",
                },
                ":active": {
                  backgroundColor: "black",
                },
              }),
            }}
          />
        </div>
        <div
          className="pieces-inner-container"
          style={{
            display: "grid",
            maxHeight: "100%",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            justifyItems: "center",
            justifyContent: "center",
          }}
        >
          {items?.map((item) => (
            <DragableImage key={item.assetId} item={item} id={item.assetId} />
          ))}
        </div>
      </div>
    </Window>
  );
}
