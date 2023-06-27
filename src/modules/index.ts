import GameResolver from "./game/resolver";
import ReviewResolver from "./review/resolver";
import UserResolver from "./user/resolver";

export const resolvers: [Function, ...Function[]] = [
  GameResolver,
  ReviewResolver,
  UserResolver,
];
