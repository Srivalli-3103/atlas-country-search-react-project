# Atlas: Country Explorer

A production-style React app: search, filter, sort and save countries.
Built with **React 18, Redux Toolkit, Axios and Vite**.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
```

No API key needed (uses the public REST Countries API).

## What it demonstrates

| Concept | Where to look |
| --- | --- |
| **Redux (store, reducers, actions)** | `src/store/`: three slices (`countries`, `favorites`, `ui`), a configured store, memoized selectors |
| **Async Redux** | `createAsyncThunk` in `countriesSlice.js` with `condition` to block duplicate requests |
| **Axios** | `src/api/client.js`: instance, timeout, interceptor with retry + exponential backoff, friendly error messages. `src/api/countries.js`: the single API call, `AbortSignal` support, response normalization |
| **sessionStorage** | `src/utils/sessionStorage.js` (safe wrapper, versioned keys, TTL cache), `src/store/persistence.js` (validates everything it reads, persists only what should survive a refresh) |
| **Error handling** | Axios interceptor, `rejectWithValue`, `ErrorBoundary` (also catches failed lazy chunks), retry button, empty states, corrupt/blocked storage handled silently |
| **Performance** | `React.memo` cards with stable callbacks, `createSelector` memoization, debounced search, paginated rendering (24 at a time), `React.lazy` + `Suspense` for the modal, lazy-loaded images with fixed dimensions, `Set` for O(1) lookups, field-limited API request, session cache to skip repeat network calls |
| **Accessibility** | Skip link, native `<dialog>` (focus trap, Esc, focus return), labelled form controls, `aria-pressed` toggles, live region for result counts, `role="alert"` on errors, visible focus rings, 44px touch targets, colour is never the only cue, `prefers-reduced-motion`, light and dark themes with AA contrast |

## Structure

```
src/
  api/          client.js (Axios instance + interceptors), countries.js (API call)
  components/   Header, Toolbar, CountryGrid, CountryCard, CountryModal,
                SkeletonGrid, ErrorBoundary, ErrorMessage
  hooks/        useDebounce.js
  store/        index.js, selectors.js, persistence.js, slices/
  utils/        sessionStorage.js, format.js
```

**Atlas: Country Explorer** | React, Redux Toolkit, Axios, Vite
- Built a responsive country search app with Redux Toolkit (slices, async thunks, memoized selectors) managing API data, filters and favorites.
- Designed an Axios layer with timeouts, retry with exponential backoff and normalized error messages, surfaced through error boundaries and retry flows.
- Implemented validated, versioned sessionStorage persistence plus a 15-minute response cache, cutting repeat network calls to zero within a session.
- Improved rendering performance with memoized components and selectors, debounced search, paginated rendering and code-split modals.
- Delivered WCAG-minded accessibility: keyboard navigation, native modal dialog, ARIA live regions, visible focus states and a reduced-motion-aware light/dark UI.

- **Why Redux Toolkit?** It removes boilerplate (Immer, `createSlice`, thunks) while keeping the classic action, reducer and store model.
- **Why local state for the search box?** Typing stays instant; Redux and the filtering only update after a 250ms debounce.
- **Why a `Set` of saved IDs?** Each card checks "is saved?" in O(1) instead of scanning an array.
- **Why a native `<dialog>`?** Correct focus management with no hand-rolled trap to get wrong.
- **What would you add next?** Unit tests (Vitest + Testing Library), an e2e test (Playwright), TypeScript, and error tracking in `componentDidCatch`.
