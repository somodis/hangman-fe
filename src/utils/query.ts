import qs from 'query-string';
import type { ParsedQuery, ParseOptions, StringifyOptions } from 'query-string';

import { Env } from '../config/env';

export function parse(query: string, options?: ParseOptions): ParsedQuery {
  return qs.parse(query, options);
}

export function stringify(object: Record<string, any>, options?: StringifyOptions): string {
  return qs.stringify(object, { ...Env.QUERY_FORMAT, ...options });
}
