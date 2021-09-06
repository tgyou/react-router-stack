import PropTypes from 'prop-types';
import { Component, lazy, Suspense } from 'react';
import { View } from './View';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { error, hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // do something if you need to.
  }

  render() {
    if (this.state.hasError) {
      const ErrorComponent = this.props.errorComponent;

      return ErrorComponent ? <ErrorComponent error={this.state.error} /> : null;
    } else {
      return this.props.children;
    }
  }
}

ErrorBoundary.propTypes = {
  errorComponent: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export function asyncViewComponent({
  resolve,
  componentProps,
  LoadingComponent = asyncViewComponent.LoadingComponent,
  ErrorComponent = asyncViewComponent.ErrorComponent,
  WrapperComponent = View,
}) {
  const Component = lazy(resolve);

  return props => (
    <WrapperComponent {...componentProps}>
      <ErrorBoundary errorComponent={ErrorComponent || null}>
        <Suspense fallback={LoadingComponent ? LoadingComponent(componentProps) : null}>
          <Component {...props} />
        </Suspense>
      </ErrorBoundary>
    </WrapperComponent>
  );
}
