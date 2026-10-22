import axios from 'axios';

const MAX_RETRIES = 2;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const http = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 10_000,
  headers: { Accept: 'application/json' },
});

/** Turn any failure into a sentence a person can act on. */
export function toUserMessage(error) {
  if (axios.isCancel(error)) return 'The request was cancelled.';
  if (error.code === 'ECONNABORTED') return 'The request took too long. Check your connection and try again.';
  if (!error.response) return 'Could not reach the countries service. Check your connection and try again.';

  const { status } = error.response;
  if (status === 429) return 'Too many requests. Wait a moment, then try again.';
  if (status >= 500) return 'The countries service is having trouble. Try again in a minute.';
  return `The countries service rejected the request (error ${status}).`;
}

http.interceptors.response.use(undefined, async (error) => {
  const config = error.config;
  const retriable =
    config &&
    config.method === 'get' &&
    !axios.isCancel(error) &&
    (!error.response || error.response.status >= 500);

  if (retriable) {
    config.retryCount = (config.retryCount ?? 0) + 1;
    if (config.retryCount <= MAX_RETRIES) {
      await wait(400 * 2 ** (config.retryCount - 1));
      return http(config);
    }
  }

  error.userMessage = toUserMessage(error);
  return Promise.reject(error);
});
