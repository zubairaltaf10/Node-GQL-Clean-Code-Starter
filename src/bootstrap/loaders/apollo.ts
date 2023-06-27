import { ApolloServer } from "apollo-server-express";
import { applyMiddleware } from "graphql-middleware";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { Request, Response } from "express";
import { buildSchema } from "../../utils";
import { permissions } from "../../guards";

interface Context {
  req: Request;
  res: Response;
}
export default async () => {
  const schema = await buildSchema();
  const schemaWithPermissions = applyMiddleware(schema, ...[permissions]);

  return new ApolloServer({
    schema: schemaWithPermissions,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req, res }): Context => ({ req, res }),
  });
};
