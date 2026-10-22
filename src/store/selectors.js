import { createMemoizedSelector as createSelector } from '../utils/memoize';

export const selectItems = (s) => s.countries.items;
export const selectStatus = (s) => s.countries.status;
export const selectError = (s) => s.countries.error;
export const selectSource = (s) => s.countries.source;

export const selectTheme = (s) => s.ui.theme;
export const selectQuery = (s) => s.ui.query;
export const selectRegion = (s) => s.ui.region;
export const selectSort = (s) => s.ui.sort;
export const selectOnlySaved = (s) => s.ui.onlySaved;
export const selectVisibleCount = (s) => s.ui.visibleCount;
const selectSelectedId = (s) => s.ui.selectedId;

export const selectSavedIds = (s) => s.favorites.ids;
export const selectSavedCount = (s) => s.favorites.ids.length;

/** A Set gives O(1) "is this saved?" checks for every card. */
export const selectSavedIdSet = createSelector([selectSavedIds], (ids) => new Set(ids));

export const selectSelectedCountry = createSelector(
  [selectItems, selectSelectedId],
  (items, id) => (id ? items.find((c) => c.id === id) ?? null : null),
);

const comparators = {
  name: (a, b) => a.name.localeCompare(b.name),
  population: (a, b) => b.population - a.population,
  area: (a, b) => b.area - a.area,
};

/**
 * Memoized: only recomputed when one of its inputs changes,
 * so toggling the theme or opening a modal does not re-filter 250 countries.
 */
export const selectFilteredCountries = createSelector(
  [selectItems, selectQuery, selectRegion, selectSort, selectOnlySaved, selectSavedIdSet],
  (items, query, region, sort, onlySaved, savedSet) => {
    const needle = query.trim().toLowerCase();
    return items
      .filter((c) => {
        if (region !== 'All' && c.region !== region) return false;
        if (onlySaved && !savedSet.has(c.id)) return false;
        if (!needle) return true;
        return c.name.toLowerCase().includes(needle) || c.capital.toLowerCase().includes(needle);
      })
      .sort(comparators[sort] ?? comparators.name);
  },
);
