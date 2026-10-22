import { COUNTRIES_FAILURE, COUNTRIES_REQUEST, COUNTRIES_SUCCESS } from '../actionTypes';

export const initialCountriesState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  source: null, // 'cache' | 'network'
};

export default function countriesReducer(state = initialCountriesState, action) {
  switch (action.type) {
    case COUNTRIES_REQUEST:
      return { ...state, status: 'loading', error: null };
    case COUNTRIES_SUCCESS:
      return { ...state, status: 'succeeded', items: action.payload.items, source: action.payload.source };
    case COUNTRIES_FAILURE:
      return { ...state, status: 'failed', error: action.payload };
    default:
      return state;
  }
}
