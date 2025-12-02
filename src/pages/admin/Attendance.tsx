// Attendance Management - Prototype with Mock Data
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockAttendance } from '@/data/mock';
import { Calendar, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function Attendance() {
  const { toast } = useToast();

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

  const handleMarkAttendance = () => {
    toast({ title: 'Prototype Demo', description: 'Attendance marking form would open here.' });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Attendance Management</h1>
            <p className="text-muted-foreground mt-2">Track daily employee attendance</p>
          </div>
          <Button className="gap-2" onClick={handleMarkAttendance}>
            <Calendar className="h-4 w-4" />
            Mark Attendance
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Today's Attendance - {new Date().toLocaleDateString()}</CardTitle>
          </CardHeader>
          <CardContent>
            {mockAttendance.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No attendance records for today yet.
              </div>
            ) : (
              <div className="space-y-4">
                {mockAttendance.map((record) => (
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
