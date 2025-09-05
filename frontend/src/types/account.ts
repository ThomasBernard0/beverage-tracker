export type AccountSummary = {
  id: number;
  name: string;
};

export type Client = {
  id: string;
  name: string;
};

export type ClientDto = {
  name: string;
};

export type Item = {
  id: string;
  name: string;
  priceInCent: number;
};

export type ItemDto = {
  name: string;
  priceInCent: number;
};

export type Orders = {
  clientId: string;
  orders: Order[];
};

export type Order = {
  id: string;
  itemName: string;
  priceInCent: number;
};

export type OrderDto = {
  itemName: string;
  priceInCent: number;
  clientId: string;
};
