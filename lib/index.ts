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
> = (
  ...args: Parameters<RequestHandler<P, ResBody, ReqBody, ReqQuery>>
) => Promise<void>;

export function expressAsyncWrap<
  Params = never,
  ReqBody = never,
  ResBody = never,
  ReqQuery = never,
>(
  fn: AsyncRequestHandler<Params, ResBody, ReqBody, ReqQuery>,
): RequestHandler<Params, ResBody, ReqBody, ReqQuery>;

export function expressAsyncWrap<Res = any>(
  fn: AsyncRequestHandler<core.ParamsDictionary, Res, ValidRequestBody>,
): RequestHandler<
  core.ParamsDictionary,
  ValidResponseBody<Res>,
  ValidRequestBody
> {
  return (req, res, next): Promise<unknown> => fn(req, res, next).catch(next);
}
