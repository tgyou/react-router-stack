import { forwardRef, Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory, __RouterContext } from 'react-router';
import { useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { usePremount, useLink, usePreventBackward } from '../../hooks';
import { ViewElementAnimation } from '../ViewElements/ViewElementAnimation';
import { ViewGlobalStyle } from '../ViewElements/ViewGlobalStyle';

let callbackCancel = null;
let callbackRestore = null;

export const ViewComponentSpring = forwardRef(
  ({ duration: $duration, delay: $delay, viewType: $viewType, ...props }, ref) => {
    const { routerIndex } = useContext(__RouterContext);
    const link = useLink();
    const history = useHistory();
    const [prevent] = usePreventBackward(false);
    const premount = usePremount();
    const [{ x }, set] = useSpring(() => ({ x: 0, y: 0 }));

    // Set the drag hook and define component movement based on gesture data
    const bind = useDrag(
      ({ event, down, movement: [mx], direction: [dx], velocity }) => {
        const targetElement = event.target;
        const timeout = $duration + $delay;

        // Prevents execution if the event target is a subroute.
        if (targetElement.closest('.view') !== ref.current) return;

        // Prevent execution if classname is included to prevent drag.
        if (targetElement.closest('.view-drag-dismiss')) return;

        const nextSibling = ref.current?.nextSibling || null;
        const isPass = routerIndex || nextSibling;

        // If no next sibling are exist, execute premount.
        if (!nextSibling) premount();

        let x = 0;
        if (down) {
          // If there is no element sibling or if prevent is set, define x as 1/3.
          x = mx < 0 ? 0 : !routerIndex && (!nextSibling || prevent) ? mx / 3 : mx;
          x = parseFloat(parseFloat(x).toFixed(1));
        } else if (mx > window.innerWidth / 2 && isPass) {
          x = window.innerWidth;
        } else if (velocity > 1 && dx === 1 && isPass) {
          x = window.innerWidth;
        }

        if (down && callbackCancel) {
          clearTimeout(callbackCancel);
          callbackCancel = null;
        }

        if (down && callbackRestore) {
          clearTimeout(callbackRestore);
          callbackRestore = null;
        }

        if (down) {
          if (!ref.current?.hasAttribute('data-drag')) ref.current?.setAttribute('data-drag', true);
          if (!nextSibling?.hasAttribute('data-drag')) nextSibling?.setAttribute('data-drag', true);
        } else {
          callbackCancel = setTimeout(() => {
            if (ref.current?.hasAttribute('data-drag')) ref.current?.removeAttribute('data-drag');
            if (nextSibling?.hasAttribute('data-drag')) nextSibling?.removeAttribute('data-drag');
          }, timeout);
        }

        if (!down && x > 0 && isPass) {
          if (prevent) x = 0;
          if (prevent) {
            history.goBack();
          } else {
            link.goBackView();
          }
          callbackRestore = setTimeout(() => {
            set.start({ x: 0, immediate: true });
          }, timeout);
        }

        set.start({ x, immediate: down });
      },
      { initial: () => [x.get()], axis: 'x', threshold: 20 }
    );

    const viewProps = {
      ...bind(),
      style: { x },
      className: 'view ' + props.className,
    };

    return (
      <Fragment>
        <ViewGlobalStyle />
        <ViewElementAnimation
          ref={ref}
          {...props}
          $duration={$duration}
          $delay={$delay}
          $viewType={$viewType}
          {...viewProps}
        />
      </Fragment>
    );
  }
);

ViewComponentSpring.propTypes = {
  className: PropTypes.string,
  duration: PropTypes.number,
  delay: PropTypes.number,
  viewType: PropTypes.string,
};
