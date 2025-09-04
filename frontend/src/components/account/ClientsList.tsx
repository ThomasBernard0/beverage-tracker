import { Button, Container } from "@mui/material";
import type { Client } from "../../types/account";

type Props = {
  clients: Client[];
  activeClient: string;
  changeActiveClient: (id: string) => void;
  onCreate: () => void;
};

const ClientsList: React.FC<Props> = ({
  clients,
  activeClient,
  changeActiveClient,
  onCreate,
}) => {
  return (
    <Container
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        p: 2,
      }}
    >
      {clients.map((client, index) => (
        <Button
          key={index}
          variant={client.id === activeClient ? "contained" : "outlined"}
          color={"primary"}
          onClick={() => changeActiveClient(client.id)}
        >
          {client.name}
        </Button>
      ))}
      <Button variant={"contained"} color={"primary"} onClick={onCreate}>
        +
      </Button>
    </Container>
  );
};

export default ClientsList;
