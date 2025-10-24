import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import type { WorkflowScenario } from '@/config/workflows';

interface WorkflowCardProps {
  workflow: WorkflowScenario;
}

export default function WorkflowCard({ workflow }: WorkflowCardProps) {
  const Icon = Icons[workflow.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <Icon className="h-5 w-5 text-accent" />
            </div>
            <div>
              <CardTitle className="text-base">{workflow.title}</CardTitle>
              <CardDescription className="text-xs mt-1">
                {workflow.description}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button asChild variant="ghost" size="sm" className="w-full justify-between group">
          <Link to={workflow.route}>
            Start Workflow
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
