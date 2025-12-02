// Mock employee data for prototype
export const mockEmployees = [
  {
    id: '1',
    employee_id: 'EMP001',
    user_id: 'user-1',
    position: 'Software Engineer',
    salary: 75000,
    date_of_joining: '2023-01-15',
    department_id: '1',
    address: '123 Main St, New York',
    emergency_contact: '+1 555-0101',
    profiles: {
      full_name: 'John Smith',
      email: 'john.smith@company.com',
      phone: '+1 555-0100',
    },
    departments: { id: '1', name: 'Engineering' },
  },
  {
    id: '2',
    employee_id: 'EMP002',
    user_id: 'user-2',
    position: 'Product Designer',
    salary: 68000,
    date_of_joining: '2023-03-20',
    department_id: '2',
    address: '456 Oak Ave, Boston',
    emergency_contact: '+1 555-0201',
    profiles: {
      full_name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 555-0200',
    },
    departments: { id: '2', name: 'Design' },
  },
  {
    id: '3',
    employee_id: 'EMP003',
    user_id: 'user-3',
    position: 'Marketing Manager',
    salary: 82000,
    date_of_joining: '2022-08-10',
    department_id: '3',
    address: '789 Pine Rd, Chicago',
    emergency_contact: '+1 555-0301',
    profiles: {
      full_name: 'Michael Chen',
      email: 'michael.chen@company.com',
      phone: '+1 555-0300',
    },
    departments: { id: '3', name: 'Marketing' },
  },
  {
    id: '4',
    employee_id: 'EMP004',
    user_id: 'user-4',
    position: 'HR Specialist',
    salary: 55000,
    date_of_joining: '2023-06-01',
    department_id: '4',
    address: '321 Elm St, Seattle',
    emergency_contact: '+1 555-0401',
    profiles: {
      full_name: 'Emily Davis',
      email: 'emily.davis@company.com',
      phone: '+1 555-0400',
    },
    departments: { id: '4', name: 'Human Resources' },
  },
  {
    id: '5',
    employee_id: 'EMP005',
    user_id: 'user-5',
    position: 'Data Analyst',
    salary: 70000,
    date_of_joining: '2023-02-28',
    department_id: '1',
    address: '654 Maple Dr, Austin',
    emergency_contact: '+1 555-0501',
    profiles: {
      full_name: 'Alex Rivera',
      email: 'alex.rivera@company.com',
      phone: '+1 555-0500',
    },
    departments: { id: '1', name: 'Engineering' },
  },
];

export const mockDepartments = [
  { id: '1', name: 'Engineering', description: 'Software development team' },
  { id: '2', name: 'Design', description: 'Product and UX design' },
  { id: '3', name: 'Marketing', description: 'Marketing and communications' },
  { id: '4', name: 'Human Resources', description: 'HR and recruitment' },
];

export type MockEmployee = typeof mockEmployees[0];
export type MockDepartment = typeof mockDepartments[0];
