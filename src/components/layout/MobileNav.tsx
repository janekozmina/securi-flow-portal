import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, History, Gavel, MoreHorizontal, Shield, ArrowRightLeft } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { UserCircle, FileCheck, UserPlus } from 'lucide-react';

const mainNavItems = [
  { label: 'Home', icon: Home, path: '/dashboard' },
  { label: 'Portfolio', icon: TrendingUp, path: '/portfolio' },
  { label: 'Transactions', icon: History, path: '/transactions' },
  { label: 'Auctions', icon: Gavel, path: '/auctions' },
];

const moreNavItems = [
  { label: 'Investor Profile', icon: UserCircle, path: '/account' },
  { label: 'KYC Update', icon: FileCheck, path: '/kyc' },
  { label: 'Account Opening', icon: UserPlus, path: '/account-opening' },
  { label: 'Securities Pledging', icon: Shield, path: '/pledging' },
  { label: 'Securities Transfer', icon: ArrowRightLeft, path: '/security-transfer' },
];

export default function MobileNav() {
  const location = useLocation();
  const isMoreActive = moreNavItems.some(item => location.pathname === item.path);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-bottom">
      <div className="flex justify-around items-center h-16 px-2">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
        
        <Sheet>
          <SheetTrigger asChild>
            <button
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isMoreActive
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              <MoreHorizontal className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">More</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-auto">
            <SheetHeader>
              <SheetTitle>More Options</SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              {moreNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
