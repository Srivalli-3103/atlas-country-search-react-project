import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import store from './store';
import './index.css';

// Apply the stored theme before first paint to avoid a flash of the wrong theme.
document.documentElement.dataset.theme = store.getState().ui.theme;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);
