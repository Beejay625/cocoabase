import { type Address } from 'viem';

export interface MintController {
  id: bigint;
  token: Address;
  minter: Address;
  maxSupply: bigint;
  currentSupply: bigint;
  mintCap: bigint;
}

export function createMintController(
  token: Address,
  minter: Address,
  maxSupply: bigint,
  mintCap: bigint
): MintController {
  return {
    id: BigInt(0),
    token,
    minter,
    maxSupply,
    currentSupply: BigInt(0),
    mintCap,
  };
}

export function mintTokens(
  controller: MintController,
  to: Address,
  amount: bigint
): MintController | null {
  if (controller.currentSupply + amount > controller.maxSupply) return null;
  if (amount > controller.mintCap) return null;
  return {
    ...controller,
    currentSupply: controller.currentSupply + amount,
  };
}

export function canMint(
  controller: MintController,
  amount: bigint
): boolean {
  return (
    controller.currentSupply + amount <= controller.maxSupply &&
    amount <= controller.mintCap
  );
}

export function getRemainingSupply(controller: MintController): bigint {
  return controller.maxSupply - controller.currentSupply;
}
