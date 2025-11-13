import { type Address } from 'viem';

/**
 * Onchain farm supply ordering utilities
 * Supply order creation and delivery confirmation
 */

export interface SupplyOrder {
  id: string;
  buyer: Address;
  supplier: Address;
  itemName: string;
  quantity: bigint;
  unitPrice: bigint;
  totalPrice: bigint;
  deliveryDate: bigint;
  status: 'pending' | 'delivered' | 'cancelled';
  timestamp: bigint;
}

export function createSupplyOrder(
  buyer: Address,
  supplier: Address,
  itemName: string,
  quantity: bigint,
  unitPrice: bigint,
  deliveryDate: bigint
): SupplyOrder {
  return {
    id: `${Date.now()}-${Math.random()}`,
    buyer,
    supplier,
    itemName,
    quantity,
    unitPrice,
    totalPrice: quantity * unitPrice,
    deliveryDate,
    status: 'pending',
    timestamp: BigInt(Date.now()),
  };
}

