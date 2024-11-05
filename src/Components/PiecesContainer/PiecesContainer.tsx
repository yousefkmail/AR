import DragableImage from "../DragableImage";
import { useQuery } from "@tanstack/react-query";
import { GetAllPieces } from "../../Contentful/ContentfulClient";
import { Entry } from "contentful";
import { Piece } from "../../Contentful/Types/PieceType";
import Window from "../DraggableComponent/Window";
export default function PiecesContainer() {
  const { data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      return await GetAllPieces();
    },
  });

  return (
    <Window>
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
          (item: Entry<Piece, "WITHOUT_UNRESOLVABLE_LINKS", string>, index) => (
            <DragableImage key={index} item={item} id={index} />
          )
        )}
      </div>
    </Window>
  );
}
