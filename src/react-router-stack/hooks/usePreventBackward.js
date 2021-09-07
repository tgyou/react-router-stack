import { useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useHistory, __RouterContext } from 'react-router';
import { BACKWARD, FORWARD } from '../constants';
import { getLocationKeys } from '../StackSwitch/useLocationKey';
import { useRouteLocation } from './useRouteLocation';

function hasOwnProperty(object, key) {
  return Object.prototype.hasOwnProperty.call(object || {}, key);
}

function useKey() {
  const location = useRouteLocation();

  return useMemo(() => {
    if (hasOwnProperty(location?.state, '__prevent')) {
      return location.state.__prevent;
    } else {
      return location.key;
    }
  }, [location]);
}

function useHasNext(key) {
  const { locationHistory } = useContext(__RouterContext);

  return useMemo(() => {
    const nextLocation = locationHistory.getNext(key);
    if (hasOwnProperty(nextLocation?.state, '__prevent') && nextLocation.state.__prevent === key) {
      return true;
    } else {
      return false;
    }
  }, [locationHistory, key]);
}

function useIsNext(key) {
  const location = useRouteLocation();

  return useMemo(() => {
    return hasOwnProperty(location.state, '__prevent') && location.state.__prevent === key && !location.hash;
  }, [key, location]);
}

function useLocationState(key) {
  const { locationHistory } = useContext(__RouterContext);

  return useMemo(() => locationHistory.get(key), [locationHistory, key]);
}

export function usePreventBackward(watchLocation = true) {
  const history = useHistory();
  const location = useRouteLocation();
  const { locationHistory, match, routerIndex } = useContext(__RouterContext);

  const key = useKey();
  const hasNext = useHasNext(key);
  const isNext = useIsNext(key);
  const locationState = useLocationState(key);
  const __lock = useRef(false);
  const __wait = useRef(false);
  const refPrevent = useRef(locationState?.prevent);

  useEffect(() => {
    refPrevent.current = locationState?.prevent;
  }, [locationState]);

  const executeCallback = useCallback(() => {
    const prevent = refPrevent.current;

    if (prevent === true) {
      __lock.current = true;
      history.goForward();
    } else if (typeof prevent === 'function') {
      const result = prevent();

      // prevent 가 promise 인 경우, 앞으로 보낸다음, 결과에 따라 동작
      if (result instanceof Promise) {
        __wait.current = true;
        history.goForward();
        result.then(r => r && history.go(-2)).finally(() => (__wait.current = false));
      } else if (result) {
        history.goBack();
      } else {
        __lock.current = true;
        history.goForward();
      }
    }
  }, [history]);

  useLayoutEffect(() => {
    const prevent = refPrevent.current;

    if (!watchLocation || !match.active) return;
    if (__lock.current) {
      __lock.current = false;

      return;
    }

    if (__wait.current && prevent && !isNext) {
      history.goForward();
    } else if (prevent && location.hash && !location.key) {
      __lock.current = true;
    } else if (match.active && !match.isExact && isNext && !prevent) {
      // return from subroute.
      __lock.current = true;
      history.goBack();
    } else if (match.active && !match.isExact) {
      // return from subroute.
      __lock.current = true;
    } else if (isNext && !prevent && !history.direction) {
      // maybe refresh?
      __lock.current = true;
      history.goBack();
    } else if (isNext && !prevent && history.direction === BACKWARD) {
      // prevent is not defined, back to normal state.
      __lock.current = true;
      history.goBack();
    } else if (!isNext && !hasNext && prevent && history.direction === BACKWARD) {
      __lock.current = true;
      history.goBack();
    } else if (!isNext && hasNext && prevent && history.direction === BACKWARD) {
      // execute callback
      executeCallback();
    } else if (!isNext && hasNext && prevent && history.direction === FORWARD) {
      // prevent is exist. forward to exist state.
      __lock.current = true;
      history.goForward();
    } else if (isNext && hasNext && !prevent && history.direction === FORWARD) {
      // go to next route if exist.
      history.goForward();
    } else if (isNext && !prevent && history.direction === FORWARD) {
      // return to normal state, when if not exist next route.
      history.goBack();
    }
  }, [watchLocation, executeCallback, match, history, location, isNext, hasNext]);

  const setPrevent = useCallback(
    value => {
      const __key = getLocationKeys(location, routerIndex);
      locationHistory.set(key, { prevent: value || undefined });

      if (!value && isNext) {
        __lock.current = true;
        history.goBack();
      } else if (value && !isNext) {
        refPrevent.current = value;
        history.push({
          ...location,
          hash: '',
          state: {
            ...(location.state || {}),
            __key,
            __prevent: key,
          },
        });
      }
    },
    [isNext, location, history, routerIndex, locationHistory, key]
  );

  return [refPrevent.current, setPrevent, { key: key || 'undefined', isNext, hasNext }];
}
