import { StringifyOptions } from 'query-string';

const processEnv = {
  ...process.env,
  // ...(window.__RUNTIME_ENV__ || {}),
};

export const Env = {
  QUERY_FORMAT: { arrayFormat: 'bracket' } as StringifyOptions,
  API_TOKEN_KEY: 'API_TOKEN',
  API_REFRESH_TOKEN_KEY: 'REFRESH_TOKEN',
  ...processEnv,
};

// Be able to see the current configuration during development
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-console
  console.log(Env);
}
