# Atlas: Country Explorer

A production-style React app: search, filter, sort and save countries.
Built with **React 18, plain Redux, Axios and Vite**.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
```

uses the free API Countries service.

## About the API and CORS

Atlas uses the free, keyless API Countries service. The browser calls `/countries-api/countries`, and a proxy forwards it, so no CORS setup is needed:

- **Local dev:** `vite.config.js` (restart `npm run dev` after changing it)
- **Vercel:** `vercel.json`
- **Netlify:** `public/_redirects`

## What it demonstrates

| **Redux (store, reducers, actions)** | `src/store/`: action type constants, action creators, three reducers (`countries`, `favorites`, `ui`) combined with `combineReducers`, a store created with Redux's `createStore`, selectors |
| **Async without thunk** | `src/services/countriesService.js`: a plain function that takes `dispatch` and fires `REQUEST` then `SUCCESS` or `FAILURE` around the Axios call; components call it from an effect or a click handler. A module-level `inFlight` promise blocks duplicate requests |
| **Immutability** | Reducers return new objects and arrays by hand (spread, `filter`), so React-Redux can use cheap reference checks |
| **Memoized selectors** | `src/utils/memoize.js`: a small reselect-style helper, so filtering 250 countries reruns only when its inputs change |
| **Axios** | `src/api/client.js`: instance, timeout, interceptor with retry + exponential backoff, friendly error messages. `src/api/countries.js`: the single API call, `AbortSignal` support, response normalization |
| **sessionStorage** | `src/utils/sessionStorage.js` (safe wrapper, versioned keys, TTL cache), `src/store/persistence.js` (validates everything it reads, persists only what should survive a refresh) |
| **Error handling** | Axios interceptor, a `FAILURE` action with a friendly message, `ErrorBoundary` (also catches failed lazy chunks), retry button, empty states, corrupt/blocked storage handled silently |
| **Performance** | `React.memo` cards with stable callbacks, memoized selectors, debounced search, paginated rendering (24 at a time), `React.lazy` + `Suspense` for the modal, lazy-loaded images with fixed dimensions, `Set` for O(1) lookups, session cache to skip repeat network calls |
| **Accessibility** | Skip link, native `<dialog>` (focus trap, Esc, focus return), labelled form controls, `aria-pressed` toggles, live region for result counts, `role="alert"` on errors, visible focus rings, 44px touch targets, colour is never the only cue, `prefers-reduced-motion`, light and dark themes with AA contrast |

## Structure

```
src/
  api/          client.js (Axios instance + interceptors), countries.js (API call)
  components/   Header, Toolbar, CountryGrid, CountryCard, CountryModal,
                SkeletonGrid, ErrorBoundary, ErrorMessage
  hooks/        useDebounce.js
  services/     countriesService.js (async flow: dispatch REQUEST, SUCCESS, FAILURE)
  store/        actionTypes.js, actions.js, reducers/, rootReducer.js, index.js, selectors.js, persistence.js
  utils/        sessionStorage.js, format.js
```

**Atlas: Country Explorer** | React, Redux, Axios, Vite
- Built a responsive country search app with plain Redux (action creators, pure reducers, `combineReducers`, memoized selectors) managing API data, filters and favorites.
- Designed an Axios layer with timeouts, retry with exponential backoff and normalized error messages, surfaced through error boundaries and retry flows.
- Implemented validated, versioned sessionStorage persistence plus a 15-minute response cache, cutting repeat network calls to zero within a session.
- Improved rendering performance with memoized components and selectors, debounced search, paginated rendering and code-split modals.
- Delivered WCAG-minded accessibility: keyboard navigation, native modal dialog, ARIA live regions, visible focus states and a reduced-motion-aware light/dark UI.
