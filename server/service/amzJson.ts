import type { FastifyInstance, FastifyPluginOptions, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

type NextFunction = (err?: Error) => void;

export const fastifyAmzJson = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  next: NextFunction,
): void => {
  const contentParser = (
    req: FastifyRequest,
    body: Buffer,
    done: (err: Error | null, result?: string) => void,
  ): void => {
    done(null, JSON.parse(body.toString()));
  };

  fastify.addContentTypeParser('application/x-amz-json-1.1', { parseAs: 'buffer' }, contentParser);
  next();
};

export default fp(fastifyAmzJson, {
  fastify: '4.x',
});
