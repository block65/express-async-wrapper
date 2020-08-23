import type { RequestHandler } from 'express';

type AsyncRequestHandler = (
  ...args: Parameters<RequestHandler>
) => Promise<void>;

export function expressAsyncWrap(
  fn: AsyncRequestHandler,
): RequestHandler {
  return (
    req,
    res,
    next,
  ): Promise<unknown> => {
    return fn(req, res, next).catch(next);
  };
}
