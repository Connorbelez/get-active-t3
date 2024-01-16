export const runtime="edge"
import { PrismaAdapter } from "./prismaEdgeAdapter"
import NextAuth from "next-auth"
import {

  type DefaultSession,

} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
const scopes = ['identify','email'].join(',')
import { env } from "@/env";
import { db, acceleratedDb } from "@/server/db";
// import { User } from "lucide-react";
// import { AdapterUser } from "next-auth/adapters";

export const roleType = {
  ADMIN: "ADMIN",
  CREATOR: "CREATOR",
  USER: "USER",
};
export enum UserRole {
  ADMIN = "ADMIN",
  CREATOR = "CREATOR",
  USER = "USER",
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    //@ts-ignore
    user: {
      id: string;
      email: string;
      role: UserRole;
    } & DefaultSession["user"];
  }


}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const {
    handlers:{GET,POST},
    auth,
} =NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(acceleratedDb),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      authorization: {params: {scope: 'identify email'}},
      profile: (profile) => {
        console.log("DISCORD ADAPTER: ", profile)
        console.log(profile )
        return {
          id: profile.id,
          name: profile.global_name,
          email: profile.email,
          image: profile.avatar,
          username: profile.username,
          role: UserRole.USER
          // role: UserRole.USER,
        };
      }
    }),
    GoogleProvider({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  callbacks: {

    session: ({ session, user }) => {


      if(user['role']){
        session.user.role = user['role']
      }
      else{
        session.user.role = UserRole.USER
     }

     console.log("SESSION: ", session)
     console.log("user: ", user)


      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,

        },
        // role: r
      }
    },

   
  },
});

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => auth();
