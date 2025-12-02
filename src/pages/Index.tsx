// Landing Page - Redirect to appropriate dashboard or auth
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Building2 } from 'lucide-react';

export default function Index() {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && userRole) {
      navigate(userRole === 'admin' ? '/admin' : '/employee');
    } else {
      navigate('/auth');
    }
  }, [user, userRole, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-xl animate-pulse">
          <Building2 className="h-8 w-8 text-white" />
        </div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
