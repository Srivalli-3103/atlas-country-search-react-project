import { lazy, Suspense, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CountryGrid from './components/CountryGrid';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorMessage from './components/ErrorMessage';
import Header from './components/Header';
import SkeletonGrid from './components/SkeletonGrid';
import Toolbar from './components/Toolbar';
import { selectError, selectSelectedCountry, selectSource, selectStatus, selectTheme } from './store/selectors';
import { closeCountry } from './store/actions';
import { loadCountries } from './services/countriesService';

const CountryModal = lazy(() => import('./components/CountryModal'));

export default function App() {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const source = useSelector(selectSource);
  const selected = useSelector(selectSelectedCountry);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    loadCountries(dispatch);
  }, [dispatch]);

  const retry = useCallback(() => loadCountries(dispatch, { force: true }), [dispatch]);
  const dismissModal = useCallback(() => dispatch(closeCountry()), [dispatch]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to countries
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="page">
        <Toolbar disabled={status !== 'succeeded'} />

        {(status === 'idle' || status === 'loading') && <SkeletonGrid />}

        {status === 'failed' && (
          <ErrorMessage
            title="We couldn’t load the countries"
            message={error}
            actionLabel="Try again"
            onAction={retry}
          />
        )}

        {status === 'succeeded' && (
          <ErrorBoundary title="The country list hit a problem">
            <CountryGrid />
          </ErrorBoundary>
        )}
      </main>

      <footer className="footer">
        <p>
          Data from REST Countries
          {source === 'cache' ? ', loaded from this tab’s session cache.' : '.'}
        </p>
      </footer>

      {selected && (
        <ErrorBoundary title="We couldn’t open this country" onReset={dismissModal}>
          <Suspense fallback={null}>
            <CountryModal country={selected} />
          </Suspense>
        </ErrorBoundary>
      )}
    </>
  );
}
