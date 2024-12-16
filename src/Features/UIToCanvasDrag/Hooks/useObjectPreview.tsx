import { useContext } from "react";
import { ObjectPreviewContext } from "../ObjectPreview";

export const useObjectPreview = () => {
  const data = useContext(ObjectPreviewContext);
  return { ...data };
};
