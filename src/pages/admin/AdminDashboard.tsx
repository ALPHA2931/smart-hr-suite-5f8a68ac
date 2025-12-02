// Admin Dashboard - Prototype with Mock Data
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockAdminStats } from '@/data/mock';
import { Users, Calendar, FileText, DollarSign, TrendingUp, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const stats = mockAdminStats;

  const statCards = [
    {
      title: 'Total Employees',
      value: stats.totalEmployees,
      description: 'Active employees',
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Present Today',
      value: stats.presentToday,
      description: 'Out of ' + stats.totalEmployees,
      icon: Calendar,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Pending Leaves',
      value: stats.pendingLeaves,
      description: 'Awaiting approval',
      icon: FileText,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      title: 'Monthly Payroll',
      value: `$${stats.totalSalary.toLocaleString()}`,
      description: 'Total salary expense',
      icon: DollarSign,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ];

  const recentActivity = [
    { action: 'New employee onboarded', time: '2 hours ago', icon: Users },
    { action: 'Leave request approved', time: '4 hours ago', icon: FileText },
    { action: 'Attendance marked', time: '5 hours ago', icon: Clock },
    { action: 'Payroll processed', time: 'Yesterday', icon: DollarSign },
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="bg-gradient-primary rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-white/90">Welcome back! Here's what's happening today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <Card key={stat.title} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.bgColor} h-10 w-10 rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest updates in the system</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <activity.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-success/5 to-transparent">
              <CardTitle className="text-xl">Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-6">
              <button className="w-full text-left p-4 rounded-xl border border-border hover:bg-accent/10 hover:border-primary/50 transition-all duration-200 hover:scale-[1.02]">
                <div className="font-semibold mb-1">Add New Employee</div>
                <div className="text-sm text-muted-foreground">Onboard a new team member</div>
              </button>
              <button className="w-full text-left p-4 rounded-xl border border-border hover:bg-accent/10 hover:border-primary/50 transition-all duration-200 hover:scale-[1.02]">
                <div className="font-semibold mb-1">Mark Attendance</div>
                <div className="text-sm text-muted-foreground">Record today's attendance</div>
              </button>
              <button className="w-full text-left p-4 rounded-xl border border-border hover:bg-accent/10 hover:border-primary/50 transition-all duration-200 hover:scale-[1.02]">
                <div className="font-semibold mb-1">Review Leave Requests</div>
                <div className="text-sm text-muted-foreground">Approve or reject pending leaves</div>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
