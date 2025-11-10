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

export function getVerifiedProducts(
  verifications: SupplyChainVerification[]
): SupplyChainVerification[] {
  return verifications.filter((v) => v.status === 'verified');
}

export function getVerificationsByType(
  verifications: SupplyChainVerification[],
  verificationType: SupplyChainVerification['verificationType']
): SupplyChainVerification[] {
  return verifications.filter((v) => v.verificationType === verificationType);
}

export function getProductVerifications(
  verifications: SupplyChainVerification[],
  productId: bigint
): SupplyChainVerification[] {
  return verifications.filter((v) => v.productId === productId);
}
