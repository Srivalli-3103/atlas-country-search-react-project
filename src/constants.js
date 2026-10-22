export const PAGE_SIZE = 24;

export const REGIONS = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Polar'];

export const SORTS = [
  { value: 'name', label: 'Name (A to Z)' },
  { value: 'population', label: 'Population (high to low)' },
  { value: 'area', label: 'Area (large to small)' },
];
export const SORT_VALUES = SORTS.map((s) => s.value);

export const THEMES = ['light', 'dark'];

export const COUNTRIES_CACHE_KEY = 'countries-v2';
export const COUNTRIES_CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes
