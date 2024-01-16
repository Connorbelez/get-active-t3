export const runtime = 'edge'
import { z } from "zod";
import {env} from "@/env";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const dataRouter = createTRPCRouter(({


    getAllEventAttendees: protectedProcedure
    .input(z.object({
        eventId: z.string().optional(),
    }))
    .query(async ({ctx,input})=>{
            if(input.eventId){
                const fullfilledTickets = await ctx.acceleratedDb.fulfilledTicket.findMany({
                    where:{
                        eventId: input.eventId
                    }
                })
                const rsvpd = await ctx.acceleratedDb.savedEvent.findMany({
                    where:{
                        eventId: input.eventId
                    }
                })
                return {
                    sentTickets: fullfilledTickets,
                    rsvp: rsvpd
                }
            }

            const fullfilledTickets = await ctx.acceleratedDb.fulfilledTicket.findMany()
            const rsvpd = await ctx.acceleratedDb.savedEvent.findMany()

            return {
                sentTickets: fullfilledTickets,
                rsvp: rsvpd
            }
        }
    ),

    getAllRsvpdUsers: protectedProcedure
    .input(z.object({
        eventId: z.string().optional(),
    }))
    .query(async ({ctx,input})=>{

            if(input.eventId){
                const rsvpd = await ctx.acceleratedDb.savedEvent.findMany({
                    where:{
                        eventId: input.eventId
                    }
                })
                return {
                    rsvp: rsvpd
                }
            }   

            const rsvpd = await ctx.acceleratedDb.savedEvent.findMany()
            return {
                rsvp: rsvpd
            }
    }),



    getAllFullFilledTickets: protectedProcedure
    .input(z.object({
        eventId: z.string().optional(),
    }))
    .query(async ({ctx,input})=>{
        if(input.eventId){
            const fullfilledTickets = await ctx.acceleratedDb.fulfilledTicket.findMany({
                where:{
                    eventId: input.eventId
                }
            })
            return {
                sentTickets: fullfilledTickets,
            }
        }

        const fullfilledTickets = await ctx.acceleratedDb.fulfilledTicket.findMany()
        return {
            sentTickets: fullfilledTickets,
        }
    }),


    getAllStripePurchases: protectedProcedure
    .input(z.object({
        eventId: z.string().optional(),
    }))
    .query(async ({ctx})=>{
        const stripePurchases = await ctx.acceleratedDb.stripeTransaction.findMany()
        return {
            stripePurchases: stripePurchases
        }
    }),

    getAllStripePurchasesByUsers: protectedProcedure
    .input(z.object({
        userIds: z.array(z.string()),
    }))
    .query(async ({ctx,input})=>{
        const stripePurchases = await ctx.acceleratedDb.stripeTransaction.findMany({
            where:{
                userId:{
                    in: input.userIds
                }
            }
        })
        return {
            stripePurchases: stripePurchases
        }
    }),

    
    getEventAttendeePreview: publicProcedure
    .input(z.object({
        eventId: z.string(),
    }))
    .query(async ({ctx,input})=>{
        const countConfirmed = await ctx.acceleratedDb.fulfilledTicket.count({
            where: {
                eventId: input.eventId,
            },
        });
        const countRsvpd = await ctx.acceleratedDb.savedEvent.count({
            where: {
                eventId: input.eventId,
            },
        });

    const firstTenConfirmed = await ctx.acceleratedDb.fulfilledTicket.findMany({
        where: {
            eventId: input.eventId,
        },
        select:{   
            user:{
                select:{
                    name: true,
                    image: true,
                    email:false,
                    role:false,
                    emailVerified:false,
                    id:false,
                    adminFor:false,
                    adminForOrgId:false,
                }
            },
        },
        take: 10,
    });
    const firstTenRsvpd = await ctx.acceleratedDb.savedEvent.findMany({
        where: {
            eventId: input.eventId,
        },
        select:{   
            user:{
                select:{
                    name: true,
                    image: true,
                    email:false,
                    role:false,
                    emailVerified:false,
                    id:false,
                    adminFor:false,
                    adminForOrgId:false,
                }
            },
        },
        take: 10,
    });

    return {
        countConfirmed: countConfirmed,
        countRsvpd: countRsvpd,
        firstTenConfirmed: firstTenConfirmed,
        firstTenRsvpd: firstTenRsvpd,
    };
    })


}))