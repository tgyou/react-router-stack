import { useMemo, useRef } from 'react';
import { useLocation, useRouteMatch } from 'react-router';

export function useActiveLocation() {
  const location = useLocation();
  const routeMatch = useRouteMatch();
  const refLocation = useRef(location);

  return useMemo(() => {
    if (routeMatch.active) {
      refLocation.current = location;
    }

    return refLocation.current;
  }, [routeMatch, location]);
}
