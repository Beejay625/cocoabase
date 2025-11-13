import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  createTradeDocument,
  type TradeDocument,
} from '@/lib/onchain-agricultural-trade-documentation-utils';

export function useOnchainAgriculturalTradeDocumentation() {
  const { address } = useAccount();
  const [documents, setDocuments] = useState<TradeDocument[]>([]);

  const create = async (
    documentType: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const document = createTradeDocument(address, documentType);
    setDocuments([...documents, document]);
  };

  return { documents, create, address };
}
