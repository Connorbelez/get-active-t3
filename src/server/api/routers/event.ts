import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { create } from "domain";


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

export const eventRouter = createTRPCRouter({

    create: protectedProcedure
    .input(eventSchema)
    .mutation(async ({ ctx, input }) => {
        // console.log(input);
        // console.log("ATTEMPTING INSERT")
      return ctx.db.$transaction(async (prisma) => {
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
            address: input.address,
            eventDescription: input.eventDescription,
            length: input.length,
            capacity: input.capacity,
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

        const ticketTypePromises = input.ticketTypes.map(ticketType => {
          return prisma.ticketType.create({
            data: {
              ...ticketType,
              eventId: newEvent.id,
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
  });
  