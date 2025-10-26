-- Move extensions to proper schema
DROP EXTENSION IF EXISTS pg_cron CASCADE;
DROP EXTENSION IF EXISTS pg_net CASCADE;

CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Recreate the cron job with proper schema reference
SELECT cron.schedule(
  'generate-live-auction-data',
  '*/30 9-17 * * 1-5',
  $$SELECT public.generate_live_auction_data();$$
);