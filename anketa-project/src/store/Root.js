import axios from "axios";
import { makeAutoObservable } from "mobx";
import LoginStore from "./login.store";
import ProductStore from "./product.store";
import { createContext, useContext } from "react";

class RootStore {
  constructor() {
    this.Login = new LoginStore(this);
    this.Product = new ProductStore(this);
  }
}

export const StoresContext = createContext(new RootStore());
export const useStores = () => useContext(StoresContext);
