import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
const scopes = ['identify','email'].join(',')
import { env } from "@/env";
import { db } from "@/server/db";
import { User } from "lucide-react";
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
    user: {
      id: string;
      email: string;
      // role: string;
      // ...other properties
      role: UserRole;
      // role: role;
      // userRole: string
 
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: "admin" | "creator" | "user";
  //   // id: string
  //   // email: string
  //   // emailVerified: Date | null
  //   userRole: string
  // }
  // interface User {
  //   id: string
  //   name?: string | null
  //   email?: string | null
  //   image?: string | null
  //   role: "ADMIN" | "CREATOR" | "USER"
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(db),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      authorization: {params: {scope: 'identify email'}},
      profile: (profile) => {
        console.log("DISCORD ADAPTER: ", profile)
        console.table(profile )
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
    // async jwt({ token, account }) {
    //   console.log("\n\nJWT\n\n")
    //   // Persist the OAuth access_token to the token right after signin
    //   if (account) {
    //     token.accessToken = account.access_token
    //   }
    //   return token
    // },
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

    // async signIn({ profile }) {
    //   console.log('\n\n\n SIGN IN ')
    //   const UserEmail = profile?.email;
      
    //   let user = await db.user.findUnique({
    //     where: {email: UserEmail}
    //   })
    
    //   if (!user) {
    //     console.log("CREATING USER");    
    //     await db.user.create({
    //       data: {
    //         // discordId: profile.id,
    //         name: profile?.name,
    //         // discriminator: profile.discriminator,
    //         email: profile?.email,
    //         image: profile?.image? profile.image : profile?.picture,
    //         role: UserRole.USER,
    //         picture: profile?.picture,
    //       }
    //     });
    //   }
    //   return true;
    // },
    
    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url
    //   return baseUrl
    // },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
