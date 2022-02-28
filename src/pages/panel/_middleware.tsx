import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  console.log("req.cookies", req.cookies);
  const token = req.cookies.session;
  const url: NextURL = req.nextUrl.clone();

  if (token) return NextResponse.next();

  if (!token && url.pathname !== "/ingresar") {
    url.search = `returnUrl=${url.pathname}`;
    url.pathname = `/ingresar`;
    return NextResponse.redirect(url);
  }
};
