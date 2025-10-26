-- Drop existing cron job if it exists
SELECT cron.unschedule('generate-live-auction-data');

-- Recreate cron job to run every 2 minutes
SELECT cron.schedule(
  'generate-live-auction-data',
  '*/2 * * * *', -- Every 2 minutes
  $$
  SELECT net.http_post(
    url:='https://yozvcozxnbwllytcxqrq.supabase.co/functions/v1/auction-data-generator',
    headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvenZjb3p4bmJ3bGx5dGN4cXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0ODY2NzIsImV4cCI6MjA3NzA2MjY3Mn0.bxNddphTeZtIMb9czqRpptJShUge-Sm9GwYc2spd6KU"}'::jsonb,
    body:=concat('{"time": "', now(), '"}')::jsonb
  ) as request_id;
  $$
);

-- Update the function to be more realistic
CREATE OR REPLACE FUNCTION public.generate_live_auction_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_reference text;
  v_instrument text;
  v_start_date date;
  v_close_date date;
  v_recommended_price numeric(10,2);
  v_min_price numeric(10,2);
  v_max_price numeric(10,2);
  instrument_idx int;
  existing_count int;
  instruments text[] := ARRAY['US912828Z629', 'GB00B24FF097', 'DE0001102440', 'JP1103581000', 'AU3TB0000271'];
  min_prices numeric[] := ARRAY[98.50, 95.25, 97.00, 99.00, 96.50];
  max_prices numeric[] := ARRAY[102.00, 99.75, 101.50, 102.50, 100.00];
BEGIN
  -- Count existing open auctions
  SELECT COUNT(*) INTO existing_count
  FROM public.auctions
  WHERE status = 'Opened';

  -- Only generate new auction if we have fewer than 8 open auctions
  -- Lower probability since we're running every 2 minutes
  IF existing_count < 8 AND random() < 0.15 THEN
    -- Select random instrument
    instrument_idx := floor(random() * array_length(instruments, 1) + 1)::int;
    v_instrument := instruments[instrument_idx];
    v_min_price := min_prices[instrument_idx];
    v_max_price := max_prices[instrument_idx];
    
    v_reference := 'AUC' || to_char(CURRENT_TIMESTAMP, 'YYYYMMDD') || LPAD(floor(random() * 9999)::text, 4, '0');
    
    -- Realistic date ranges: start within next 1-3 days, close 1-5 days after start
    v_start_date := CURRENT_DATE + (floor(random() * 3 + 1)::int);
    v_close_date := v_start_date + (floor(random() * 5 + 1)::int);
    
    -- Realistic price within instrument range
    v_recommended_price := (v_min_price + (random() * (v_max_price - v_min_price)))::numeric(10,2);
    
    INSERT INTO public.auctions (
      reference, 
      instrument, 
      code, 
      flex,
      instrument_code,
      status,
      status_name,
      start_date,
      close_date,
      recommended_price
    ) VALUES (
      v_reference,
      v_instrument,
      v_instrument || '/MN',
      CASE WHEN random() < 0.15 THEN 'Yes' ELSE 'No' END,
      'AO',
      'Opened',
      'Opened',
      v_start_date,
      v_close_date,
      v_recommended_price
    )
    ON CONFLICT (reference) DO NOTHING;
  END IF;
  
  -- Update status of closed auctions (close_date has passed)
  UPDATE public.auctions
  SET status = 'Closed',
      status_name = 'Closed',
      updated_at = now()
  WHERE close_date < CURRENT_DATE
    AND status = 'Opened';
    
  -- Realistically update prices for open auctions
  -- Only update 20% of open auctions to simulate market movements
  UPDATE public.auctions
  SET recommended_price = CASE
    WHEN recommended_price IS NOT NULL THEN
      -- Small realistic price movements: +/- 0.5%
      (recommended_price * (1 + (random() * 0.01 - 0.005)))::numeric(10,2)
    ELSE
      (95 + (random() * 10))::numeric(10,2)
    END,
    updated_at = now()
  WHERE status = 'Opened'
    AND random() < 0.20;
END;
$$;