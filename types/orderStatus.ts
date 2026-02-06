export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export function toOrderStatus(value: string): OrderStatus {
  if (Object.values(OrderStatus).includes(value as OrderStatus)) {
    return value as OrderStatus;
  }

  return OrderStatus.PENDING; // safe fallback
}
