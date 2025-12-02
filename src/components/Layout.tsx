import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Building2,
  Users,
  Calendar,
  FileText,
  DollarSign,
  LayoutDashboard,
  LogOut,
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { userRole, signOut } = useAuth();

  const navigation = userRole === 'admin'
    ? [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Employees', href: '/admin/employees', icon: Users },
        { name: 'Attendance', href: '/admin/attendance', icon: Calendar },
        { name: 'Leave Requests', href: '/admin/leaves', icon: FileText },
        { name: 'Payroll', href: '/admin/payroll', icon: DollarSign },
      ]
    : [
        { name: 'Dashboard', href: '/employee', icon: LayoutDashboard },
        { name: 'Attendance', href: '/employee/attendance', icon: Calendar },
        { name: 'Leave Requests', href: '/employee/leaves', icon: FileText },
        { name: 'Salary', href: '/employee/salary', icon: DollarSign },
      ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border shadow-lg">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-20 items-center gap-3 px-6 border-b border-sidebar-border/50">
            <div className="h-11 w-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">HR System</h1>
              <p className="text-xs text-sidebar-foreground/60 capitalize font-medium">{userRole}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-6">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-primary text-white shadow-lg scale-[1.02]'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground hover:scale-[1.02]'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Sign Out */}
          <div className="border-t border-sidebar-border/50 p-4">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground rounded-xl h-11 transition-all duration-200"
              onClick={signOut}
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pl-64">
        <div className="container mx-auto p-8 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
