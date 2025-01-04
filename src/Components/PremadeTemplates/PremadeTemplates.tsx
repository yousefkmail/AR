import PremadeTemplatesSkeleton from "../PremadeTemplates/PremadeTemplatesSkeleton";
import GridLayout from "../../Layout/GridLayout";
import Pagination from "@mui/material/Pagination";
import { useTemplatesQuery } from "../../Hooks/useTemplatesQuery";
import { ChangeEvent } from "react";
import { GetPageCount } from "../../Utils/PageUtils";
import CenterLayout from "../../Layout/CenterLayout";
import Template from "./Template";
import { PaginationCustomStyle } from "../../CustomStyles/mui/PaginationCustomStyle";

interface PremadeTemplatesProps {
  cellMinWidth?: number;
}
export default function PremadeTemplates({
  cellMinWidth,
}: PremadeTemplatesProps) {
  const {
    templates,
    isLoading,
    setPage,
    count,
    pageSize,
    page,
    fetchFullTemplate,
  } = useTemplatesQuery();

  const HandleChange = (_data: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  return (
    <CenterLayout horizontal>
      <div>
        <h2>Start from a template</h2>
        <GridLayout cellMinWidth={cellMinWidth ?? 250}>
          {templates ? (
            templates?.map((item) => (
              <Template
                OnLoadPresed={() =>
                  fetchFullTemplate({ id: item.template.id, page: page })
                }
                key={item.template.id}
                item={item}
              />
            ))
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
      </div>
    </CenterLayout>
  );
}
