import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';
import { format } from 'date-fns';
import { Clock, CheckCircle2 } from 'lucide-react';

export default function EmployeeAttendance() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const { data: employee } = useQuery({
    queryKey: ['employee', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('user_id', user?.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: attendance } = useQuery({
    queryKey: ['attendance', employee?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('attendance')
        .select('*')
        .eq('employee_id', employee?.id)
        .order('date', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!employee,
  });

  const checkInMutation = useMutation({
    mutationFn: async () => {
      const today = format(new Date(), 'yyyy-MM-dd');
      const now = format(new Date(), 'HH:mm:ss');

      const { error } = await supabase.from('attendance').insert({
        employee_id: employee!.id,
        date: today,
        check_in_time: now,
        status: 'present',
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      toast({ title: 'Checked in successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to check in', variant: 'destructive' });
    },
  });

  const checkOutMutation = useMutation({
    mutationFn: async (attendanceId: string) => {
      const now = format(new Date(), 'HH:mm:ss');

      const { error } = await supabase
        .from('attendance')
        .update({ check_out_time: now })
        .eq('id', attendanceId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      toast({ title: 'Checked out successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to check out', variant: 'destructive' });
    },
  });

  const todayAttendance = attendance?.find(
    (a) => a.date === format(new Date(), 'yyyy-MM-dd')
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Attendance</h1>
          <p className="text-muted-foreground">Track your attendance and work hours</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Today's Attendance</CardTitle>
              <CardDescription>Mark your check-in and check-out</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!todayAttendance ? (
                <Button
                  onClick={() => checkInMutation.mutate()}
                  disabled={checkInMutation.isPending}
                  className="w-full"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Check In
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>Checked in at {todayAttendance.check_in_time}</span>
                  </div>
                  {!todayAttendance.check_out_time ? (
                    <Button
                      onClick={() => checkOutMutation.mutate(todayAttendance.id)}
                      disabled={checkOutMutation.isPending}
                      variant="outline"
                      className="w-full"
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      Check Out
                    </Button>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      Checked out at {todayAttendance.check_out_time}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>View your attendance history</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Attendance History</CardTitle>
            <CardDescription>Your recent attendance records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendance?.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0"
                >
                  <div>
                    <p className="font-medium">{format(new Date(record.date), 'MMMM d, yyyy')}</p>
                    <p className="text-sm text-muted-foreground">
                      {record.check_in_time} - {record.check_out_time || 'Not checked out'}
                    </p>
                  </div>
                  <div
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      record.status === 'present'
                        ? 'bg-green-100 text-green-800'
                        : record.status === 'late'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {record.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
