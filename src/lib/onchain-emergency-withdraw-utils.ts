import { type Address } from 'viem';

export interface EmergencyWithdraw {
  id: bigint;
  contract: Address;
  token: Address;
  amount: bigint;
  recipient: Address;
  timestamp: bigint;
}

export function createEmergencyWithdraw(
  contract: Address,
  token: Address,
  amount: bigint,
  recipient: Address
): EmergencyWithdraw {
  return {
    id: BigInt(0),
    contract,
    token,
    amount,
    recipient,
    timestamp: BigInt(Date.now()),
  };
}

