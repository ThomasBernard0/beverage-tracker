import { Box, CircularProgress } from "@mui/material";
import ClientsList from "../components/account/ClientsList";
import { createClient, createItem, useClients, useItems } from "../api/account";
import { useState } from "react";
import ItemsList from "../components/account/ItemsList";
import type { Item, ItemDto } from "../types/account";

const AccountPage: React.FC = () => {
  const {
    clients,
    loading: clientLoading,
    error: clientError,
    refetch: clientRefetch,
  } = useClients();
  const {
    items,
    loading: itemLoading,
    error: itemError,
    refetch: itemRefetch,
  } = useItems();

  const [activeClient, setActiveClient] = useState<string>("");

  const handleChangeActiveClient = (id: string) => {
    setActiveClient(id);
  };

  const handleCreateClient = async (name: string) => {
    await createClient({ name });
    await clientRefetch();
  };

  const handleOrderItem = async (item: Item) => {
    if (!activeClient || activeClient === "") return;
    await createCommand(activeClient, item);
  };

  const handleCreateItem = async (item: ItemDto) => {
    await createItem({ name: item.name, price: item.price });
    await itemRefetch();
  };

  if (clientLoading || itemLoading) {
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

  if (clientError) {
    return <div style={{ color: "red" }}>{clientError}</div>;
  }
  if (itemError) {
    return <div style={{ color: "red" }}>{itemError}</div>;
  }
  return (
    <div>
      <ClientsList
        clients={clients}
        activeClient={activeClient}
        changeActiveClient={handleChangeActiveClient}
        onCreate={handleCreateClient}
      />
      <ItemsList
        items={items}
        orderItem={handleOrderItem}
        onCreate={handleCreateItem}
      />
    </div>
  );
};

export default AccountPage;
