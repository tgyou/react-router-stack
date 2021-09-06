import { useCallback, useContext } from 'react';
import { useLocation, useHistory, __RouterContext } from 'react-router';
import { matchPath } from '../StackRouter/matchPath';
import { matchRoute } from '../StackRouter/matchRoute';
import { getLocationKeys } from '../StackSwitch/useLocationKey';
import url from 'url-parse';
import equal from 'deep-equal';
import { BACKWARD } from '../constants';

function matchEqual(a, b, exceptExact = false) {
  if (exceptExact) {
    a = { ...a, isExact: undefined };
    b = { ...b, isExact: undefined };
  }

  return equal(a, b);
}

export function useCreateLinkObject(match) {
  const _location = useLocation();
  const history = useHistory();
  const { routes, routerIndex, locationHistory } = useContext(__RouterContext);
  const { getPositionOffset } = locationHistory;

  const createLinkObject = useCallback(
    (path, state, props, location = _location) => {
      let to = {};
      if (typeof path === 'function') {
        const ret = path(location);
        if (typeof ret === 'string') {
          // eslint-disable-next-line no-unused-vars
          const { pathname, query, hash, ...parse } = url(ret);
          to = { pathname, search: query, hash };
        } else {
          to = ret;
        }
      } else if (typeof path === 'string') {
        // eslint-disable-next-line no-unused-vars
        const { pathname, query, hash, ...parse } = url(path);
        to = { pathname, search: query, hash };
      } else {
        to = path;
      }

      const route = matchRoute(location.pathname, routes);
      const prevMatch = route ? matchPath(location.pathname, route.props) : null;
      const nextMatch = route ? matchPath(to.pathname, route.props) : null;

      const __key = getLocationKeys(location, routerIndex);
      const originalState = { ...(to.state || {}), ...(state || {}) };

      if (route && matchEqual(prevMatch, nextMatch, true) && props.reuse) {
        to.state = {
          ...originalState,
          __key,
        };
      } else {
        to.state = {
          ...originalState,
          __key: __key.splice(0, __key.length - 1),
        };
      }

      return to;
    },
    [_location, routerIndex, routes]
  );

  const push = useCallback(
    (pathname, state = {}, props = {}, location) => {
      history.push(createLinkObject(pathname, state, { reuse: true, ...props }, location));
      if (props.action) history._action = props.action;
      if (props.direction) history._direction = props.direction;
      if (props.viewType) history._viewType = props.viewType;
    },
    [history, createLinkObject]
  );

  const replace = useCallback(
    (pathname, state = {}, props = {}, location) => {
      history.replace(createLinkObject(pathname, state, { reuse: true, ...props }, location));
      if (props.action) history._action = props.action;
      if (props.direction) history._direction = props.direction;
      if (props.viewType) history._viewType = props.viewType;
    },
    [history, createLinkObject]
  );

  const goFirst = useCallback(
    (event, replaceUrl) => {
      const url = typeof event === 'string' ? event : replaceUrl;
      const offset = getPositionOffset();
      if (offset < 0) {
        history.go(getPositionOffset());
      } else if (url === history.location.pathname) {
        // do nothing.
      } else if (url) {
        replace(url, undefined, { direction: BACKWARD });
      }

      event?.preventDefault && event?.preventDefault();
    },
    [replace, history, getPositionOffset]
  );

  const goBackView = useCallback(
    event => {
      const targetLocation = locationHistory.getPrev(match.key);
      const offset = locationHistory.getPositionOffset(targetLocation.key);
      history.go(offset);
      event?.preventDefault && event?.preventDefault();
    },
    [history, match, locationHistory]
  );

  const goBack = history.goBack;
  const go = history.go;

  return { push, replace, goFirst, goBack, goBackView, go, _createLinkObject: createLinkObject };
}
