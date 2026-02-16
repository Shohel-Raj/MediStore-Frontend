
import VerifyEmailPage from "@/components/verify-email/VerifyEmailClient";
import { Suspense } from "react";

export default function Page() {
  return  <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <VerifyEmailPage />
    </Suspense>
}
