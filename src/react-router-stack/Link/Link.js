import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useLink } from '../hooks';

import { useActiveLocation } from '../hooks/useActiveLocation';

export function Link(props) {
  const link = useLink();
  const location = useActiveLocation();

  const handleClick = useCallback(
    event => {
      const handler = props.replace ? link.replace : link.push;
      const to = typeof props.to === 'function' ? props.to(location) : props.to;
      const result = props.onClick ? props.onClick(event) : true;
      if (result !== false && !event.shiftKey) handler(to, props.state, props, location);
      if (event.shiftKey || (props.onClick && result !== undefined)) return result;
      event.preventDefault();
    },
    [link, props, location]
  );

  const { as, to, replace, reuse, state, action, direction, children, onClick, ...aProps } = props;
  const componentProps = { ...aProps, onClick: handleClick };
  const Component = as || 'a';
  if (Component === 'a') componentProps.href = props.to?.pathname ? props.to.pathname + props.to.search : props.to;

  return <Component {...componentProps}>{children}</Component>;
}

Link.defaultProps = {
  reuse: true,
};

Link.propTypes = {
  as: PropTypes.any,
  children: PropTypes.any,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]).isRequired,
  replace: PropTypes.bool,
  onClick: PropTypes.func,
  reuse: PropTypes.bool,
  state: PropTypes.object,
  action: PropTypes.string,
  direction: PropTypes.string,
};
