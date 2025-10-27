-- Insert additional demo bids for existing users
INSERT INTO public.bids (user_id, auction_id, bid_price, quantity, status, created_at)
SELECT 
  p.id as user_id,
  a.id as auction_id,
  CASE 
    WHEN random() < 0.5 THEN a.recommended_price * (0.98 + random() * 0.04)
    ELSE a.recommended_price * (0.95 + random() * 0.10)
  END as bid_price,
  (FLOOR(random() * 20 + 1) * 5000)::integer as quantity,
  CASE 
    WHEN random() < 0.4 THEN 'Pending'
    WHEN random() < 0.7 THEN 'Accepted'
    ELSE 'Rejected'
  END as status,
  NOW() - (random() * interval '30 days') as created_at
FROM 
  public.profiles p
  CROSS JOIN LATERAL (
    SELECT * FROM public.auctions 
    WHERE status = 'Opened' 
    ORDER BY random() 
    LIMIT 3
  ) a
WHERE NOT EXISTS (
  SELECT 1 FROM public.bids b 
  WHERE b.user_id = p.id AND b.auction_id = a.id
)
LIMIT 5;

-- Insert additional demo trades for existing users
INSERT INTO public.trades (
  user_id, 
  auction_id, 
  trade_price, 
  quantity, 
  status, 
  trade_date, 
  settlement_date,
  created_at
)
SELECT 
  p.id as user_id,
  a.id as auction_id,
  a.recommended_price * (0.97 + random() * 0.06) as trade_price,
  (FLOOR(random() * 15 + 1) * 5000)::integer as quantity,
  CASE 
    WHEN random() < 0.5 THEN 'Completed'
    ELSE 'Settled'
  END as status,
  (CURRENT_DATE - (random() * 45)::integer) as trade_date,
  (CURRENT_DATE + (random() * 7)::integer) as settlement_date,
  NOW() - (random() * interval '45 days') as created_at
FROM 
  public.profiles p
  CROSS JOIN LATERAL (
    SELECT * FROM public.auctions 
    ORDER BY random() 
    LIMIT 3
  ) a
WHERE NOT EXISTS (
  SELECT 1 FROM public.trades t 
  WHERE t.user_id = p.id AND t.auction_id = a.id
)
LIMIT 4;