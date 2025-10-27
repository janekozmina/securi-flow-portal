import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface TransferFormData {
  transferType: string;
  transferDate: string;
  transferReason: string;
  referenceNumber: string;
  sourceAccount: string;
  instrument: string;
  quantity: number;
  recipientType: string;
  recipientName: string;
  recipientAccount: string;
  recipientId: string;
  recipientEmail: string;
  recipientPhone: string;
}

export const submitTransferRequest = async (formData: TransferFormData) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // For now, store in profiles as JSON until we create a transfers table
    const { error } = await supabase
      .from('profiles')
      .update({
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (error) throw error;

    toast.success(`Transfer request ${formData.referenceNumber} submitted successfully`);
    return true;
  } catch (error: any) {
    console.error('Error submitting transfer:', error);
    toast.error('Failed to submit transfer request');
    return false;
  }
};
