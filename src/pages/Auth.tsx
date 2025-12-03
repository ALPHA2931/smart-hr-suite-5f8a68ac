// Authentication Page - Enhanced Prototype Version
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Loader2, Shield, User, ArrowRight, Sparkles, Lock, Mail, UserPlus } from 'lucide-react';
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/20 p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-8 animate-fade-in">
          <div className="relative mb-6">
            <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-primary via-primary to-primary/80 flex items-center justify-center shadow-2xl">
              <Building2 className="h-12 w-12 text-primary-foreground" />
            </div>
            <div className="absolute -top-2 -right-2 h-8 w-8 bg-accent rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="h-4 w-4 text-accent-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground tracking-tight">HR Management</h1>
          <p className="text-muted-foreground mt-2 text-lg">Workforce Administration System</p>
          <div className="flex items-center gap-2 mt-3 px-4 py-1.5 bg-primary/10 rounded-full">
            <span className="h-2 w-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary">Prototype Demo</span>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => quickLogin('admin')}
            disabled={loading}
            className="group relative overflow-hidden rounded-2xl bg-card border-2 border-transparent hover:border-primary p-6 text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1 disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-lg mb-1">Admin Access</h3>
              <p className="text-sm text-muted-foreground">Full system control & management</p>
              <ArrowRight className="h-5 w-5 text-primary mt-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-0 group-hover:translate-x-1" />
            </div>
          </button>

          <button
            onClick={() => quickLogin('employee')}
            disabled={loading}
            className="group relative overflow-hidden rounded-2xl bg-card border-2 border-transparent hover:border-accent-foreground p-6 text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1 disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="h-14 w-14 rounded-2xl bg-accent flex items-center justify-center mb-4 group-hover:bg-accent/80 transition-colors">
                <User className="h-7 w-7 text-accent-foreground" />
              </div>
              <h3 className="font-bold text-foreground text-lg mb-1">Employee Access</h3>
              <p className="text-sm text-muted-foreground">Personal dashboard & requests</p>
              <ArrowRight className="h-5 w-5 text-accent-foreground mt-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-0 group-hover:translate-x-1" />
            </div>
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-sm text-muted-foreground">Or continue with email</span>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50">
              <TabsTrigger value="signin" className="data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg">
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="mt-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Welcome Back</CardTitle>
                <CardDescription>Enter your credentials to access your dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@company.com"
                        className="pl-10 h-12 rounded-xl"
                        value={signInData.email}
                        onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 h-12 rounded-xl"
                        value={signInData.password}
                        onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold" disabled={loading}>
                    {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <ArrowRight className="h-5 w-5 mr-2" />}
                    Sign In
                  </Button>
                </form>

                {/* Demo Credentials */}
                <div className="mt-6 p-4 bg-muted/30 rounded-xl border border-border/50">
                  <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Demo Credentials
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-card rounded-lg border border-border">
                      <div className="flex items-center gap-2 mb-1">
                        <Shield className="h-3.5 w-3.5 text-primary" />
                        <span className="text-xs font-bold text-foreground">Admin</span>
                      </div>
                      <p className="text-xs text-muted-foreground">admin@company.com</p>
                      <p className="text-xs text-muted-foreground">admin123</p>
                    </div>
                    <div className="p-3 bg-card rounded-lg border border-border">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="h-3.5 w-3.5 text-accent-foreground" />
                        <span className="text-xs font-bold text-foreground">Employee</span>
                      </div>
                      <p className="text-xs text-muted-foreground">employee@company.com</p>
                      <p className="text-xs text-muted-foreground">employee123</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </TabsContent>

            <TabsContent value="signup" className="mt-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Create Account</CardTitle>
                <CardDescription>Sign up to get started (prototype mode)</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        className="pl-10 h-12 rounded-xl"
                        value={signUpData.fullName}
                        onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupEmail" className="text-sm font-medium">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signupEmail"
                        type="email"
                        placeholder="john@company.com"
                        className="pl-10 h-12 rounded-xl"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupPassword" className="text-sm font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signupPassword"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 h-12 rounded-xl"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold" disabled={loading}>
                    {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <UserPlus className="h-5 w-5 mr-2" />}
                    Create Account
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-4 text-center bg-muted/30 p-3 rounded-lg">
                  This is a prototype demo. Use the quick access buttons above to explore the system.
                </p>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          HR Management System • Interactive Prototype
        </p>
      </div>
    </div>
  );
}
