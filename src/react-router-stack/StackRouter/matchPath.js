import { matchPath as _matchPath } from 'react-router';

export function matchPath(pathname, props) {
  const match = _matchPath(pathname, {
    ...props,
    path: props.path || '*',
  });

  return match;
}
