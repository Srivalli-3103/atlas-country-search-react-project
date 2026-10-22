// `legacy_createStore` is Redux's own createStore (renamed in Redux 5 only to nudge people toward
// Redux Toolkit). It is plain Redux: no thunk middleware, no Immer, nothing added.
import { legacy_createStore as createStore } from 'redux';
import { loadPreloadedState, persistState, pickPersistedState } from './persistence';
import rootReducer from './rootReducer';

// Lets you inspect every action in the Redux DevTools browser extension (development only).
const devTools = import.meta.env.DEV ? window.__REDUX_DEVTOOLS_EXTENSION__?.() : undefined;

const store = createStore(rootReducer, loadPreloadedState(), devTools);

// Write to sessionStorage only when the persisted slice of state actually changed.
let lastSnapshot = JSON.stringify(pickPersistedState(store.getState()));
store.subscribe(() => {
  const picked = pickPersistedState(store.getState());
  const snapshot = JSON.stringify(picked);
  if (snapshot === lastSnapshot) return;
  lastSnapshot = snapshot;
  persistState(picked);
});

export default store;
