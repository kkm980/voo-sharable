// importing providers
import { connect } from "@/dbConfig";
import User from "@/models/userModel";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
connect();
const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({ account, profile }: any) {
      if (account?.provider === "google") {
        // Check if the user already exists in the database
        const isUserExist = await User.findOne({ email: profile?.email });
        if (isUserExist) {
          // Update the expiry time of access token if user exists and logging in again
        // let currentTimestamp = Math.floor(Date.now() / 1000) + 3600;
        // const resp = await User.findByIdAndUpdate(isUserExist._id, {...isUserExist, accessTokenExpiry: currentTimestamp}, { new: true });
        return true;
        }
        // Create a new user if they don't exist
        let currentTimestamp = Math.floor(Date.now() / 1000) + 3600;
        const newUser = new User({
          name: profile?.name,
          accessToken: account?.access_token,
          email: profile?.email,
          photo: profile?.picture,
          accessTokenExpiry: currentTimestamp
        });
        const resp = await newUser.save();
        return resp;
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
