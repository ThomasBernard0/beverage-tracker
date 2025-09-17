import { Box, Button, Typography } from "@mui/material";
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
        gap: 1,
        p: 1,
      }}
    >
      {clients.map((client, index) => (
        <Button
          key={index}
          sx={{ textTransform: "none", p: 1 }}
          variant={client.id === activeClient ? "contained" : "outlined"}
          color={"primary"}
          onClick={() => changeActiveClient(client.id)}
        >
          <Typography>{client.name}</Typography>
        </Button>
      ))}
      <Button
        sx={{ p: 1 }}
        variant={"contained"}
        color={"primary"}
        onClick={onCreate}
      >
        +
      </Button>
      <Button
        sx={{ p: 1 }}
        variant={"contained"}
        color={"error"}
        onClick={onDelete}
      >
        -
      </Button>
    </Box>
  );
};

export default ClientsList;
