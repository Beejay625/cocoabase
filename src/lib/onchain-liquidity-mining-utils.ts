import { type Address } from 'viem';

export interface LiquidityMiningPool {
  id: bigint;
  tokenA: Address;
  tokenB: Address;
  rewardToken: Address;
  rewardRate: bigint;
  totalLiquidity: bigint;
}

export interface LiquidityPosition {
  provider: Address;
  liquidity: bigint;
  stakedAt: bigint;
  rewards: bigint;
}

export function createLiquidityMiningPool(
  tokenA: Address,
  tokenB: Address,
  rewardToken: Address,
  rewardRate: bigint
): LiquidityMiningPool {
  return {
    id: BigInt(0),
    tokenA,
    tokenB,
    rewardToken,
    rewardRate,
    totalLiquidity: BigInt(0),
  };
}

export function stakeLiquidity(
  pool: LiquidityMiningPool,
  provider: Address,
  liquidity: bigint,
  currentTime: bigint
): { pool: LiquidityMiningPool; position: LiquidityPosition } {
  return {
    pool: {
      ...pool,
      totalLiquidity: pool.totalLiquidity + liquidity,
    },
    position: {
      provider,
      liquidity,
      stakedAt: currentTime,
      rewards: BigInt(0),
    },
  };
}

export function calculateLiquidityRewards(
  position: LiquidityPosition,
  pool: LiquidityMiningPool,
  currentTime: bigint
): bigint {
  const stakedDuration = currentTime - position.stakedAt;
  const share = (position.liquidity * BigInt(10000)) / pool.totalLiquidity;
  return (pool.rewardRate * share * stakedDuration) / BigInt(86400) / BigInt(10000);
}
