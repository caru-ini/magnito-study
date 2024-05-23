import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';

interface Options extends FastifyPluginOptions {
  parser?: () => any;
  bodyLimit?: number;
}

type NextFunction = (err?: Error) => void;

export const fastifyAmzJson = (fastify: FastifyInstance, options: Options, next: NextFunction) => {
  const contentParser = (
    req: any,
    body: Buffer,
    done: (err: Error | null, result?: any) => void,
  ) => {
    done(null, JSON.parse(body.toString()));
  };

  fastify.addContentTypeParser('application/x-amz-json-1.1', { parseAs: 'buffer' }, contentParser);
  next();
};

export default fp(fastifyAmzJson, {
  fastify: '4.x',
  name: '@fastify/amzJson',
});
