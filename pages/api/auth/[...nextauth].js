import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
export const authOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: "168767987177-i9f6susi2e5didjl93eo7c4kvlartld9.apps.googleusercontent.com",
      clientSecret: "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",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  secret:"atr5-gt65-9jet",
}
export default NextAuth(authOptions)