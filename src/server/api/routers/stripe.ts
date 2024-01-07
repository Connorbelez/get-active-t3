import Stripe from "stripe";
import { env } from "@/env";

export const stripe = new Stripe(env.STRIPE_WEBHOOK_SECRET, {
  apiVersion: "2023-10-16",
});

import { getServerAuthSession } from "@/server/auth";




// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// async function createTicketProduct(name:string, eventName, eventid,price:number,images?){
//     const product = await stripe.products.create({
//         name: name,
//         images:["https://i.imgur.com/lJS8onS.png","https://i.imgur.com/HOcHl4h.png"],
//         metadata: {eventid: eventid, eventname: eventName},
//     });
//     const priceObject = await stripe.prices.create({
//         unit_amount: price,
//         currency: 'CAD',
//         product: product.id,
//         metadata: product.metadata
//     });

//     return priceObject
// }


// export default async function handler(req, res) {
// // const session = await getServerAuthSession();
// // if (!session || !session.user) {
// //     res.status(401).json({ message: "Unauthorized" });
// //     return;
// // }
// //   const user = session.user;
//     const body = JSON.parse(req.body);
//     const price = body.price;
//     const name = body.ticketName;
//     const eventid = body.eventId;
//     const eventName = body.eventName;
//     const priceObj = await createTicketProduct(name, eventName, eventid, price);


//   switch (req.method) {
//     case "POST":
//       try {
//         // Create Checkout Sessions from body params.
//         const session = await stripe.checkout.sessions.create({
//           ui_mode: 'embedded',
//           line_items: [
//             {
//               // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//               price: priceObj.id,
//               quantity: 1,
//             },
//           ],
//           mode: 'payment',
//           metadata: {eventid: eventid, eventname: eventName, ticketname: name, price: price},
//           return_url: `${req.headers.origin}/return?session_id={CHECKOUT_SESSION_ID}`,
//         });

//         res.send({clientSecret: session.client_secret});
//       } catch (err) {
//         res.status(err.statusCode || 500).json(err.message);
//       }
//     case "GET":
//       try {
//         const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

//         res.send({
//           status: session.status,
//           customer_email: session.customer_details.email
//         });
//       } catch (err) {
//         res.status(err.statusCode || 500).json(err.message);
//       }
//     default:
//       res.setHeader('Allow', req.method);
//       res.status(405).end('Method Not Allowed');
//   }
// }