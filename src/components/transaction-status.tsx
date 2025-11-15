'use client';

import { type Hash } from 'viem';
import { formatTxHash } from '@/lib/onchain-transaction-utils';

interface TransactionStatusProps {
  hash: Hash;
  status: 'pending' | 'confirmed' | 'failed';
  confirmations?: number;
}

export function TransactionStatus({
  hash,
  status,
  confirmations = 0,
}: TransactionStatusProps) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`px-2 py-1 rounded text-xs ${statusColors[status]}`}>
        {status}
      </span>
      <span className="text-sm font-mono">{formatTxHash(hash)}</span>
      {status === 'pending' && confirmations > 0 && (
        <span className="text-xs text-gray-500">
          {confirmations} confirmations
        </span>
      )}
    </div>
  );
}



