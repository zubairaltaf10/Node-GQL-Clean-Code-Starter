import dotenv from "dotenv";
dotenv.config();

const env = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing: process.env['${name}'].`);
  }

  return value;
};

export interface Config {
  port: number;
  graphqlPath: string;
  isDev: boolean;
  mongoDB: {
    uri: string;
  };
  redis: {
    host: string;
    port: number;
  };
  rateLimiting: {
    maxRequests: number;
    windowSizeInMinutes: number;
  };
  jwtSecret: string;
}

export const config: Config = {
  port: +env("PORT"),
  graphqlPath: env("GRAPHQL_PATH"),
  isDev: env("NODE_ENV") === "development",
  mongoDB: {
    uri: env("MONGODB_URI"),
  },
  redis: {
    port: +env("REDIS_PORT"),
    host: env("REDIS_HOST"),
  },
  rateLimiting: {
    maxRequests: +env("MAX_REQUESTS"),
    windowSizeInMinutes: +env("WINDOW_SIZE_IN_MINUTES"),
  },
  jwtSecret: env("JWT_SECRET")
};
