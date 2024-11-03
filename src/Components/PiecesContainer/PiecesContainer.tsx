import DragableImage from "../DragableImage";
import { useQuery } from "@tanstack/react-query";
import { GetAllPieces } from "../../Contentful/ContentfulClient";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import { Entry } from "contentful";
import { Piece } from "../../Contentful/Types/PieceType";
export default function PiecesContainer() {
  const { data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      return await GetAllPieces();
    },
  });

  return (
    <Draggable handle=".handle" bounds="parent">
      <Resizable
        className="pieces-container"
        defaultSize={{ height: 600, width: 300 }}
        minWidth={200}
        minHeight={300}
        style={{
          position: "absolute",
          zIndex: "100",
          backgroundColor: "#f2f0ef",
          borderRadius: "15px",
          overflow: "hidden",
          padding: "15px",
        }}
      >
        <div>
          <img
            draggable={false}
            className="handle"
            style={{
              width: "100%",
              height: "30px",
              objectFit: "contain",
            }}
            src="https://cdn.icon-icons.com/icons2/2248/PNG/512/drag_horizontal_variant_icon_136679.png"
            alt=""
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
          {data?.items.map(
            (
              item: Entry<Piece, "WITHOUT_UNRESOLVABLE_LINKS", string>,
              index
            ) => (
              <DragableImage key={index} item={item} id={index} />
            )
          )}
        </div>
      </Resizable>
    </Draggable>
  );
}
