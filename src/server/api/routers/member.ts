import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const memberRouter = createTRPCRouter({

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



    updateUserById: publicProcedure
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
    })


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






})