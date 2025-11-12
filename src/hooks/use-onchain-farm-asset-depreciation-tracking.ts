import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  recordDepreciation,
  type DepreciationRecord,
} from '@/lib/onchain-farm-asset-depreciation-tracking-utils';

export function useOnchainFarmAssetDepreciationTracking() {
  const { address } = useAccount();
  const [records, setRecords] = useState<DepreciationRecord[]>([]);

  const record = async (
    assetId: bigint,
    originalValue: bigint,
    currentValue: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const record = recordDepreciation(address, assetId, originalValue, currentValue);
    setRecords([...records, record]);
  };

  return { records, record, address };
}
