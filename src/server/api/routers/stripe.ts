import Stripe from "stripe";
import { env } from "@/env";

export const stripe = new Stripe(env.STRIPE_WEBHOOK_SECRET, {
  apiVersion: "2023-10-16",
});