import { fetchAllCountries } from '../api/countries';
import { COUNTRIES_CACHE_KEY, COUNTRIES_CACHE_TTL_MS } from '../constants';
import { countriesFailure, countriesRequest, countriesSuccess } from '../store/actions';
import { readCache, writeCache } from '../utils/sessionStorage';

const isValidCache = (data) =>
  Array.isArray(data) && data.length > 0 && typeof data[0]?.id === 'string' && 'name' in data[0];

let inFlight = null;

/**
 * Plain Redux has no built-in async support, so this is an ordinary function that receives
 * `dispatch` and fires normal action objects around the Axios call:
 *   REQUEST -> (cache hit | Axios call) -> SUCCESS or FAILURE
 * Components call it from an effect or an event handler. No middleware involved.
 *
 * `inFlight` prevents duplicate requests (React StrictMode runs effects twice in development).
 */
export function loadCountries(dispatch, { force = false } = {}) {
  if (inFlight) return inFlight;

  inFlight = (async () => {
    dispatch(countriesRequest());

    if (!force) {
      const cached = readCache(COUNTRIES_CACHE_KEY, COUNTRIES_CACHE_TTL_MS);
      if (isValidCache(cached)) {
        dispatch(countriesSuccess(cached, 'cache'));
        return;
      }
    }

    try {
      const items = await fetchAllCountries();
      writeCache(COUNTRIES_CACHE_KEY, items);
      dispatch(countriesSuccess(items, 'network'));
    } catch (error) {
      dispatch(countriesFailure(error.userMessage ?? 'Something went wrong while loading countries.'));
    }
  })().finally(() => {
    inFlight = null;
  });

  return inFlight;
}
