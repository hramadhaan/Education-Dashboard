import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { axiosClient } from "./axios-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        user: {
          label: "User",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
        typeLogin: {
          label: "Type Login",
          type: "text",
        },
      },
      async authorize(credentials, req) {
        let response;
        if (credentials.typeLogin === "student") {
          response = await axiosClient.post("/auth/login-student", {
            user: credentials.user,
            password: credentials.password,
          });
        } else if (credentials.typeLogin === "bagian-kurikulum") {
          response = await axiosClient.post("/auth/login-bagian-kurikulum", {
            user: credentials.user,
            password: credentials.password,
          });
        }

        console.log("Response: ", response);

        if (!response) {
          return Promise.reject(null);
        }

        if (response.status === 201 && response.data.data.token) {
          console.log("Betul");
          const user = {
            id: response.data.data.auth._id,
            name:
              response.data.data.auth.firstName +
              " " +
              response.data.data.auth.lastName,
            token: response.data.data.token,
            role: response.data.data.auth.role,
          };
          return Promise.resolve(user);
        }

        return Promise.reject(null);
      },
    }),
  ],
  pages: {
    signIn: "/authentication/login",
    signOut: "/authentication/login",
    error: "/authentication/login",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
        session.user.token = token?.token;
        session.user.role = token?.role;
      }
      return session;
    },
    async jwt({ user, token }) {
      if (user) {
        token.uid = user.id;
        token.token = user.token;
        token.role = user.role;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
});
