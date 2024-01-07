import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import {env} from "@/env";
import {api} from "@/trpc/server";
import {TicketType} from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next";
const stripe = require('stripe')(env.STRIPE_SECRET_KEY);
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from "next/server";


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
        const priceObj = await createTicketProduct(ticketData.name, ticketData.event.title, ticketData.eventId, ticketData.price, ticketData,user.email);

        //console.log("PRICE OBJ: ", priceObj)
        console.table(priceObj)
        //console.log("CREATING CHECKOUT SESSION WITH POST!")
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          ui_mode: 'embedded',
          line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
              price: priceObj.id,
              quantity: 1,
            }
          ],
          mode: 'payment',
          metadata: {        
            metaDataTag: "CHECKOUT TICKET METADATA",    
            userSessionEmail: user.email,
            userSession:JSON.stringify(sessionObj) as string,
          },
          return_url: `https://localhost:3000/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.json({clientSecret: session.client_secret})

      } catch (err) {
        

        return NextResponse.json({ message: "Error: " + err.message, status: err.statusCode || 500 });
      }
    case "GET":

      console.table(req)

      try {

        const session = await stripe.checkout.sessions.retrieve(req.nextUrl.searchParams.get("session_id"));

        NextResponse.json({ status: session.status, customer_email: session.customer_details.email });
      } catch (err) {

        NextResponse.json({ message: "Error: " + err.message, status: err.statusCode || 500 });
      }
    default:
      headers.set('Allow', req.method)
      return NextResponse.json({ message: "Method Not Allowed", status: 405, headers: headers});
  }
}


export {handler as POST, handler as GET}