"use client";

import Link from "next/link";
import { Pill } from "lucide-react";
import { cn } from "@/lib/utils";

type LogoProps = {
  href?: string;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
};

export default function Logo({
  href = "/",
  className,
  iconClassName,
  textClassName,
}: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 font-semibold tracking-tight",
        className
      )}
    >
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm",
          iconClassName
        )}
      >
        <Pill className="h-5 w-5" />
      </span>

      <span className={cn("text-lg md:text-xl", textClassName)}>
        MediStore
      </span>
    </Link>
  );
}
