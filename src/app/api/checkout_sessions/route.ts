import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import {env} from "@/env";
import {api} from "@/trpc/server";
import {TicketType} from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from "next/server";


const stripe = require('stripe')(env.STRIPE_SECRET_KEY_DEV);
async function createTicketProduct(name,eventName, eventid, price,ticketData,userEmail){
    const product = await stripe.products.create({
        name: name,
        images:["https://i.imgur.com/lJS8onS.png","https://i.imgur.com/HOcHl4h.png"],
        metadata: { 
          metaDataTag: "TICKET PRODUCT METADATA",        
          eventId: ticketData.eventId,
          eventTitle: ticketData.event.title,
          eventAddress: ticketData.event.address,
          eventStartTime: ticketData.event.startTime,
          eventStartDate: ticketData.event.startDate,
          eventHeroImage: ticketData.event.heroImage,
          id: ticketData.id,
          name: ticketData.name,
          price: ticketData.price,
          paymentOweing: ticketData.paymentOweing,
          drinksIncluded: ticketData.drinksIncluded,
          foodIncluded: ticketData.foodIncluded,
          logo: ticketData.logo,
          ticketDescription: JSON.stringify(ticketData.ticketDescription) as string,
          userSessionEmail: userEmail,
        },
    });
    const priceObject = await stripe.prices.create({
        unit_amount: price * 100,
        currency: 'CAD',
        product: product.id,
        metadata: product.metadata
    });

    return priceObject
}


async function handler(req:NextRequest) {
const session = await getServerAuthSession();
const cookies = req.cookies.getAll();
const res = NextResponse.next();
const headers = new Headers(req.headers)
if (!session || !session.user) {
    
    return NextResponse.json({ message: "Unauthorized",status: 401 });
    
}
  const user = session.user;

  const sessionObj = session

    // const ticketName = body.ticketName;
 


  switch (req.method) {
    case "POST":
      try {
        const body = await req.json()
        // ////console.log("BODY FROM ROUTE.JS POST: ", body)
        // console.table(body)
        const ticketId = body.ticketId;
        // ////console.log("=================TICKET ID FROM ROUTE.JS: ", ticketId)
        //ToDo: CHnage this and hte route to use the stripe price id instead of the ticket id
        const ticketData = await db.ticketType.findUniqueOrThrow({
          where: {
              id: ticketId,
          },
          
          include: {
              event: {
                select:{
                  id: true,
                  title: true,
                  address: true,
                  startTime: true,
                  startDate: true,
                  eventDescription: false,
                  heroImage: true,
                },
              },   
          },
      });
        ////console.log("TICKET DATA FROM PRISMA, ROUTE.JS :", ticketData)
        console.log(ticketData)

        
        ////console.log("\n\n\n\n ===============NAME: ", name,"\n\n\n\n")
        if(!ticketId || !ticketData.price || !ticketData.name || !ticketData.eventId || !ticketData.event.title){
          return NextResponse.json({ message: "Missing parameters: " + JSON.stringify(body) });
        }
        // const priceObj = await createTicketProduct(ticketData.name, ticketData.event.title, ticketData.eventId, ticketData.price, ticketData,user.email);

        // //console.log("PRICE OBJ: ", priceObj)
        // console.table(priceObj)
        //console.log("CREATING CHECKOUT SESSION WITH POST!")
        // Create Checkout Sessions from body params.
        const retUrl = process.env.NODE_ENV === "production" ? `https://getaktive.vercel.app/checkout/return?session_id={CHECKOUT_SESSION_ID}` : `https://localhost:3000/checkout/return?session_id={CHECKOUT_SESSION_ID}`
        const session = await stripe.checkout.sessions.create({
          ui_mode: 'embedded',
          line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
              price: ticketData.stripePriceId,
              quantity: 1,
            }
          ],
          // invoice:'true',
          // invoice_creation:{
          //   enabled: true,
          // },

          mode: 'payment',
          
          
          metadata: {        
            metaDataTag: "CHECKOUT TICKET METADATA",    
            userSessionEmail: user.email,
            userSession:JSON.stringify(sessionObj) as string,
            eventHeroImage: ticketData.event.heroImage,
            eventId: ticketData.eventId,
          },
          return_url: retUrl,
        });
        console.log("SESSION: FROM CREATE SESSION: ", session)
        return NextResponse.json({clientSecret: session.client_secret})

      } catch (err) {
        

        return NextResponse.json({ message: "Error: " + err.message, status: err.statusCode || 500 });
      }
    case "GET":
      console.log("GETTING CHECKOUT SESSION")
      console.table(req)

      try {

        // const session = await stripe.checkout.sessions.retrieve(req.nextUrl.searchParams.get("session_id"));
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
          // @ts-ignore
          req.nextUrl.searchParams.get("session_id"),
          {
              expand: ['line_items'],
          }
      );

      
      const paymentIntentId = sessionWithLineItems.payment_intent;
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      const latestChargeId = paymentIntent.latest_charge;
      const latestCharge = await stripe.charges.retrieve(latestChargeId);
      const receiptUrl = latestCharge.receipt_url;


        return NextResponse.json({ status: sessionWithLineItems.status, customer_email: sessionWithLineItems.customer_details.email, receiptUrl: receiptUrl });
      } catch (err) {

        NextResponse.json({ message: "Error: " + err.message, status: err.statusCode || 500 });
      }
    default:
      headers.set('Allow', req.method)
      return NextResponse.json({ message: "Method Not Allowed", status: 405, headers: headers});
  }
}


export {handler as POST}
export {handler as GET}