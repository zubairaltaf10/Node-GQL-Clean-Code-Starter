import { rule } from "graphql-shield";
import { verifyToken } from "../../utils/auth";

export const isAuthorized = rule()(async (_, __, ctx) => {
  const { authorization } = ctx.req.headers;
  if (!authorization) {
    return false;
  }

  const token = authorization.replace("Bearer", "").trim();
  return !!verifyToken(token);
});
