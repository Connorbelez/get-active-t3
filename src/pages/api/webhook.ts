import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "@/env";
import { db as prisma } from "@/server/db";
import type Stripe from "stripe";
import { buffer } from "micro";

// import {
//   handleInvoicePaid,
//   handleSubscriptionCanceled,
//   handleSubscriptionCreatedOrUpdated,
// } from "./stripe-webhook-handlers";

import { stripe } from "@/server/api/routers/stripe";

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = env.STRIPE_DEV_WEBHOOOK_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig as string, "whsec_f9091769aa4af3b55279b6940bbf0bd4631a32f5ba6e3e4695c87a1534d2a332");

      // Handle the event
      switch (event.type) {
        case 'checkout.session.async_payment_failed':
          const checkoutSessionAsyncPaymentFailed = event.data.object;
          // Then define and call a function to handle the event checkout.session.async_payment_failed
          break;
        case 'checkout.session.async_payment_succeeded':
          const checkoutSessionAsyncPaymentSucceeded = event.data.object;
          // Then define and call a function to handle the event checkout.session.async_payment_succeeded
          
          break;
        case 'checkout.session.completed':
          const checkoutSessionCompleted = event.data.object;
          // Then define and call a function to handle the event checkout.session.completed
          // Fulfill the purchase
          console.log("CHECKOUT SESSION COMPLETED");
          
          break;
        case 'checkout.session.expired':
          const checkoutSessionExpired = event.data.object;
          // Then define and call a function to handle the event checkout.session.expired
          break;
        case 'payment_intent.succeeded':
          const paymentIntentSucceeded = event.data.object;

          console.log("PAYMENT INTENT SUCCEEDED: ", paymentIntentSucceeded)
          console.table(paymentIntentSucceeded)
          // Then define and call a function to handle the event payment_intent.succeeded
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      // record the event in the database
      // await prisma.stripeEvent.create({
      //   data: {
      //     id: event.id,
      //     type: event.type,
      //     object: event.object,
      //     api_version: event.api_version,
      //     account: event.account,
      //     created: new Date(event.created * 1000), // convert to milliseconds
      //     data: {
      //       object: event.data.object,
      //       previous_attributes: event.data.previous_attributes,
      //     },
      //     livemode: event.livemode,
      //     pending_webhooks: event.pending_webhooks,
      //     request: {
      //       id: event.request?.id,
      //       idempotency_key: event.request?.idempotency_key,
      //     },
      //   },
      // });

      res.json({ received: true });
    } catch (err) {
      res.status(400).send(err);
      return;
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}