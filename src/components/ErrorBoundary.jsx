import { Component } from 'react';
import ErrorMessage from './ErrorMessage';

/**
 * Catches render-time errors (and failed lazy-chunk loads) in its subtree,
 * so one broken component never blanks the whole page.
 */
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // In production, send this to your error tracker (Sentry, Datadog...).
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  reset = () => {
    this.setState({ error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.error) {
      return (
        <ErrorMessage
          title={this.props.title ?? 'Something went wrong'}
          message="Reload this section and try again. If it keeps happening, refresh the page."
          actionLabel="Reload section"
          onAction={this.reset}
        />
      );
    }
    return this.props.children;
  }
}
