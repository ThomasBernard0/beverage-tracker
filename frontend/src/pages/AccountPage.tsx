import { Box, CircularProgress } from "@mui/material";
import ClientsList from "../components/account/ClientsList";
import { createClient, useClients } from "../api/account";

const AccountPage: React.FC = () => {
  const { clients, loading, error, refetch } = useClients();

  const handleCreateClient = async (name: string) => {
    await createClient({ name });
    await refetch();
  };

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
    <div>
      <ClientsList clients={clients} onCreate={handleCreateClient} />
    </div>
  );
};

export default AccountPage;
