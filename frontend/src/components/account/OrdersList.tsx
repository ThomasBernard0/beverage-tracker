import { Container } from "@mui/material";
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
        <div key={index}>
          <div>{order.name}</div>
          <div>{getTotalPrice(order.orders)}</div>
        </div>
      ))}
    </Container>
  );
};

export default ClientsList;
