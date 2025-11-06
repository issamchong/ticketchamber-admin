'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
} from 'lucide-react';
import { Logo } from '@/components/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 p-2">
          <Logo className="w-8 h-8 text-primary" />
          <span className="text-lg font-semibold font-headline">TicketChamber</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/">
              <SidebarMenuButton
                tooltip="Analytics"
                isActive={pathname === '/'}
              >
                <LayoutDashboard />
                <span>Analytics</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/agencies">
              <SidebarMenuButton
                tooltip="Agencies"
                isActive={pathname === '/agencies'}
              >
                <Users />
                <span>Agencies</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-2 mt-auto" />
    </Sidebar>
  );
}
