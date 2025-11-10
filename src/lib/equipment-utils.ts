export type EquipmentStatus = "operational" | "maintenance" | "broken" | "retired";

export type EquipmentCategory = 
  | "tractor"
  | "harvester"
  | "irrigation"
  | "processing"
  | "transport"
  | "tools"
  | "other";

export interface Equipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  model?: string;
  serialNumber?: string;
  manufacturer?: string;
  purchaseDate?: Date;
  purchasePrice?: number;
  status: EquipmentStatus;
  location?: string;
  assignedTo?: string;
  lastMaintenance?: Date;
  nextMaintenance?: Date;
  maintenanceInterval: number;
  hoursUsed?: number;
  notes?: string;
}

export const calculateEquipmentAge = (equipment: Equipment): number => {
  if (!equipment.purchaseDate) return 0;
  const now = new Date();
  const diff = now.getTime() - equipment.purchaseDate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
};

export const calculateDepreciation = (
  equipment: Equipment,
  depreciationRate: number = 0.1
): number => {
  if (!equipment.purchasePrice || !equipment.purchaseDate) return 0;
  const age = calculateEquipmentAge(equipment);
  const depreciation = equipment.purchasePrice * depreciationRate * age;
  return Math.max(0, equipment.purchasePrice - depreciation);
};

export const isMaintenanceDue = (equipment: Equipment): boolean => {
  if (!equipment.nextMaintenance) return false;
  return new Date(equipment.nextMaintenance) <= new Date();
};

export const calculateUptime = (
  equipment: Equipment,
  totalHours: number
): number => {
  if (!equipment.hoursUsed || totalHours === 0) return 100;
  const downtime = totalHours - equipment.hoursUsed;
  return ((equipment.hoursUsed / totalHours) * 100);
};

export const getEquipmentByCategory = (
  equipment: Equipment[]
): Record<EquipmentCategory, Equipment[]> => {
  return equipment.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {
      tractor: [],
      harvester: [],
      irrigation: [],
      processing: [],
      transport: [],
      tools: [],
      other: [],
    } as Record<EquipmentCategory, Equipment[]>
  );
};

export const getEquipmentByStatus = (
  equipment: Equipment[]
): Record<EquipmentStatus, Equipment[]> => {
  return equipment.reduce(
    (acc, item) => {
      if (!acc[item.status]) {
        acc[item.status] = [];
      }
      acc[item.status].push(item);
      return acc;
    },
    {
      operational: [],
      maintenance: [],
      broken: [],
      retired: [],
    } as Record<EquipmentStatus, Equipment[]>
  );
};

export const getEquipmentSummary = (equipment: Equipment[]): {
  total: number;
  operational: number;
  maintenance: number;
  broken: number;
  retired: number;
  byCategory: Record<EquipmentCategory, number>;
  totalValue: number;
  averageAge: number;
} => {
  const byStatus = getEquipmentByStatus(equipment);
  const byCategory = getEquipmentByCategory(equipment);

  const totalValue = equipment.reduce((sum, item) => {
    return sum + (item.purchasePrice || 0);
  }, 0);

  const totalAge = equipment.reduce((sum, item) => {
    return sum + calculateEquipmentAge(item);
  }, 0);

  const averageAge = equipment.length > 0 ? totalAge / equipment.length : 0;

  return {
    total: equipment.length,
    operational: byStatus.operational?.length || 0,
    maintenance: byStatus.maintenance?.length || 0,
    broken: byStatus.broken?.length || 0,
    retired: byStatus.retired?.length || 0,
    byCategory: {
      tractor: byCategory.tractor.length,
      harvester: byCategory.harvester.length,
      irrigation: byCategory.irrigation.length,
      processing: byCategory.processing.length,
      transport: byCategory.transport.length,
      tools: byCategory.tools.length,
      other: byCategory.other.length,
    },
    totalValue,
    averageAge,
  };
};

export const formatEquipmentCategory = (category: EquipmentCategory): string => {
  const labels: Record<EquipmentCategory, string> = {
    tractor: "Tractor",
    harvester: "Harvester",
    irrigation: "Irrigation",
    processing: "Processing",
    transport: "Transport",
    tools: "Tools",
    other: "Other",
  };
  return labels[category];
};


