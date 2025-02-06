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
import { observer } from "mobx-react-lite";
import { TextField } from "@mui/material";

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
const ChangeStatusModal = observer(({ status, id }) => {
  const { Product } = useStores();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function changeStatus() {
    Product.changeStatus(formData, id);
  }

  const [formData, setFormData] = useState(status);

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{ marginTop: 1 }}
        size="small"
        variant="outlined"
      >
        Изменить статус
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="p">Вы действительно хотите выйти?</Typography>
          <TextField
            required
            value={formData}
            onChange={(e) => setFormData(e.target.value)}
            sx={{ paddingTop: "5px" }}
            label="Статус анкеты:"
            variant="filled"
          />
          <Stack
            spacing={2}
            direction="row"
            sx={{ display: "flex", justifyContent: "end", marginTop: 2 }}
          >
            <Button
              variant="contained"
              endIcon={<FileDownloadDoneIcon />}
              onClick={() => {
                changeStatus();
                handleClose();
              }}
            >
              Сохранить
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

export default ChangeStatusModal;
