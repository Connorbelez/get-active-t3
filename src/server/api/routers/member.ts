import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { get } from "http";

export const memberRouter = createTRPCRouter({

    bactchChangeUserRole: protectedProcedure
    .input(z.object({
        userIds: z.array(z.string()),
        role: z.enum(["USER","CREATOR","ADMIN"])
    }))
    .mutation(async ({ ctx, input }) => {
        const users = await ctx.db.user.updateMany({
            where: {
                id: {
                    in: input.userIds
                }
            },
            data: {
                role: input.role
            }
        })
        return users
    }),

    getAll: protectedProcedure
    .query(async ({ ctx }) => {
        const users = await ctx.db.user.findMany()
        return users
    }),

    getUserById: publicProcedure
    .input(z.object({
        id: z.string()
    }))
    .query(async ({ ctx, input }) => {
        const user = await ctx.db.user.findUnique({
            where: {
                id: input.id
            }
        })
        return user
    }),



    updateUserById: protectedProcedure 
    .input(z.object({
        id: z.string(),
        data: z.object(
        {
            name: z.string().optional(),
            email: z.string().optional(),
            image: z.string().optional(),
            role: z.enum(["USER","CREATOR","ADMIN"]).optional(),
            orgId: z.string().optional(),
        }
        )

    }))
    .mutation(async ({ ctx, input }) => {
        const user = await ctx.db.user.update({
            where: {
                id: input.id
            },
            data: {
                ...input.data
            }
        })
        return user
    }),


    // getUsersByOrgId: protectedProcedure
    // .input(z.object({
    //     orgId: z.string()
    // }))
    // .query(async ({ ctx, input }) => {
    //     const users = await ctx.db.user.findMany({
    //         where: {
    //             orgId: input.orgId
    //         }
    //     })
    //     return users
    // }),
    




    getUsersSavedEvents: protectedProcedure
    .query(async ({ ctx }) => {
        const savedEvents = await ctx.db.savedEvent.findMany({
            where: {
                userId: ctx.session.user.id
            }
        })
        return savedEvents
    }),


    getUsersFulfilledTickets: protectedProcedure
    .query(async ({ ctx }) => {
        const fulfilledTickets = await ctx.db.fulfilledTicket.findMany({
            where: {
                userId: ctx.session.user.id
            }
        })
        return fulfilledTickets
    }),

    getUsersFulfilledTicketsWithTicketType: protectedProcedure
    .query(async ({ ctx }) => {
        const fulfilledTickets = await ctx.db.fulfilledTicket.findMany({
            where: {
                userId: ctx.session.user.id
            },
            include: {
                ticket: {
                    include:{
                        event: {
                            select:{
                                eventDescription:false,
                                id: false,
                                createdAt: false,
                                updatedAt: false,
                                title: true,
                                headline: false,
                                category: true,
                                heroImage: true,
                                startDate: true,
                                startTime: true,
                                private: true,
                                active: true,
                                ticketStartingPrice: false,
                                location: true,
                                address: true,
                                postalCode: true,
                                province: true,
                                city: true,
                                country: true,
                                latlng: true,
                                lat: true,
                                lng: true,
                                adultOnly: true,
                                drinksIncluded: false,
                                foodIncluded: false,
                                createdById: false,
                                createdByEmail: false,
                                length: true,
                                capacity: false,
                                orgId: true,
                                createdBy: false,
                                ticketTypes: false,
                                Org: true,
                                ticketSales: false,
                                FeaturedEvent: false,
                                SavedEvent: false,
                            }
                        }
                    }
                }
            }
        })
        return fulfilledTickets
    }),


    getUserReciepts: protectedProcedure
    .query(async ({ ctx }) => {
        const user = await ctx.db.user.findUnique({
            where: {
                id: ctx.session.user.id
            }
        })

        const reciepts = await ctx.db.stripeTransaction.findMany({
            where: {
                OR:[
                    {
                        userEmail: user?.email
                    },
                    {
                        customerEmail: user?.stripeEmail || ""
                    }
                ]
            }
        })


        return reciepts
    }),

    







})