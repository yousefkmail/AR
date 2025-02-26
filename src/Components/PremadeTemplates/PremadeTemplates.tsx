import PremadeTemplatesSkeleton from "../PremadeTemplates/PremadeTemplatesSkeleton";
import Pagination from "@mui/material/Pagination";
import { ChangeEvent } from "react";
import { GetPageCount } from "@utils";
import { PaginationCustomStyle } from "../../Styles/CustomStyles/mui/PaginationCustomStyle";
import LoadedTemplate from "./LoadedTemplate";
import NotLoadedTemplate from "./NotLoadedTemplate";
import { useTemplates } from "@hooks/Template/useTemplates";
import CenterLayout from "@components/Layout/CenterLayout";
import GridLayout from "@components/Layout/GridLayout";

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
  } = useTemplates();

  const HandleChange = (_data: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  return (
    <div>
      <GridLayout cellMinWidth={cellMinWidth ?? 230}>
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
  );
}
