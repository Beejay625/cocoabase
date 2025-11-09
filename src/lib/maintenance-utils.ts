export type MaintenanceType = "preventive" | "corrective" | "emergency" | "inspection";

export type MaintenanceStatus = "scheduled" | "in-progress" | "completed" | "overdue" | "cancelled";

export type EquipmentType = "tractor" | "irrigation" | "harvesting" | "processing" | "other";

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  model?: string;
  serialNumber?: string;
  purchaseDate?: Date;
  lastMaintenance?: Date;
  nextMaintenance?: Date;
  maintenanceInterval: number;
  status: "operational" | "maintenance" | "broken" | "retired";
}

export interface MaintenanceTask {
  id: string;
  equipmentId: string;
  type: MaintenanceType;
  status: MaintenanceStatus;
  scheduledDate: Date;
  completedDate?: Date;
  description: string;
  assignedTo?: string;
  cost?: number;
  notes?: string;
  parts?: Array<{ name: string; quantity: number; cost: number }>;
}

export const isMaintenanceDue = (equipment: Equipment): boolean => {
  if (!equipment.nextMaintenance) return false;
  return new Date(equipment.nextMaintenance) <= new Date();
};

export const isMaintenanceOverdue = (equipment: Equipment): boolean => {
  if (!equipment.nextMaintenance) return false;
  const daysOverdue = Math.floor(
    (Date.now() - new Date(equipment.nextMaintenance).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return daysOverdue > 0;
};

export const calculateNextMaintenanceDate = (
  lastMaintenance: Date,
  intervalDays: number
): Date => {
  const next = new Date(lastMaintenance);
  next.setDate(next.getDate() + intervalDays);
  return next;
};

export const getMaintenanceCost = (task: MaintenanceTask): number => {
  const partsCost = task.parts
    ? task.parts.reduce((sum, part) => sum + part.cost * part.quantity, 0)
    : 0;
  return (task.cost || 0) + partsCost;
};

export const getTotalMaintenanceCost = (
  tasks: MaintenanceTask[],
  startDate?: Date,
  endDate?: Date
): number => {
  const filtered = tasks.filter((task) => {
    if (startDate && task.scheduledDate < startDate) return false;
    if (endDate && task.scheduledDate > endDate) return false;
    return true;
  });

  return filtered.reduce((sum, task) => sum + getMaintenanceCost(task), 0);
};

export const getMaintenanceTasksByStatus = (
  tasks: MaintenanceTask[]
): Record<MaintenanceStatus, MaintenanceTask[]> => {
  return tasks.reduce(
    (acc, task) => {
      if (!acc[task.status]) {
        acc[task.status] = [];
      }
      acc[task.status].push(task);
      return acc;
    },
    {} as Record<MaintenanceStatus, MaintenanceTask[]>
  );
};

export const getOverdueMaintenanceTasks = (
  tasks: MaintenanceTask[]
): MaintenanceTask[] => {
  const now = new Date();
  return tasks.filter((task) => {
    return (
      task.status === "scheduled" &&
      new Date(task.scheduledDate) < now
    );
  });
};

export const getUpcomingMaintenanceTasks = (
  tasks: MaintenanceTask[],
  daysAhead: number = 30
): MaintenanceTask[] => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() + daysAhead);

  return tasks.filter((task) => {
    if (task.status !== "scheduled") return false;
    const scheduledDate = new Date(task.scheduledDate);
    return scheduledDate <= cutoffDate && scheduledDate >= new Date();
  });
};

export const calculateEquipmentUptime = (
  equipment: Equipment,
  tasks: MaintenanceTask[]
): number => {
  const equipmentTasks = tasks.filter((t) => t.equipmentId === equipment.id);
  const completedTasks = equipmentTasks.filter((t) => t.status === "completed");
  
  if (equipmentTasks.length === 0) return 100;
  
  const totalDays = equipmentTasks.reduce((sum, task) => {
    if (task.completedDate && task.scheduledDate) {
      const diff = Math.abs(
        new Date(task.completedDate).getTime() -
          new Date(task.scheduledDate).getTime()
      );
      return sum + Math.floor(diff / (1000 * 60 * 60 * 24));
    }
    return sum;
  }, 0);

  return totalDays > 0 ? (completedTasks.length / equipmentTasks.length) * 100 : 100;
};

export const getMaintenanceSummary = (
  tasks: MaintenanceTask[],
  equipment: Equipment[]
): {
  total: number;
  byStatus: Record<MaintenanceStatus, number>;
  byType: Record<MaintenanceType, number>;
  overdue: number;
  upcoming: number;
  totalCost: number;
} => {
  const byStatus = getMaintenanceTasksByStatus(tasks);
  const byType = tasks.reduce(
    (acc, task) => {
      if (!acc[task.type]) {
        acc[task.type] = 0;
      }
      acc[task.type]++;
      return acc;
    },
    {} as Record<MaintenanceType, number>
  );

  return {
    total: tasks.length,
    byStatus: {
      scheduled: byStatus.scheduled?.length || 0,
      "in-progress": byStatus["in-progress"]?.length || 0,
      completed: byStatus.completed?.length || 0,
      overdue: byStatus.overdue?.length || 0,
      cancelled: byStatus.cancelled?.length || 0,
    },
    byType,
    overdue: getOverdueMaintenanceTasks(tasks).length,
    upcoming: getUpcomingMaintenanceTasks(tasks).length,
    totalCost: getTotalMaintenanceCost(tasks),
  };
};

