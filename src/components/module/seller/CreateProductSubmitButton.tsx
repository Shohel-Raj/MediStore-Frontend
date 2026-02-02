"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

export default function CreateProductSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full h-11 rounded-xl font-semibold"
      disabled={pending}
      onClick={() => {
        // This only shows when user clicks submit
        // real result will be shown after server action completes
        if (!pending) toast.loading("Publishing product...");
      }}
    >
      {pending ? "Publishing..." : "Publish Product"}
    </Button>
  );
}
