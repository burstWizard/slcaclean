import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
export const authOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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