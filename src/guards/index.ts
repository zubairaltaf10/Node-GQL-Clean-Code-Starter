import { shield, and } from "graphql-shield";
import { isAuthorized } from "./rules";
import { createRateLimitRule } from "graphql-rate-limit";

const rateLimitRule = createRateLimitRule({ identifyContext: (ctx) => ctx.id });
export const permissions = shield({
  Query: {
    getGame: and(isAuthorized, rateLimitRule({ window: "1s", max: 1 })),
    getReview: and(isAuthorized, rateLimitRule({ window: "1d", max: 1 }))
  },
  Mutation: {
    createGame: and(isAuthorized, rateLimitRule({ window: "1d", max: 1 })),
    createReview: and(isAuthorized, rateLimitRule({ window: "1d", max: 1 })),
  },
});
