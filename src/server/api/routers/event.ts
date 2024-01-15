import { z } from "zod";
import {env} from "@/env";
import { cache } from 'react'
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { create } from "domain";

// const key = process.env.NODE_ENV === "production" ? env.STRIPE_SECRET_KEY : env.STRIPE_SECRET_KEY_DEV
const key = env.STRIPE_SECRET_KEY_DEV
const stripe = require('stripe')(key);

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
import { getFetch } from "@trpc/client";




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

    getFeaturedEvent: publicProcedure
    .query(async ({ ctx }) => {
      try{
      const featuredEvent = await ctx.db.featuredEvent.findMany();
      if(featuredEvent && featuredEvent[0]){
        const eventData = await ctx.db.event.findUnique({
          where: {
            id: featuredEvent[0].eventId
          }
        })
        return eventData;
      }else{
        throw new Error("No Featured Event Found");
      }

      }catch(err){
        try{
          const nearestEvent = await ctx.db.event.findFirst({
            orderBy: {
              startDate: "asc"
            }
          });
          if (nearestEvent) {
            return nearestEvent;
          }

        }catch(err){
          return null;
        }
      }

      // if (!featuredEvent) {
      //   const nearestEvent = await ctx.db.event.findFirst({
      //     orderBy: {
      //       startDate: "asc"
      //     }
      //   });
      //   if (nearestEvent) {
      //     return nearestEvent;
      //   }
      // }

    }),

    setFeaturedEvent: protectedProcedure
    .input(z.object({
        eventId: z.string().min(1)
    }))
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.db.event.findUnique({
        where: {
          id: input.eventId
        },
        select: {
          id: true,
          title: false,
          headline: false,
          category: true,
          heroImage: false,
          startDate: false,
          startTime: false,
          ticketStartingPrice: false,
          location: false,
          address: false,
          eventDescription: false,
          length: false,
          capacity: false,
          postalCode: false,
          city: false,
          province: false,
          country: false,
          latlng: false,
          createdById: false,
          createdByEmail: false,
          private: false,
          drinksIncluded: false,
          foodIncluded: false,
          adultOnly: false,
          orgId: true,
          lat: false,
          lng: false,
        }
      });
      if (!event) {
        throw new Error("Event not found");
      }
      //delete old featured event
      void await ctx.db.featuredEvent.deleteMany();
      
      const featuredEvent = await ctx.db.featuredEvent.create({
        data: {
          event: {
            connect: {
              id: event.id
            }
          }
        }
      });
      return featuredEvent;
    }),



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

    getAllEvents: protectedProcedure
    .query(async ({ ctx }) => {
        const events = await ctx.db.event.findMany({
          where : {
            //start date is greater than today - 1 day
            archived: false
          }
        });
        return events;
    }),

    // CURRENTLY ONLY GETS EVENTS THAT HAVE YET TO START
      getEvents: publicProcedure
        .query(async ({ ctx }) => {
            const events = await ctx.db.event.findMany({
              where : {
                //start date is greater than today - 1 day
                startDate: {
                  gt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString()
                },
                archived: false
              }
            });
            return events;
        })
        ,


        getEventsByCategory: publicProcedure
        .input(z.object({
            category: z.string().min(1)
        }))
        .query(async ({ ctx, input }) => {
            const events = await ctx.db.event.findMany({
                where: {
                    category: input.category,
                    archived: false
                },
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

          const event = await ctx.db.event.findUnique({
            where: {
              id: input.eventId
            }
          });
          if (!event) {
            throw new Error("Event not found");
          }
          
          try{
            console.log("Attempting to delete evnt")
            return ctx.db.$transaction(async (prisma) => {
              const removedFeaturedEvent = await prisma.featuredEvent.deleteMany({
                where: {
                  eventId: input.eventId
                }
              });

              // const tickets = await prisma.ticketType.deleteMany({
              //   where: {
              //     eventId: input.eventId
              //   }
              // });

              //Delete Ticket Descriptions instead of tickets
              //ToDo DB NEEDS SERIOUS REFACTORING
              const tickets = await prisma.ticketType.updateMany({
                where: {
                  eventId: input.eventId
                },
                data: {
                  ticketDescription: "a",
                }
              });

              const event = await prisma.event.delete({
                where: {
                  id: input.eventId
                }
              });
              return {event, tickets,deleted: true};
            })
          }
          catch(err:any){
            console.log("ERROR")
            console.log("ERROR DELETING EVENT: ", err);

            //If this fails due to foriegn key restraints, instead delete the description to save space and mark the event as archived
            const event = await ctx.db.event.update({
              where: {
                id: input.eventId
              },
              data: {
                eventDescription: "a",
                archived: true,
                active: false
              }
            });

            //Now do the same for the tickets
            const tickets = await ctx.db.ticketType.updateMany({
              where: {
                eventId: input.eventId
              },
              data: {
                ticketDescription: "a",
              }
            });
            return {event, tickets, deleted: false};
          }
        }),

        archiveEvent: protectedProcedure
        .input(z.object({
            eventId: z.string().min(1)
        }))
        .mutation(async ({ ctx, input }) => {
          const event = await ctx.db.event.update({
            where: {
              id: input.eventId
            },
            data: {
              eventDescription: "a",
              archived: true,
              active: false
            }
          });

          //Now do the same for the tickets
          const tickets = await ctx.db.ticketType.updateMany({
            where: {
              eventId: input.eventId
            },
            data: {
              ticketDescription: "a",
            }
          });
          return {event, tickets, deleted: false};

        }),









        getEventById: protectedProcedure
        .input(z.object({
            eventId: z.string().min(1)
        }))
        .query(async ({ ctx, input }) => {
            const event = await ctx.db.event.findUnique({
                where: {
                    id: input.eventId
                }
            });
            return event;
        }),












        updateEventById: protectedProcedure
        .input(z.object({
            eventId: z.string().min(1),
            eventData: eventSchema
        }))
        .mutation(async ({ ctx, input }) => {
          const token =  process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
          const addr = input.eventData.address.replaceAll(" ", "%20");
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
          return ctx.db.$transaction(async (prisma) => {
            const event = await prisma.event.update({
              where: {
                id: input.eventId
              },
              data: {
                title: input.eventData.title,
                headline: input.eventData.headline,
                category: input.eventData.category,
                heroImage: input.eventData.heroImage,
                startDate: input.eventData.startDate,
                startTime: input.eventData.startTime,
                ticketStartingPrice: input.eventData.ticketStartingPrice,
                location: input.eventData.location,
                address: placeName.toString() ? placeName.toString() : "No Address Provided",
                eventDescription: input.eventData.eventDescription,
                length: input.eventData.length,
                capacity: input.eventData.capacity,
                postalCode: input.eventData.postalCode,
                city: input.eventData.city,
                province: input.eventData.province,
                lat: lat,
                lng: lng,
              
                country: input.eventData.country,
                latlng: center.toString() ? center.toString() : "0,0",
                // Assuming you have a userId in the context for the creator
                createdById: input.eventData.createdById,
                createdByEmail: input.eventData.createdByEmail,
                private: input.eventData.private,
                drinksIncluded: input.eventData.drinksIncluded,
                foodIncluded: input.eventData.foodIncluded,
                orgId: input.eventData.createdByOrg,
                adultOnly: input.eventData.adultOnly,
              }
            });
            
            //ToDo: we can re-implement this when we add the "live event" feature, and only allow this to be done if the event is not live
            // const oldTicketType = await prisma.ticketType.deleteMany({
            //   where: {
            //     eventId: event.id
              
            // }});

            const ticketTypePromises = input.eventData.ticketTypes.map(async (ticketType) => {
              const priceObj = await createTicketProduct(ticketType.name, ticketType.price, ticketType, event.id, event.title);
              // console.log("PRICE OBJECT FROM EVENT TRPC: ", priceObj);
              
              //Delete old ticket types
  

              return prisma.ticketType.create({
                data: {
                  ...ticketType,
                  eventId: event.id,
                  stripePriceId: priceObj.id,
                }
              });
            });

            const ticketRes =  await Promise.all(ticketTypePromises);
            
            return 
          })

        })
  });
  