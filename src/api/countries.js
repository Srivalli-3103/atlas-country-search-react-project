import { http } from './client';
const FIELDS = 'name,cca3,flags,population,area,region,subregion,capital,languages,currencies';

function normalize(c) {
  return {
    id: c.cca3,
    name: c.name?.common ?? 'Unknown',
    officialName: c.name?.official ?? '',
    flag: c.flags?.svg ?? c.flags?.png ?? '',
    flagAlt: c.flags?.alt ?? '',
    population: c.population ?? 0,
    area: c.area ?? 0,
    region: c.region || 'Other',
    subregion: c.subregion ?? '',
    capital: Array.isArray(c.capital) && c.capital.length ? c.capital.join(', ') : 'None',
    languages: Object.values(c.languages ?? {}),
    currencies: Object.values(c.currencies ?? {})
      .map((cur) => cur.name)
      .filter(Boolean),
  };
}

export async function fetchAllCountries(signal) {
  const { data } = await http.get('/all', { params: { fields: FIELDS }, signal });
  if (!Array.isArray(data)) throw new Error('Unexpected response shape');
  return data.filter((c) => c?.cca3).map(normalize);
}
