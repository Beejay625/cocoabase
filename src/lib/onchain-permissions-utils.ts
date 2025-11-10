import { type Address } from 'viem';

/**
 * Onchain permissions utilities
 * Role-based access control and permission checks
 */

export interface Permission {
  address: Address;
  role: 'owner' | 'admin' | 'operator' | 'viewer';
  granted: boolean;
}

/**
 * Check if address has permission
 */
export function hasPermission(
  permissions: Permission[],
  address: Address,
  requiredRole: Permission['role']
): boolean {
  const perm = permissions.find(p => 
    p.address.toLowerCase() === address.toLowerCase()
  );
  if (!perm || !perm.granted) return false;
  
  const roleHierarchy = { owner: 4, admin: 3, operator: 2, viewer: 1 };
  return roleHierarchy[perm.role] >= roleHierarchy[requiredRole];
}

