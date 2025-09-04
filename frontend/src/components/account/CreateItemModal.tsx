import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import type { ItemDto } from "../../types/account";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (item: ItemDto) => void;
};

const CreateItemModal: React.FC<Props> = ({ open, onClose, onCreate }) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  useEffect(() => {
    setName("");
    setPrice("");
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    const priceInCent = Math.round(parseFloat(price) * 100);
    onCreate({ name, priceInCent });
    onClose();
  };

  const isFormValid = () => {
    return name.trim() !== "" && price.trim() !== "";
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
          Créer un item
        </Typography>
        <>
          <TextField
            label="Nom"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Prix"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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

export default CreateItemModal;
