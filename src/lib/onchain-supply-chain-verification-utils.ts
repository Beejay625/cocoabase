import { type Address } from 'viem';

export interface SupplyChainVerification {
  id: bigint;
  owner: Address;
  productId: bigint;
  verificationType: 'origin' | 'quality' | 'sustainability' | 'fair-trade';
  verifiedBy: Address;
  verificationDate: bigint;
  status: 'verified' | 'pending' | 'rejected';
  txHash: string;
}

export function createVerification(
  owner: Address,
  productId: bigint,
  verificationType: SupplyChainVerification['verificationType'],
  verifiedBy: Address
): SupplyChainVerification {
  return {
    id: BigInt(Date.now()),
    owner,
    productId,
    verificationType,
    verifiedBy,
    verificationDate: BigInt(Date.now()),
    status: 'verified',
    txHash: '',
  };
}
