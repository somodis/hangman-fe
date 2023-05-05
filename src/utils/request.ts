import axios, { AxiosError, AxiosRequestConfig, AxiosResponseTransformer, InternalAxiosRequestConfig } from 'axios';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';

import { stringify } from '../utils/query';

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

interface GenerateUrlSettings {
  baseURL?: string;
  resource?: string;
  params?: Record<string, any>;
}

axios.interceptors.response.use(
  async (response) => response,
  async (error: AxiosError) => {
    console.warn(error.message);
    toast.error(error.message);

    if (error.response && error.config) {
      const { status } = error.response;

      if (status === Status.UNAUTHORIZED && localStorage.getItem('token')) {
        localStorage.removeItem('token');
        window.history.go(0);
      }
    }

    return Promise.reject(error);
  }
);

axios.interceptors.request.use((requestConfig: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  console.log('axios.interceptors.request token', token);

  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }
  return requestConfig;
});

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
