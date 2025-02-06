import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { useStores } from "../store/Root";
import TextField from "@mui/material/TextField";
import { observer } from "mobx-react-lite";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: "8px",
  outline: 0,
};

const CreateAnketa = observer(() => {
  const { Product } = useStores();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialData = {
    fullName: "",
    birthDate: "",
    nationality: "",
    citizenship: "",
    phoneNumber: "",
    address: "",
    education: "",
    familyStatus: "",
    experience: "",
  };

  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Сохраненные данные:", formData);
    Product.createAnketa(formData); // если есть метод обновления в store
    setOpen(false);
  };

  return (
    <>
      <div title="выйти" className="logout_btn">
        <Button onClick={handleOpen} size="small" variant="contained">
          Создать анкету
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6">Создание анкеты</Typography>
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 0, width: "100%" } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              value={formData.fullName}
              onChange={handleChange}
              sx={{ paddingTop: "5px" }}
              name="fullName"
              label="Полное имя (ФИО):"
              variant="filled"
            />
            <TextField
              value={formData.birthDate}
              onChange={handleChange}
              sx={{ paddingTop: "5px" }}
              name="birthDate"
              label="Дата рождения:"
              variant="filled"
            />
            <TextField
              value={formData.nationality}
              onChange={handleChange}
              sx={{ paddingTop: "5px" }}
              name="nationality"
              label="Национальность:"
              variant="filled"
            />
            <TextField
              value={formData.citizenship}
              onChange={handleChange}
              sx={{ paddingTop: "5px" }}
              name="citizenship"
              label="Город проживания:"
              variant="filled"
            />
            <TextField
              value={formData.phoneNumber}
              onChange={handleChange}
              sx={{ paddingTop: "5px" }}
              name="phoneNumber"
              label="Номер телефона:"
              variant="filled"
            />
            <TextField
              value={formData.address}
              onChange={handleChange}
              sx={{ paddingTop: "5px" }}
              name="address"
              label="Где прописан:"
              variant="filled"
            />
            <TextField
              value={formData.education}
              onChange={handleChange}
              sx={{ paddingTop: "5px" }}
              name="education"
              label="Образование:"
              variant="filled"
            />
            <TextField
              value={formData.experience}
              onChange={handleChange}
              sx={{ paddingTop: "5px" }}
              name="experience"
              label="Опыт работы:"
              variant="filled"
            />

            <FormControl fullWidth sx={{ paddingTop: "15px" }}>
              <Select
                name="familyStatus"
                variant="filled"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.familyStatus}
                label="Семейное положение"
                onChange={handleChange}
              >
                <MenuItem value={true}>Семейный</MenuItem>
                <MenuItem value={false}>Нет семьи</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Stack
            spacing={2}
            direction="row"
            sx={{ display: "flex", justifyContent: "end", marginTop: 2 }}
          >
            <Button
              variant="contained"
              endIcon={<FileDownloadDoneIcon />}
              onClick={handleSave}
            >
              Создать
            </Button>
            <Button
              variant="outlined"
              endIcon={<CloseIcon />}
              onClick={handleClose}
            >
              Отмена
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
});

export default CreateAnketa;
