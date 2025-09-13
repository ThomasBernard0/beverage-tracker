import { Box, Button } from "@mui/material";
import type { OrderData, Orders } from "../../types/account";
import { getTotalPrice } from "../../utils/getTotalPrice";

type Props = {
  orders: Orders | undefined;
  onPay: (orderData: OrderData) => void;
  onEdit: (orderData: OrderData) => void;
};

const OrdersList: React.FC<Props> = ({ orders, onPay, onEdit }) => {
  if (!orders) return;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      {orders.map((order, index) => (
        <Box
          key={index}
          sx={{
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minWidth: 220,
            minHeight: 60,
          }}
        >
          <Box>{order.name}</Box>
          <Box>{getTotalPrice(order.orders)}€</Box>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Button
              style={{ textTransform: "none" }}
              variant={"contained"}
              color={"success"}
              onClick={() => {
                onPay(order);
              }}
            >
              Payer
            </Button>
            <Button
              style={{ textTransform: "none" }}
              variant={"contained"}
              color={"error"}
              onClick={() => {
                onEdit(order);
              }}
            >
              Editer
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default OrdersList;
