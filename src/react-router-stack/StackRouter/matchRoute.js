import { Children } from 'react';
import { matchPath } from 'react-router';

export function matchRoute(pathname, routes) {
  return Children.toArray(routes).find(route => {
    return matchPath(pathname, {
      ...route.props,
      path: route.props.path || '*',
    });
  });
}
