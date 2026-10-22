import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeCountry, toggleFavorite } from '../store/actions';
import { formatNumber } from '../utils/format';

/**
 * Uses the native <dialog> element with showModal(), which gives us for free:
 * a real focus trap, Escape to close, inert background, and focus returning to the
 * button that opened it. Much more robust than a hand-rolled div with role="dialog".
 */
export default function CountryModal({ country }) {
  const dispatch = useDispatch();
  const dialogRef = useRef(null);
  const isSaved = useSelector((s) => s.favorites.ids.includes(country.id));
  const close = useCallback(() => dispatch(closeCountry()), [dispatch]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    document.body.style.overflow = 'hidden'; // stop the page scrolling behind the dialog
    return () => {
      document.body.style.overflow = '';
      if (dialog?.open) dialog.close();
    };
  }, []);

  // Clicking the backdrop (the <dialog> element itself, outside the inner panel) closes it.
  const handleBackdropClick = (event) => {
    if (event.target === dialogRef.current) close();
  };

  const details = [
    ['Capital', country.capital],
    ['Region', [country.region, country.subregion].filter(Boolean).join(', ')],
    ['Population', formatNumber(country.population)],
    ['Area', `${formatNumber(country.area)} km²`],
    ['Languages', country.languages.join(', ') || 'Not listed'],
    ['Currencies', country.currencies.join(', ') || 'Not listed'],
  ];

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby="modal-title"
      onClose={close}
      onClick={handleBackdropClick}
    >
      <div className="modal__panel">
        <div className="modal__bar">
          <button type="button" className="btn btn--ghost" onClick={close}>
            Close
          </button>
        </div>

        <img
          className="modal__flag"
          src={country.flag}
          alt={country.flagAlt || `Flag of ${country.name}`}
          width="480"
          height="320"
        />

        <h2 id="modal-title" className="modal__title">
          {country.name}
        </h2>
        {country.officialName && <p className="modal__official">{country.officialName}</p>}

        <dl className="modal__details">
          {details.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <button
          type="button"
          className="btn btn--toggle"
          aria-pressed={isSaved}
          onClick={() => dispatch(toggleFavorite(country.id))}
        >
          {isSaved ? 'Saved' : 'Save country'}
        </button>
      </div>
    </dialog>
  );
}
