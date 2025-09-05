import { Box, Button, Container } from "@mui/material";
import type { Order, Orders } from "../../types/account";

type Props = {
  orders: Orders | undefined;
};

const ClientsList: React.FC<Props> = ({ orders }) => {
  if (!orders) return;

  const getTotalPrice = (orders: Order[]) => {
    const totalInCent = orders.reduce(
      (total, order) => total + order.priceInCent,
      0
    );
    return totalInCent / 100;
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        gap: 2,
        p: 2,
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
          <Box>{getTotalPrice(order.orders)}</Box>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Button
              style={{ textTransform: "none" }}
              variant={"contained"}
              color={"success"}
            >
              Payer
            </Button>
            <Button
              style={{ textTransform: "none" }}
              variant={"contained"}
              color={"primary"}
            >
              Editer
            </Button>
          </Box>
        </Box>
      ))}
    </Container>
  );
};

export default ClientsList;
