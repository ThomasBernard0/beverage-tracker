import { createClient, useClients } from "../../api/account";
import { Box, Button, CircularProgress, Stack } from "@mui/material";

export default function ClientsList() {
  const { clients, loading, error, refetch } = useClients();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

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
        onClick={() => {
          createClient({ name: "test" });
        }}
      >
        +
      </Button>
    </Stack>
  );
}
