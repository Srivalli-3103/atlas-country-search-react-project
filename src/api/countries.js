import { http } from './client';

// The API names some polar and ocean regions differently; fold them into one filter option.
const normalizeRegion = (region) => {
  if (!region) return 'Other';
  return /antarctic|polar/i.test(region) ? 'Polar' : region;
};

/** Map the raw API shape to the flat, defensive shape the UI uses. Every field may be missing. */
function normalize(c) {
  return {
    id: c.alpha3Code,
    name: c.name ?? 'Unknown',
    nativeName: c.nativeName && c.nativeName !== c.name ? c.nativeName : '',
    flag: c.flags?.svg ?? c.flags?.png ?? '',
    flagAlt: '',
    population: Number.isFinite(c.population) ? c.population : 0,
    area: Number.isFinite(c.area) ? c.area : 0,
    region: normalizeRegion(c.region),
    subregion: c.subregion ?? '',
    capital: typeof c.capital === 'string' && c.capital ? c.capital : 'None',
    languages: (c.languages ?? []).map((l) => l.name).filter(Boolean),
    currencies: (c.currencies ?? []).map((cur) => cur.name).filter(Boolean),
  };
}

/** The single API call of the app. Accepts an AbortSignal so callers can cancel it. */
export async function fetchAllCountries(signal) {
  const { data } = await http.get('/countries', { signal });
  if (!Array.isArray(data)) throw new Error('Unexpected response shape');

  // De-duplicate by id: React needs unique keys, and a bad row should never break the list.
  const byId = new Map();
  for (const raw of data) {
    if (raw?.alpha3Code && !byId.has(raw.alpha3Code)) byId.set(raw.alpha3Code, normalize(raw));
  }
  return [...byId.values()];
}
