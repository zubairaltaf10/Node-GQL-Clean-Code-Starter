import express from "express";
import mongoose from "mongoose";

import loaders from "./loaders";
import { Config } from "../config";

export default async (config: Config) => {
  const app = express();

  loaders(app).then(async (server) => {
    if (!server) return;
    await server.start();
    server.applyMiddleware({
      app,
      path: config.graphqlPath,
      onHealthCheck: async () => {
        if (mongoose.connection.readyState === 1) return;

        throw new Error();
      },
    });

    app.listen({ port: config.port }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${config.port}${config.graphqlPath}`
      )
    );
  });
};
