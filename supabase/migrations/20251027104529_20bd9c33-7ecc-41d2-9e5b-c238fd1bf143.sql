-- Enhance the generate_live_auction_data function to also generate transactions
CREATE OR REPLACE FUNCTION public.generate_live_auction_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
  instruments text[] := ARRAY['US912828Z629', 'GB00B24FF097', 'DE0001102440', 'JP1103581000', 'AU3TB0000271', 'TESTBOND001', 'TESTBOND002'];
  min_prices numeric[] := ARRAY[98.50, 95.25, 97.00, 99.00, 96.50, 90.00, 92.00];
  max_prices numeric[] := ARRAY[102.00, 99.75, 101.50, 102.50, 100.00, 105.00, 103.00];
  v_auction_id uuid;
BEGIN
  -- Count existing open auctions
  SELECT COUNT(*) INTO existing_count
  FROM public.auctions
  WHERE status = 'Opened';

  -- Generate new auction if we have fewer than 8 open auctions (15% probability)
  IF existing_count < 8 AND random() < 0.15 THEN
    instrument_idx := floor(random() * array_length(instruments, 1) + 1)::int;
    v_instrument := instruments[instrument_idx];
    v_min_price := min_prices[instrument_idx];
    v_max_price := max_prices[instrument_idx];
    
    v_reference := 'AUC' || to_char(CURRENT_TIMESTAMP, 'YYYYMMDD') || LPAD(floor(random() * 9999)::text, 4, '0');
    
    v_start_date := CURRENT_DATE + (floor(random() * 3 + 1)::int);
    v_close_date := v_start_date + (floor(random() * 5 + 1)::int);
    
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
  
  -- Update status of closed auctions
  UPDATE public.auctions
  SET status = 'Closed',
      status_name = 'Closed',
      updated_at = now()
  WHERE close_date < CURRENT_DATE
    AND status = 'Opened';
    
  -- Update prices for open auctions (20% probability)
  UPDATE public.auctions
  SET recommended_price = CASE
    WHEN recommended_price IS NOT NULL THEN
      (recommended_price * (1 + (random() * 0.01 - 0.005)))::numeric(10,2)
    ELSE
      (95 + (random() * 10))::numeric(10,2)
    END,
    updated_at = now()
  WHERE status = 'Opened'
    AND random() < 0.20;
    
  -- Randomly accept some pending bids (10% probability)
  UPDATE public.bids
  SET status = 'Accepted',
      updated_at = now()
  WHERE status = 'Pending'
    AND random() < 0.10;
    
  -- Generate trades from recently accepted bids (5% probability)
  IF random() < 0.05 THEN
    INSERT INTO public.trades (
      user_id,
      auction_id,
      trade_price,
      quantity,
      status,
      trade_date,
      settlement_date
    )
    SELECT 
      b.user_id,
      b.auction_id,
      b.bid_price * (0.98 + random() * 0.04),
      b.quantity,
      'Completed',
      CURRENT_DATE,
      CURRENT_DATE + 3
    FROM public.bids b
    WHERE b.status = 'Accepted'
      AND NOT EXISTS (
        SELECT 1 FROM public.trades t 
        WHERE t.user_id = b.user_id 
        AND t.auction_id = b.auction_id
        AND t.created_at > now() - interval '1 hour'
      )
    LIMIT 1;
  END IF;
END;
$function$;

-- Set up the cron job to run every 2 minutes
SELECT cron.schedule(
  'generate-live-data-every-2min',
  '*/2 * * * *',
  $$SELECT public.generate_live_auction_data();$$
);