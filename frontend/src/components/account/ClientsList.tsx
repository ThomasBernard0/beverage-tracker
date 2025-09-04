import { Button, Stack } from "@mui/material";
import type { Client } from "../../types/account";

type Props = {
  clients: Client[];
  onCreate: (name: string) => void;
};

const ClientsList: React.FC<Props> = ({ clients, onCreate }) => {
  return (
    <Stack direction={"row"} spacing={4}>
      {clients.map((client, index) => (
        <Button
          key={index}
          variant={"contained"}
          color={"primary"}
          onClick={() => {
            return;
          }}
        >
          {client.name}
        </Button>
      ))}
      <Button
        variant={"contained"}
        color={"primary"}
        onClick={() => onCreate("test")}
      >
        +
      </Button>
    </Stack>
  );
};

export default ClientsList;
