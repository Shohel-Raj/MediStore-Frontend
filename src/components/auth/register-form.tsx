"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  User,
  Store,
  Sparkles,
  ShieldCheck,
  Pill,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

type Role = "USER" | "SELLER";

type RegisterFormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Role | null;
};

export default function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [form, setForm] = React.useState<RegisterFormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: null,
  });

  const setRole = (role: Role) => {
    setForm((prev) => ({ ...prev, role }));
  };

  const handleChange =
    (key: keyof Omit<RegisterFormState, "role">) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleGoogleRegister = async () => {
    // if (!form.role) {
    //   toast.error("Must Sellect user type");
    //   return;
    // }

    try {
      setIsLoading(true);

       const data = authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });

    console.log(data);

      toast.error("Google signup successful");

      router.push("/dashboard");
    } catch {
      toast.error("Google signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.role) {
      toast.error("Select account type");
      return;
    }

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      toast.error("Missing fields");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Weak password");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Password mismatch");
      return;
    }

    try {
      setIsLoading(true);

      // ✅ send role to backend
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role, // "USER" | "SELLER"
      };

      // TODO: replace with your API call
      // await fetch("/api/auth/register", { method:"POST", body: JSON.stringify(payload) ... })
      const { data, error } = await authClient.signUp.email(payload);
      console.log(data)

      toast.success("Account created ");

      router.push("/login");
    } catch {
      toast.error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-muted/40" />
      <FloatingIcons />

      <div className="container mx-auto grid min-h-screen items-center px-4 py-10 lg:grid-cols-2 lg:gap-10">
        {/* Left marketing */}
        <div className="hidden lg:block">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-2 text-sm shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" />
              <span className="font-medium">Join MediStore</span>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight">
              Register & start using MediStore
            </h1>

            <p className="mt-4 text-muted-foreground">
              Customers can buy OTC medicines. Sellers can manage inventory and
              fulfill orders.
            </p>

            <div className="mt-8 grid gap-3">
              <FeatureLine
                icon={<ShieldCheck className="h-5 w-5" />}
                title="Secure roles"
                desc="User & Seller accounts are separated with role based dashboards."
              />
              <FeatureLine
                icon={<Pill className="h-5 w-5" />}
                title="Medicine marketplace"
                desc="Search, add to cart, checkout, track orders."
              />
            </div>
          </div>
        </div>

        {/* Right card */}
        <div className="mx-auto w-full max-w-lg">
          <Card className="relative overflow-hidden rounded-2xl border bg-background/70 shadow-xl backdrop-blur">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                Create account
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Choose account type first, then register.
              </p>
            </CardHeader>

            <CardContent className="space-y-5">
              {/* Role selector */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={form.role === "USER" ? "default" : "outline"}
                  className="h-12 gap-2 rounded-xl"
                  onClick={() => setRole("USER")}
                >
                  <User className="h-4 w-4" />
                  User
                </Button>

                <Button
                  type="button"
                  variant={form.role === "SELLER" ? "default" : "outline"}
                  className="h-12 gap-2 rounded-xl"
                  onClick={() => setRole("SELLER")}
                >
                  <Store className="h-4 w-4" />
                  Seller
                </Button>
              </div>

              {/* If role not selected show helper */}
              {!form.role ? (
                <div className="rounded-xl border bg-muted/40 p-4 text-sm text-muted-foreground">
                  👆 Select <span className="font-medium">User</span> or{" "}
                  <span className="font-medium">Seller</span> to continue.
                </div>
              ) : (
                <div className="rounded-xl border bg-muted/40 p-4 text-sm">
                  You are registering as:{" "}
                  <span className="font-semibold">
                    {form.role === "USER" ? "User" : "Seller"}
                  </span>
                </div>
              )}

              {/* Google button */}
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2"
                onClick={handleGoogleRegister}
                disabled={isLoading || !form.role}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <GoogleIcon className="h-4 w-4" />
                )}
                Continue with Google
              </Button>

              <div className="flex items-center gap-3">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground">
                  OR REGISTER WITH EMAIL
                </span>
                <Separator className="flex-1" />
              </div>

              {/* Form appears only after role selection */}
              {form.role && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={form.name}
                        onChange={handleChange("name")}
                        placeholder="Your name"
                        className="pl-10"
                        autoComplete="name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={form.email}
                        onChange={handleChange("email")}
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={form.password}
                        onChange={handleChange("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={form.confirmPassword}
                        onChange={handleChange("confirmPassword")}
                        type={showConfirm ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((p) => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirm ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      `Register as ${form.role === "USER" ? "User" : "Seller"}`
                    )}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium hover:underline">
                      Login
                    </Link>
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

/* ------------------ Helpers ------------------ */

function FeatureLine({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border bg-background/60 p-4 shadow-sm backdrop-blur">
      <div className="mt-0.5 rounded-lg bg-muted p-2">{icon}</div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 533.5 544.3"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272v95.3h146.9c-6.3 34.1-25 63-53.2 82.3v68h86.1c50.4-46.4 81.7-114.9 81.7-195.2z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M272 544.3c72.6 0 133.5-24 178-65.3l-86.1-68c-24 16.1-54.7 25.7-91.9 25.7-70.7 0-130.6-47.7-152.1-111.7h-89v70.3C75.5 476.7 167.5 544.3 272 544.3z"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M119.9 325c-10.1-30.1-10.1-62.9 0-93l-89-70.3C-8.4 240.1-8.4 304.2 30.9 395.3l89-70.3z"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M272 107.7c39.5-.6 77.6 14.2 106.8 41.2l79.6-79.6C410.2 24.7 345.5-1.4 272 0 167.5 0 75.5 67.6 30.9 161.7l89 70.3C141.4 155.4 201.3 107.7 272 107.7z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

function FloatingIcons() {
  const icons = [
    <Pill key="pill" className="h-6 w-6" />,
    <ShieldCheck key="shield" className="h-6 w-6" />,
    <Sparkles key="spark" className="h-6 w-6" />,
    <Mail key="mail" className="h-6 w-6" />,
    <Lock key="lock" className="h-6 w-6" />,
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes floaty {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-14px) rotate(6deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        .animate-float {
          animation: floaty 8s ease-in-out infinite;
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 -z-10 opacity-25">
        {Array.from({ length: 14 }).map((_, i) => {
          const Icon = icons[i % icons.length];
          const left = `${(i * 7) % 100}%`;
          const top = `${(i * 11) % 100}%`;
          const delay = `${(i % 6) * 0.3}s`;
          const duration = `${7 + (i % 6)}s`;

          return (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left,
                top,
                animationDelay: delay,
                animationDuration: duration,
              }}
            >
              <div className="rounded-2xl border bg-background/40 p-3 shadow-sm backdrop-blur">
                {Icon}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
