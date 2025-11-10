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

export function calculateTax(
  mechanism: TaxMechanism,
  amount: bigint,
  from: Address,
  to: Address
): bigint {
  if (mechanism.exempt.has(from) || mechanism.exempt.has(to)) {
    return BigInt(0);
  }
  return (amount * BigInt(Math.floor(mechanism.taxRate * 100))) / BigInt(10000);
}

export function addExemptAddress(
  mechanism: TaxMechanism,
  address: Address
): TaxMechanism {
  const newExempt = new Set(mechanism.exempt);
  newExempt.add(address);
  return {
    ...mechanism,
    exempt: newExempt,
  };
}

export function removeExemptAddress(
  mechanism: TaxMechanism,
  address: Address
): TaxMechanism {
  const newExempt = new Set(mechanism.exempt);
  newExempt.delete(address);
  return {
    ...mechanism,
    exempt: newExempt,
  };
}
