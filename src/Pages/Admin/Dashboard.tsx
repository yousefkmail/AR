import { Admin, Layout, Resource, defaultLightTheme } from "react-admin";
import { FirebaseDataProvider } from "../../Firebase/FirebaseDataProvider";
import PageWidthLayout from "../../Layout/PageWidthLayout";
import { BasisList } from "../../React-admin/Basis/BasisList";
import { PieceList } from "../../React-admin/Piece/PieceList";
import { PieceShow } from "../../React-admin/Piece/PieceShow";
import { PieceEdit } from "../../React-admin/Piece/PieceEdit";
import BasisPost from "../../React-admin/Basis/BasisPost";
import { BasisShow } from "../../React-admin/Basis/BasisShow";
import BasisEdit from "../../React-admin/Basis/BasisEdit";
import { PiecePost } from "../../React-admin/Piece/PiecePost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge, faPuzzlePiece } from "@fortawesome/free-solid-svg-icons";
import { OrderShow } from "../../React-admin/Order/OrderShow";
import { OrderList } from "../../React-admin/Order/OrderList";
import { OrderEdit } from "../../React-admin/Order/OrderEdit";
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
