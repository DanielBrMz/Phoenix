import { firePredictionRouter } from "~/server/api/routers/fire_prediction";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: firePredictionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
