import axios from "axios";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class Login {
  is_authorized = false;
  username = null;
  is_registered = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  async authorize(username, password) {
    try {
      const { data } = await axios({
        method: "post",
        url: "http://127.0.0.1:9090/auth/login",
        data: { username: username, password: password},
        headers: { "Content-Type": "application/json" },
      });
      this.is_authorized = true;
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
    } catch (error) {
      this.is_authorized = false;
      console.error(error);
    }
  }

  async registration(initdata) {
    try {
      const { data } = await axios({
        method: "post",
        url: "http://127.0.0.1:9090/auth/register",
        data: initdata,
        headers: { "Content-Type": "application/json" },
      });
      localStorage.setItem("username", initdata.username);
      localStorage.setItem("password", initdata.password);
      console.log("registration_data", data);
      this.is_registered = true;
      toast.success("Вы успешно прошли регистрацию!");
    } catch (error) {
      this.is_registered = false;
      toast.error("Такой пользователь уже существует!");
      console.error(error);
    }
  }

  unauthorize() {
    this.is_authorized = false;
    localStorage.removeItem("user_token");
  }
}

export default Login;
