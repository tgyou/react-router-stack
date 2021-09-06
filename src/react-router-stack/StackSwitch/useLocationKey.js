import { useContext, useMemo } from 'react';
import { useLocation, __RouterContext } from 'react-router';

export function getLocationKey(location, routerIndex = 0) {
  if (location.state?.__key && location.state.__key.length >= routerIndex + 1) {
    return location.state.__key[routerIndex];
  } else {
    return location.key;
  }
}

export function getLocationKeys(location, routerIndex, cutLastKey = false) {
  let locationKeys = location.state?.__key;
  if (locationKeys && locationKeys.length >= routerIndex + 1) {
    locationKeys = [...locationKeys].splice(0, routerIndex + 1);
  } else if (location.state?.__key) {
    locationKeys = [...locationKeys, location.key];
  } else {
    locationKeys = [location.key];
  }

  if (routerIndex && locationKeys.length < routerIndex + 1) {
    const prepend = Array(routerIndex + 1 - locationKeys.length).fill(location.key);

    return prepend.concat(locationKeys);
  }

  return locationKeys;
}

export function useLocationKey() {
  const { routerIndex } = useContext(__RouterContext);
  const location = useLocation();

  return useMemo(() => getLocationKey(location, routerIndex), [location, routerIndex]);
}
