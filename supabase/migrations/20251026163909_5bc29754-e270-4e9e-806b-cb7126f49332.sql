-- Create auctions table
CREATE TABLE public.auctions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reference text NOT NULL UNIQUE,
  instrument text NOT NULL,
  code text NOT NULL,
  flex text NOT NULL DEFAULT 'No',
  instrument_code text NOT NULL DEFAULT 'AO',
  status text NOT NULL DEFAULT 'Opened',
  status_name text NOT NULL DEFAULT 'Opened',
  recommended_price decimal,
  start_date date NOT NULL,
  close_date date NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.auctions ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view auctions (public data)
CREATE POLICY "Anyone can view auctions"
ON public.auctions
FOR SELECT
USING (true);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_auctions_updated_at
BEFORE UPDATE ON public.auctions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.auctions;

-- Create function to generate random auction data
CREATE OR REPLACE FUNCTION public.generate_live_auction_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_reference text;
  v_instrument text;
  v_start_date date;
  v_close_date date;
  instruments text[] := ARRAY['AU000224552', 'BW000000124', 'US912828Z', 'GB00B', 'DE0001102'];
BEGIN
  -- Generate new auction with 30% probability
  IF random() < 0.3 THEN
    v_reference := 'AUC' || LPAD(floor(random() * 999999)::text, 6, '0');
    v_instrument := instruments[floor(random() * array_length(instruments, 1) + 1)];
    v_start_date := CURRENT_DATE + (floor(random() * 7)::int);
    v_close_date := v_start_date + (floor(random() * 3 + 1)::int);
    
    INSERT INTO public.auctions (
      reference, 
      instrument, 
      code, 
      flex,
      instrument_code,
      status,
      status_name,
      start_date,
      close_date
    ) VALUES (
      v_reference,
      v_instrument,
      v_instrument || '/MN',
      CASE WHEN random() < 0.2 THEN 'Yes' ELSE 'No' END,
      'AO',
      'Opened',
      'Opened',
      v_start_date,
      v_close_date
    )
    ON CONFLICT (reference) DO NOTHING;
  END IF;
  
  -- Update status of closed auctions (close_date has passed)
  UPDATE public.auctions
  SET status = 'Closed',
      status_name = 'Closed'
  WHERE close_date < CURRENT_DATE
    AND status = 'Opened';
    
  -- Update some open auctions' recommended prices
  UPDATE public.auctions
  SET recommended_price = 95 + (random() * 10)::decimal(10,2)
  WHERE status = 'Opened'
    AND random() < 0.4;
END;
$$;

-- Insert initial auction data
INSERT INTO public.auctions (reference, instrument, code, flex, instrument_code, status, status_name, start_date, close_date) VALUES
('1', 'AU000224552', 'AU000224552/MN', 'No', 'AO', 'Opened', 'Opened', CURRENT_DATE, CURRENT_DATE + 7),
('3', 'BW000000124', 'BW000000124/MN', 'No', 'AO', 'Opened', 'Opened', CURRENT_DATE, CURRENT_DATE + 5),
('AUC000001', 'US912828Z', 'US912828Z/MN', 'Yes', 'AO', 'Opened', 'Opened', CURRENT_DATE + 1, CURRENT_DATE + 8),
('AUC000002', 'GB00B', 'GB00B/MN', 'No', 'AO', 'Opened', 'Opened', CURRENT_DATE + 2, CURRENT_DATE + 9);

-- Schedule the function to run every 30 minutes during working hours (9 AM - 5 PM)
-- First enable required extensions
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Schedule job to run every 30 minutes between 9 AM and 5 PM
SELECT cron.schedule(
  'generate-live-auction-data',
  '*/30 9-17 * * 1-5', -- Every 30 minutes, 9 AM to 5 PM, Monday to Friday
  $$SELECT generate_live_auction_data();$$
);