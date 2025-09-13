import type { Order } from "../types/account";

export const getTotalPrice = (orders: Order[]) => {
  const totalInCent = orders.reduce(
    (total, order) => total + order.priceInCent,
    0
  );
  return (totalInCent / 100).toFixed(2);
};
