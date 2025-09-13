import React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import type { OrderData } from "../../types/account";
import { getTotalPrice } from "../../utils/getTotalPrice";

type Props = {
  open: boolean;
  orderData: OrderData | undefined;
  onClose: () => void;
  onPay: (clientId: string) => void;
};

const PayOrdersModal: React.FC<Props> = ({
  open,
  orderData,
  onClose,
  onPay,
}) => {
  if (!orderData) return;
  const mapOrdersByItem = (
    orderData: OrderData
  ): { itemName: string; price: number; count: number }[] => {
    const map = new Map<string, { count: number; price: number }>();
    for (const order of orderData.orders) {
      if (map.has(order.itemName)) {
        map.get(order.itemName)!.count += 1;
      } else {
        map.set(order.itemName, {
          count: 1,
          price: order.priceInCent / 100,
        });
      }
    }
    return Array.from(map, ([itemName, { price, count }]) => ({
      itemName,
      price,
      count,
    }));
  };

  const handlePay = (orderId: string) => {
    onPay(orderId);
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
        }}
      >
        <Box
          sx={{
            overflowY: "auto",
            display: "grid",
            gridTemplateColumns: "auto auto  1fr auto",
            columnGap: 2,
            rowGap: 1,
            alignItems: "center",
            width: "100%",
          }}
        >
          {mapOrdersByItem(orderData).map((order, index) => {
            return (
              <React.Fragment key={index}>
                <Typography> {order.itemName}</Typography>
                <Typography>-</Typography>
                <Typography> {order.price.toFixed(2)}€</Typography>
                <Typography> {order.count}</Typography>
              </React.Fragment>
            );
          })}
        </Box>
        <Box
          sx={{
            mt: "auto",
            pt: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>
            {getTotalPrice(orderData.orders)}€
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => handlePay(orderData.id)}
          >
            Payer
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PayOrdersModal;
