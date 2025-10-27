-- Update the handle_new_user function to populate demo data
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  demo_auction_id uuid;
BEGIN
  -- Create onboarding status
  INSERT INTO public.onboarding_status (user_id, current_step, is_completed)
  VALUES (NEW.id, 1, FALSE);
  
  -- Create profile with demo data
  INSERT INTO public.profiles (
    id, 
    full_name, 
    phone, 
    date_of_birth, 
    gender, 
    address, 
    gov_id_number
  ) VALUES (
    NEW.id,
    'Demo User',
    '+267 7123 4567',
    '1990-01-01',
    'Male',
    'Plot 12345, Gaborone, Botswana',
    'ID123456789'
  );
  
  -- Get a random open auction for demo bids and trades
  SELECT id INTO demo_auction_id 
  FROM public.auctions 
  WHERE status = 'Opened' 
  LIMIT 1;
  
  -- Only insert demo bids/trades if we have an auction
  IF demo_auction_id IS NOT NULL THEN
    -- Insert demo bids
    INSERT INTO public.bids (user_id, auction_id, bid_price, quantity, status)
    VALUES 
      (NEW.id, demo_auction_id, 99.50, 10000, 'Pending'),
      (NEW.id, demo_auction_id, 100.25, 5000, 'Accepted');
    
    -- Insert demo trades
    INSERT INTO public.trades (
      user_id, 
      auction_id, 
      trade_price, 
      quantity, 
      status, 
      trade_date, 
      settlement_date
    ) VALUES 
      (NEW.id, demo_auction_id, 100.00, 10000, 'Completed', CURRENT_DATE - 5, CURRENT_DATE + 2),
      (NEW.id, demo_auction_id, 99.75, 15000, 'Settled', CURRENT_DATE - 10, CURRENT_DATE - 3);
  END IF;
  
  RETURN NEW;
END;
$function$;