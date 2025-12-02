// Employees Management - Prototype with Mock Data
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockEmployees } from '@/data/mock';
import { Plus, Search, Mail, Calendar, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function Employees() {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredEmployees = mockEmployees.filter((emp) =>
    emp.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.employee_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = () => {
    toast({ title: 'Prototype Demo', description: 'Add employee form would open here.' });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Employees</h1>
            <p className="text-muted-foreground mt-2">Manage your workforce</p>
          </div>
          <Button className="gap-2" onClick={handleAddEmployee}>
            <Plus className="h-4 w-4" />
            Add Employee
          </Button>
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID, or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Employee List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEmployees.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              {searchTerm ? 'No employees found matching your search.' : 'No employees yet.'}
            </div>
          ) : (
            filteredEmployees.map((employee) => (
              <Card key={employee.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">
                          {employee.profiles?.full_name?.charAt(0) || '?'}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {employee.profiles?.full_name || 'Unknown'}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{employee.position}</p>
                      </div>
                    </div>
                    <Badge className="bg-success">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <span className="truncate">{employee.profiles?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <span>Joined {new Date(employee.date_of_joining).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <span>${Number(employee.salary).toLocaleString()}/month</span>
                  </div>
                  <div className="pt-3 border-t">
                    <span className="text-xs text-muted-foreground">ID: {employee.employee_id}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
