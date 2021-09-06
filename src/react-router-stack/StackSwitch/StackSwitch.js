import { cloneElement, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { __RouterContext } from 'react-router';
import { useRoutes } from '../StackRouter/useRoutes';
import { useViews } from './useViews';

export function StackSwitch({ children, ...props }) {
  const routerContext = useContext(__RouterContext);
  const routerIndex = routerContext.routerIndex > -1 ? routerContext.routerIndex + 1 : 0;
  const routes = useRoutes(children);
  const { views, setViews } = useViews(routes, routerIndex);

  const viewChildren = useMemo(() => {
    return views.map((view, index) => {
      return cloneElement(view.route, {
        key: view.key,
        match: view.match,
        route: view.route,
        ...props,
        ...view.route.props,
      });
    });
  }, [props, views]);

  const contextValue = {
    ...routerContext,
    routes,
    routerIndex,
    switchProps: props,
    views,
    setViews,
  };

  return <__RouterContext.Provider value={contextValue}>{viewChildren}</__RouterContext.Provider>;
}

StackSwitch.defaultProps = {
  delay: 0,
  duration: 0,
  unmountOnExit: true,
};

StackSwitch.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  duration: PropTypes.number,
  unmountOnExit: PropTypes.bool,
};
