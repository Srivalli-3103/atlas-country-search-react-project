import { CLEAR_FAVORITES, TOGGLE_FAVORITE } from '../actionTypes';

export const initialFavoritesState = { ids: [] };

export default function favoritesReducer(state = initialFavoritesState, action) {
  switch (action.type) {
    case TOGGLE_FAVORITE: {
      const id = action.payload;
      const ids = state.ids.includes(id) ? state.ids.filter((x) => x !== id) : [...state.ids, id];
      return { ...state, ids };
    }
    case CLEAR_FAVORITES:
      return { ...state, ids: [] };
    default:
      return state;
  }
}
