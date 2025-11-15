import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createTokenFreeze,
  freezeAddress,
  unfreezeAddress,
  isFrozen,
  type TokenFreeze,
} from '@/lib/onchain-token-freeze-utils';

export function useOnchainTokenFreeze() {
  const { address } = useAccount();
  const [freezes, setFreezes] = useState<TokenFreeze[]>([]);

  const freeze = (freezeId: bigint, addressToFreeze: Address) => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const freeze = freezes.find((f) => f.id === freezeId);
    if (!freeze) throw new Error('Freeze not found');
    const updated = freezeAddress(freeze, addressToFreeze);
    setFreezes((prev) =>
      prev.map((f) => (f.id === freezeId ? updated : f))
    );
    console.log('Freezing address:', { freezeId, addressToFreeze });
  };

  return {
    freezes,
    freeze,
    unfreezeAddress,
    isFrozen,
    address,
  };
}



