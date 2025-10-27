-- Create securities table
CREATE TABLE IF NOT EXISTS public.securities (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  instrument_code text NOT NULL UNIQUE,
  instrument_name text NOT NULL,
  isin text,
  type text NOT NULL,
  issuer text,
  face_value numeric(15,2),
  currency text NOT NULL DEFAULT 'USD',
  issue_date date,
  maturity_date date,
  rate numeric(10,4),
  rate_type text,
  term text,
  payment_frequency text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create accounts table
CREATE TABLE IF NOT EXISTS public.accounts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  account_code text NOT NULL UNIQUE,
  account_name text NOT NULL,
  account_type text NOT NULL,
  owner_code text NOT NULL,
  owner_name text NOT NULL,
  agent_code text,
  agent_name text,
  agent_type text,
  registration_date date,
  closing_date date,
  management_participant text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create balances table
CREATE TABLE IF NOT EXISTS public.balances (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  instrument_code text NOT NULL,
  account_code text NOT NULL,
  total_units numeric(15,2) NOT NULL DEFAULT 0,
  available_units numeric(15,2) NOT NULL DEFAULT 0,
  pledged_units numeric(15,2) NOT NULL DEFAULT 0,
  restricted_units numeric(15,2) NOT NULL DEFAULT 0,
  blocked_units numeric(15,2) NOT NULL DEFAULT 0,
  delivery_pending_units numeric(15,2) NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(instrument_code, account_code)
);

-- Enable RLS
ALTER TABLE public.securities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.balances ENABLE ROW LEVEL SECURITY;

-- RLS policies for securities (public read)
CREATE POLICY "Anyone can view securities"
ON public.securities
FOR SELECT
USING (true);

-- RLS policies for accounts (users can view their own)
CREATE POLICY "Users can view own accounts"
ON public.accounts
FOR SELECT
USING (true); -- For demo, making it public. In production, add proper user linking

-- RLS policies for balances (users can view their own)
CREATE POLICY "Users can view own balances"
ON public.balances
FOR SELECT
USING (true); -- For demo, making it public. In production, add proper user linking

-- Add triggers for updated_at
CREATE TRIGGER update_securities_updated_at
BEFORE UPDATE ON public.securities
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_accounts_updated_at
BEFORE UPDATE ON public.accounts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_balances_updated_at
BEFORE UPDATE ON public.balances
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial securities data
INSERT INTO public.securities (instrument_code, instrument_name, isin, type, issuer, face_value, currency, issue_date, maturity_date, rate, rate_type, term, payment_frequency)
VALUES 
  ('TESTBOND001', 'TESTBOND001', 'No', 'Treasury Bonds', 'CBBANKAB', 100000, 'USD', '2025-10-22', '2027-10-22', 5.0000, 'Actual/365 (Fixed)', '2y', 'SEM4'),
  ('TESTEQTY01', 'TESTEQTY01', 'No', 'Common shares', 'CBBANKAB', 1, 'USD', '2025-10-22', NULL, NULL, NULL, NULL, 'NONE'),
  ('TESTBOND002', 'TESTBOND002', 'No', 'Treasury Bonds', 'CBBANKAB', 100000, 'USD', '2025-10-22', '2027-10-22', 5.0000, 'Actual/365 (Fixed)', '2y', 'SEM4')
ON CONFLICT (instrument_code) DO NOTHING;

-- Insert initial accounts data
INSERT INTO public.accounts (account_code, account_name, account_type, owner_code, owner_name, agent_code, agent_name, agent_type, registration_date, management_participant)
VALUES 
  ('1100081CITI00', 'Kate depo 001-DEPO', 'DEPO', '1100081', 'Kate Smith', NULL, NULL, NULL, '2023-09-01', 'CITI BANK')
ON CONFLICT (account_code) DO NOTHING;

-- Insert initial balances data
INSERT INTO public.balances (instrument_code, account_code, total_units, available_units, pledged_units, restricted_units, blocked_units, delivery_pending_units)
VALUES 
  ('TESTBOND001', '1100081CITI00', 300, 300, 0, 0, 0, 0)
ON CONFLICT (instrument_code, account_code) DO NOTHING;

-- Insert initial auctions data
INSERT INTO public.auctions (reference, instrument, code, flex, instrument_code, status, status_name, start_date, close_date)
VALUES 
  ('2', 'TESTBOND001', 'TESTBOND001/MN1', 'No', 'AS', 'Closed', 'Done', '2025-10-22', '2025-10-22'),
  ('3', 'TESTBOND001', 'TESTBOND001/MN2', 'No', 'AO', 'Opened', 'Opened', '2025-10-22', '2025-10-22'),
  ('1', 'TESTBOND001', 'TESTBOND001/MN', 'No', 'AS', 'Closed', 'Done', '2025-10-22', '2025-10-22')
ON CONFLICT (reference) DO NOTHING;