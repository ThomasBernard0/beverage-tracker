import { useEffect, useState } from "react";
import api from "./api";
import type {
  Client,
  ClientDto,
  Item,
  ItemDto,
  Order,
  OrderDto,
  Orders,
} from "../types/account";

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = async () => {
    try {
      const res = await api.get<Client[]>("/account/clients");
      setClients(res.data);
    } catch (err: any) {
      console.error("Failed to fetch clients:", err);
      setError("Unable to fetch clients.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return { clients, loading, error, refetch: fetchClients };
};

export const createClient = async (client: ClientDto): Promise<string> => {
  try {
    const res = await api.post<{ message: string }>("/account/client", client);
    return res.data.message;
  } catch (error: any) {
    console.log("Failed to create client:", error);
    console.error("Failed to create client:", error);
    throw new Error("Unable to create client.");
  }
};

export const deleteClient = async (clientId: string): Promise<string> => {
  try {
    const res = await api.delete<{ message: string }>(
      `/account/client/${clientId}`
    );
    return res.data.message;
  } catch (error: any) {
    console.log("Failed to delete client:", error);
    console.error("Failed to delete client:", error);
    throw new Error("Unable to delete client.");
  }
};

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      const res = await api.get<Item[]>("/account/items");
      setItems(res.data);
    } catch (err: any) {
      console.error("Failed to fetch items:", err);
      setError("Unable to fetch items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return { items, loading, error, refetch: fetchItems };
};

export const createItem = async (item: ItemDto): Promise<string> => {
  try {
    const res = await api.post<{ message: string }>("/account/item", item);
    return res.data.message;
  } catch (error: any) {
    console.log("Failed to create item:", error);
    console.error("Failed to create item:", error);
    throw new Error("Unable to create item.");
  }
};

export const deleteItem = async (itemId: string): Promise<string> => {
  try {
    const res = await api.delete<{ message: string }>(
      `/account/item/${itemId}`
    );
    return res.data.message;
  } catch (error: any) {
    console.log("Failed to delete item:", error);
    console.error("Failed to delete item:", error);
    throw new Error("Unable to delete item.");
  }
};

export const createCommand = async (
  cliendId: string,
  item: Item
): Promise<string> => {
  try {
    const res = await api.post<{ message: string }>("/account/order", {
      cliendId,
      item,
    });
    return res.data.message;
  } catch (error: any) {
    console.log("Failed to create order:", error);
    console.error("Failed to create order:", error);
    throw new Error("Unable to create order.");
  }
};

export const useOrders = () => {
  const [orders, setOrders] = useState<Orders>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await api.get<Orders>("/account/orders/unpaid");
      setOrders(res.data);
    } catch (err: any) {
      console.error("Failed to fetch orders:", err);
      setError("Unable to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, loading, error, refetch: fetchOrders };
};

export const createOrder = async (order: OrderDto): Promise<string> => {
  try {
    const res = await api.post<{ message: string }>(`/account/order/`, order);
    return res.data.message;
  } catch (error: any) {
    console.log("Failed to delete order:", error);
    console.error("Failed to delete order:", error);
    throw new Error("Unable to delete order.");
  }
};

export const deleteOrder = async (orderId: string): Promise<string> => {
  try {
    const res = await api.delete<{ message: string }>(
      `/account/order/${orderId}`
    );
    return res.data.message;
  } catch (error: any) {
    console.log("Failed to delete order:", error);
    console.error("Failed to delete order:", error);
    throw new Error("Unable to delete order.");
  }
};

export const payOrder = async (clientId: string): Promise<string> => {
  try {
    const res = await api.put<{ message: string }>(`/account/orders/pay`, {
      clientId,
    });
    return res.data.message;
  } catch (error: any) {
    console.log("Failed to pay order:", error);
    console.error("Failed to pay order:", error);
    throw new Error("Unable to pay order.");
  }
};
