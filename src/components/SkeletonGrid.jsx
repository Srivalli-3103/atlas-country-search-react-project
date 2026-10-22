import { memo } from 'react';

function SkeletonGrid({ count = 12 }) {
  return (
    <div aria-busy="true">
      <p className="visually-hidden" role="status">
        Loading countries
      </p>
      <ul className="grid" aria-hidden="true">
        {Array.from({ length: count }, (_, i) => (
          <li key={i}>
            <div className="card card--skeleton">
              <div className="card__flag skeleton" />
              <div className="card__body">
                <div className="skeleton skeleton--line skeleton--wide" />
                <div className="skeleton skeleton--line" />
                <div className="skeleton skeleton--line" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(SkeletonGrid);
