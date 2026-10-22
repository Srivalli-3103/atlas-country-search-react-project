import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '../store/selectors';
import { toggleTheme } from '../store/actions';

function Header() {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <header className="header">
      <div className="header__inner">
        <div>
          <p className="brand">Atlas</p>
          <h1 className="header__title">Find any country in seconds</h1>
          <p className="header__lead">
            Search by name or capital, narrow by region, and save the ones you want to come back to.
          </p>
        </div>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => dispatch(toggleTheme())}
          aria-label={`Switch to ${next} theme`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            {theme === 'dark' ? (
              <path fill="currentColor" d="M12 4a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1Zm0 14a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm8-7a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM6 12a1 1 0 0 1-1 1H4a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm10 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
            ) : (
              <path fill="currentColor" d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
            )}
          </svg>
          <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </header>
  );
}

export default memo(Header);
