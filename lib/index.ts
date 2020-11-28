import type { RequestHandler } from 'express';
import type { JsonValue } from 'type-fest';
// eslint-disable-next-line import/no-unresolved
import * as core from 'express-serve-static-core';

// eslint-disable-next-line @typescript-eslint/ban-types
type ValidResponseBody<T> = Buffer | JsonValue | T;
type ValidRequestBody = Buffer | JsonValue | any;

type AsyncRequestHandler<P, ResBody, ReqBody, ReqQuery> = (
  ...args: Parameters<RequestHandler<P, ResBody, ReqBody, ReqQuery>>
) => Promise<void>;

export function expressAsyncWrap<T = any>(
  fn: AsyncRequestHandler<core.ParamsDictionary, T, ValidRequestBody, core.Query>,
): RequestHandler<
  core.ParamsDictionary,
  ValidResponseBody<T>,
  ValidRequestBody
  > {
  return (req, res, next): Promise<unknown> => fn(req, res, next).catch(next);
}
