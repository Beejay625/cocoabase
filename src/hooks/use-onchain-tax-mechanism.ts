import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createTaxMechanism,
  calculateTax,
  addExemptAddress,
  removeExemptAddress,
  type TaxMechanism,
} from '@/lib/onchain-tax-mechanism-utils';

export function useOnchainTaxMechanism() {
  const { address } = useAccount();
  const [mechanisms, setMechanisms] = useState<TaxMechanism[]>([]);

  const addExempt = (mechanismId: bigint, exemptAddress: Address) => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const mechanism = mechanisms.find((m) => m.id === mechanismId);
    if (!mechanism) throw new Error('Mechanism not found');
    const updated = addExemptAddress(mechanism, exemptAddress);
    setMechanisms((prev) =>
      prev.map((m) => (m.id === mechanismId ? updated : m))
    );
    console.log('Adding exempt address:', { mechanismId, exemptAddress });
  };

  return {
    mechanisms,
    addExempt,
    calculateTax,
    removeExemptAddress,
    address,
  };
}

