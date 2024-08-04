// middleware.js
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const { pathname } = req.nextUrl;

  console.log("Token Hanif: ", { token, pathname });

  // Allow the requests if the following is true...
  // 1) It's a request for next-auth session & provider fetching
  // 2) token exists

  if (pathname.includes('authentication') && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // Redirect them to login if they don't have a token AND are requesting a protected route
  if (!token && pathname !== "/authentication/login") {
    return NextResponse.redirect(new URL("/authentication/login", req.url));
  }
}

export const config = {
  matcher: ["/", "/authentication/:path*"], // Routes that need authentication
};
