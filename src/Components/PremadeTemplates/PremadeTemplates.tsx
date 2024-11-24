import PremadeTemplatesSkeleton from "../PremadeTemplates/PremadeTemplatesSkeleton";
import GridLayout from "../../Layout/GridLayout";
import Pagination from "@mui/material/Pagination";
import { useTemplatesQuery } from "../../Hooks/useTemplatesQuery";
import { ChangeEvent, useEffect } from "react";
import { GetPageCount } from "../../Utils/PageUtils";
import CenterLayout from "../../Layout/CenterLayout";
import Template from "./Template";
import PageWidthLayout from "../../Layout/PageWidthLayout";
import { PaginationCustomStyle } from "../../CustomStyles/mui/PaginationCustomStyle";

interface PremadeTemplatesProps {
  cellMinWidth?: number;
}
export default function PremadeTemplates({
  cellMinWidth,
}: PremadeTemplatesProps) {
  const { templates, isLoading, setPage, count, pageSize, page } =
    useTemplatesQuery();

  const HandleChange = (_data: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  useEffect(() => {
    console.log(templates);
  });
  return (
    <CenterLayout horizontal>
      <PageWidthLayout maxWidth={1600}>
        <h2>Start from a template</h2>
        <GridLayout cellMinWidth={cellMinWidth ?? 300}>
          {templates ? (
            templates?.map((item, index) => <Template key={index} {...item} />)
          ) : (
            <PremadeTemplatesSkeleton count={5} />
          )}
        </GridLayout>
        <CenterLayout horizontal>
          <Pagination
            className="template-pagination"
            page={page}
            sx={PaginationCustomStyle}
            disabled={isLoading}
            onChange={HandleChange}
            count={GetPageCount(pageSize, count ?? 0)}
          />
        </CenterLayout>
      </PageWidthLayout>
    </CenterLayout>
  );
}
