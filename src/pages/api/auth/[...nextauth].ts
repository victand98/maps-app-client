import { AuthService } from "@lib";
import { CustomErrorResponse } from "@types";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions } from "next-auth";
import { default as CredentialsProvider } from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Correo",
          type: "email",
          placeholder: "usuario@email.com",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "••••••••",
        },
      },
      authorize: async (credentials) => {
        if (credentials !== undefined) {
          try {
            const response = await AuthService.login(credentials);
            return response.data;
          } catch (error) {
            throw new Error((error as CustomErrorResponse).errors[0].message);
          }
        }
        return null;
      },
    }),
  ],

  pages: { signIn: "/ingresar", error: "/ingresar" },

  callbacks: {
    async jwt({ token, user, account }) {
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

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
};

export default function auth(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, authOptions);
}
