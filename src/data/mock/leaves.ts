// Mock leave requests data for prototype
export const mockLeaveRequests = [
  {
    id: 'leave-1',
    employee_id: '1',
    leave_type: 'vacation',
    start_date: '2024-12-20',
    end_date: '2024-12-27',
    reason: 'Family vacation for the holidays',
    status: 'pending' as const,
    admin_notes: null,
    created_at: '2024-11-25T10:00:00Z',
    employees: {
      employee_id: 'EMP001',
      position: 'Software Engineer',
      profiles: { full_name: 'John Smith' },
    },
  },
  {
    id: 'leave-2',
    employee_id: '2',
    leave_type: 'sick',
    start_date: '2024-11-28',
    end_date: '2024-11-29',
    reason: 'Flu symptoms, need rest',
    status: 'approved' as const,
    admin_notes: 'Get well soon!',
    created_at: '2024-11-27T08:30:00Z',
    employees: {
      employee_id: 'EMP002',
      position: 'Product Designer',
      profiles: { full_name: 'Sarah Johnson' },
    },
  },
  {
    id: 'leave-3',
    employee_id: '3',
    leave_type: 'personal',
    start_date: '2024-12-05',
    end_date: '2024-12-05',
    reason: 'Personal appointment',
    status: 'pending' as const,
    admin_notes: null,
    created_at: '2024-12-01T14:20:00Z',
    employees: {
      employee_id: 'EMP003',
      position: 'Marketing Manager',
      profiles: { full_name: 'Michael Chen' },
    },
  },
  {
    id: 'leave-4',
    employee_id: '4',
    leave_type: 'emergency',
    start_date: '2024-11-15',
    end_date: '2024-11-16',
    reason: 'Family emergency',
    status: 'approved' as const,
    admin_notes: 'Approved immediately',
    created_at: '2024-11-15T07:00:00Z',
    employees: {
      employee_id: 'EMP004',
      position: 'HR Specialist',
      profiles: { full_name: 'Emily Davis' },
    },
  },
  {
    id: 'leave-5',
    employee_id: '5',
    leave_type: 'vacation',
    start_date: '2024-10-01',
    end_date: '2024-10-05',
    reason: 'Annual leave',
    status: 'rejected' as const,
    admin_notes: 'Please reschedule due to project deadline',
    created_at: '2024-09-20T11:00:00Z',
    employees: {
      employee_id: 'EMP005',
      position: 'Data Analyst',
      profiles: { full_name: 'Alex Rivera' },
    },
  },
];

export type MockLeaveRequest = typeof mockLeaveRequests[0];
export type LeaveStatus = 'pending' | 'approved' | 'rejected';
export type LeaveType = 'sick' | 'vacation' | 'personal' | 'emergency';
