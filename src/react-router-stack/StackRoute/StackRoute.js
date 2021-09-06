import { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useLocation, __RouterContext } from 'react-router';
import { matchPath } from '../StackRouter/matchPath';
import { getLocationKey } from '../StackSwitch/useLocationKey';
import { StackAnimateRoute } from './StackAnimateRoute';
import { useCreateLinkObject } from './useCreateLinkObject';

export function StackRoute({
  // component
  children,
  render,
  component,
  // route props,
  path,
  exact,
  match,
  // for animate
  duration,
  delay,
  timeout,
  // for unmount on exit
  unmountOnExit,
  ...props
}) {
  const routerContext = useContext(__RouterContext);
  const location = useLocation();
  const Component = component || render || children;
  const link = useCreateLinkObject(match);

  const matched = useMemo(() => {
    return matchPath(location.pathname, { path: path, exact: exact });
  }, [location, path, exact]);

  const active = useMemo(() => {
    const hasHash = !location.key && location.hash;
    const keyMatch = getLocationKey(location, routerContext.routerIndex) === match.key;

    return !!((hasHash || keyMatch) && matched);
  }, [location, match, matched, routerContext.routerIndex]);

  if (!Component) {
    return null;
  } else {
    match.active = active;
    match.isExact = matched?.isExact !== undefined ? matched.isExact : match.isExact;

    const _timeout = typeof timeout === 'number' ? timeout : duration + delay;
    const contextValue = { ...routerContext, match, link };

    if (_timeout > 0) {
      contextValue.transitionProps = {
        duration,
        delay,
        timeout: _timeout,
        unmountOnExit,
      };

      return (
        <__RouterContext.Provider value={contextValue}>
          <StackAnimateRoute>
            <Component {...props} />
          </StackAnimateRoute>
        </__RouterContext.Provider>
      );
    } else {
      return (
        <__RouterContext.Provider value={contextValue}>
          {(unmountOnExit && active) || !unmountOnExit ? <Component {...props} /> : null}
        </__RouterContext.Provider>
      );
    }
  }
}

StackRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  component: PropTypes.func,
  render: PropTypes.func,
  path: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  exact: PropTypes.bool,
  duration: PropTypes.number,
  delay: PropTypes.number,
  unmountOnExit: PropTypes.bool,
};
