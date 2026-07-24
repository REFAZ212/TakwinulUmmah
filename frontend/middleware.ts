import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/portal-manajemen/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_access_token")?.value
    || request.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.redirect(new URL("/portal-manajemen/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal-manajemen/:path*"],
};
