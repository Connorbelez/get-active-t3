import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.NEXTAUTH_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url()
    ),
    DISCORD_CLIENT_ID: z.string(),
    DISCORD_CLIENT_SECRET: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
    STRIPE_DEV_WEBHOOOK_SECRET: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_SECRET_KEY_DEV: z.string(),
    GOOGLE_ID: z.string(), 
    GOOGLE_SECRET: z.string(),
    DATABASE_URL: z.string(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_STRIPE_DEV_PUBLISHABLE_KEY: z.string().min(1),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // DISCORD_CLIENT_ID: z.string().refine(DISCORD_CLIENT_ID),
    // DISCORD_CLIENT_SECRET: z.string(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_STRIPE_DEV_PUBLISHABLE_KEY: z.string().min(1),
    // GOOGLE_ID: z.string(), 
    // GOOGLE_SECRET: z.string(),
    // NEXTAUTH_URL: z.preprocess(
    //   // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
    //   // Since NextAuth.js automatically uses the VERCEL_URL if present.
    //   (str) => process.env.NEXTAUTH_URL ?? str,
    //   // VERCEL_URL doesn't include `https` so it cant be validated as a URL
    //   process.env.VERCEL ? z.string() : z.string().url()
    // ),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    CLOUD_FLARE_BUCKET_ACCESS_ID: process.env.CLOUD_FLARE_BUCKET_ACCESS_ID,
    CLOUD_FLARE_BUCKET_SECRET_ID: process.env.CLOUD_FLARE_BUCKET_SECRET_ID,
    CLOUD_FLARE_BUCKET_TOKEN: process.env.CLOUD_FLARE_BUCKET_TOKEN,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET:process.env.GOOGLE_SECRET,
    
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_DEV_WEBHOOOK_SECRET: process.env.STRIPE_DEV_WEBHOOOK_SECRET,
    
    NEXT_PUBLIC_STRIPE_DEV_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_DEV_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLABLE_KEY,
    
    STRIPE_SECRET_KEY_DEV: process.env.STRIPE_SECRET_KEY_DEV,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
