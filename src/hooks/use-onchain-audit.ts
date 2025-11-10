import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address, Hash } from 'viem';
import {
  createAuditLog,
  type AuditLog,
} from '@/lib/onchain-audit-utils';

export function useOnchainAudit() {
  const { address } = useAccount();
  const [logs, setLogs] = useState<AuditLog[]>([]);

  const logEvent = async (
    event: string,
    target: Address,
    txHash: Hash
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const log = createAuditLog(event, address, target, event, '', txHash, BigInt(0));
    setLogs(prev => [...prev, log]);
  };

  return { logs, logEvent, address };
}

