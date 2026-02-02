"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";
import { Home } from "lucide-react";
import { Route } from "../../../types/routes.type";
import { adminRoutes } from "../../../routes/adminRoutes";
import { sellerRoutes } from "../../../routes/sellerRoutes";
import { userRoutes } from "../../../routes/userRoutes";
import Logo from "../logo/logo";
import { UserRole } from "../../../types/role.type";

export function AppSidebar({
  user,
}: {
  user: {
    role: UserRole;
    name?: string;
    email?: string;
  };
}) {
  const pathname = usePathname();

  let routes: Route[] = [];

  switch (user.role) {
    case "ADMIN":
      routes = adminRoutes;
      break;
    case "SELLER":
      routes = sellerRoutes;
      break;
    case "USER":
      routes = userRoutes;
      break;
    default:
      routes = [];
  }


   const isActive = (url: string) => pathname === url;


  return (
    <Sidebar collapsible="icon">
      {/* Header */}
      <SidebarHeader className="px-3 py-4">
        <Link href="/" className="flex items-center gap-2">
        
          <Logo/>
        </Link>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="px-2">
        {routes.map((group) => (
          <div key={group.title} className="mb-4">
            {/* Group title */}
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {group.title}
            </p>

            <SidebarMenu>
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <Link
                        href={item.url}
                        className={cn(
                          "flex items-center gap-2",
                          isActive(item.url)
                            ? "bg-muted text-accent-foreground rounded-md px-2 py-1"
                            : "hover:bg-muted hover:rounded-md px-2 py-1"
                        )}
                      >
                        {Icon ? <Icon className="h-4 w-4" /> : null}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </div>
        ))}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="px-3 py-4">
        <Separator className="mb-3" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/"
                className={cn(
                  "flex items-center gap-2 hover:bg-muted hover:rounded-md px-2 py-1",
                  pathname === "/" && "bg-muted text-accent-foreground rounded-md"
                )}
              >
                <Home className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
