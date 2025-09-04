import { useEffect, useState } from "react";
import api from "./api";
import type { Client, ClientDto, Item, ItemDto } from "../types/account";

export const useClients = () => {
  const [clients, setClients] = useState<Client | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = async () => {
    try {
      const res = await api.get<Client | string>("/account/clients");
      setClients(res.data === "" ? null : (res.data as Client));
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
    const res = await api.post<{ message: string }>("/account/client", {
      client,
    });
    return res.data.message;
  } catch (error: any) {
    console.log("Failed to create client:", error);
    console.error("Failed to create client:", error);
    throw new Error("Unable to create client.");
  }
};

export const useItems = () => {
  const [items, setItems] = useState<Client | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      const res = await api.get<Client | string>("/account/items");
      setItems(res.data === "" ? null : (res.data as Item));
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
    const res = await api.post<{ message: string }>("/account/item", {
      item,
    });
    return res.data.message;
  } catch (error: any) {
    console.log("Failed to create item:", error);
    console.error("Failed to create item:", error);
    throw new Error("Unable to create item.");
  }
};
