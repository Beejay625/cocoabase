import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  registerLand,
  transferLand,
  type LandParcel,
} from '@/lib/onchain-land-registry-utils';

export function useOnchainLandRegistry() {
  const { address } = useAccount();
  const [parcels, setParcels] = useState<LandParcel[]>([]);
