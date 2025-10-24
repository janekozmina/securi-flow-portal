import { Badge } from '@/components/ui/badge';
import type { WorkflowStatus } from '@/config/workflows';

interface StatusBadgeProps {
  status: WorkflowStatus;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants: Record<WorkflowStatus, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string }> = {
    pending: { variant: 'secondary', label: 'Pending' },
    in_review: { variant: 'default', label: 'In Review' },
    approved: { variant: 'outline', label: 'Approved' },
    rejected: { variant: 'destructive', label: 'Rejected' },
    completed: { variant: 'outline', label: 'Completed' },
  };

  const config = variants[status];

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}
