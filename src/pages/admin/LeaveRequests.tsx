// Leave Requests Management - Prototype with Mock Data
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockLeaveRequests, MockLeaveRequest } from '@/data/mock';
import { FileText, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function LeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState<MockLeaveRequest[]>(mockLeaveRequests);
  const { toast } = useToast();

  const updateLeaveStatus = (id: string, status: 'approved' | 'rejected') => {
    setLeaveRequests(prev =>
      prev.map(req => (req.id === id ? { ...req, status } : req))
    );
    toast({
      title: 'Success',
      description: `Leave request ${status} successfully`,
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      pending: 'bg-warning',
      approved: 'bg-success',
      rejected: 'bg-destructive',
    };
    return <Badge className={variants[status]}>{status}</Badge>;
  };

  const calculateDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return days;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Leave Requests</h1>
          <p className="text-muted-foreground mt-2">Review and manage employee leave requests</p>
        </div>

        <div className="grid gap-6">
          {leaveRequests.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No leave requests yet.
              </CardContent>
            </Card>
          ) : (
            leaveRequests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {request.employees?.profiles?.full_name || 'Unknown Employee'}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {request.employees?.position} • ID: {request.employees?.employee_id}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(request.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Leave Type</p>
                      <p className="font-medium capitalize">{request.leave_type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">
                        {calculateDays(request.start_date, request.end_date)} days
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="font-medium">
                        {new Date(request.start_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">End Date</p>
                      <p className="font-medium">
                        {new Date(request.end_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Reason</p>
                    <p className="text-sm">{request.reason}</p>
                  </div>
                  {request.status === 'pending' && (
                    <div className="flex gap-3 pt-2">
                      <Button
                        className="gap-2 bg-success hover:bg-success/90"
                        onClick={() => updateLeaveStatus(request.id, 'approved')}
                      >
                        <Check className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        className="gap-2"
                        onClick={() => updateLeaveStatus(request.id, 'rejected')}
                      >
                        <X className="h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground pt-2 border-t">
                    Requested on {new Date(request.created_at).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
