import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import fs from "fs";
import path from "path";
import { verifyPassword } from "../../../lib/auth"; // bcrypt compare helper

const filePath = path.join(process.cwd(), "data", "users.json");

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!fs.existsSync(filePath)) return null;

          const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
          const user = users.find(u => u.email === credentials.email);
          if (!user) return null;

          const isValid = await verifyPassword(credentials.password, user.password);
          if (!isValid) return null;

          return { id: user.id, email: user.email };
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login", error: "/login" }, // redirect errors to login
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
