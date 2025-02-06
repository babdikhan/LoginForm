import { Outlet } from "react-router-dom";
// import { Content } from "../components/Content";
import Header from "../components/Header";

function LayoutPage() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <Outlet />
      </div>
      <div className="footer">
        Anketa KZ @2025 Все права защищены
      </div>
    </>
  );
}
export default LayoutPage;
