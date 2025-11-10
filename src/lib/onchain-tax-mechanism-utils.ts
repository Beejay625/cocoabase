import { type Address } from 'viem';

export interface TaxMechanism {
  id: bigint;
  token: Address;
  taxRate: number;
  taxRecipient: Address;
  exempt: Set<Address>;
}

export function createTaxMechanism(
  token: Address,
  taxRate: number,
  taxRecipient: Address
): TaxMechanism {
  return {
    id: BigInt(0),
    token,
    taxRate,
    taxRecipient,
    exempt: new Set(),
  };
}

