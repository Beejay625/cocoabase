/**
 * Type definitions for all 20 onchain farm features
 * All features require Reown wallet integration
 */

export type ReownAddress = `0x${string}`;

export interface OnchainFeatureBase {
  address: ReownAddress | null;
  requiresWallet: true;
  walletProvider: 'Reown AppKit';
}

export * from '../lib/onchain-farm-equipment-maintenance-utils';
export * from '../lib/onchain-farm-water-rights-utils';
export * from '../lib/onchain-farm-labor-contracts-utils';
export * from '../lib/onchain-farm-insurance-policy-utils';
export * from '../lib/onchain-farm-subsidy-claims-utils';
export * from '../lib/onchain-farm-certification-renewal-utils';
export * from '../lib/onchain-farm-compliance-reporting-utils';
export * from '../lib/onchain-farm-financial-planning-utils';
export * from '../lib/onchain-farm-budget-planning-utils';
export * from '../lib/onchain-farm-investment-tracking-utils';
export * from '../lib/onchain-farm-asset-tokenization-utils';
export * from '../lib/onchain-farm-land-valuation-utils';
export * from '../lib/onchain-farm-performance-benchmarking-utils';
export * from '../lib/onchain-farm-profitability-analysis-utils';
export * from '../lib/onchain-farm-production-analytics-utils';
export * from '../lib/onchain-farm-resource-optimization-utils';
export * from '../lib/onchain-farm-risk-assessment-utils';
export * from '../lib/onchain-farm-sustainability-scoring-utils';
export * from '../lib/onchain-farm-succession-planning-utils';
export * from '../lib/onchain-farm-waste-management-utils';

