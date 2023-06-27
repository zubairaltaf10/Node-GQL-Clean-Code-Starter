import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";

import { config } from "../../config";

export default async (app: express.Application) => {
  app.use(config.graphqlPath, bodyParser.json());

  app.use(cors());

  app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
};
