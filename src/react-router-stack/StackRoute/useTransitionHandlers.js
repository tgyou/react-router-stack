import { useCallback, useContext } from 'react';
import { useHistory, useRouteMatch, __RouterContext } from 'react-router';
import { POP } from '../constants';
import { useActive } from '../hooks/useActive';

function isScrollable(element) {
  // Compare the height to see if the element has scrollable content
  const hasScrollableContent = element.scrollHeight > element.clientHeight;

  // It's not enough because the element's `overflow-y` style can be set as
  // * `hidden`
  // * `hidden !important`
  // In those cases, the scrollbar isn't shown
  const overflowYStyle = window.getComputedStyle(element).overflowY;
  const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1;

  return hasScrollableContent && !isOverflowHidden;
}

export function useTransitionHandlers() {
  const { locationHistory } = useContext(__RouterContext);
  const routeMatch = useRouteMatch();
  const active = useActive();
  const history = useHistory();

  const onEnter = useCallback(
    node => {
      if (active) node.removeAttribute('hidden');
      if (history.action === POP) {
        const state = locationHistory.get(routeMatch.key);
        if (state?.scrollTop) node.scrollTop = state.scrollTop;
      }
    },
    [active, history, routeMatch.key, locationHistory]
  );

  const onEntering = useCallback(node => {}, []);

  const onEntered = useCallback(
    node => {
      if (active) node.removeAttribute('hidden');
    },
    [active]
  );

  const onExit = useCallback(
    node => {
      if (isScrollable(node)) {
        locationHistory.set(routeMatch.key, {
          scrollTop: node.scrollTop,
          scrollHeight: node.scrollHeight,
        });
      }
    },
    [routeMatch.key, locationHistory]
  );

  const onExiting = useCallback(node => {}, []);

  const onExited = useCallback(
    node => {
      if (!active) node.setAttribute('hidden', 'hidden');
    },
    [active]
  );

  return { onEnter, onEntering, onEntered, onExit, onExiting, onExited };
}
