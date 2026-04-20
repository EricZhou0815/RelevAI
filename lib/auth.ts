
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "./db";
import crypto from "crypto";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Hash password for storage
        const hashPassword = (password: string) => {
          return crypto.createHash("sha256").update(password).digest("hex");
        };

        // Check if user exists
        const existingUser = db
          .prepare("SELECT * FROM users WHERE email = ?")
          .get(credentials.email);

        if (existingUser) {
          // Verify password
          const user = existingUser as any;
          if (user.password === hashPassword(credentials.password as string)) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
            };
          }
          return null;
        }

        // Create new user if not exists
        const id = crypto.randomUUID();
        db.prepare(
          "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)"
        ).run(
          id,
          "User",
          credentials.email,
          hashPassword(credentials.password as string)
        );

        return {
          id,
          name: "User",
          email: credentials.email as string,
        };
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
});
