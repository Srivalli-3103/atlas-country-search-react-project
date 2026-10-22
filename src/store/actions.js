import * as types from './actionTypes';

// countries
export const countriesRequest = () => ({ type: types.COUNTRIES_REQUEST });
export const countriesSuccess = (items, source) => ({ type: types.COUNTRIES_SUCCESS, payload: { items, source } });
export const countriesFailure = (message) => ({ type: types.COUNTRIES_FAILURE, payload: message });

// favorites
export const toggleFavorite = (id) => ({ type: types.TOGGLE_FAVORITE, payload: id });
export const clearFavorites = () => ({ type: types.CLEAR_FAVORITES });

// ui
export const setQuery = (query) => ({ type: types.SET_QUERY, payload: query });
export const setRegion = (region) => ({ type: types.SET_REGION, payload: region });
export const setSort = (sort) => ({ type: types.SET_SORT, payload: sort });
export const toggleOnlySaved = () => ({ type: types.TOGGLE_ONLY_SAVED });
export const resetFilters = () => ({ type: types.RESET_FILTERS });
export const toggleTheme = () => ({ type: types.TOGGLE_THEME });
export const loadMore = () => ({ type: types.LOAD_MORE });
export const openCountry = (id) => ({ type: types.OPEN_COUNTRY, payload: id });
export const closeCountry = () => ({ type: types.CLOSE_COUNTRY });
