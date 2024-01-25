// import Stripe from 'stripe';
import {env as envVar} from "@/env";

const Stripe = require('stripe');
// const stripe = Stripe("whsec_f9091769aa4af3b55279b6940bbf0bd4631a32f5ba6e3e4695c87a1534d2a332");
// const key = process.env.NODE_ENV === "production" ? envVar.STRIPE_SECRET_KEY : envVar.STRIPE_SECRET_KEY_DEV
const key = envVar.STRIPE_SECRET_KEY_DEV
const stripe = Stripe(key);

import {api} from "@/trpc/server";
import { ApiError } from "next/dist/server/api-utils";

// const stripe = new Stripe(
//     process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY ?? '',
//     {
//         // https://github.com/stripe/stripe-node#configuration
//         apiVersion: '2023-10-16',
//     }
// );

// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
import { headers } from 'next/headers';
import { describe } from "node:test";

const relevantEvents = new Set([

    'checkout.session.completed',
    'payment_intent.succeeded',
    // 'checkout.session.async_payment_succeeded',
    // 'checkout.session.async_payment_failed',
    // 'checkout.session.failed',
    // 'customer.subscription.created',
    // 'customer.subscription.updated',
    // 'customer.subscription.deleted',
    'charge.succeeded'
]);

export async function POST(req: Request) {

    console.log("\n\nWEBHOOK!!!!!")
    let webhookSecret;
    // const ticketSend = await import('@/app/api/tickets/ticketfulfillment/route')
    const body = await req.text();
    const sig = headers().get('Stripe-Signature') as string;

    const ev = process.env.NODE_ENV
if(ev == "development"){
  // do something
  webhookSecret = "whsec_f9091769aa4af3b55279b6940bbf0bd4631a32f5ba6e3e4695c87a1534d2a332";
}
else if (ev == "production"){
 // do something
webhookSecret = envVar.STRIPE_DEV_WEBHOOOK_SECRET;
}
   
    let event;
    // console.log("WEBHOOK BODY: ", body)

    try {
        if (!sig || !webhookSecret) return;
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
        console.log(`❌ Error message: ${err.message}`);
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (relevantEvents.has(event.type)) {
        console.log("\n\nRELEVANT EVENT: \n\n", event.type)
        
        try {
            switch (event.type) {

                case 'charge.succeeded':
                    // console.log("\n\n==========CHARGE SUCCEEDED=============\n\n")
                    // console.log("EVENT: ", event)
                    // console.log("EVENT DATA: ", event.data)
                    // // const product = (charge.metadata )
                    // console.log("\n\nPRODUCT: ", product)
                    // const customer = (charge.billing_details )
                    // console.log("\n\nCUSTOMER: ", customer)

                        // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.

                    break
                
                case 'payment_intent.succeeded':
                   
                    
                    // console.log("\n\n\n\n\n\n============PAYMENT INTENT SUCCEEDED=============== ")
                    // console.log(event)
                    // console.log(event)
                    // const data = event.data
                    // console.log("PAYMENT INTENT DATA: ", data)
                    // console.log(data)

                    // const sessionWithLineItems2 = await stripe.paymentIndents.retrieve(
                    //     // @ts-ignore
                    //     data.object.id,
                    //     {
                    //         expand: ['line_items'],
                    //     }
                    // );
                    // const lineItems2 = sessionWithLineItems2.line_items;
                    // // console.log("LINE ITEMS: ", lineItems)
                    // console.log(lineItems2)
                    // console.log("\n\n==========CHARGE Details=============\n\n")
                    // console.log("EVENT: ", event)
                    // console.log("EVENT DATA: ", event.data)


                    break;
                case 'checkout.session.completed':
                    console.log("\n\n ==================CHECKOUT SESSION COMPLETED================\n\n")
                    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
                        // @ts-ignore
                        event.data.object.id,
                        {
                            expand: ['line_items'],
                        }
                    );
                
                    console.log("ATTEMPTING TO SEND TICKET: ", event.data.object.id)
                    try{

                        const res = await api.ticket.sendTicket.mutate({
                            id:event.data.object.id
                        })
                        console.log("RES FROM WEBHOOK: ", res)
                    }catch(err){
                        console.error("ERROR FROM WEBHOOK after sending ticket: ", err)
                    }


                    const lineItems = sessionWithLineItems.line_items;
                    const price = lineItems.data[0].price
                    const amount = price.unit_amount_decimal
                    const charge = event.data.object 
                    const product = (charge.metadata )
                    const customer = (event.data.object.customer_details)
                    const customerEmail = customer.email
                    const name = customer.name
                    
                    // const checkoutData = {
                    //     checkoutProduct: product,
                    //     priceProduct: price,
                    //     customer: customer,
                    // }

                    // console.log("\n\nCHECKOUT DATA FROM WEBHOOK: ", checkoutData)

                //     // ctx: {
                //     //     // infers the `session` as non-nullable
                //     //     session: { ...ctx.session, user: ctx.session?.user },
                //     //   },
                //     api.ticket.sendFreeTicket.mutate.bind("ctx",JSON.parse(checkoutData.checkoutProduct.session))
                //     api.ticket.sendFreeTicket.mutate({
                //         ticket:{
                //         name: "sadf",
                //         price:0,
                //         ticketDescription: {description: "asdf"},
                //         drinksIncluded: false,
                //         foodIncluded: false,
                //         logo: "asdf",
                //         paymentTypes:"cash"
                //     },
                //     recipientEmail: "connor.belez@gmial.com",
                //     paymentOweing: false,
                //     eventName: "TEST",
                //     eventLocation: "asdf"
                // })
                    //NOW WE SEND THE TICKET TO THE USER

                    break;

                default:
                    throw new Error('Unhandled relevant event!');
            }
        } catch (error) {
            console.log(error);
            return new Response(
                'Webhook handler failed. View your nextjs function logs.',
                {
                    status: 400
                }
            );
        }
    }
    return new Response(JSON.stringify({ received: true }));
}