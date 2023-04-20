import axios, { AxiosError, AxiosRequestConfig, AxiosResponseTransformer } from 'axios';
import isEmpty from 'lodash/isEmpty';
import { v4 as uuid } from 'uuid';

import { Env } from '../config/env';
import store from '../store';
// import { NotificationType } from 'models';
// import { showNotification } from 'components';
import { logout, refreshToken } from 'store/auth';
import { setApiInfo } from 'store/common';
import { stringify } from 'utils/query';

export enum Methods {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export enum Status {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

export interface RequestConfig extends AxiosRequestConfig {
  resource: string;
  method?: Methods;
}

const refreshTokenBlacklist = ['/auth/logout', '/auth/login/refresh', '/auth/login/email'];
const errorNotificationBlacklist = ['/users/me'];

let refreshPromise: Promise<any> | null = null;

export function isInBlackList(url?: string, blacklist: string[] = []) {
  if (!url) {
    return false;
  }

  return blacklist.some((item) => url.includes(item));
}

export function shouldCallRefreshToken(url?: string) {
  return !isInBlackList(url, refreshTokenBlacklist);
}

export function shouldShowErrorNotification(url?: string) {
  return !isInBlackList(url, errorNotificationBlacklist);
}

axios.defaults.headers.common['app-version'] = `${process.env.REACT_APP_VERSION}`;
axios.defaults.headers.common['app-env'] = `${process.env.NODE_ENV}`;
axios.defaults.headers.common.platform = 'react';

axios.interceptors.request.use((requestConfig) => {
  const { token } = store.getState().auth;

  if (token && !Env.REACT_APP_USE_COOKIE) {
    requestConfig.headers = {
      ...requestConfig.headers,
      Authorization: `bearer ${token}`,
    };
  }

  return requestConfig;
});

axios.interceptors.response.use(
  async (response) => {
    if (response.headers) {
      store.dispatch(
        setApiInfo({ version: response.headers['api-version'] || '-', env: response.headers['api-env'] || '-' })
      );
    }
    return response;
  },
  async (error: AxiosError) => {
    if (error.response && error.config) {
      const { status, statusText } = error.response;

      if (status !== Status.UNAUTHORIZED && shouldShowErrorNotification(error.config.url)) {
        showNotification({ content: `${status} - ${statusText}`, type: NotificationType.ERROR });
      }

      if (status === Status.UNAUTHORIZED && shouldCallRefreshToken(error.config.url)) {
        try {
          if (!refreshPromise) {
            refreshPromise = store.dispatch(refreshToken());
          }

          await refreshPromise;

          refreshPromise = null;

          return await axios.request(error.config);
        } catch (e) {
          store.dispatch(logout());
        }
      }
    }

    return Promise.reject(error);
  }
);

interface GenerateUrlSettings {
  baseURL?: string;
  resource?: string;
  params?: Record<string, any>;
}

export function appendParamsToUrl(url: string, params?: Record<string, any>) {
  const query = params && !isEmpty(params) ? `?${stringify(params)}` : '';

  return `${url}${query}`;
}

export function generateUrl({
  baseURL = process.env.REACT_APP_API_URL,
  resource = '',
  params,
}: GenerateUrlSettings = {}) {
  const url = `${baseURL || ''}/${resource}`;

  return appendParamsToUrl(url, params);
}

async function request<T = void>({
  resource,
  method = Methods.GET,
  transformResponse,
  headers,
  data,
  ...requestConfig
}: RequestConfig) {
  const url = generateUrl({ baseURL: requestConfig.baseURL, resource });

  const { data: response } = await axios.request<T>({
    method,
    headers: {
      ...(headers || {}),
      ...(data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}),
      'x-client-version': Env.REACT_APP_VERSION,
      'x-client-env': Env.REACT_APP_ENV,
      'x-request-id': uuid(),
    },
    url,
    transformResponse: [
      ...(Array.isArray(axios.defaults.transformResponse) ? axios.defaults.transformResponse : []),
      transformResponse,
    ].filter((x) => x) as AxiosResponseTransformer[],
    data,
    withCredentials: true,
    ...requestConfig,
  });

  return response;
}

export default request;
