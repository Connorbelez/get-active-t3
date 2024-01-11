import { postRouter } from "@/server/api/routers/post";
import { createTRPCRouter } from "@/server/api/trpc";
import { eventRouter } from "./routers/event";
import { ticketRouter } from "./routers/ticket";
import { memberRouter } from "./routers/member";
import {dataRouter } from "./routers/data";
// import { usersRouter } from "./routers/users";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  event: eventRouter,
  ticket: ticketRouter,
  // users: usersRouter,
  member: memberRouter,
  data: dataRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
