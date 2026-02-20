import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  // baseURL: "https://medistore-server-hazel.vercel.app",
  fetchOptions: {
    credentials: "include",
  },
});