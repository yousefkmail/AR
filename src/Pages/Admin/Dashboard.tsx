import { Admin, Layout, Resource, defaultLightTheme } from "react-admin";
import { FirebaseDataProvider } from "../../Firebase/FirebaseDataProvider";
import PageWidthLayout from "../../Layout/PageWidthLayout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge, faPuzzlePiece } from "@fortawesome/free-solid-svg-icons";
import BasisEdit from "../../Components/admin/Basis/BasisEdit";
import { BasisList } from "../../Components/admin/Basis/BasisList";
import BasisPost from "../../Components/admin/Basis/BasisPost";
import { BasisShow } from "../../Components/admin/Basis/BasisShow";
import { OrderEdit } from "../../Components/admin/Order/OrderEdit";
import { OrderList } from "../../Components/admin/Order/OrderList";
import { OrderShow } from "../../Components/admin/Order/OrderShow";
import { PieceEdit } from "../../Components/admin/Piece/PieceEdit";
import { PieceList } from "../../Components/admin/Piece/PieceList";
import { PiecePost } from "../../Components/admin/Piece/PiecePost";
import { PieceShow } from "../../Components/admin/Piece/PieceShow";
import TemplateEdit from "../../Components/admin/Template/TemplateEdit";
import TemplateList from "../../Components/admin/Template/TemplateList";
import TemplateShow from "../../Components/admin/Template/TemplateShow";

const firebaseDataProvider = new FirebaseDataProvider();
export default function Dashboard() {
  const basesIcon = () => <FontAwesomeIcon icon={faPuzzlePiece} />;
  const piecesIcon = () => <FontAwesomeIcon icon={faGauge} />;
  return (
    <div style={{ flexGrow: "1", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexGrow: "1" }}>
        <PageWidthLayout maxWidth={1600}>
          <Admin
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
    </div>
  );
}
