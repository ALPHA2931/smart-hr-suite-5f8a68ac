// Authentication Context - Prototype Version with Mock Data
import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockEmployees } from '@/data/mock';

interface MockUser {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: MockUser | null;
  userRole: 'admin' | 'employee' | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for prototype
const mockUsers = {
  admin: { id: 'admin-1', email: 'admin@company.com', name: 'Admin User' },
  employee: { id: 'user-1', email: 'john.smith@company.com', name: 'John Smith' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'employee' | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock authentication logic
    if (email === 'admin@company.com' && password === 'admin123') {
      setUser(mockUsers.admin);
      setUserRole('admin');
      setLoading(false);
      navigate('/admin');
      return { success: true };
    } else if (email === 'employee@company.com' && password === 'employee123') {
      setUser(mockUsers.employee);
      setUserRole('employee');
      setLoading(false);
      navigate('/employee');
      return { success: true };
    }
    
    setLoading(false);
    return { success: false, error: 'Invalid credentials. Try admin@company.com / admin123 or employee@company.com / employee123' };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setLoading(false);
    
    // For prototype, just show success message
    return { success: true };
  };

  const signOut = async () => {
    setUser(null);
    setUserRole(null);
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper to get current employee data
export function useCurrentEmployee() {
  const { user } = useAuth();
  return mockEmployees.find(emp => emp.user_id === user?.id) || mockEmployees[0];
}
