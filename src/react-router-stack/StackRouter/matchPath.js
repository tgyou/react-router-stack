import { matchPath as _matchPath } from 'react-router';

export function matchPath(pathname: string, props: any) {
  const match = _matchPath(pathname, {
    ...props,
    path: props.path || '*',
  });

  return match;
}
