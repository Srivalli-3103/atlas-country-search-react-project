import { combineReducers } from 'redux';
import countries from './reducers/countries';
import favorites from './reducers/favorites';
import ui from './reducers/ui';

export default combineReducers({ countries, favorites, ui });
