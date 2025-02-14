import { useRecordContext } from "react-admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { camelCaseToLabel } from "../../../../../../Utils/Text/CamelCaseToLabel";

const CustomCategoryField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  return (
    <div>
      <h4>{camelCaseToLabel(source)}</h4>
      <p>{record?.[source]}</p>
    </div>
  );
};

const CustomBooleanField = ({ source }: { source: string }) => {
  const record = useRecordContext();

  return (
    <div>
      <h4>{camelCaseToLabel(source)}</h4>
      <FontAwesomeIcon
        color={record?.[source] ? "green" : "red"}
        icon={record?.[source] ? faCheck : faXmark}
      />
    </div>
  );
};

export function PieceItemAdditionalDetails() {
  return (
    <div>
      <h3>Additional details</h3>
      <div style={{ display: "flex" }}>
        <div style={{ margin: "4px 10px" }}>
          <CustomCategoryField source="category" />
        </div>
        <div style={{ margin: "4px 10px" }}>
          <CustomBooleanField source="isFlipable" />
        </div>
      </div>
    </div>
  );
}
