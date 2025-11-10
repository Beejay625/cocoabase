import { type Address } from 'viem';

/**
 * Onchain Pest Outbreak Reporting utilities
 * Report and track pest outbreaks onchain
 */

export interface PestOutbreak {
  id: bigint;
  reporter: Address;
  location: string;
  pestType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedArea: bigint;
  description: string;
  status: 'reported' | 'confirmed' | 'contained' | 'resolved';
  reportedAt: bigint;
  confirmedAt?: bigint;
  resolvedAt?: bigint;
}

export function createPestOutbreakReport(
  reporter: Address,
  location: string,
  pestType: string,
  severity: PestOutbreak['severity'],
  affectedArea: bigint,
  description: string
): PestOutbreak {
  const now = BigInt(Date.now());
  return {
    id: BigInt(0),
    reporter,
    location,
    pestType,
    severity,
    affectedArea,
    description,
    status: 'reported',
    reportedAt: now,
  };
}

export function confirmPestOutbreak(outbreak: PestOutbreak): PestOutbreak {
  const now = BigInt(Date.now());
  return {
    ...outbreak,
    status: 'confirmed',
    confirmedAt: now,
  };
}

export function containOutbreak(outbreak: PestOutbreak): PestOutbreak {
  return {
    ...outbreak,
    status: 'contained',
  };
}

export function resolveOutbreak(outbreak: PestOutbreak): PestOutbreak {
  const now = BigInt(Date.now());
  return {
    ...outbreak,
    status: 'resolved',
    resolvedAt: now,
  };
}

export function calculateOutbreakRisk(outbreak: PestOutbreak): number {
  const severityMultiplier = {
    low: 1,
    medium: 2,
    high: 3,
    critical: 4,
  };
  return severityMultiplier[outbreak.severity] * Number(outbreak.affectedArea);
}

export function isOutbreakUrgent(outbreak: PestOutbreak): boolean {
  return outbreak.severity === 'critical' || outbreak.severity === 'high';
}

