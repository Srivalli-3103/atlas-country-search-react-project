import { memo } from 'react';
import { formatCompact } from '../utils/format';

function StarIcon({ filled }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.8L12 3.5Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * React.memo: with 250 countries, a card only re-renders when ITS props change.
 * `onOpen` and `onToggle` are stable (useCallback in the parent) and `country` is a stable
 * reference from the store, so saving one country re-renders exactly one card.
 */
function CountryCard({ country, isSaved, onOpen, onToggle }) {
  const { id, name, flag, capital, population, region } = country;

  return (
    <article className="card" data-region={region}>
      <div className="card__flag">
        <img src={flag} alt="" loading="lazy" decoding="async" width="320" height="213" />
      </div>

      <div className="card__body">
        <h3 className="card__name">
          <button type="button" className="card__open" aria-haspopup="dialog" onClick={() => onOpen(id)}>
            {name}
          </button>
        </h3>
        <dl className="card__meta">
          <div>
            <dt>Capital</dt>
            <dd>{capital}</dd>
          </div>
          <div>
            <dt>Population</dt>
            <dd>{formatCompact(population)}</dd>
          </div>
          <div>
            <dt>Region</dt>
            <dd>{region}</dd>
          </div>
        </dl>
      </div>

      <button
        type="button"
        className="card__save"
        aria-pressed={isSaved}
        aria-label={`Save ${name}`}
        onClick={() => onToggle(id)}
      >
        <StarIcon filled={isSaved} />
      </button>
    </article>
  );
}

export default memo(CountryCard);
