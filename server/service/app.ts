import server from '$server';
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import type { FastifyInstance, FastifyServerFactory } from 'fastify';
import Fastify from 'fastify';
import { API_BASE_PATH, CORS_ORIGIN } from 'service/envValues';
import { fastifyAmzJson } from './amzJson';

export const init = (serverFactory?: FastifyServerFactory): FastifyInstance => {
  const app = Fastify({ serverFactory });
  app.register(helmet);
  app.register(cors, { origin: CORS_ORIGIN, credentials: true });
  app.register(cookie);
  app.register(fastifyAmzJson, { bodyLimit: 1024 * 1024 });
  server(app, { basePath: API_BASE_PATH });

  return app;
};
