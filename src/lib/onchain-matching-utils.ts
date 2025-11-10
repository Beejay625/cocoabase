import { type Address } from 'viem';

/**
 * Onchain matching utilities
 * Order matching system
 */

export interface Order {
  id: bigint;
  maker: Address;
  tokenIn: Address;
  tokenOut: Address;
  amountIn: bigint;
  amountOut: bigint;
  filled: bigint;
}

export function canMatchOrders(
  order1: Order,
  order2: Order
): boolean {
  return order1.tokenIn === order2.tokenOut && 
         order1.tokenOut === order2.tokenIn;
}
