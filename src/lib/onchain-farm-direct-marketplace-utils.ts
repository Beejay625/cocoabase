import { type Address } from 'viem';

/**
 * Onchain farm direct marketplace utilities
 * Direct farmer-to-buyer marketplace
 */

export interface Listing {
  id: string;
  listingId: bigint;
  seller: Address;
  productName: string;
  productDescription: string;
  quantity: bigint;
  pricePerUnit: bigint;
  totalPrice: bigint;
  isActive: boolean;
  listingDate: bigint;
  category: string;
}

export interface Order {
  id: string;
  orderId: bigint;
  listingId: bigint;
  buyer: Address;
  seller: Address;
  quantity: bigint;
  totalPrice: bigint;
  orderDate: bigint;
  isCompleted: boolean;
  isCancelled: boolean;
}

export function createListing(
  address: Address,
  productName: string,
  productDescription: string,
  quantity: bigint,
  pricePerUnit: bigint,
  category: string
): Listing {
  return {
    id: `${Date.now()}-${Math.random()}`,
    listingId: BigInt(0),
    seller: address,
    productName,
    productDescription,
    quantity,
    pricePerUnit,
    totalPrice: quantity * pricePerUnit,
    isActive: true,
    listingDate: BigInt(Date.now()),
    category,
  };
}

export function createOrder(
  buyer: Address,
  seller: Address,
  listingId: bigint,
  quantity: bigint,
  totalPrice: bigint
): Order {
  return {
    id: `${Date.now()}-${Math.random()}`,
    orderId: BigInt(0),
    listingId,
    buyer,
    seller,
    quantity,
    totalPrice,
    orderDate: BigInt(Date.now()),
    isCompleted: false,
    isCancelled: false,
  };
}

