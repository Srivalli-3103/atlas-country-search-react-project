import { PAGE_SIZE } from '../../constants';
import {
  CLOSE_COUNTRY,
  LOAD_MORE,
  OPEN_COUNTRY,
  RESET_FILTERS,
  SET_QUERY,
  SET_REGION,
  SET_SORT,
  TOGGLE_ONLY_SAVED,
  TOGGLE_THEME,
} from '../actionTypes';

export const initialUiState = {
  theme: 'light',
  query: '',
  region: 'All',
  sort: 'name',
  onlySaved: false,
  visibleCount: PAGE_SIZE,
  selectedId: null,
};

// Changing any filter sends the list back to page one.
const withFirstPage = (state, changes) => ({ ...state, ...changes, visibleCount: PAGE_SIZE });

export default function uiReducer(state = initialUiState, action) {
  switch (action.type) {
    case SET_QUERY:
      return withFirstPage(state, { query: action.payload });
    case SET_REGION:
      return withFirstPage(state, { region: action.payload });
    case SET_SORT:
      return withFirstPage(state, { sort: action.payload });
    case TOGGLE_ONLY_SAVED:
      return withFirstPage(state, { onlySaved: !state.onlySaved });
    case RESET_FILTERS:
      return withFirstPage(state, { query: '', region: 'All', sort: 'name', onlySaved: false });
    case TOGGLE_THEME:
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };
    case LOAD_MORE:
      return { ...state, visibleCount: state.visibleCount + PAGE_SIZE };
    case OPEN_COUNTRY:
      return { ...state, selectedId: action.payload };
    case CLOSE_COUNTRY:
      return { ...state, selectedId: null };
    default:
      return state;
  }
}
