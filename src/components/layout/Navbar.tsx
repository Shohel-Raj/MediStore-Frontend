"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { Menu, LogOut, User, LayoutDashboard } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ModeToggle";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "../logo/logo";
import { UserRole } from "../../../types/role.type";
import { authClient } from "@/lib/auth-client";
import { SessionUser } from "../../../types/sessionUser";

interface MenuItem {
  title: string;
  url: string;
}

interface NavbarProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };

  // 🔥 Auth user data (pass from parent or session)
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;

  // 🔥 logout handler (pass from parent)
  onLogout?: () => Promise<void> | void;
}

export const getDashboardUrl = (role: UserRole) => {
  if (role === "ADMIN") return "/admin-dashboard";
  if (role === "SELLER") return "/seller-dashboard";
  return "/dashboard";
};

const Navbar = ({
  logo = {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Next Blog",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Blogs", url: "/blogs" },
    { title: "About", url: "/about" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Register", url: "/register" },
  },
  user = null,
  onLogout,
  className,
}: NavbarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const { data, isPending } = authClient.useSession();

  // ✅ real session user
  const sessionUser: SessionUser = data?.user;

  console.log(sessionUser)

  // if you store role inside session user
  const role = (sessionUser?.role as UserRole ) ?? undefined;

// const finalMenu = [
//   ...menu, // base menu
//   ...(role ? [{ title: "Dashboard", url: getDashboardUrl(role) }] : []),
// ];
 
  const isActive = (url: string) => {
    if (url === "/") return pathname === "/";
    return pathname.startsWith(url);
  };

  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      const parts = name.trim().split(" ");
      const first = parts[0]?.[0] ?? "";
      const last = parts[parts.length - 1]?.[0] ?? "";
      return (first + last).toUpperCase();
    }
    if (email) return email.slice(0, 2).toUpperCase();
    return "U";
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      if (onLogout) await onLogout();
      router.push("/");
      router.refresh();
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  return (
    <header className={cn("border-b bg-background", className)}>
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Logo />

        {/* Desktop */}
        <nav className="hidden items-center gap-6 lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {menu.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      "inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                      "hover:bg-muted hover:text-accent-foreground",
                      isActive(item.url)
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    <Link href={item.url}>{item.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <ModeToggle />

          {/* Auth area */}
          {isPending ? (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Loading...
              </Button>
            </div>
          ) : !sessionUser ? (
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={auth.login.url}>{auth.login.title}</Link>
              </Button>
              <Button asChild size="sm">
                <Link href={auth.signup.url}>{auth.signup.title}</Link>
              </Button>
            </div>
          ) : (
            <UserAvatarMenu user={sessionUser} onLogout={handleLogout} />
          )}
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <ModeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>

            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href={logo.url} className="flex items-center gap-2">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={32}
                      height={32}
                      className="dark:invert"
                    />
                    <span className="text-base font-semibold">{logo.title}</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-6 p-4">
                {/* Menu */}
                <div className="flex flex-col gap-2">
                  {menu.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive(item.url)
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>

                {/* Auth area */}
                {isPending ? (
                  <div className="flex flex-col gap-3">
                    <Button variant="outline" disabled>
                      Loading...
                    </Button>
                  </div>
                ) : !sessionUser ? (
                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline">
                      <Link href={auth.login.url}>{auth.login.title}</Link>
                    </Button>
                    <Button asChild>
                      <Link href={auth.signup.url}>{auth.signup.title}</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 rounded-lg border p-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={sessionUser.image ?? ""} />
                        <AvatarFallback>
                          {getInitials(sessionUser.name, sessionUser.email)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold leading-none">
                          {sessionUser.name ?? "User"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {sessionUser.email ?? ""}
                        </p>
                      </div>
                    </div>

                    <Button asChild variant="outline">
                      <Link href="/profile">Profile</Link>
                    </Button>

                    <Button asChild variant="outline">
                      <Link href={getDashboardUrl(role ?? "user")}>
                        Dashboard
                      </Link>
                    </Button>

                    <Button variant="destructive" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export { Navbar };

/* ------------------- Avatar Dropdown Menu ------------------- */

function UserAvatarMenu({
  user,
  onLogout,
}: {
  user: { name?: string | null; email?: string | null; image?: string | null ;role:UserRole};
  onLogout: () => void;
}) {
  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      const parts = name.trim().split(" ");
      const first = parts[0]?.[0] ?? "";
      const last = parts[parts.length - 1]?.[0] ?? "";
      return (first + last).toUpperCase();
    }
    if (email) return email.slice(0, 2).toUpperCase();
    return "U";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.image ?? ""} alt={user.name ?? "User"} />
            <AvatarFallback>{getInitials(user.name, user.email)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col gap-1">
          <span className="text-sm font-semibold">{user.name ?? "User"}</span>
          <span className="text-xs font-normal text-muted-foreground">
            {user.email ?? ""}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={getDashboardUrl(user.role ?? "user")}>
                        Dashboard
                      </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onLogout}
          className="flex cursor-pointer items-center gap-2 text-destructive focus:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
