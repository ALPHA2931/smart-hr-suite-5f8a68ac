// Employee Attendance - Prototype with Mock Data
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { generateEmployeeAttendance } from '@/data/mock';
import { format } from 'date-fns';
import { Clock, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function EmployeeAttendance() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [attendance, setAttendance] = useState(generateEmployeeAttendance('1'));
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  const handleCheckIn = () => {
    const now = format(new Date(), 'HH:mm:ss');
    setCheckInTime(now);
    setCheckedIn(true);
    toast({ title: 'Checked in successfully', description: `Check-in time: ${now}` });
  };

  const handleCheckOut = () => {
    const now = format(new Date(), 'HH:mm:ss');
    toast({ title: 'Checked out successfully', description: `Check-out time: ${now}` });
  };

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
              {!checkedIn ? (
                <Button onClick={handleCheckIn} className="w-full">
                  <Clock className="mr-2 h-4 w-4" />
                  Check In
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span>Checked in at {checkInTime}</span>
                  </div>
                  <Button onClick={handleCheckOut} variant="outline" className="w-full">
                    <Clock className="mr-2 h-4 w-4" />
                    Check Out
                  </Button>
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
              {attendance.map((record) => (
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
