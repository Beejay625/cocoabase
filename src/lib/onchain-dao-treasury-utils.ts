import { type Address } from 'viem';

export interface DAOTreasury {
  id: bigint;
  dao: Address;
  tokens: Map<Address, bigint>;
  proposals: bigint[];
}

export function createDAOTreasury(dao: Address): DAOTreasury {
  return {
    id: BigInt(0),
    dao,
    tokens: new Map(),
    proposals: [],
  };
}

export function depositToTreasury(
  treasury: DAOTreasury,
  token: Address,
  amount: bigint
): DAOTreasury {
  const newTokens = new Map(treasury.tokens);
  const existing = newTokens.get(token) || BigInt(0);
  newTokens.set(token, existing + amount);
  return {
    ...treasury,
    tokens: newTokens,
  };
}

export function withdrawFromTreasury(
  treasury: DAOTreasury,
  token: Address,
  amount: bigint
): DAOTreasury | null {
  const balance = treasury.tokens.get(token) || BigInt(0);
  if (balance < amount) return null;
  const newTokens = new Map(treasury.tokens);
  newTokens.set(token, balance - amount);
  return {
    ...treasury,
    tokens: newTokens,
  };
}

export function getTreasuryBalance(
  treasury: DAOTreasury,
  token: Address
): bigint {
  return treasury.tokens.get(token) || BigInt(0);
}
