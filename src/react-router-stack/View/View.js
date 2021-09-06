import { forwardRef, useContext, useMemo, useRef } from 'react';
import { useHistory, __RouterContext } from 'react-router';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { useActive } from '../hooks/useActive';
import { ViewComponent } from './ViewComponents/ViewComponent';
import { useViewScrollRestoration } from './useViewScrollRestoration';
import { ACTIVE, RTL } from './constants';

export const config = {
  component: ViewComponent,
};

export const View = forwardRef(({ component: Component = config.component, ...props }, refParent) => {
  const {
    transitionProps: { duration: $duration, delay: $delay, timeout: $timeout },
  } = useContext(__RouterContext);
  const active = useActive();
  const history = useHistory();
  const refSelf = useRef();
  const ref = refParent || refSelf;
  useViewScrollRestoration(ref);

  const viewType = useMemo(() => {
    const type = history._viewType || props.type || RTL;
    if (active && history._viewType) delete history._viewType;

    return type;
  }, [active, props.type, history]);

  const className = useMemo(() => {
    return classnames(viewType, props.className, { [ACTIVE]: active });
  }, [props, viewType, active]);

  return (
    <Component ref={ref} className={className} duration={$duration || $timeout} delay={$delay} viewType={viewType}>
      {props.children}
    </Component>
  );
});

View.propTypes = {
  children: PropTypes.any,
  component: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string,
};
