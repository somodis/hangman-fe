// import { StringifyOptions } from 'query-string';

import { toBoolean } from '../utils/format';

export type InputVariant = 'outlined' | 'filled' | 'standard';
export type InputMargin = 'none' | 'dense' | 'normal';

const processEnv = {
  ...process.env,
//   ...(window.__RUNTIME_ENV__ || {}),
};

export const Env = {
  API_REFRESH_TOKEN_KEY: 'API_REFRESH_TOKEN',
  API_TOKEN_KEY: 'API_TOKEN',
  DEFAULT_INPUT_VARIANT: 'outlined' as InputVariant,
  DEFAULT_INPUT_MARGIN: 'dense' as InputMargin,
  REGEX_PASSWORD: /^.{8,}$/,
  MINIMUM_PASSWORD_LENGTH: 5,
  SEARCH_DELAY: 500,
  TEST_ID_ATTRIBUTE_KEY: 'data-testid',
  ...processEnv,
  REACT_APP_USE_API: toBoolean(processEnv.REACT_APP_USE_API),
  REACT_APP_USE_COOKIE: toBoolean(processEnv.REACT_APP_USE_COOKIE),
};

// Be able to see the current configuration during development
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-console
  console.log(Env);
}
