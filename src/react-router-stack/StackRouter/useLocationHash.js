import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import QueryString from 'qs';
import { HASHCHANGE } from '../constants';

export function useLocationHash(locationHistory) {
  const location = useLocation();
  const history = useHistory();
  const [data, setData] = useState(null);
  const refLocationItems = useRef(locationHistory.items);

  const dispatchEvent = useCallback(data => {
    const event = new Event('switchwebview');
    event.detail = data;
    window.dispatchEvent(event);
  }, []);

  useLayoutEffect(() => {
    const firstLocation = refLocationItems.current[0];
    const direction = locationHistory.direction;
    if (direction === HASHCHANGE && firstLocation?.hash === location.hash) {
      return;
    } else if (direction === HASHCHANGE && location.hash) {
      const data = QueryString.parse(location.hash.replace(/^#/, ''));
      dispatchEvent(data);
      setData(data);
      history.goBack();
    } else if (direction !== HASHCHANGE) {
      setData(null);
    }
  }, [locationHistory.direction, location.hash, history, dispatchEvent]);

  return data;
}
