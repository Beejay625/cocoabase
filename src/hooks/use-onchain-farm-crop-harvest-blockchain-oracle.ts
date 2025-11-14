import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createOracleData,
  type OracleData,
} from '@/lib/onchain-farm-crop-harvest-blockchain-oracle-utils';

/**
 * Hook for onchain farm crop harvest blockchain oracle
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestBlockchainOracle() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [oracleData, setOracleData] = useState<OracleData[]>([]);

  const submitOracleData = async (
    harvestId: string,
    dataType: string,
    dataValue: string,
    oracleSource: string,
    submissionDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const data = createOracleData(address, harvestId, dataType, dataValue, oracleSource, submissionDate);
    setOracleData([...oracleData, data]);
  };

  const verifyOracleData = async (
    contractAddress: Address,
    dataId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyOracleData',
      args: [dataId],
    });
  };

  return { oracleData, submitOracleData, verifyOracleData, address };
}

