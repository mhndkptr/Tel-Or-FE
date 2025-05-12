import { NextResponse } from "next/server";
import { encryptIt } from "./utils/helper";

export function middleware(request) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const currentPath = request.nextUrl.pathname;
  const currentQuery = request.nextUrl.search;

  // if (!accessToken) {
  //   // Action jika user belum login
  //   if (currentPath.startsWith("/dashboard")) {
  //     return NextResponse.redirect(new URL(`/auth/login?prev=${encryptIt(currentPath + currentQuery)}`, request.url));
  //   }
  // } else {
  //   // Action jika sudah login
  //   if (currentPath.startsWith("/auth")) {
  //     return NextResponse.redirect(new URL("/dashboard", request.url));
  //   }
  // }
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
