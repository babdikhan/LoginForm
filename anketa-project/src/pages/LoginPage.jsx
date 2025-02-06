import { useState } from "react";
import { toast } from "react-toastify";
import { useStores } from "../store/Root";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router-dom";
// import video from "../assets/video/video.mp4";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginPage = observer(() => {
  const { Login } = useStores();
  const navigate = useNavigate();
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function handleSubmit(e, login, pass) {
    e.preventDefault();
    await Login.authorize(login, pass);
    if (Login.is_authorized == true) {
      navigate("/main");
      toast.success("Успешно зашли в систему!");
    } else {
      toast.error("Неверный логин или пароль!");
    }
  }
  return (
    <div className="login_cont">
      {/* <video className="my_video" loop muted autoPlay src={video}></video> */}
      <div className="login_card_cont">
        <div style={{ fontWeight: 500, fontSize: 18 }}>Anketa KZ</div>
        <div className="login_card">
          <div className="login_texts">Вход в систему</div>
        </div>
        <form
          className="login_form"
          onSubmit={(e) => handleSubmit(e, login, password)}
        >
          <TextField
            required
            id="outlined-password-input"
            label="Логин"
            type="text"
            size="small"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />

          <FormControl size="small" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Пароль *
            </InputLabel>
            <OutlinedInput
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Пароль *"
            />
          </FormControl>
          <Link
            to="/registration"
            style={{
              textAlign: "end",
              textDecoration: "none",
              fontStyle: "italic",
              fontSize: 14,
            }}
          >
            Еще не авторизованы?
          </Link>
          <Button type="submit" variant="contained">
            Войти
          </Button>
        </form>
      </div>
    </div>
  );
});

export default LoginPage;
