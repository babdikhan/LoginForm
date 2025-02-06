import { Routes, Route } from "react-router-dom";
import "./App.css";
import LayoutPage from "./pages/LayoutPage.jsx";
import { observer } from "mobx-react-lite";
import MainPage from "./pages/MainPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";

const App = observer(() => {
  return (
    <Routes>
      <Route path="/" element={<LayoutPage />}>
        <Route path="/main" element={<MainPage />} />
      </Route>
      <Route index path="login" element={<LoginPage />} />
      <Route path="registration" element={<RegistrationPage />} />
    </Routes>
  );
});


export default App;
