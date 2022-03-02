import { getToken } from "next-auth/jwt";
import { NextURL } from "next/dist/server/web/next-url";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

// export const middleware = async (req: NextRequest) => {
//   console.log("req.cookies", req.cookies);
//   const token = req.cookies.session;
//   const url: NextURL = req.nextUrl.clone();

//   if (token) return NextResponse.next();

//   if (!token && url.pathname !== "/ingresar") {
//     url.search = `returnUrl=${url.pathname}`;
//     url.pathname = `/ingresar`;
//     return NextResponse.redirect(url);
//   }
// };

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("session", session);

  if (!session) {
    const requestedPage = req.page.name;
    return NextResponse.redirect(`/ingresar?p=${requestedPage}`);
  }

  return NextResponse.next();
}
