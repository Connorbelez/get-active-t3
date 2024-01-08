import { z } from "zod";
import {env} from "@/env";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { create } from "domain";
const stripe = require('stripe')(env.STRIPE_SECRET_KEY);

import { eventSchema } from "@/types/schemas";

//   model TicketType {
//     id            String     @id @default(cuid())
//     name          String
//     price         Int
//     paymentOweing Boolean @default(false)
//     event         Event   @relation(fields: [eventId], references: [id])
//     eventId       String
  
//     ticketDescription Json
  
//     drinksIncluded Boolean @default(false)
//     foodIncluded   Boolean @default(false)
  
//     @@index([eventId])
//     @@index([id])
//   }
import { TicketType } from "@prisma/client";
import { c } from "@vercel/blob/dist/put-FLtdezzu.cjs";




async function createTicketProduct(name, price,ticketData, eventId,eventTitle){
  const product = await stripe.products.create({
      name: name,
      images:["https://i.imgur.com/lJS8onS.png","https://i.imgur.com/HOcHl4h.png"],
      metadata: { 
        metaDataTag: "TICKET PRODUCT METADATA",        
        eventId: eventId,
        eventTitle: eventTitle,
        // eventAddress: ticketData.event.address,
        // eventStartTime: ticketData.event.startTime,
        // eventStartDate: ticketData.event.startDate,
        // eventHeroImage: ticketData.event.heroImage,
        id: ticketData.id,
        name: ticketData.name,
        price: ticketData.price,
        paymentOweing: ticketData.paymentOweing,
        drinksIncluded: ticketData.drinksIncluded,
        foodIncluded: ticketData.foodIncluded,
        logo: ticketData.logo,
        ticketDescription: JSON.stringify(ticketData.ticketDescription) as string,
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




export const eventRouter = createTRPCRouter({

    create: protectedProcedure
    .input(eventSchema)
    .mutation(async ({ ctx, input }) => {
        // console.log(input);
        // console.log("ATTEMPTING INSERT")
        // const ticketDataArray = input.ticketTypes;
        // for (let i = 0; i < ticketDataArray.length; i++) {
        //   const ticketData = ticketDataArray[i];
        //   if (ticketData) {
        //     const priceObj = await createTicketProduct(ticketData.name, input.title, input., ticketData.price, ticketData, user.email);
        //   }
        // }
      // const priceObj = await createTicketProduct(ticketData.name, ticketData.event.title, ticketData.eventId, ticketData.price, ticketData,user.email);

      return ctx.db.$transaction(async (prisma) => {
        const token =  process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
        const addr = input.address.replaceAll(" ", "%20");
        const val = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${addr}.json?access_token=${token}`)
        console.log(val);
        console.table(val);
        
        const res = await val.json();
        console.log(res);
        console.table(res);
        const geometry = res.features[0].geometry;
        const placeName = res.features[0].place_name;
        const center = res.features[0].center;
        const placeType = res.features[0].place_type;
        console.log("Geometry: ")
        console.log(geometry);
        
        console.log("Place Name: ")
        console.log(placeName);

        console.log("Center: ")
        console.log(center);

        console.log("Place Type: ")
        console.log(placeType);

        const [lat,lng] = center; 

        const newEvent = await prisma.event.create({
          data: {
            // name: input.name,
            title: input.title,
            headline: input.headline,
            category: input.category,
            heroImage: input.heroImage,
            startDate: input.startDate,
            startTime: input.startTime,
            ticketStartingPrice: input.ticketStartingPrice,
            location: input.location,
            address: placeName.toString() ? placeName.toString() : "No Address Provided",
            eventDescription: input.eventDescription,
            length: input.length,
            capacity: input.capacity,
            postalCode: input.postalCode,
            city: input.city,
            province: input.province,
            lat: lat,
            lng: lng,
          
            country: input.country,
            latlng: center.toString() ? center.toString() : "0,0",
            // Assuming you have a userId in the context for the creator
            createdById: input.createdById,
            createdByEmail: input.createdByEmail,
            private: input.private,
            drinksIncluded: input.drinksIncluded,
            foodIncluded: input.foodIncluded,
            orgId: input.createdByOrg,
            adultOnly: input.adultOnly,
          }
        });

        // const ticketDataArray = input.ticketTypes;
        // for (let i = 0; i < ticketDataArray.length; i++) {
        //   const ticketData = ticketDataArray[i];
        //   if (ticketData) {
        //     const priceObj = await createTicketProduct(ticketData.name, input.title, input., ticketData.price, ticketData, user.email);
        //   }
        // }

        const ticketTypePromises = input.ticketTypes.map(async (ticketType) => {
          const priceObj = await createTicketProduct(ticketType.name, ticketType.price, ticketType, newEvent.id, newEvent.title);
          // console.log("PRICE OBJECT FROM EVENT TRPC: ", priceObj);

          return prisma.ticketType.create({
            data: {
              ...ticketType,
              eventId: newEvent.id,
              stripePriceId: priceObj.id,
            }
          });
        });

        await Promise.all(ticketTypePromises);

        return newEvent;
      });
    }),

      getEvents: publicProcedure
        .query(async ({ ctx }) => {
            const events = await ctx.db.event.findMany();
            return events;
        }),


        getEventsByCategory: publicProcedure
        .input(z.object({
            category: z.string().min(1)
        }))
        .query(async ({ ctx, input }) => {
            const events = await ctx.db.event.findMany({
                where: {
                    category: input.category
                }
            });
            return events;
        }),

        getEventsByOrg: publicProcedure
        .input(z.object({
            orgId: z.string().min(1)
        }))
        .query(async ({ ctx, input }) => {
            const events = await ctx.db.event.findMany({
                where: {
                    orgId: input.orgId
                }
            });
            return events;
        }),


        getTicketsByEvent: publicProcedure
        .input(z.object({
            eventId: z.string().min(1)
        }))
        .query(async ({ ctx, input }) => {
            const tickets:TicketType[] = await ctx.db.ticketType.findMany({
                where: {
                    eventId: input.eventId
                }
            });
            console.log(tickets);
            console.table(tickets);
            console.log("TICKETS: ", typeof tickets);
            return tickets;
        }),

        deleteEvent: protectedProcedure
        .input(z.object({
            eventId: z.string().min(1)
        }))
        .mutation(async ({ ctx, input }) => {
          return ctx.db.$transaction(async (prisma) => {
            const tickets = await prisma.ticketType.deleteMany({
              where: {
                eventId: input.eventId
              }
            });
            const event = await prisma.event.delete({
              where: {
                id: input.eventId
              }
            });
            return {event, tickets};
          })
        })
  });
  