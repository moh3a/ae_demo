import { DropshipperClient } from "ae_sdk";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env";

export const aeRouter = createTRPCRouter({
  fetch: publicProcedure.query(async () => {
    const client = new DropshipperClient({
      app_key: env.AE_APP_ID,
      app_secret: env.AE_APP_SECRET,
      session: "",
    });
    return await client.queryfeaturedPromoProducts({ feed_name: "Best" });
  }),
});
