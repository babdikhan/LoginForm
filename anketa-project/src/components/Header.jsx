import { useNavigate } from "react-router-dom";
import { LogoutModal } from "./LogoutModal";
import logo from "../assets/IMG_2821-removebg-preview.png";
import { useEffect } from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { observer } from "mobx-react-lite";
import { useStores } from "../store/Root";

const Header = observer(() => {
  const { User } = useStores();
  const navigate = useNavigate();

  // async function getInfo() {
  //   await User.getUserInfo();
  // }

  // useEffect(() => {
  //   getInfo();
  // }, []);

  return (
    <header>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div onClick={() => navigate("main")} className="fermer_kz">
          <img className="fermer_kz_logo" src={logo} alt="" />
          <span className="logo" style={{ color: "rgb(157 97 27)" }}>
            Anketa KZ
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
         
          
          <LogoutModal />
        </div>
      </div>
      <div className="presentation"></div>
    </header>
  );
});
export default Header;
