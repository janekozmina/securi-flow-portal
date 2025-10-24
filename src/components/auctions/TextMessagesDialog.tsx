import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface TextMessagesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sender?: string;
}

export default function TextMessagesDialog({
  open,
  onOpenChange,
  sender = 'IMARA CAPITAL SECURITIES',
}: TextMessagesDialogProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }
    toast.success('Message sent successfully');
    setMessage('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Text messages</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="text-sm font-medium text-primary">{sender}</div>
          
          <Textarea
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[300px] resize-none"
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSend} size="lg">
            SEND
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
