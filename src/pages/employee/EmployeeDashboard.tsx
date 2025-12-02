import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, FileText, DollarSign, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const [employeeData, setEmployeeData] = useState<any>(null);
  const [stats, setStats] = useState({
    presentDays: 0,
    pendingLeaves: 0,
    approvedLeaves: 0,
    salary: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchEmployeeData();
      fetchEmployeeStats();
    }
  }, [user]);

  const fetchEmployeeData = async () => {
    try {
      const { data } = await supabase
        .from('employees')
        .select('*, profiles(*), departments(*)')
        .eq('user_id', user?.id)
        .single();

      setEmployeeData(data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const fetchEmployeeStats = async () => {
    try {
      // Get employee ID
      const { data: empData } = await supabase
        .from('employees')
        .select('id, salary')
        .eq('user_id', user?.id)
        .single();

      if (!empData) return;

      // Get present days this month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      const { count: presentCount } = await supabase
        .from('attendance')
        .select('*', { count: 'exact', head: true })
        .eq('employee_id', empData.id)
        .eq('status', 'present')
        .gte('date', startOfMonth.toISOString().split('T')[0]);

      // Get leave statistics
      const { count: pendingCount } = await supabase
        .from('leave_requests')
        .select('*', { count: 'exact', head: true })
        .eq('employee_id', empData.id)
        .eq('status', 'pending');

      const { count: approvedCount } = await supabase
        .from('leave_requests')
        .select('*', { count: 'exact', head: true })
        .eq('employee_id', empData.id)
        .eq('status', 'approved');

      setStats({
        presentDays: presentCount || 0,
        pendingLeaves: pendingCount || 0,
        approvedLeaves: approvedCount || 0,
        salary: Number(empData.salary),
      });
    } catch (error) {
      console.error('Error fetching employee stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Present This Month',
      value: stats.presentDays,
      description: 'Days attended',
      icon: Calendar,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Pending Leaves',
      value: stats.pendingLeaves,
      description: 'Awaiting approval',
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      title: 'Approved Leaves',
      value: stats.approvedLeaves,
      description: 'This year',
      icon: CheckCircle2,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Monthly Salary',
      value: `$${stats.salary.toLocaleString()}`,
      description: 'Current salary',
      icon: DollarSign,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="bg-gradient-primary rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {employeeData?.profiles?.full_name || 'Employee'}!
          </h1>
          <p className="text-white/90 text-lg">Here's your overview for today</p>
        </div>

        {/* Employee Info Card */}
        {employeeData && (
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
              <CardTitle className="text-xl">Your Profile</CardTitle>
              <CardDescription>Employee information</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4 pt-6">
              <div>
                <p className="text-sm text-muted-foreground">Employee ID</p>
                <p className="font-semibold">{employeeData.employee_id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Position</p>
                <p className="font-semibold">{employeeData.position}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <p className="font-semibold">{employeeData.departments?.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold">{employeeData.profiles?.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Joining Date</p>
                <p className="font-semibold">
                  {new Date(employeeData.date_of_joining).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className="bg-success">Active</Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <Card key={stat.title} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.bgColor} h-10 w-10 rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {loading ? '...' : stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-success/5 to-transparent">
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4 pt-6">
            <button className="text-left p-4 rounded-xl border border-border hover:bg-accent/10 hover:border-primary/50 transition-all duration-200 hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="h-5 w-5 text-primary" />
                <div className="font-semibold">Request Leave</div>
              </div>
              <div className="text-sm text-muted-foreground">Submit a new leave request</div>
            </button>
            <button className="text-left p-4 rounded-xl border border-border hover:bg-accent/10 hover:border-primary/50 transition-all duration-200 hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="h-5 w-5 text-success" />
                <div className="font-semibold">View Attendance</div>
              </div>
              <div className="text-sm text-muted-foreground">Check your attendance history</div>
            </button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
