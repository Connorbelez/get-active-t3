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
                const fullfilledTickets = await ctx.db.fulfilledTicket.findMany({
                    where:{
                        eventId: input.eventId
                    }
                })
                const rsvpd = await ctx.db.savedEvent.findMany({
                    where:{
                        eventId: input.eventId
                    }
                })
                return {
                    sentTickets: fullfilledTickets,
                    rsvp: rsvpd
                }
            }

            const fullfilledTickets = await ctx.db.fulfilledTicket.findMany()
            const rsvpd = await ctx.db.savedEvent.findMany()

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
                const rsvpd = await ctx.db.savedEvent.findMany({
                    where:{
                        eventId: input.eventId
                    }
                })
                return {
                    rsvp: rsvpd
                }
            }   

            const rsvpd = await ctx.db.savedEvent.findMany()
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
            const fullfilledTickets = await ctx.db.fulfilledTicket.findMany({
                where:{
                    eventId: input.eventId
                }
            })
            return {
                sentTickets: fullfilledTickets,
            }
        }

        const fullfilledTickets = await ctx.db.fulfilledTicket.findMany()
        return {
            sentTickets: fullfilledTickets,
        }
    }),


    getAllStripePurchases: protectedProcedure
    .input(z.object({
        eventId: z.string().optional(),
    }))
    .query(async ({ctx})=>{
        const stripePurchases = await ctx.db.stripeTransaction.findMany()
        return {
            stripePurchases: stripePurchases
        }
    }),

    getAllStripePurchasesByUsers: protectedProcedure
    .input(z.object({
        userIds: z.array(z.string()),
    }))
    .query(async ({ctx,input})=>{
        const stripePurchases = await ctx.db.stripeTransaction.findMany({
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
        const countConfirmed = await ctx.db.fulfilledTicket.count({
            where: {
                eventId: input.eventId,
            },
        });
        const countRsvpd = await ctx.db.savedEvent.count({
            where: {
                eventId: input.eventId,
            },
        });

    const firstTenConfirmed = await ctx.db.fulfilledTicket.findMany({
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




    
    const firstTenRsvpd = await ctx.db.savedEvent.findMany({
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