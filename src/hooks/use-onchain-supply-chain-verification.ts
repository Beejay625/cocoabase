import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createVerification,
  type SupplyChainVerification,
} from '@/lib/onchain-supply-chain-verification-utils';

export function useOnchainSupplyChainVerification() {
  const { address } = useAccount();
  const [verifications, setVerifications] = useState<SupplyChainVerification[]>([]);

  const create = async (
    productId: bigint,
    verificationType: SupplyChainVerification['verificationType'],
    verifiedBy: Address
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const verification = createVerification(address, productId, verificationType, verifiedBy);
    setVerifications([...verifications, verification]);
  };

  return { verifications, create, address };
}
