import { AuthService } from "@lib";
import { CustomErrorResponse } from "@types";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const nextAuthOptions = (
  req: NextApiRequest,
  res: NextApiResponse
): NextAuthOptions => ({
  providers: [
    Credentials({
      name: "Ciclovía App",
      credentials: {
        email: {
          label: "Correo Electrónico",
          type: "email",
          placeholder: "usuario@correo.com",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "**********",
        },
      },
      async authorize(credentials) {
        // console.log("***************Authorize***************");
        // console.log("credentials", credentials);

        const payload = {
          email: credentials!.email,
          password: credentials!.password,
        };

        try {
          const response = await AuthService.login(payload);
          return response.data;
        } catch (error) {
          throw new Error((error as CustomErrorResponse).errors[0].message);
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/ingresar",
    error: "/ingresar",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // console.log("***********jwt callback***********");
      // console.log("token", token);
      // console.log("user", user);
      // console.log("account", account);

      if (account && user) {
        const { accessToken, ...userData } = user;
        token.accessToken = accessToken;

        switch (account.type) {
          case "credentials":
            token.user = userData;
            break;
        }
      }
      return token;
    },

    async session({ session, token, user }) {
      // console.log("***********session callback***********");
      // console.log("session", session);
      // console.log("token", token);
      // console.log("user", user);

      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
});

const nextAuth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, nextAuthOptions(req, res));

export default nextAuth;
