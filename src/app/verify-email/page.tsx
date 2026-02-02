"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [loading, setLoading] = React.useState(true);
  const [success, setSuccess] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const verify = async () => {
      if (!token) {
        setSuccess(false);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const { error } = await authClient.verifyEmail({
          token,
        });

        if (error) {
          toast.error(error.message || "Email verification failed");
          setSuccess(false);
          return;
        }

        toast.success("Email verified successfully!");
        setSuccess(true);

        // redirect to login after success
        setTimeout(() => router.push("/login"), 1500);
      } catch {
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token, router]);

  return (
    <div className="container flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-background p-6 shadow-lg">
        <h1 className="text-xl font-bold">Verify Email</h1>

        <div className="mt-6 flex items-center justify-center">
          {loading ? (
            <Loader2 className="h-10 w-10 animate-spin" />
          ) : success ? (
            <CheckCircle2 className="h-10 w-10" />
          ) : (
            <XCircle className="h-10 w-10" />
          )}
        </div>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          {loading
            ? "Verifying your email..."
            : success
              ? "Your email has been verified. Redirecting to login..."
              : "Invalid or expired verification link."}
        </p>

        {!loading && !success && (
          <Button className="mt-6 w-full" onClick={() => router.push("/login")}>
            Back to Login
          </Button>
        )}
      </div>
    </div>
  );
}
