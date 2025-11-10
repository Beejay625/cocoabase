import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createTransferRestriction,
  restrictAddress,
  whitelistAddress,
  canTransfer,
  type TransferRestriction,
} from '@/lib/onchain-transfer-restriction-utils';

export function useOnchainTransferRestriction() {
  const { address } = useAccount();
  const [restrictions, setRestrictions] = useState<TransferRestriction[]>([]);

  const restrict = (restrictionId: bigint, addressToRestrict: Address) => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const restriction = restrictions.find((r) => r.id === restrictionId);
    if (!restriction) throw new Error('Restriction not found');
    const updated = restrictAddress(restriction, addressToRestrict);
    setRestrictions((prev) =>
      prev.map((r) => (r.id === restrictionId ? updated : r))
    );
    console.log('Restricting address:', { restrictionId, addressToRestrict });
  };

  return {
    restrictions,
    restrict,
    whitelistAddress,
    canTransfer,
    address,
  };
}

