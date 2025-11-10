'use client';

import { type Address, type Hash } from 'viem';
import { formatExplorerURL } from '@/lib/multichain-utils';

interface ExplorerLinkProps {
  chainId: number;
  address: Address | Hash;
  type?: 'address' | 'tx';
  label?: string;
}

export function ExplorerLink({
  chainId,
  address,
  type = 'address',
  label,
}: ExplorerLinkProps) {
  const url = formatExplorerURL(chainId, address as Address, type);
  
  if (!url) return <span>{label || address.slice(0, 10)}...</span>;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      {label || `${address.slice(0, 6)}...${address.slice(-4)}`}
    </a>
  );
}

