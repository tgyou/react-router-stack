import { useContext, useLayoutEffect } from 'react';
import { useHistory, useRouteMatch, __RouterContext } from 'react-router';
import debounce from 'debounce';
import { useActive } from '../hooks/useActive';

export function useViewScrollRestoration(ref) {
  const { locationHistory } = useContext(__RouterContext);
  const routeMatch = useRouteMatch();
  const active = useActive();
  const history = useHistory();

  // This effect must only be executed at the point of mounting.
  useLayoutEffect(() => {
    const element = ref.current;

    const restoreScroll = () => {
      const element = ref.current;
      const state = locationHistory.get(routeMatch.key);
      if (state) element.scrollTop = state.scrollTop;
    };

    const saveScroll = debounce(event => {
      locationHistory.set(routeMatch.key, {
        scrollTop: event.target.scrollTop,
        scrollHeight: event.target.scrollHeight,
      });
    }, 100);

    if (!active && history.location.key !== routeMatch.key) {
      // for premount
      restoreScroll();
    } else if (active && history.action === 'POP') {
      // for refresh
      restoreScroll();
    }

    // for save scroll position.
    element?.addEventListener('scroll', saveScroll);

    return () => {
      element?.removeEventListener('scroll', saveScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
