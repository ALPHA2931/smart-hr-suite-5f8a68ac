// Authentication Page - Improved Prototype Version
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Loader2, Shield, User, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Auth() {
  const { signIn, signUp, loading } = useAuth();
  const { toast } = useToast();
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ email: '', password: '', fullName: '' });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn(signInData.email, signInData.password);
    if (!result.success) {
      toast({ title: 'Sign In Failed', description: result.error, variant: 'destructive' });
    } else {
      toast({ title: 'Welcome back!', description: 'Successfully signed in.' });
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signUp(signUpData.email, signUpData.password, signUpData.fullName);
    if (result.success) {
      toast({ title: 'Account Created', description: 'This is a prototype. Use demo credentials to sign in.' });
    }
  };

  const quickLogin = async (role: 'admin' | 'employee') => {
    const credentials = role === 'admin' 
      ? { email: 'admin@company.com', password: 'admin123' }
      : { email: 'employee@company.com', password: 'employee123' };
    
    setSignInData(credentials);
    const result = await signIn(credentials.email, credentials.password);
    if (result.success) {
      toast({ 
        title: `Welcome, ${role === 'admin' ? 'Admin' : 'Employee'}!`, 
        description: `Logged in as ${role}. Redirecting to dashboard...` 
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/10 p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-xl mb-4 animate-pulse">
            <Building2 className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">HR Management</h1>
          <p className="text-muted-foreground mt-2 text-lg">Prototype Demo System</p>
        </div>

        {/* Quick Access Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center gap-2 border-2 hover:border-primary hover:bg-primary/5 transition-all"
            onClick={() => quickLogin('admin')}
            disabled={loading}
          >
            <Shield className="h-8 w-8 text-primary" />
            <span className="font-semibold">Admin Access</span>
            <span className="text-xs text-muted-foreground">Full system control</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center gap-2 border-2 hover:border-accent-foreground hover:bg-accent/50 transition-all"
            onClick={() => quickLogin('employee')}
            disabled={loading}
          >
            <User className="h-8 w-8 text-accent-foreground" />
            <span className="font-semibold">Employee Access</span>
            <span className="text-xs text-muted-foreground">Personal dashboard</span>
          </Button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or sign in manually</span>
          </div>
        </div>

        <Card className="border-0 shadow-2xl">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Sign in to access your dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@company.com"
                      value={signInData.email}
                      onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={signInData.password}
                      onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ArrowRight className="h-4 w-4 mr-2" />}
                    Sign In
                  </Button>
                </form>

                {/* Demo Credentials */}
                <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="text-sm font-semibold mb-3 text-foreground">Demo Credentials:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-background rounded border border-border">
                      <Shield className="h-4 w-4 text-primary" />
                      <div className="text-xs">
                        <p className="font-medium">Admin:</p>
                        <p className="text-muted-foreground">admin@company.com / admin123</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-background rounded border border-border">
                      <User className="h-4 w-4 text-accent-foreground" />
                      <div className="text-xs">
                        <p className="font-medium">Employee:</p>
                        <p className="text-muted-foreground">employee@company.com / employee123</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </TabsContent>

            <TabsContent value="signup">
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Sign up for a new account (prototype)</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={signUpData.fullName}
                      onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupEmail">Email</Label>
                    <Input
                      id="signupEmail"
                      type="email"
                      placeholder="john@company.com"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupPassword">Password</Label>
                    <Input
                      id="signupPassword"
                      type="password"
                      placeholder="••••••••"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                      required
                      minLength={6}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Create Account
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  This is a prototype. Use the quick access buttons above to explore.
                </p>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Mini HR Management System • Prototype Demo
        </p>
      </div>
    </div>
  );
}