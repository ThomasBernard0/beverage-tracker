import { Box, CircularProgress } from "@mui/material";
import ClientsList from "../components/account/ClientsList";
import {
  createClient,
  createCommand,
  createItem,
  deleteClient,
  deleteItem,
  useClients,
  useItems,
} from "../api/account";
import { useState } from "react";
import ItemsList from "../components/account/ItemsList";
import type { Item, ItemDto } from "../types/account";
import CreateClientModal from "../components/account/CreateClientModal";
import CreateItemModal from "../components/account/CreateItemModal";
import DeleteClientModal from "../components/account/DeleteModal";

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
  const [isCreateClientModalOpen, setIsCreateClientModalOpen] = useState(false);
  const [isCreateItemModalOpen, setIsCreateItemModalOpen] = useState(false);
  const [isDeleteClientModalOpen, setIsDeleteClientModalOpen] = useState(false);
  const [isDeleteItemModalOpen, setIsDeleteItemModalOpen] = useState(false);

  const handleChangeActiveClient = (id: string) => {
    setActiveClient(id);
  };

  const handleCreateClient = async (name: string) => {
    await createClient({ name });
    await clientRefetch();
  };

  const handleDeleteClient = async (clientId: string) => {
    await deleteClient(clientId);
    await clientRefetch();
  };

  const handleCreateItem = async (item: ItemDto) => {
    await createItem({ name: item.name, priceInCent: item.priceInCent });
    await itemRefetch();
  };

  const handleDeleteItem = async (itemId: string) => {
    await deleteItem(itemId);
    await itemRefetch();
  };

  const handleOrderItem = async (item: Item) => {
    if (!activeClient || activeClient === "") return;
    await createCommand(activeClient, item);
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
    <>
      <div>
        <ClientsList
          clients={clients}
          activeClient={activeClient}
          changeActiveClient={handleChangeActiveClient}
          onCreate={() => setIsCreateClientModalOpen(true)}
          onDelete={() => setIsDeleteClientModalOpen(true)}
        />
        <ItemsList
          items={items}
          orderItem={handleOrderItem}
          onCreate={() => setIsCreateItemModalOpen(true)}
          onDelete={() => {
            setIsDeleteItemModalOpen(true);
          }}
        />
      </div>
      <CreateClientModal
        open={isCreateClientModalOpen}
        onClose={() => {
          setIsCreateClientModalOpen(false);
        }}
        onCreate={handleCreateClient}
      />
      <CreateItemModal
        open={isCreateItemModalOpen}
        onClose={() => {
          setIsCreateItemModalOpen(false);
        }}
        onCreate={handleCreateItem}
      />
      <DeleteClientModal
        open={isDeleteClientModalOpen}
        type={"client"}
        values={clients}
        onClose={() => {
          setIsDeleteClientModalOpen(false);
        }}
        onDelete={handleDeleteClient}
      />
      <DeleteClientModal
        open={isDeleteItemModalOpen}
        type={"item"}
        values={items}
        onClose={() => {
          setIsDeleteItemModalOpen(false);
        }}
        onDelete={handleDeleteItem}
      />
    </>
  );
};

export default AccountPage;
