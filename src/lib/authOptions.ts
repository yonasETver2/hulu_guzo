// lib/authOptions.ts
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions, DefaultUser } from "next-auth";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";

// Custom user interface extending DefaultUser
export interface MyUser extends DefaultUser {
  id: string;           // must be string
  user_type?: string;    // optional custom field
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
        userType: { label: "User Type", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password, userType } = credentials;

        try {
          const results: any = await query("CALL checkUserMatchUser(?, ?)", [
            email,
            userType,
          ]);

          const user = results[0][0];
          if (!user) return null;

          const isMatch = await bcrypt.compare(password, user.usr_password);
          if (!isMatch) return null;

          // Always convert id to string
          return {
            id: String(user.sign_up_id),
            name: user.user_name,
            email: user.email_adress,
            user_type: user.user_type,
          } as MyUser;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as MyUser;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user as MyUser;
      }
      return session;
    },
  },

  pages: {
    signIn: "/components/login",
  },
};
