import { Menu, MessageSquare, User } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Header() {
  return (
    <header className="h-16 bg-primary text-primary-foreground border-b border-primary flex items-center justify-between px-4 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-primary-foreground hover:bg-primary/90 hidden md:flex">
          <Menu className="h-5 w-5" />
        </SidebarTrigger>
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold tracking-wide">
            RETAIL INVESTOR MANAGEMENT
          </h1>
          <span className="text-sm opacity-90 hidden sm:inline">dev 1.24</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative text-primary-foreground hover:bg-primary/90 border border-primary-foreground/30">
          <MessageSquare className="h-5 w-5" />
          <Badge 
            variant="secondary" 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary-foreground text-primary"
          >
            0
          </Badge>
        </Button>
        <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/90 rounded-full">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
