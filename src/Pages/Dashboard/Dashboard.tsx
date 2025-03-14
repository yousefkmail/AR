import { Admin, Layout, Resource, defaultLightTheme } from "react-admin";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge, faPuzzlePiece } from "@fortawesome/free-solid-svg-icons";
import {
  BasisEdit,
  BasisList,
  BasisPost,
  BasisShow,
  OrderEdit,
  OrderList,
  OrderShow,
  PieceEdit,
  PieceList,
  PiecePost,
  PieceShow,
  TemplateEdit,
  TemplateList,
  TemplateShow,
} from "@features/AdminDashboard/Components";
import { FirebaseDataProvider } from "@services/Firebase/FirebaseDataProvider";
import PageWidthLayout from "@components/Layout/PageWidthLayout";

const firebaseDataProvider = new FirebaseDataProvider();
export default function Dashboard() {
  const basesIcon = () => <FontAwesomeIcon icon={faPuzzlePiece} />;
  const piecesIcon = () => <FontAwesomeIcon icon={faGauge} />;
  return (
    <div
      style={{
        flexGrow: "1",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "32px",
      }}
    >
      <PageWidthLayout maxWidth={1600}>
        <Admin
          basename=""
          theme={defaultLightTheme}
          layout={(props) => <Layout {...props} appBar={undefined} />}
          dataProvider={firebaseDataProvider}
        >
          <Resource
            name="bases"
            list={BasisList}
            show={BasisShow}
            edit={BasisEdit}
            create={BasisPost}
            hasEdit={true}
            icon={basesIcon}
          />
          <Resource
            name="pieces"
            list={PieceList}
            show={PieceShow}
            edit={PieceEdit}
            create={PiecePost}
            icon={piecesIcon}
            hasEdit={true}
          />
          <Resource
            name="templates"
            list={TemplateList}
            show={TemplateShow}
            edit={TemplateEdit}
          />
          <Resource
            name="orders"
            list={OrderList}
            show={OrderShow}
            edit={OrderEdit}
          />
        </Admin>
      </PageWidthLayout>
    </div>
  );
}
