import { Button } from "@components/atoms";
import { TemplateModel } from "@core/index";
import { CartItemType } from "@features/Cart";
import { fa42Group } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecordContext } from "react-admin";
import { useNavigate } from "react-router-dom";

export default function OrderCollectionsShow() {
  const record = useRecordContext();
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundColor: "#fafafb",
        borderRadius: "7px",
        padding: "16px",
        margin: "10px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon
          size="2x"
          style={{ marginRight: "10px" }}
          icon={fa42Group}
          color="blue"
        />
        <h3>Collections</h3>
      </div>

      {record?.["collections"].map(
        (item: CartItemType<TemplateModel>, index: number) => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>{item.item.name}</div>
            <Button
              onClick={() => navigate(`/3D_Builder/${record["id"]}/${index}`)}
              style={{ borderColor: "rgba(128,128,128,0.2)" }}
            >
              Preview
            </Button>
          </div>
        )
      )}
    </div>
  );
}
