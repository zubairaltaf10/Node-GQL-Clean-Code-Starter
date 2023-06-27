import express from "express";

import apolloLoader from "./apollo";
import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import { ApolloServer } from "apollo-server-express";

export default async (app: express.Application): Promise<ApolloServer | null> => {
  try {
    // load express
    await expressLoader(app);

    // Connect to mongoose
    await mongooseLoader();

    // load apollo server config
    return apolloLoader();
  } catch (error) {
    console.log(error)
    return null;
  }
};
