"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,

} from "lucide-react";
import Logo from "../logo/logo";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("border-t bg-background", className)}>
      <div className="container mx-auto px-4 py-12">



        {/* Main Footer */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Logo/>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              MediStore is a trusted e-commerce platform for purchasing
              over-the-counter medicines online. Browse products, add to cart,
              and place orders securely.
            </p>

            <div className="flex items-center gap-3">
              <SocialIcon href="#" icon={<Facebook className="h-4 w-4" />} />
              <SocialIcon href="#" icon={<Instagram className="h-4 w-4" />} />
              <SocialIcon href="#" icon={<Twitter className="h-4 w-4" />} />
              <SocialIcon href="#" icon={<Linkedin className="h-4 w-4" />} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/shop">Shop</FooterLink>
              <FooterLink href="/cart">Cart</FooterLink>
              <FooterLink href="/blogs">Blogs</FooterLink>
              <FooterLink href="/about">About</FooterLink>
            </ul>
          </div>

          {/* For Users */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              For Users
            </h3>
            <ul className="space-y-2 text-sm">
              <FooterLink href="/dashboard">Dashboard</FooterLink>
              <FooterLink href="/profile">My Profile</FooterLink>
              <FooterLink href="/orders">My Orders</FooterLink>
              <FooterLink href="/wishlist">Wishlist</FooterLink>
              <FooterLink href="/support">Support</FooterLink>
            </ul>
          </div>

          {/* Newsletter + Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Stay Updated
            </h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to get updates on new medicines, discounts, and health
              tips.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2"
            >
              <Input placeholder="Enter your email" type="email" />
              <Button type="submit">Subscribe</Button>
            </form>

            <div className="space-y-2 pt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+880 1XXX-XXXXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@medistore.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-10" />

        {/* Bottom Footer */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MediStore. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition">
              Terms & Conditions
            </Link>
            <Link href="/refund" className="hover:text-foreground transition">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------ Small Components ------------------ */

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-muted-foreground hover:text-foreground transition"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Button asChild size="icon" variant="outline" className="rounded-full">
      <Link href={href} aria-label="social link">
        {icon}
      </Link>
    </Button>
  );
}
