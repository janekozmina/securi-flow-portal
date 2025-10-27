import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import StepIndicator from '@/components/onboarding/StepIndicator';
import Step1AccountType from '@/components/onboarding/Step1AccountType';
import Step2PersonalInfo from '@/components/onboarding/Step2PersonalInfo';
import Step2_5SMSOtp from '@/components/onboarding/Step2_5SMSOtp';
import Step3Documents from '@/components/onboarding/Step3Documents';
import Step4Review from '@/components/onboarding/Step4Review';

export default function AccountOpening() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [accountType, setAccountType] = useState<'individual' | 'institutional'>('individual');
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    govIdNumber: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    address: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Save profile
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: personalInfo.fullName,
          phone: personalInfo.phone,
          date_of_birth: personalInfo.dateOfBirth,
          gender: personalInfo.gender,
          address: personalInfo.address,
          gov_id_number: personalInfo.govIdNumber,
        });

      if (profileError) throw profileError;

      // Update onboarding status
      const { error: statusError } = await supabase
        .from('onboarding_status')
        .update({
          account_type: accountType,
          is_completed: true,
          current_step: 5,
        })
        .eq('user_id', user.id);

      if (statusError) throw statusError;

      toast.success('Application submitted successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast.error(error.message || 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-primary text-primary-foreground px-4 pt-6 pb-6">
        <div className="max-w-2xl mx-auto">
          <Link to="/login" className="inline-flex items-center gap-2 mb-3 opacity-90 hover:opacity-100">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </Link>
          <h1 className="text-2xl font-bold mb-1">Account Opening</h1>
          <p className="text-sm opacity-90">Complete your investor account setup</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <StepIndicator currentStep={currentStep} totalSteps={5} />

        {currentStep === 1 && (
          <Step1AccountType
            accountType={accountType}
            setAccountType={setAccountType}
            onNext={handleNext}
          />
        )}

        {currentStep === 2 && (
          <Step2PersonalInfo
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && (
          <Step2_5SMSOtp
            phoneNumber={personalInfo.phone}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 4 && (
          <Step3Documents onNext={handleNext} onBack={handleBack} />
        )}

        {currentStep === 5 && (
          <Step4Review
            onSubmit={handleSubmit}
            onBack={handleBack}
            submitting={submitting}
          />
        )}
      </main>
    </div>
  );
}
