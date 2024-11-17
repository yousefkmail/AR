import PremadeTemplatesSkeleton from "../PremadeTemplates/PremadeTemplatesSkeleton";
import GridLayout from "../../Layout/GridLayout";
import Pagination from "@mui/material/Pagination";
import { useTemplatesQuery } from "../../Hooks/useTemplatesQuery";
import { ChangeEvent } from "react";
import { GetPageCount } from "../../Utils/PageUtils";
import CenterLayout from "../../Layout/CenterLayout";
import Template from "./Template";
import PageWidthLayout from "../../Layout/PageWidthLayout";
import { PaginationCustomStyle } from "../../CustomStyles/mui/PaginationCustomStyle";
export default function PremadeTemplates() {
  const { templates, isLoading, setPage, count, pageSize, page } =
    useTemplatesQuery();

  const HandleChange = (_data: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  return (
    <CenterLayout horizontal>
      <PageWidthLayout maxWidth={1600}>
        <h2>Start from a template</h2>
        <GridLayout cellMinWidth={250}>
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
