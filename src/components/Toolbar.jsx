import { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REGIONS, SORTS } from '../constants';
import useDebounce from '../hooks/useDebounce';
import {
  selectOnlySaved,
  selectQuery,
  selectRegion,
  selectSavedCount,
  selectSort,
} from '../store/selectors';
import { resetFilters, setQuery, setRegion, setSort, toggleOnlySaved } from '../store/actions';

function Toolbar({ disabled }) {
  const dispatch = useDispatch();
  const query = useSelector(selectQuery);
  const region = useSelector(selectRegion);
  const sort = useSelector(selectSort);
  const onlySaved = useSelector(selectOnlySaved);
  const savedCount = useSelector(selectSavedCount);

  // Local state keeps typing instant; Redux (and the expensive filtering) updates 250ms after the last keystroke.
  const [value, setValue] = useState(query);
  const debounced = useDebounce(value, 250);
  const queryRef = useRef(query);
  queryRef.current = query;

  useEffect(() => {
    const next = debounced.trim();
    if (next !== queryRef.current) dispatch(setQuery(next));
  }, [debounced, dispatch]);

  // When filters are reset from elsewhere, clear the visible input too.
  useEffect(() => {
    if (query === '') setValue('');
  }, [query]);

  const hasFilters = query !== '' || region !== 'All' || sort !== 'name' || onlySaved;

  return (
    <section className="toolbar" aria-label="Search and filters">
      <div className="field field--search">
        <label htmlFor="search">Search by country or capital</label>
        <input
          id="search"
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Try “Lisbon” or “Japan”"
          autoComplete="off"
          maxLength={100}
          disabled={disabled}
        />
      </div>

      <div className="field">
        <label htmlFor="region">Region</label>
        <select id="region" value={region} onChange={(e) => dispatch(setRegion(e.target.value))} disabled={disabled}>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r === 'All' ? 'All regions' : r}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="sort">Sort by</label>
        <select id="sort" value={sort} onChange={(e) => dispatch(setSort(e.target.value))} disabled={disabled}>
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="toolbar__actions">
        <button
          type="button"
          className="btn btn--toggle"
          aria-pressed={onlySaved}
          onClick={() => dispatch(toggleOnlySaved())}
          disabled={disabled}
        >
          Saved ({savedCount})
        </button>
        {hasFilters && (
          <button type="button" className="btn btn--link" onClick={() => dispatch(resetFilters())}>
            Clear filters
          </button>
        )}
      </div>
    </section>
  );
}

export default memo(Toolbar);
