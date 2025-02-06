import * as React from "react";
import { useStores } from "../store/Root";
import { observer } from "mobx-react-lite";
import Button from "@mui/material/Button";
import EditAnketa from "../components/EditAnketa";
import CreateAnketa from "../components/CreateAnketa";
import ChangeStatusModal from "../components/ChangeStatusModal";

const MainPage = observer(() => {
  const { Product } = useStores();

  React.useEffect(() => {
    Product.getUserData();
    Product.getAdminData();
  }, []);

  return (
    <div className="page_wrapper">
      <div className="anketa_cont">
        <div className="anketa_title">
          <div className="anketa_title_2">
            <div>Статус вашей анкеты: </div>

            {Product?.user_data != "" ? (
              <Button size="small" variant="outlined">
                {Product?.user_data?.status}
              </Button>
            ) : (
              "У вас нет анкеты"
            )}
          </div>

          {Product.user_data == "" &&
          localStorage.getItem("username") != "Admin" ? (
            <CreateAnketa />
          ) : (
            <EditAnketa />
          )}
        </div>
        {localStorage.getItem("username") != "Admin" &&
        Product.user_data != "" ? (
          <div className="anketa_wrapper">
            <div style={{ paddingTop: "20px" }}>
              <span className="title_bold">Полное имя (ФИО): </span>
              <span>{Product?.user_data?.details?.fullName || ""}</span>
            </div>
            <div>
              <span className="title_bold">Дата рождения: </span>
              <span>{Product?.user_data?.details?.birthDate || ""}</span>
            </div>
            <div>
              <span className="title_bold">Почта (email): </span>
              <span>{Product?.user_data?.user?.email || ""}</span>
            </div>
            <div>
              <span className="title_bold">Национальность: </span>
              <span>{Product?.user_data?.details?.nationality || ""}</span>
            </div>
            <div>
              <span className="title_bold">Город проживания: </span>
              <span>{Product?.user_data?.details?.citizenship || ""}</span>
            </div>
            <div>
              <span className="title_bold">Номер телефона: </span>
              <span>{Product?.user_data?.details?.phoneNumber || ""}</span>
            </div>
            <div>
              <span className="title_bold">Где прописан: </span>
              <span>{Product?.user_data?.details?.address || ""}</span>
            </div>
            <div>
              <span className="title_bold">Степень образования: </span>
              <span>{Product?.user_data?.details?.education || ""}</span>
            </div>
            <div>
              <span className="title_bold">Семейное положение: </span>
              <span>
                {Product?.user_data?.details?.familyStatus == true
                  ? "Семейный"
                  : "Нет семьи"}
              </span>
            </div>
            <div>
              <span className="title_bold">Опыт работы: </span>
              <span>{Product?.user_data?.details?.experience || ""}</span>
            </div>
            <div>
              <span className="title_bold">Дата создания анкеты: </span>
              <span>
                {new Date(Product?.user_data?.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ) : null}
        {localStorage.getItem("username") == "Admin" && (
          <div className="admin_users_cont">
            {Product.admin_data &&
              Product.admin_data.map((user, index) => (
                <div key={index} className="admin_user_wrap">
                  <div>
                    <span className="title_bold">Полное имя (ФИО): </span>
                    <span>{user.user.username}</span>
                  </div>
                  <div>
                    <span className="title_bold">Почта (email): </span>
                    <span>{user.user.email}</span>
                  </div>
                  <div>
                    <span className="title_bold">ID пользователя: </span>
                    <span>{user.id}</span>
                  </div>
                  <div>
                    <span className="title_bold">Статус: </span>
                    <span>{user.status}</span>
                  </div>
                  <ChangeStatusModal id={user.id} status={user.status} />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
});
export default MainPage;
