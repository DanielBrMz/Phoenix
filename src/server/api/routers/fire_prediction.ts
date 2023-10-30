import { z } from "zod";
import { kv } from '@vercel/kv';

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const firePredictionRouter = createTRPCRouter({
  getCurrentFires: publicProcedure
    .query(() => {
      // await kv.set('key', 'value');
      // const fires = await kv.get('current_fires');
      return {
        fires: []
      };
    }),
});
