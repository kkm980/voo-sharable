// importing providers
import axios from "axios";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
          })
    ],
    callbacks: {
        async signIn({ account, profile }) {
          if (account?.provider === "google") {
            // Check if the user already exists in the database
            await fetch("/api/auth/callback/google");
          }
          return true;
        },
      }
})

export { handler as GET, handler as POST }
