import { Container } from "@mui/material";
import type { Orders } from "../../types/account";

type Props = {
  orders: Orders | undefined;
};

const ClientsList: React.FC<Props> = ({ orders }) => {
  if (!orders) return;
  return (
    <Container
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        p: 2,
      }}
    ></Container>
  );
};

export default ClientsList;
