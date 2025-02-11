import PremadeTemplatesSkeleton from "../PremadeTemplates/PremadeTemplatesSkeleton";
import GridLayout from "../../Layout/GridLayout";
import Pagination from "@mui/material/Pagination";
import { useTemplatesQuery } from "../../Hooks/useTemplatesQuery";
import { ChangeEvent } from "react";
import { GetPageCount } from "@utils";
import CenterLayout from "../../Layout/CenterLayout";
import { PaginationCustomStyle } from "../../Styles/CustomStyles/mui/PaginationCustomStyle";
import LoadedTemplate from "./LoadedTemplate";
import NotLoadedTemplate from "./NotLoadedTemplate";

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
        <GridLayout cellMinWidth={cellMinWidth ?? 250}>
          {templates ? (
            templates.map((item) =>
              item.state === "Loaded" ? (
                <LoadedTemplate key={item.id} item={item}></LoadedTemplate>
              ) : (
                <NotLoadedTemplate
                  key={item.id}
                  isLoading={item.state === "Loading"}
                  OnLoadPresed={() =>
                    fetchFullTemplate({ id: item.id, page: page })
                  }
                  item={item}
                ></NotLoadedTemplate>
              )
            )
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
