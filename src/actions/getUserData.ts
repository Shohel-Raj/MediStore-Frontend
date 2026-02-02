"use server";
import { UserRole } from "../../types/role.type";
import { cookies } from "next/headers";

export type UserInfo = {
  name: string;
  email: string;
  image?: string ;
  role: UserRole;
};

/**
 * Fetch user data from Better Auth server-side
 */
export async function getUserData(): Promise<UserInfo | null> {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("better-auth.session_token");

    if (!token) return null;

    // Fetch session from Better Auth
    const res = await fetch("http://localhost:5000/api/auth/get-session", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    const CookieUser = await res.json();
console.log(CookieUser.user)
    // session.data?.user can be undefined
    const userData = CookieUser.user;
    if (!userData) return null;

    // Map to our UserInfo type
    const user: UserInfo = {
      name: userData.name ?? "MediStore User",
      email: userData.email ?? "user@medistore.com",
      image: userData.image ?? null,
      role: (userData.role as UserRole) ?? "USER",
    };

    return user;
  } catch (err) {
    console.error("Error fetching user data:", err);
     const user: UserInfo = {
      name: "MediStore User",
      email:  "user@medistore.com",
      image:  null,
      role:  "USER",
    };
    return user;
  }
}
