// Main App - Routes and Navigation
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

// Pages
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import NotFound from '@/pages/NotFound';

// Admin Pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import Employees from '@/pages/admin/Employees';
import Attendance from '@/pages/admin/Attendance';
import LeaveRequests from '@/pages/admin/LeaveRequests';
import Payroll from '@/pages/admin/Payroll';

// Employee Pages
import EmployeeDashboard from '@/pages/employee/EmployeeDashboard';
import EmployeeAttendance from '@/pages/employee/EmployeeAttendance';
import EmployeeLeaves from '@/pages/employee/EmployeeLeaves';
import EmployeeSalary from '@/pages/employee/EmployeeSalary';

const queryClient = new QueryClient();

// Protected Route wrapper
function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole?: 'admin' | 'employee' }) {
  const { user, userRole } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to={userRole === 'admin' ? '/admin' : '/employee'} replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/employees" element={<ProtectedRoute requiredRole="admin"><Employees /></ProtectedRoute>} />
      <Route path="/admin/attendance" element={<ProtectedRoute requiredRole="admin"><Attendance /></ProtectedRoute>} />
      <Route path="/admin/leaves" element={<ProtectedRoute requiredRole="admin"><LeaveRequests /></ProtectedRoute>} />
      <Route path="/admin/payroll" element={<ProtectedRoute requiredRole="admin"><Payroll /></ProtectedRoute>} />

      {/* Employee Routes */}
      <Route path="/employee" element={<ProtectedRoute requiredRole="employee"><EmployeeDashboard /></ProtectedRoute>} />
      <Route path="/employee/attendance" element={<ProtectedRoute requiredRole="employee"><EmployeeAttendance /></ProtectedRoute>} />
      <Route path="/employee/leaves" element={<ProtectedRoute requiredRole="employee"><EmployeeLeaves /></ProtectedRoute>} />
      <Route path="/employee/salary" element={<ProtectedRoute requiredRole="employee"><EmployeeSalary /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
