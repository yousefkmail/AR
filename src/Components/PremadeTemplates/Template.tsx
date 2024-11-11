import { TemplateModel } from "../../Models/TemplateMode";
import CategoryTag from "../CategoryTag/CategoryTag";

export default function Template(item: TemplateModel) {
  return (
    <div className="template" style={{ padding: "10px" }}>
      <img className="template-img" src={item.preview} alt="" />
      <div className="template-name">{item.name}</div>
      {item?.tags?.map((item) => (
        <CategoryTag>{item}</CategoryTag>
      ))}
    </div>
  );
}
