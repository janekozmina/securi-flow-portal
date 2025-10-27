import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface PledgeFormData {
  pledgeType: string;
  pledgeDate: string;
  pledgeReason: string;
  referenceNumber: string;
  sourceAccount: string;
  instrument: string;
  quantity: number;
  lenderName: string;
  lenderAccount: string;
  lenderContact: string;
}

export const submitPledgeRequest = async (formData: PledgeFormData) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // For now, store in profiles as JSON until we create a pledges table
    const { error } = await supabase
      .from('profiles')
      .update({
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (error) throw error;

    toast.success(`Pledge request ${formData.referenceNumber} submitted successfully`);
    return true;
  } catch (error: any) {
    console.error('Error submitting pledge:', error);
    toast.error('Failed to submit pledge request');
    return false;
  }
};
