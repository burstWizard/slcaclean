import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
export const authOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: "122409652109-5j4mnisgl8mirm65rk8o86d9tqith7i3.apps.googleusercontent.com",
      clientSecret: "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",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  secret:process.env.NEXTAUTH_SECRET,
}
export default NextAuth(authOptions)