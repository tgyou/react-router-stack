import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { BACKWARD, FORWARD, HASHCHANGE, LOCATION_STORAGE_NS, POP, PUSH, REPLACE } from '../constants';

// for resolve problems with removing undefined key values by JSON.parse reviver.
function JsonSanitize(obj) {
  if (typeof obj === 'object') {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'object') {
        obj[key] = JsonSanitize(obj[key]);
      } else if (obj[key] === 'undef') {
        obj[key] = undefined;
      }
    });
  }

  return obj;
}

function JsonParse(raw) {
  try {
    const obj = JsonSanitize(JSON.parse(raw));

    return obj;
  } catch (e) {
    return null;
  }
}

// for save undefined key values.
function JsonStringify(obj) {
  return JSON.stringify(obj, (k, v) => (v === undefined ? 'undef' : v));
}

export function useLocationHistory(routerContext) {
  const history = useHistory();
  const location = useLocation();
  const refLocation = useRef(location);
  const refDirection = useRef(null);
  const [items, setItems] = useState(() => {
    const raw = window.sessionStorage.getItem(LOCATION_STORAGE_NS);

    if (raw && location.key) {
      const json = JsonParse(raw);
      if (json) return json;
    }

    return [{ ...location }];
  });

  const findIndex = useCallback(
    key => {
      if (typeof key === 'function') {
        return items.findIndex(key);
      } else {
        return items.findIndex(item => item.key === key);
      }
    },
    [items]
  );

  const set = useCallback(
    (key, state, insertPrepend = false) => {
      return setItems(items => {
        const index = items.findIndex(item => item.key === key);
        if (index > -1) {
          items[index] = { ...items[index], ...state };
        } else if (history.action !== REPLACE) {
          const item = location.key === key ? { ...location, ...state } : { key, ...state };
          if (insertPrepend) {
            items.unshift(item);
          } else {
            items.push(item);
          }
        }

        return [...items];
      });
    },
    [history, location]
  );

  const get = useCallback(
    key => {
      return items.find(item => item.key === key);
    },
    [items]
  );

  const hasPrev = useCallback(
    key => {
      const index = items.findIndex(item => item.key === key);

      return index < 0 ? null : !!items[index - 1];
    },
    [items]
  );

  const hasNext = useCallback(
    key => {
      const index = items.findIndex(item => item.key === key);

      return index < 0 ? null : !!items[index + 1];
    },
    [items]
  );

  const getPrev = useCallback(
    key => {
      const index = items.findIndex(item => item.key === key);

      return index < 0 ? null : items[index - 1] || null;
    },
    [items]
  );

  const getNext = useCallback(
    key => {
      const index = items.findIndex(item => item.key === key);

      return index < 0 ? null : items[index + 1] || null;
    },
    [items]
  );

  const getPositionOffset = useCallback(
    key => {
      const currentIndex = items.findIndex(item => item.key === location.key);
      const targetIndex = items.findIndex(item => item.key === key);

      return (targetIndex > -1 ? targetIndex : 0) - currentIndex;
    },
    [items, location]
  );

  useLayoutEffect(() => {
    const action = history.action;
    const prevLocation = refLocation.current;
    const nextLocation = location;

    setItems(items => {
      let changed = false;

      const prevKeyIndex = items.findIndex(item => item.key === prevLocation.key);
      const nextKeyIndex = items.findIndex(item => item.key === nextLocation.key);

      if (
        prevLocation.pathname === nextLocation.pathname &&
        prevLocation.hash !== nextLocation.hash &&
        (prevLocation.key === undefined ? items[0].hash === prevLocation.hash : true) && // if source is first page.
        (nextLocation.key === undefined ? items[0].hash !== nextLocation.hash : true) && // if target is first page.
        nextLocation.hash
      ) {
        // hash change
        // do nothing.
      } else if (prevKeyIndex > -1 && action !== POP) {
        if (action === PUSH) {
          items.splice(prevKeyIndex + 1, items.length, nextLocation);
          changed = true;
        } else if (action === REPLACE) {
          items.splice(prevKeyIndex, 1, nextLocation);
          changed = true;
        }
      } else if (action === POP && nextKeyIndex < 0) {
        if (items.length === prevKeyIndex + 1) {
          items.push(nextLocation);
          changed = true;
        } else {
          items.unshift(nextLocation);
          changed = true;
        }
      }

      return changed ? [...items] : items;
    });

    refLocation.current = nextLocation;
  }, [history, location]);

  const direction = useMemo(() => {
    const prevLocation = refLocation.current;
    const prevKeyIndex = items.findIndex(item => item.key === prevLocation.key);
    const nextKeyIndex = items.findIndex(item => item.key === location.key);

    if (
      prevLocation.pathname === location.pathname &&
      prevLocation.hash !== location.hash &&
      (prevLocation.key === undefined ? items[0].hash === prevLocation.hash : true) && // if source is first page.
      (location.key === undefined ? items[0].hash !== location.hash : true) && // if target is first page.
      location.hash
    ) {
      refDirection.current = HASHCHANGE;
    } else if (history.action === PUSH || history.action === REPLACE) {
      refDirection.current = history.action === PUSH ? FORWARD : history._action ? refDirection.current : REPLACE;
    } else if (history.action === POP && nextKeyIndex < 0) {
      if (items.length === prevKeyIndex + 1) {
        refDirection.current = FORWARD;
      } else {
        refDirection.current = BACKWARD;
      }
    } else if (prevKeyIndex < nextKeyIndex) {
      refDirection.current = FORWARD;
    } else if (prevKeyIndex > nextKeyIndex) {
      refDirection.current = BACKWARD;
    }

    return refDirection.current;
  }, [items, history, location]);

  useLayoutEffect(() => {
    window.sessionStorage.setItem(LOCATION_STORAGE_NS, JsonStringify(items));
  }, [items]);

  return {
    items,
    setItems,
    direction,
    get,
    set,
    findIndex,
    hasPrev,
    hasNext,
    getPrev,
    getNext,
    getPositionOffset,
  };
}
