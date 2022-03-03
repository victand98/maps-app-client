import { getToken } from "next-auth/jwt";
import { NextURL } from "next/dist/server/web/next-url";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log("\n[SESSION MIDDLEWARE]\n", session);
  const url: NextURL = req.nextUrl.clone();

  if (!session) {
    url.search = `returnUrl=${url.pathname}`;
    url.pathname = `/ingresar`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
