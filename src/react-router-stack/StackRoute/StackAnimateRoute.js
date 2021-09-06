import PropTypes from 'prop-types';
import { useContext, useLayoutEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, __RouterContext } from 'react-router';
import { CSSTransition } from 'react-transition-group';
import { useTransitionHandlers } from './useTransitionHandlers';
import { useActive } from '../hooks/useActive';

export function StackAnimateRoute({ children }) {
  const {
    transitionProps: { timeout, unmountOnExit },
  } = useContext(__RouterContext);
  const history = useHistory();
  const location = useLocation();
  const active = useActive();
  const { onEnter, onEntered, onExit, onExited } = useTransitionHandlers();
  const [viewIn, setViewIn] = useState(history.direction ? false : true);

  const { action, direction } = useMemo(() => {
    const action = history._action || history.action;
    const direction = history._direction || history.direction;

    if (active) {
      if (history._action) delete history._action;
      if (history._direction) delete history._direction;
    }

    return { action, direction };
  }, [active, history]);

  const classNames = useMemo(() => {
    const classNames_direction = direction ? ` ${direction?.toLowerCase()}` : '';
    const classNames_action = ` ${action.toLowerCase()}`;
    const addClassNames = classNames_direction + classNames_action;

    return {
      enter: 'enter' + addClassNames,
      enterActive: 'enter-active' + addClassNames,
      enterDone: 'enter-done',
      exit: 'exit' + addClassNames,
      exitActive: 'exit-active' + addClassNames,
      exitDone: 'exit-done',
    };
    // `history` does not generate mutation events. `location` is needed for update.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, direction, location]);

  useLayoutEffect(() => {
    if (viewIn !== active) setViewIn(active);
  }, [active, viewIn]);

  return (
    <CSSTransition
      in={viewIn}
      classNames={classNames}
      timeout={timeout}
      unmountOnExit={unmountOnExit}
      onEnter={onEnter}
      // onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      // onExiting={onExiting}
      onExited={onExited}>
      {children}
    </CSSTransition>
  );
}

StackAnimateRoute.propTypes = {
  children: PropTypes.node,
};
