import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Check, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface DocumentStatus {
  national_id_front: File | null;
  national_id_back: File | null;
  proof_of_residence: File | null;
  passport_photo: File | null;
}

interface Step3DocumentsProps {
  onNext: () => void;
  onBack: () => void;
}

export default function Step3Documents({ onNext, onBack }: Step3DocumentsProps) {
  const [documents, setDocuments] = useState<DocumentStatus>({
    national_id_front: null,
    national_id_back: null,
    proof_of_residence: null,
    passport_photo: null,
  });
  const [uploading, setUploading] = useState(false);

  const documentTypes = [
    { key: 'national_id_front' as keyof DocumentStatus, label: 'National ID (Front)', required: true },
    { key: 'national_id_back' as keyof DocumentStatus, label: 'National ID (Back)', required: true },
    { key: 'proof_of_residence' as keyof DocumentStatus, label: 'Proof of Residence', required: true },
    { key: 'passport_photo' as keyof DocumentStatus, label: 'Passport Photo', required: true },
  ];

  const handleFileSelect = async (type: keyof DocumentStatus, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPG, PNG, and PDF files are allowed');
      return;
    }

    setDocuments(prev => ({ ...prev, [type]: file }));
  };

  const uploadDocuments = async () => {
    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      for (const [type, file] of Object.entries(documents)) {
        if (file) {
          const fileExt = file.name.split('.').pop();
          const filePath = `${user.id}/${type}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from('kyc-documents')
            .upload(filePath, file, { upsert: true });

          if (uploadError) throw uploadError;

          const { error: dbError } = await supabase
            .from('kyc_documents')
            .insert({
              user_id: user.id,
              document_type: type,
              file_name: file.name,
              file_path: filePath,
              file_size: file.size,
            });

          if (dbError) throw dbError;
        }
      }

      toast.success('Documents uploaded successfully');
      onNext();
    } catch (error: any) {
      console.error('Error uploading documents:', error);
      toast.error(error.message || 'Failed to upload documents');
    } finally {
      setUploading(false);
    }
  };

  const allRequiredUploaded = documentTypes
    .filter(doc => doc.required)
    .every(doc => documents[doc.key] !== null);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Upload Required Documents</CardTitle>
          <CardDescription>Upload clear, legible copies of your identification documents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {documentTypes.map((doc) => (
            <div key={doc.key}>
              <input
                type="file"
                id={doc.key}
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => handleFileSelect(doc.key, e)}
              />
              <label htmlFor={doc.key}>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start"
                  size="lg"
                  asChild
                >
                  <div className="flex items-center gap-3 cursor-pointer">
                    {documents[doc.key] ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : (
                      <Upload className="h-5 w-5" />
                    )}
                    <div className="flex-1 text-left">
                      <div className="font-medium">
                        {doc.label} {doc.required && '*'}
                      </div>
                      {documents[doc.key] && (
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {documents[doc.key]!.name}
                        </div>
                      )}
                    </div>
                  </div>
                </Button>
              </label>
            </div>
          ))}
          <p className="text-xs text-muted-foreground mt-4">
            * Required documents • Maximum file size: 5MB • Accepted formats: JPG, PNG, PDF
          </p>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1" size="lg" disabled={uploading}>
          Back
        </Button>
        <Button
          onClick={uploadDocuments}
          className="flex-1"
          size="lg"
          disabled={!allRequiredUploaded || uploading}
        >
          {uploading ? 'Uploading...' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}