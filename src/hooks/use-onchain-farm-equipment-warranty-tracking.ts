import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  registerWarranty,
  type WarrantyRecord,
} from '@/lib/onchain-farm-equipment-warranty-tracking-utils';

export function useOnchainFarmEquipmentWarrantyTracking() {
  const { address } = useAccount();
  const [warranties, setWarranties] = useState<WarrantyRecord[]>([]);

  const register = async (
    equipmentId: bigint,
    warrantyProvider: string,
    endDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const warranty = registerWarranty(address, equipmentId, warrantyProvider, endDate);
    setWarranties([...warranties, warranty]);
  };

  return { warranties, register, address };
}
