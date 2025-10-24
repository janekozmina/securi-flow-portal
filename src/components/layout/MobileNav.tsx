import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, History, Gavel, User } from 'lucide-react';

const navItems = [
  { label: 'Home', icon: Home, path: '/' },
  { label: 'Portfolio', icon: TrendingUp, path: '/portfolio' },
  { label: 'Transactions', icon: History, path: '/transactions' },
  { label: 'Auctions', icon: Gavel, path: '/auctions' },
  { label: 'Account', icon: User, path: '/account' },
];

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-bottom">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
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
      </div>
    </nav>
  );
}
