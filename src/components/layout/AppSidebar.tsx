import { Building2, ListOrdered, CreditCard, Gavel, ClipboardList, History, BookOpen, ChevronDown } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

const mainItems = [
  { title: 'Balances', url: '/portfolio', icon: ListOrdered },
  { title: 'Accounts', url: '/account', icon: CreditCard },
  { title: 'Auctions', url: '/auctions', icon: Gavel },
  { title: 'Auction orders', url: '/auction-orders', icon: ClipboardList },
  { title: 'Transactions', url: '/transactions', icon: History },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const [operationsOpen, setOperationsOpen] = useState(true);
  const [dictionaryOpen, setDictionaryOpen] = useState(false);

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent className="bg-card">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Operations Collapsible */}
              <Collapsible open={operationsOpen} onOpenChange={setOperationsOpen}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full justify-between hover:bg-muted">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-5 w-5 text-muted-foreground" />
                        {open && <span className="text-sm font-medium">Operations</span>}
                      </div>
                      {open && <ChevronDown className={`h-4 w-4 transition-transform ${operationsOpen ? 'rotate-180' : ''}`} />}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
                <CollapsibleContent>
                  <SidebarMenu className="ml-6">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to="/kyc-update"
                          className={({ isActive }) => 
                            isActive ? 'bg-muted text-primary font-medium' : 'hover:bg-muted/50'
                          }
                        >
                          {open && <span className="text-sm">KYC Update</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to="/account-opening"
                          className={({ isActive }) => 
                            isActive ? 'bg-muted text-primary font-medium' : 'hover:bg-muted/50'
                          }
                        >
                          {open && <span className="text-sm">Account Opening</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </CollapsibleContent>
              </Collapsible>

              {/* Main Menu Items */}
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive ? 'bg-muted text-primary font-medium' : 'hover:bg-muted/50'
                      }
                    >
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      {open && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Dictionary Collapsible */}
              <Collapsible open={dictionaryOpen} onOpenChange={setDictionaryOpen}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full justify-between hover:bg-muted">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                        {open && <span className="text-sm font-medium">Dictionary</span>}
                      </div>
                      {open && <ChevronDown className={`h-4 w-4 transition-transform ${dictionaryOpen ? 'rotate-180' : ''}`} />}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
