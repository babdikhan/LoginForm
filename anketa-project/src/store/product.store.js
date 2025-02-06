// import axios from "axios";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import $api from "../http/api.js";

class Product {
  user_data = "";
  admin_data;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  async getUserData() {
    try {
      const { data } = await $api.get("/questionnaire");
      console.log(data);
      this.user_data = data;
      return data;
    } catch (error) {
      console.log({ error });
    }
  }

  async getAdminData() {
    try {
      const { data } = await $api.get("/admin/questionnaires");
      console.log(data);
      this.admin_data = data;
      return data;
    } catch (error) {
      console.log({ error });
    }
  }

  async changeStatus(status, id) {
    try {
      const { data } = await $api.put(
        `/admin/questionnaire/${id}/status?status=${status}`
      );
      await this.getAdminData();
      toast.success("Статус изменен!");
      return data;
    } catch (error) {
      return error;
    }
  }

  async updateAnketa(userData) {
    try {
      const { data } = await $api.put("/questionnaire", userData);
      await this.getUserData();
      toast.success("Анкета обновлена!");
      return data;
    } catch (error) {
      return error;
    }
  }

  async createAnketa(userData) {
    try {
      const { data } = await $api.post("/questionnaire", userData);
      await this.getUserData();
      toast.success("Анкета создана!");
      return data;
    } catch (error) {
      return error;
    }
  }
}

export default Product;
