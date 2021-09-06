import { useState, useEffect, useCallback } from 'react';
import { useActive } from './useActive';

export function useHashData() {
  const active = useActive();
  const [hash, setHash] = useState(null);

  const callback = useCallback(
    event => {
      if (active) setHash(event.detail);
    },
    [active]
  );

  useEffect(() => {
    if (active) window.addEventListener('switchwebview', callback);

    return () => window.removeEventListener('switchwebview', callback);
  }, [active, callback]);

  return hash;
}
