import { Check, Clock, X, AlertCircle } from 'lucide-react';
import type { WorkflowStep } from '@/config/workflows';

interface WorkflowProgressProps {
  steps: WorkflowStep[];
}

export default function WorkflowProgress({ steps }: WorkflowProgressProps) {
  const getStepIcon = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return <Check className="h-4 w-4 text-success" />;
      case 'in_review':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'rejected':
        return <X className="h-4 w-4 text-destructive" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStepColor = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return 'bg-success';
      case 'in_review':
        return 'bg-warning';
      case 'rejected':
        return 'bg-destructive';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className={`flex items-center justify-center h-8 w-8 rounded-full border-2 ${
              step.status === 'pending' ? 'border-muted bg-background' : 'border-transparent ' + getStepColor(step.status)
            }`}>
              {getStepIcon(step.status)}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-0.5 h-8 mt-1 ${getStepColor(step.status)}`} />
            )}
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-center justify-between">
              <p className="font-medium text-sm">{step.label}</p>
              {step.completedAt && (
                <span className="text-xs text-muted-foreground">{step.completedAt}</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{step.actor}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
