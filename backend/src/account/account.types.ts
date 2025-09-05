export type CreateClientDto = {
  name: string;
};

export type CreateItemDto = {
  name: string;
  priceInCent: number;
};

export type CreateOrderDto = {
  itemName: string;
  priceInCent: number;
  clientId: string;
};

export type PayOrderDto = {
  clientId: string;
};
