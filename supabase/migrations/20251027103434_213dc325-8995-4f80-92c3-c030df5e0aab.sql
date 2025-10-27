-- Create bids table
CREATE TABLE public.bids (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  auction_id uuid NOT NULL REFERENCES public.auctions(id) ON DELETE CASCADE,
  bid_price numeric(10,2) NOT NULL,
  quantity integer NOT NULL,
  status text NOT NULL DEFAULT 'Pending',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on bids
ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;

-- RLS policies for bids
CREATE POLICY "Users can view own bids"
ON public.bids
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bids"
ON public.bids
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create trades table
CREATE TABLE public.trades (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  auction_id uuid NOT NULL REFERENCES public.auctions(id) ON DELETE CASCADE,
  trade_price numeric(10,2) NOT NULL,
  quantity integer NOT NULL,
  status text NOT NULL DEFAULT 'Completed',
  trade_date date NOT NULL DEFAULT CURRENT_DATE,
  settlement_date date,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on trades
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;

-- RLS policies for trades
CREATE POLICY "Users can view own trades"
ON public.trades
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own trades"
ON public.trades
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Add triggers for updated_at
CREATE TRIGGER update_bids_updated_at
BEFORE UPDATE ON public.bids
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_trades_updated_at
BEFORE UPDATE ON public.trades
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();