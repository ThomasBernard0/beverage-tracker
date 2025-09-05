import { Box, Button } from "@mui/material";
import type { Client } from "../../types/account";

type Props = {
  clients: Client[];
  activeClient: string;
  changeActiveClient: (id: string) => void;
  onCreate: () => void;
  onDelete: () => void;
};

const ClientsList: React.FC<Props> = ({
  clients,
  activeClient,
  changeActiveClient,
  onCreate,
  onDelete,
}) => {
  return (
    <Box
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
          style={{ textTransform: "none" }}
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
      <Button variant={"contained"} color={"error"} onClick={onDelete}>
        -
      </Button>
    </Box>
  );
};

export default ClientsList;
