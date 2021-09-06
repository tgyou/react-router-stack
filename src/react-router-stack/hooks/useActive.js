import { useRouteMatch } from 'react-router';

export function useActive() {
  const routeMatch = useRouteMatch();

  // for normal react-router switch
  if (!Object.prototype.hasOwnProperty.call(routeMatch, 'key')) {
    return true;
  } else {
    return routeMatch.active;
  }
}
