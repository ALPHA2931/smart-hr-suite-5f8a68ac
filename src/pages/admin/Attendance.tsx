import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Attendance() {
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetchTodayAttendance();
  }, []);

  const fetchTodayAttendance = async () => {
    try {
      const { data, error } = await supabase
        .from('attendance')
        .select('*, employees(employee_id, position, profiles(full_name))')
        .eq('date', today)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAttendanceRecords(data || []);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case 'absent':
        return <XCircle className="h-5 w-5 text-destructive" />;
      case 'late':
        return <AlertCircle className="h-5 w-5 text-warning" />;
      case 'half_day':
        return <Clock className="h-5 w-5 text-warning" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      present: 'bg-success',
      absent: 'bg-destructive',
      late: 'bg-warning',
      half_day: 'bg-warning',
    };
    return <Badge className={variants[status]}>{status.replace('_', ' ')}</Badge>;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Attendance Management</h1>
            <p className="text-muted-foreground mt-2">Track daily employee attendance</p>
          </div>
          <Button className="gap-2">
            <Calendar className="h-4 w-4" />
            Mark Attendance
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Today's Attendance - {new Date().toLocaleDateString()}</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : attendanceRecords.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No attendance records for today yet.
              </div>
            ) : (
              <div className="space-y-4">
                {attendanceRecords.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        {getStatusIcon(record.status)}
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {record.employees?.profiles?.full_name || 'Unknown Employee'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {record.employees?.position} • ID: {record.employees?.employee_id}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      {record.check_in_time && (
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Check-in</p>
                          <p className="font-medium">{record.check_in_time}</p>
                        </div>
                      )}
                      {record.check_out_time && (
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Check-out</p>
                          <p className="font-medium">{record.check_out_time}</p>
                        </div>
                      )}
                      {getStatusBadge(record.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
