import { useState } from "react";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import { useStores } from "../store/Root";
import { TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
// import video from "../assets/video/video.mp4";
import { useNavigate, Link } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const RegistrationPage = observer(() => {
  const { Login } = useStores();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const date = {
      email: email,
      username: username,
      password: password,
    };
    await Login.registration(date);
    if (Login.is_registered == true) {
      navigate("/login");
    } else {
      toast.error("Выберите другой email!");
    }
  }

  return (
    <div className="login_cont">
      {/* <video className="my_video" loop muted autoPlay src={video}></video> */}

      <div className="login_card_cont">
        <div style={{ fontWeight: 500, fontSize: 18 }}>Anketa KZ</div>
        <div className="login_card">
          <div className="login_texts">Регистрация</div>
        </div>
        <form className="login_form" onSubmit={(e) => handleSubmit(e)}>

          <TextField
            required
            id="outlined-password-input"
            label="Username"
            type="text"
            size="small"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            required
            id="outlined-password-input"
            label="Email"
            type="email"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormControl size="small" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Пароль *
            </InputLabel>
            <OutlinedInput
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
          <FormGroup>
            <FormControlLabel
              required
              control={<Checkbox />}
              label={
                <span>
                  <span
                    style={{
                      cursor: "pointer",
                      width: "350px",
                      textAlign: "left",
                    }}
                  >
                    Я подтверждаю, что ознакомлен и согласен с <br />
                    условиями
                  </span>

                  <a
                    style={{
                      paddingLeft: 10,
                      textDecoration: "none",
                      color: "#F24822",
                      cursor: "pointer",
                      fontStyle: "italic",
                    }}
                    href="https://example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Политики конфиденциальности
                  </a>
                </span>
              }
            />
          </FormGroup>
          <Link
            to="/login"
            style={{
              textAlign: "end",
              textDecoration: "none",
              fontStyle: "italic",
              fontSize: 14,
            }}
          >
            Есть аккаунт?
          </Link>
          <Button type="submit" variant="contained">
            Зарегистрировать
          </Button>
        </form>
      </div>
    </div>
  );
});

export default RegistrationPage;
