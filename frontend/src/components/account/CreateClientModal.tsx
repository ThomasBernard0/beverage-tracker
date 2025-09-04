import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
};

const CreateClientModal: React.FC<Props> = ({ open, onClose, onCreate }) => {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    setName("");
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    onCreate(name);
    onClose();
  };

  const isFormValid = () => {
    return name.trim() !== "";
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          width: "50%",
          height: "50%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" mb={2}>
          Créer un client
        </Typography>
        <>
          <TextField
            label="Nom"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
        </>
        <Box sx={{ mt: "auto", pt: 2 }}>
          <Button
            variant="contained"
            fullWidth
            disabled={!isFormValid()}
            type="submit"
          >
            Créer
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateClientModal;
