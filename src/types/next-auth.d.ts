import NextAuth, { User } from "next-auth";
import NextAuthJWT from "next-auth/jwt";
import { LoginResponse } from "./Login";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string;
    user?: User;
  }

  interface User extends LoginResponse {}
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    accessToken?: string;
    user?: User;
  }
}
