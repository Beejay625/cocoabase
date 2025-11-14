import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createEquipmentShare,
  type EquipmentShare,
} from '@/lib/onchain-farm-equipment-sharing-utils';

export function useOnchainFarmEquipmentSharing() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [shares, setShares] = useState<EquipmentShare[]>([]);

  const shareEquipment = async (
    contractAddress: Address,
    equipmentId: bigint,
    borrower: Address,
    duration: bigint,
    deposit: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const share = createEquipmentShare(address, equipmentId, borrower, duration, deposit);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'equipmentId', type: 'uint256' },
            { name: 'borrower', type: 'address' },
            { name: 'duration', type: 'uint256' },
            { name: 'deposit', type: 'uint256' }
          ],
          name: 'shareEquipment',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'shareEquipment',
      args: [equipmentId, borrower, duration, deposit],
    });
    
    setShares([...shares, share]);
  };

  const returnEquipment = async (
    contractAddress: Address,
    shareId: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [{ name: 'shareId', type: 'uint256' }],
          name: 'returnEquipment',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'returnEquipment',
      args: [shareId],
    });
  };

  return { shares, shareEquipment, returnEquipment, address };
}
