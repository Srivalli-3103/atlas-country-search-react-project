import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilteredCountries,
  selectOnlySaved,
  selectSavedCount,
  selectSavedIdSet,
  selectVisibleCount,
} from '../store/selectors';
import { loadMore, openCountry, resetFilters, toggleFavorite } from '../store/actions';
import { PAGE_SIZE } from '../constants';
import CountryCard from './CountryCard';

export default function CountryGrid() {
  const dispatch = useDispatch();
  const filtered = useSelector(selectFilteredCountries);
  const savedSet = useSelector(selectSavedIdSet);
  const savedCount = useSelector(selectSavedCount);
  const onlySaved = useSelector(selectOnlySaved);
  const visibleCount = useSelector(selectVisibleCount);

  // Stable callbacks so memoized cards are not re-rendered needlessly.
  const handleOpen = useCallback((id) => dispatch(openCountry(id)), [dispatch]);
  const handleToggle = useCallback((id) => dispatch(toggleFavorite(id)), [dispatch]);

  // Render in pages of 24 instead of 250 DOM-heavy cards at once.
  const visible = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
  const remaining = filtered.length - visible.length;

  if (filtered.length === 0) {
    const noSavedYet = onlySaved && savedCount === 0;
    return (
      <div className="notice" role="status">
        <h2 className="notice__title">{noSavedYet ? 'Nothing saved yet' : 'No countries match'}</h2>
        <p className="notice__text">
          {noSavedYet
            ? 'Tap the star on any country to keep it here for this session.'
            : 'Try a different spelling or clear your filters.'}
        </p>
        <button type="button" className="btn btn--primary" onClick={() => dispatch(resetFilters())}>
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Polite live region: screen readers hear the result count after each filter change. */}
      <p className="summary" role="status">
        Showing {visible.length} of {filtered.length} {filtered.length === 1 ? 'country' : 'countries'}
      </p>

      <ul className="grid">
        {visible.map((country) => (
          <li key={country.id}>
            <CountryCard
              country={country}
              isSaved={savedSet.has(country.id)}
              onOpen={handleOpen}
              onToggle={handleToggle}
            />
          </li>
        ))}
      </ul>

      {remaining > 0 && (
        <div className="more">
          <button type="button" className="btn btn--primary" onClick={() => dispatch(loadMore())}>
            Show {Math.min(PAGE_SIZE, remaining)} more
          </button>
        </div>
      )}
    </>
  );
}
