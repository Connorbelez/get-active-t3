// import Stripe from 'stripe';
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51NONQvAXXlLBfJHe5OlR5PAyjLXyKFBqpMtGp3btR51UwtBZ43UcLdAwWrwHingHXZQbsAY4JL0eMonFIRQRgCOM00RaPM81DV');



// const stripe = new Stripe(
//     process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY ?? '',
//     {
//         // https://github.com/stripe/stripe-node#configuration
//         apiVersion: '2023-10-16',
//     }
// );

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
import { headers } from 'next/headers';

const relevantEvents = new Set([

    'checkout.session.completed',
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

    const env = process.env.NODE_ENV
if(env == "development"){
  // do something
  webhookSecret = "whsec_f9091769aa4af3b55279b6940bbf0bd4631a32f5ba6e3e4695c87a1534d2a332"
}
else if (env == "production"){
 // do something
webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
}
   
    let event;
    // console.log("WEBHOOK BODY: ", body)

    try {
        if (!sig || !webhookSecret) return;
        event = stripe.webhooks.constructEvent(body, sig, "whsec_f9091769aa4af3b55279b6940bbf0bd4631a32f5ba6e3e4695c87a1534d2a332");
    } catch (err: any) {
        console.log(`❌ Error message: ${err.message}`);
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (relevantEvents.has(event.type)) {
        console.log("\n\nRELEVANT EVENT: \n\n", event.type)
        try {
            switch (event.type) {

                case 'charge.succeeded':
                    console.log("\n\n==========CHARGE SUCCEEDED=============\n\n")
                    console.log("EVENT: ", event)
                    // console.log("EVENT DATA: ", event.data)
                    // console.log("EVENT DATA OBJECT: ", event as Stripe.Event)
                    // const charge = event.data.object as Stripe.Charge;
                    // console.log("CHARGE: ", charge.object)
                    // const product = (charge.metadata )
                    // console.log("\n\nPRODUCT: ", product)
                    // const customer = (charge.billing_details )
                    // console.log("\n\nCUSTOMER: ", customer)

                        // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.

                    break

                case 'checkout.session.completed':
                    console.log("\n\n ==================CHECKOUT SESSION COMPLETED================\n\n")
                    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
                        // @ts-ignore
                        event.data.object.id,
                        {
                            expand: ['line_items'],
                        }
                    );
                    const lineItems = sessionWithLineItems.line_items;
                    // console.log("LINE ITEMS: ", lineItems)
                    console.table(lineItems)


                    console.log("\n\n==========CHARGE Details=============\n\n")

                    console.log("EVENT: ", event)
                    // console.log("EVENT DATA: ", event.data)
                    // console.log("EVENT DATA OBJECT: ", event as Stripe.Event)

                    const charge = event.data.object 
                    console.log("CHARGE: ", charge.object)

                    const product = (charge.metadata )
                    console.log("\n\nPRODUCT: ", product)

                    // @ts-ignore
                    const customer = (event.data.object.customer_details)
                    console.log("\n\nCUSTOMER: ", customer)
                    console.log("\n\nFULFILLING TICKET!!!!\n\n")
                    // const res = await ticketSend.POST({product: product, customer: customer});
                    // console.log("\n\nRES: ", res)
                    // if (res.status === 200) {
                    //    console.log("Fulfilled ticket!")
                    // }
                    // else {
                    //     console.log("Ticket fulfillment failed!")
                    //     //throw error
                    //     throw new Error('Ticket fulfillment failed!');
                    // }
                    break
                    // const paymentSession = event.data.object as Stripe.PaymentSession;
                    // console.log("PAYMENT SESSION: ", paymentSession)

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