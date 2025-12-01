import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import Employees from "./pages/admin/Employees";
import Attendance from "./pages/admin/Attendance";
import LeaveRequests from "./pages/admin/LeaveRequests";
import Payroll from "./pages/admin/Payroll";
import EmployeeAttendance from "./pages/employee/EmployeeAttendance";
import EmployeeLeaves from "./pages/employee/EmployeeLeaves";
import EmployeeSalary from "./pages/employee/EmployeeSalary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/employees" element={<Employees />} />
            <Route path="/admin/attendance" element={<Attendance />} />
            <Route path="/admin/leaves" element={<LeaveRequests />} />
            <Route path="/admin/payroll" element={<Payroll />} />
            <Route path="/employee" element={<EmployeeDashboard />} />
            <Route path="/employee/attendance" element={<EmployeeAttendance />} />
            <Route path="/employee/leaves" element={<EmployeeLeaves />} />
            <Route path="/employee/salary" element={<EmployeeSalary />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
