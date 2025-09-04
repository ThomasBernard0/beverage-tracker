import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import type { Client, Item } from "../../types/account";

type Props = {
  open: boolean;
  type: "client" | "item";
  values: Client[] | Item[];
  onClose: () => void;
  onDelete: (id: string) => void;
};

const CreateClientModal: React.FC<Props> = ({
  open,
  type,
  values,
  onClose,
  onDelete,
}) => {
  const [selectedValueId, setSelectedValueId] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    onDelete(selectedValueId);
    onClose();
  };

  const isFormValid = () => {
    return selectedValueId.trim() !== "";
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
          Supprimer un {type}
        </Typography>
        <>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="client-select-label">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </InputLabel>
            <Select
              labelId="client-select-label"
              value={selectedValueId}
              label={type}
              onChange={(e) => setSelectedValueId(e.target.value)}
            >
              {values.map((value) => (
                <MenuItem key={value.id} value={value.id}>
                  {value.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
        <Box sx={{ mt: "auto", pt: 2 }}>
          <Button
            variant="contained"
            fullWidth
            disabled={!isFormValid()}
            type="submit"
          >
            Supprimer un {type}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateClientModal;
