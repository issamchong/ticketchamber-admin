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
  BarChart2,
  Users,
  Settings,
  LogOut,
} from 'lucide-react';
import { Logo } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AppSidebar() {
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 p-2">
          <Logo className="w-8 h-8 text-primary" />
          <span className="text-lg font-semibold font-headline">TourView</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/">
              <SidebarMenuButton
                tooltip="Dashboard"
                isActive={pathname === '/'}
              >
                <LayoutDashboard />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Analytics" disabled>
              <BarChart2 />
              <span>Analytics</span>
            </SidebarMenuButton>
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
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings" disabled>
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-2 mt-auto">
        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-sidebar-accent transition-colors">
          <Avatar className="h-10 w-10">
            {userAvatar && (
              <Image
                src={userAvatar.imageUrl}
                alt={userAvatar.description}
                width={40}
                height={40}
                data-ai-hint={userAvatar.imageHint}
              />
            )}
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="font-semibold text-sm truncate">Jane Doe</p>
            <p className="text-xs text-muted-foreground truncate">
              jane.doe@example.com
            </p>
          </div>
          <LogOut className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
