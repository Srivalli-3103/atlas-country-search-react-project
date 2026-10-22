import { PAGE_SIZE, REGIONS, SORT_VALUES, THEMES } from '../constants';
import { initialUiState } from './reducers/ui';
import { storage } from '../utils/sessionStorage';

const UI_KEY = 'ui';
const FAVORITES_KEY = 'favorites';

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

function systemTheme() {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

/** Read and VALIDATE everything coming out of sessionStorage. Never trust stored data. */
export function loadPreloadedState() {
  const storedUi = storage.read(UI_KEY, {});
  const ui = isObject(storedUi) ? storedUi : {};
  const storedFavorites = storage.read(FAVORITES_KEY, []);

  return {
    ui: {
      ...initialUiState,
      theme: THEMES.includes(ui.theme) ? ui.theme : systemTheme(),
      query: typeof ui.query === 'string' ? ui.query.slice(0, 100) : '',
      region: REGIONS.includes(ui.region) ? ui.region : 'All',
      sort: SORT_VALUES.includes(ui.sort) ? ui.sort : 'name',
      onlySaved: ui.onlySaved === true,
      visibleCount: PAGE_SIZE,
    },
    favorites: {
      ids: Array.isArray(storedFavorites)
        ? [...new Set(storedFavorites.filter((id) => typeof id === 'string'))].slice(0, 300)
        : [],
    },
  };
}

/** Only persist what should survive a refresh (not the open modal or scroll depth). */
export function pickPersistedState({ ui, favorites }) {
  return {
    ui: {
      theme: ui.theme,
      query: ui.query,
      region: ui.region,
      sort: ui.sort,
      onlySaved: ui.onlySaved,
    },
    favorites: favorites.ids,
  };
}

export function persistState(picked) {
  storage.write(UI_KEY, picked.ui);
  storage.write(FAVORITES_KEY, picked.favorites);
}
