import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // For demo purposes, just check if email and password are not empty
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Return a mock user
        return {
          id: "1",
          name: "Test User",
          email: credentials.email as string,
        };
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
});
