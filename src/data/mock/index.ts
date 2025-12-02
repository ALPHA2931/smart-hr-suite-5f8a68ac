// Central export for all mock data
// This file makes it easy to import mock data from one location

export * from './employees';
export * from './attendance';
export * from './leaves';

// Mock statistics for dashboards
export const mockAdminStats = {
  totalEmployees: 5,
  presentToday: 3,
  pendingLeaves: 2,
  totalSalary: 350000,
};

export const mockEmployeeStats = {
  presentDays: 18,
  pendingLeaves: 1,
  approvedLeaves: 3,
  salary: 75000,
};
