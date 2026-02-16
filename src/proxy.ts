import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserData } from "./actions/getUserData";

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;


  // Skip verify-email
  if (pathname.startsWith("/verify-email")) {
    return NextResponse.next();
  }

  // ✅ Use correct cookie name
  const sessionToken = request.cookies.get("__Secure-better-auth.session_data");
  
  const rawUser = await getUserData();

  const role = rawUser?.role;


  // Not logged in
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ===============================
  // ADMIN ROUTE
  // ===============================
  if (pathname.startsWith("/admin-dashboard")) {
    if (role === "SELLER") {
      return NextResponse.redirect(
        new URL("/seller-dashboard", request.url)
      );
    }

    if (role === "USER") {
      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );
    }
  }

  // ===============================
  // SELLER ROUTE
  // ===============================
  if (pathname.startsWith("/seller-dashboard")) {
    if (role === "ADMIN") {
      return NextResponse.redirect(
        new URL("/admin-dashboard", request.url)
      );
    }

    if (role === "USER") {
      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );
    }
  }

  // ===============================
  // USER ROUTE
  // ===============================
  if (pathname.startsWith("/dashboard")) {
    if (role === "ADMIN") {
      return NextResponse.redirect(
        new URL("/admin-dashboard", request.url)
      );
    }

    if (role === "SELLER") {
      return NextResponse.redirect(
        new URL("/seller-dashboard", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-dashboard/:path*",
    "/seller-dashboard/:path*",
    "/dashboard/:path*",
  ],
};
