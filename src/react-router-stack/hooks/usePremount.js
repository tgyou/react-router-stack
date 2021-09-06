import { useCallback, useContext, useRef } from 'react';
import { useRouteMatch, __RouterContext } from 'react-router';
import { matchPath } from '../StackRouter/matchPath';
import { matchRoute } from '../StackRouter/matchRoute';
import { getLocationKey } from '../StackSwitch/useLocationKey';

export function usePremount() {
  const { views, setViews, locationHistory, routes, routerIndex } = useContext(__RouterContext);
  const routeMatch = useRouteMatch();
  const refMounted = useRef(false);

  const getPrevRoute = useCallback(() => {
    if (!routeMatch.active) {
      return;
    }
    const currentViewIndex = views.findIndex(view => view.key === routeMatch.key);
    if (views[currentViewIndex + 1]) {
      return false;
    }

    const currentLocationIndex = locationHistory.findIndex(routeMatch.key);
    if (currentLocationIndex < 1) {
      return false;
    }

    const currentLocation = locationHistory.get(routeMatch.key);
    if (currentLocation.state?.__prevent) {
      return false;
    }

    const targetLocation = locationHistory.getPrev(routeMatch.key);
    if (!targetLocation) {
      return false;
    }

    const matchedRoute = matchRoute(targetLocation.pathname, routes);
    if (!matchedRoute) {
      return false;
    }

    const matchedPath = matchPath(targetLocation.pathname, matchedRoute.props);
    const key = getLocationKey(targetLocation, routerIndex);
    const prevView = { key, route: matchedRoute, match: { ...matchedPath, key } };

    return { location: targetLocation, view: prevView };
  }, [locationHistory, views, routes, routeMatch, routerIndex]);

  const premount = useCallback(() => {
    if (refMounted.current) {
      return refMounted.current;
    }

    const prev = getPrevRoute();

    if (prev) {
      const existIndex = views.findIndex(view => view.key === prev.view.key);
      if (existIndex < 0) {
        refMounted.current = prev;
        views.push(prev.view);
        setViews([...views]);
      }
    }

    return prev;
  }, [views, getPrevRoute, setViews]);

  return premount;
}
