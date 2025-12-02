// Mock attendance data for prototype
import { format, subDays } from 'date-fns';

const today = format(new Date(), 'yyyy-MM-dd');

export const mockAttendance = [
  {
    id: 'att-1',
    employee_id: '1',
    date: today,
    check_in_time: '09:00:00',
    check_out_time: '17:30:00',
    status: 'present' as const,
    notes: null,
    employees: {
      employee_id: 'EMP001',
      position: 'Software Engineer',
      profiles: { full_name: 'John Smith' },
    },
  },
  {
    id: 'att-2',
    employee_id: '2',
    date: today,
    check_in_time: '09:15:00',
    check_out_time: '17:45:00',
    status: 'present' as const,
    notes: null,
    employees: {
      employee_id: 'EMP002',
      position: 'Product Designer',
      profiles: { full_name: 'Sarah Johnson' },
    },
  },
  {
    id: 'att-3',
    employee_id: '3',
    date: today,
    check_in_time: '10:30:00',
    check_out_time: null,
    status: 'late' as const,
    notes: 'Traffic delay',
    employees: {
      employee_id: 'EMP003',
      position: 'Marketing Manager',
      profiles: { full_name: 'Michael Chen' },
    },
  },
  {
    id: 'att-4',
    employee_id: '4',
    date: today,
    check_in_time: null,
    check_out_time: null,
    status: 'absent' as const,
    notes: 'Sick leave',
    employees: {
      employee_id: 'EMP004',
      position: 'HR Specialist',
      profiles: { full_name: 'Emily Davis' },
    },
  },
];

// Generate historical attendance for employee view
export const generateEmployeeAttendance = (employeeId: string) => {
  const records = [];
  for (let i = 0; i < 10; i++) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    const isWeekend = [0, 6].includes(subDays(new Date(), i).getDay());
    if (!isWeekend) {
      records.push({
        id: `emp-att-${employeeId}-${i}`,
        employee_id: employeeId,
        date,
        check_in_time: '09:00:00',
        check_out_time: i === 0 ? null : '17:30:00',
        status: i === 3 ? 'late' : 'present',
        notes: null,
      });
    }
  }
  return records;
};

export type MockAttendance = typeof mockAttendance[0];
