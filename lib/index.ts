import type { RequestHandler } from 'express';
import type * as core from 'express-serve-static-core';
import type { JsonValue } from 'type-fest';

// eslint-disable-next-line @typescript-eslint/ban-types
type ValidResponseBody<T> = Buffer | JsonValue | T;
type ValidRequestBody = Buffer | JsonValue | any;

type AsyncRequestHandler<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>,
> = (
  ...args: Parameters<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
) => Promise<void>;

export function expressAsyncWrap<T = any>(
  fn: AsyncRequestHandler<
    core.ParamsDictionary,
    T,
    ValidRequestBody,
    core.Query
  >,
): RequestHandler<
  core.ParamsDictionary,
  ValidResponseBody<T>,
  ValidRequestBody
> {
  return (req, res, next): Promise<unknown> => fn(req, res, next).catch(next);
}
