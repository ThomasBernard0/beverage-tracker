import React from "react";
import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ClientsList from "../components/account/ClientsList";
import {
  createClient,
  createItem,
  createOrder,
  deleteClient,
  deleteItem,
  deleteOrder,
  payOrder,
  useClients,
  useItems,
  useOrders,
} from "../api/account";
import { useState } from "react";
import ItemsList from "../components/account/ItemsList";
import type {
  Item,
  ItemDto,
  NotificationProps,
  OrderData,
} from "../types/account";
import CreateClientModal from "../components/account/CreateClientModal";
import CreateItemModal from "../components/account/CreateItemModal";
import DeleteClientModal from "../components/account/DeleteModal";
import OrdersList from "../components/account/OrdersList";
import PayOrdersModal from "../components/account/PayOrdersModal";
import EditOrdersModal from "../components/account/EditOrdersModal";

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
  const {
    orders,
    loading: orderLoading,
    error: orderError,
    refetch: orderRefetch,
  } = useOrders();

  const [activeClient, setActiveClient] = useState<string>("");

  const [isCreateClientModalOpen, setIsCreateClientModalOpen] = useState(false);
  const [isCreateItemModalOpen, setIsCreateItemModalOpen] = useState(false);
  const [isDeleteClientModalOpen, setIsDeleteClientModalOpen] = useState(false);
  const [isDeleteItemModalOpen, setIsDeleteItemModalOpen] = useState(false);

  const [isPayOrdersModalOpen, setIsPayOrdersModalOpen] = useState(false);
  const [isEditOrdersModalOpen, setIsEditOrdersModalOpen] = useState(false);
  const [activeOrders, setActiveOrders] = useState<OrderData>();

  const [notification, setNotification] = useState<NotificationProps>({
    open: false,
    message: "",
    severity: "success",
  });

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
    try {
      await createOrder({
        itemName: item.name,
        priceInCent: item.priceInCent,
        clientId: activeClient,
      });
      setNotification({
        open: true,
        message: `${item.name} ajouté(e) à ${
          clients.find((c) => c.id == activeClient)?.name
        }`,
        severity: "success",
      });
      await orderRefetch();
    } catch (error: any) {
      setNotification({
        open: true,
        message: "Erreur lors de l'ajout",
        severity: "error",
      });
    }
  };

  const handlePayOrder = async (clientId: string) => {
    await payOrder(clientId);
    await orderRefetch();
  };

  const handleEditOrder = async (orderId: string) => {
    await deleteOrder(orderId);
    await orderRefetch();
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  if (clientLoading || itemLoading || orderLoading) {
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
    return <Box style={{ color: "red" }}>{clientError}</Box>;
  }
  if (itemError) {
    return <Box style={{ color: "red" }}>{itemError}</Box>;
  }
  if (orderError) {
    return <Box style={{ color: "red" }}>{orderError}</Box>;
  }
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 2,
            borderRadius: 2,
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography>Personnes</Typography>
          <ClientsList
            clients={clients}
            activeClient={activeClient}
            changeActiveClient={handleChangeActiveClient}
            onCreate={() => setIsCreateClientModalOpen(true)}
            onDelete={() => setIsDeleteClientModalOpen(true)}
          />
        </Box>
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 2,
            borderRadius: 2,
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography>Achats</Typography>
          <ItemsList
            items={items}
            orderItem={handleOrderItem}
            onCreate={() => setIsCreateItemModalOpen(true)}
            onDelete={() => {
              setIsDeleteItemModalOpen(true);
            }}
          />
        </Box>
        <OrdersList
          orders={orders}
          onPay={(orderData: OrderData) => {
            setActiveOrders(orderData);
            setIsPayOrdersModalOpen(true);
          }}
          onEdit={(orderData: OrderData) => {
            setActiveOrders(orderData);
            setIsEditOrdersModalOpen(true);
          }}
        />
      </Box>
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
      <PayOrdersModal
        open={isPayOrdersModalOpen}
        orderData={activeOrders}
        onClose={() => {
          setIsPayOrdersModalOpen(false);
        }}
        onPay={handlePayOrder}
      />
      <EditOrdersModal
        open={isEditOrdersModalOpen}
        orderData={activeOrders}
        onClose={() => {
          setIsEditOrdersModalOpen(false);
        }}
        onEdit={handleEditOrder}
      />
      <Snackbar
        open={notification.open}
        autoHideDuration={2000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={notification.severity}
          variant="filled"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseNotification}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          sx={{ width: "100%", p: 4 }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AccountPage;
