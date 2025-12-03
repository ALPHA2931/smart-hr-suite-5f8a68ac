// Layout Component - Enhanced main app layout with sidebar navigation
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
  ChevronRight,
  Sparkles,
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border shadow-2xl">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-24 items-center gap-4 px-6 border-b border-sidebar-border/30 bg-sidebar-accent/30">
            <div className="relative">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 flex items-center justify-center shadow-xl">
                <Building2 className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 h-5 w-5 bg-success rounded-full flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-success-foreground" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-sidebar-foreground tracking-tight">HR System</h1>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 bg-success rounded-full animate-pulse" />
                <p className="text-xs text-sidebar-foreground/60 capitalize font-semibold">{userRole} Panel</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 px-4 py-6 overflow-y-auto">
            <p className="text-xs font-bold text-sidebar-foreground/40 uppercase tracking-wider px-4 mb-4">Navigation</p>
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-sidebar-border/30 p-4 bg-sidebar-accent/20">
            <div className="px-4 py-3 bg-sidebar-accent/50 rounded-xl mb-4">
              <p className="text-xs text-sidebar-foreground/60 mb-1">Logged in as</p>
              <p className="text-sm font-semibold text-sidebar-foreground capitalize">{userRole} User</p>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive rounded-xl h-12 transition-all duration-200"
              onClick={signOut}
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pl-72">
        <div className="min-h-screen">
          <div className="container mx-auto p-8 max-w-7xl animate-fade-in">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
