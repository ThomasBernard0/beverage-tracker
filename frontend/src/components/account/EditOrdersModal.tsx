import React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import type { OrderData } from "../../types/account";
import { format } from "date-fns";

type Props = {
  open: boolean;
  orderData: OrderData | undefined;
  onClose: () => void;
  onEdit: (clientId: string) => void;
};

const EditOrdersModal: React.FC<Props> = ({
  open,
  orderData,
  onClose,
  onEdit,
}) => {
  if (!orderData) return;

  const handleDelete = (orderId: string) => {
    onEdit(orderId);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
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
          gap: 1,
          overflowY: "auto",
        }}
      >
        {orderData.orders.map((order, index) => {
          return (
            <Box
              key={index}
              sx={{
                p: 1,
                borderRadius: 2,
                boxShadow: 2,
                display: "grid",
                gridTemplateColumns: "1fr auto auto",
                columnGap: 2,
              }}
            >
              <Typography>{order.itemName}</Typography>
              <Typography>
                {format(new Date(order.createdAt), "dd MMM yyyy HH:mm")}
              </Typography>
              <Button
                variant={"contained"}
                color={"error"}
                onClick={() => handleDelete(order.id)}
              >
                -
              </Button>
            </Box>
          );
        })}
      </Box>
    </Modal>
  );
};

export default EditOrdersModal;
