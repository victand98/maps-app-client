import { AuthService } from "@lib";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
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
      async authorize(credentials, req) {
        console.log("credentials", credentials);
        const payload = {
          email: credentials!.email,
          password: credentials!.password,
        };

        try {
          const res = await AuthService.login(payload);
          console.log("res", res.headers);
          return res.data;
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/ingresar",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user, account }) {
      console.log("\njwt callback\n");
      console.log("token", token);
      console.log("user", user);
      console.log("account", account);

      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case "credentials":
            token.user = user;
            break;
        }
      }
      return token;
    },

    async session({ session, token }) {
      console.log("\nsession callback\n");
      console.log("session", session);
      console.log("token", token);

      session.accessToken = token.accessToken;
      session.user = token.user as any;
      return session;
    },
  },
});
