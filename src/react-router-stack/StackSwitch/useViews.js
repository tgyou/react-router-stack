import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { matchPath } from '../StackRouter/matchPath';
import { matchRoute } from '../StackRouter/matchRoute';
import { getLocationKey } from './useLocationKey';
import { BACKWARD, POP, PUSH, REPLACE } from '../constants';

export function useViews(routes, routerIndex) {
  const location = useLocation();
  const history = useHistory();
  const refLocation = useRef(null);
  const refRoutes = useRef(routes);
  const [views, setViews] = useState([]);

  const findIndex = useCallback(
    (location, views) => {
      if (!location) return null;
      const key = getLocationKey(location, routerIndex);

      return views.findIndex(view => view.key === key);
    },
    [routerIndex]
  );

  useLayoutEffect(() => {
    const routes = refRoutes.current;
    const HISTORY_MAX_LENGTH = window.history.length || 50;
    const matchedRoute = matchRoute(location.pathname, routes);

    if (!matchedRoute) return;
    const prevLocation = refLocation.current;
    const key = getLocationKey(location, routerIndex);
    const match = matchPath(location.pathname, matchedRoute.props);
    const nextView = { key, route: matchedRoute, match: { ...match, key } };

    setViews(views => {
      const prevViewIndex = findIndex(prevLocation, views);
      const nextViewIndex = findIndex(location, views);

      if (prevLocation?.pathname === location.pathname && prevLocation?.hash !== location.hash) {
        // do nothing.
      } else if (nextViewIndex > -1 && !routerIndex) {
        if (history.action === PUSH) {
          views.splice(0, nextViewIndex);
        }
        // do nothing.
      } else if (nextViewIndex > -1 && routerIndex) {
        views.splice(nextViewIndex, 1, nextView);
      } else if (history.action === PUSH || history.action === REPLACE) {
        if (refLocation.current && prevViewIndex > -1) {
          if (history.action === PUSH) {
            views.splice(0, prevViewIndex, nextView);
          } else if (history.action === REPLACE) {
            views.splice(prevViewIndex, 1, nextView);
          }
        } else if (routerIndex) {
          views = [nextView];
        } else {
          views.unshift(nextView);
        }
      } else if (history.action === POP && !history.direction) {
        views.unshift(nextView);
      } else if (history.action === POP && history.direction) {
        if (history.direction === BACKWARD) {
          views.push(nextView);
        } else {
          views.unshift(nextView);
        }
      }

      return [...views].splice(0, HISTORY_MAX_LENGTH);
    });
  }, [history, location, routerIndex, findIndex]);

  // To prevent 'useLayoutEffect' execution by updated 'routes'
  useEffect(() => {
    refRoutes.current = routes;
  }, [routes]);

  useEffect(() => {
    refLocation.current = location;
  }, [location]);

  return { views, setViews };
}
