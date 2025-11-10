import { type Address } from 'viem';

export interface Option {
  id: bigint;
  buyer: Address;
  seller: Address;
  underlyingAsset: string;
  strikePrice: bigint;
  premium: bigint;
  expiryTime: bigint;
  type: 'call' | 'put';
  status: 'active' | 'exercised' | 'expired';
  positionSize: bigint;
  token: Address;
  createdAt: bigint;
}

export function createOption(
  buyer: Address,
  seller: Address,
  underlyingAsset: string,
  strikePrice: bigint,
  premium: bigint,
  expiryTime: bigint,
  type: 'call' | 'put',
  positionSize: bigint,
  token: Address
): Option {
  const now = BigInt(Date.now());
  return {
    id: BigInt(0),
    buyer,
    seller,
    underlyingAsset,
    strikePrice,
    premium,
    expiryTime,
    type,
    status: 'active',
    positionSize,
    token,
    createdAt: now,
  };
}

export function exerciseOption(
  option: Option,
  exerciser: Address,
  currentPrice: bigint,
  currentTime: bigint
): Option | null {
  if (option.status !== 'active') return null;
  if (currentTime > option.expiryTime) return null;
  if (exerciser !== option.buyer) return null;

  const isInTheMoney =
    option.type === 'call'
      ? currentPrice > option.strikePrice
      : currentPrice < option.strikePrice;

  if (!isInTheMoney) return null;

  return {
    ...option,
    status: 'exercised',
  };
}

export function expireOption(
  option: Option,
  currentTime: bigint
): Option | null {
  if (option.status !== 'active') return null;
  if (currentTime <= option.expiryTime) return null;

  return {
    ...option,
    status: 'expired',
  };
}

export function calculateIntrinsicValue(
  option: Option,
  currentPrice: bigint
): bigint {
  if (option.type === 'call') {
    return currentPrice > option.strikePrice
      ? (currentPrice - option.strikePrice) * option.positionSize
      : BigInt(0);
  } else {
    return currentPrice < option.strikePrice
      ? (option.strikePrice - currentPrice) * option.positionSize
      : BigInt(0);
  }
}

export function isOptionInTheMoney(
  option: Option,
  currentPrice: bigint
): boolean {
  if (option.type === 'call') {
    return currentPrice > option.strikePrice;
  } else {
    return currentPrice < option.strikePrice;
  }
}

