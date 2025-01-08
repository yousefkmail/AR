import { Helmet } from "react-helmet";
import { useGlobalSettings } from "./Hooks/useGlobalSettings";

export default function SiteMetadata() {
  const { data } = useGlobalSettings();

  return (
    <Helmet>
      <meta charSet="utf-8" />
      {<title>{data?.siteName ?? "Wigitsco"}</title>}
      <link rel="icon" href={data?.preview} />
      <html lang="en" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="Wigitsco" content="a 3D pieces builder to be purchased" />
      <meta
        name="description"
        content={"a 3D pieces builder to be purchased"}
      />
    </Helmet>
  );
}
