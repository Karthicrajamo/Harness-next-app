import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const protectedPaths = ["/dashboard"];
  console.log("protectedPaths>>", request.nextUrl.pathname);

  if (
    protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    console.log("token>>", token);

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      //   jwt.verify(token, process.env.JWT_SECRET!);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
