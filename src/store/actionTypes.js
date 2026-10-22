// Action type constants: one source of truth, so a typo is a ReferenceError instead of a silent no-op.
export const COUNTRIES_REQUEST = 'countries/request';
export const COUNTRIES_SUCCESS = 'countries/success';
export const COUNTRIES_FAILURE = 'countries/failure';

export const TOGGLE_FAVORITE = 'favorites/toggle';
export const CLEAR_FAVORITES = 'favorites/clear';

export const SET_QUERY = 'ui/setQuery';
export const SET_REGION = 'ui/setRegion';
export const SET_SORT = 'ui/setSort';
export const TOGGLE_ONLY_SAVED = 'ui/toggleOnlySaved';
export const RESET_FILTERS = 'ui/resetFilters';
export const TOGGLE_THEME = 'ui/toggleTheme';
export const LOAD_MORE = 'ui/loadMore';
export const OPEN_COUNTRY = 'ui/openCountry';
export const CLOSE_COUNTRY = 'ui/closeCountry';
