// Payroll Management - Prototype with Mock Data
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockEmployees } from '@/data/mock';
import { DollarSign, Users, TrendingUp } from 'lucide-react';

export default function Payroll() {
  const employees = mockEmployees;
  const totalPayroll = employees.reduce((sum, emp) => sum + Number(emp.salary), 0);
  const avgSalary = employees.length ? totalPayroll / employees.length : 0;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Payroll Management</h1>
          <p className="text-muted-foreground">Manage employee compensation and salary</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalPayroll.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Monthly total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${Math.round(avgSalary).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Per employee</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employees.length}</div>
              <p className="text-xs text-muted-foreground">Active employees</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Employee Salaries</CardTitle>
            <CardDescription>Overview of all employee compensation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employees.map((employee) => (
                <div
                  key={employee.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0"
                >
                  <div>
                    <p className="font-medium">{employee.profiles?.full_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {employee.position} • {employee.departments?.name || 'No Department'}
                    </p>
                    <p className="text-xs text-muted-foreground">ID: {employee.employee_id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">${Number(employee.salary).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">per month</p>
                  </div>
                </div>
              ))}
              {!employees.length && (
                <p className="text-center text-muted-foreground py-8">No employees found</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
