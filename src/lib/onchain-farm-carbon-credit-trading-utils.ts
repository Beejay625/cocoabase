import { type Address } from 'viem';

/**
 * Onchain farm carbon credit trading utilities
 * Carbon credit trade creation and execution
 */

export interface CarbonCreditTrade {
  id: string;
  seller: Address;
  buyer: Address;
  creditAmount: bigint;
  pricePerCredit: bigint;
  totalPrice: bigint;
  status: 'pending' | 'executed' | 'cancelled';
  timestamp: bigint;
}

export function createCarbonTrade(
  seller: Address,
  creditAmount: bigint,
  pricePerCredit: bigint,
  buyer: Address
): CarbonCreditTrade {
  return {
    id: `${Date.now()}-${Math.random()}`,
    seller,
    buyer,
    creditAmount,
    pricePerCredit,
    totalPrice: creditAmount * pricePerCredit,
    status: 'pending',
    timestamp: BigInt(Date.now()),
  };
}

