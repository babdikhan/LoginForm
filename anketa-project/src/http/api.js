import axios from "axios";

const username = localStorage.getItem("username");
const password = localStorage.getItem("password");

const token = btoa(`${username}:${password}`);

const $api = axios.create({
  baseURL: "http://127.0.0.1:9090",
  timeout: 5000,
  headers: {
    Authorization: `Basic ${token}`
  }
});

export default $api;

