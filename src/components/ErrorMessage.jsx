import { memo } from 'react';

function ErrorMessage({ title, message, actionLabel, onAction }) {
  return (
    <div className="notice notice--error" role="alert">
      <h2 className="notice__title">{title}</h2>
      {message && <p className="notice__text">{message}</p>}
      {onAction && (
        <button type="button" className="btn btn--primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default memo(ErrorMessage);
