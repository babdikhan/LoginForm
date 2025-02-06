import React from "react";
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

const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: "8px",
  outline: 0,
};

export function LogoutModal() {
  const { Login } = useStores();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function logout() {
    Login.unauthorize();
    navigate("login");
  }

  return (
    <>
      <div title="выйти" className="logout_btn">
        <div onClick={() => navigate("user_info")}>
          {" "}
          {localStorage.getItem("username")}
        </div>
        <LogoutIcon onClick={handleOpen} fontSize="small" />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="p">Вы действительно хотите выйти?</Typography>
          <Stack
            spacing={2}
            direction="row"
            sx={{ display: "flex", justifyContent: "end", marginTop: 2 }}
          >
            <Button
              variant="contained"
              endIcon={<FileDownloadDoneIcon />}
              onClick={() => {
                logout();
                handleClose();
              }}
            >
              Выйти
            </Button>
            <Button
              variant="outlined"
              endIcon={<CloseIcon />}
              onClick={handleClose}
            >
              Нет
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
