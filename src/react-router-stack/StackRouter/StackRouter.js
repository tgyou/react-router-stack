import PropTypes from 'prop-types';
import { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { __RouterContext } from 'react-router';
import { useLocationHistory } from './useLocationHistory';
import { useLocationHash } from './useLocationHash';

function StackRouterExtend({ children, ...props }) {
  const routerContext = useContext(__RouterContext);
  const locationHistory = useLocationHistory();
  useLocationHash(locationHistory);

  routerContext.history.direction = locationHistory.direction;
  const contextValue = { ...routerContext, locationHistory };

  return <__RouterContext.Provider value={contextValue}>{children}</__RouterContext.Provider>;
}

export function StackRouter({ children, ...props }) {
  return (
    <BrowserRouter {...props}>
      <StackRouterExtend>{children}</StackRouterExtend>
    </BrowserRouter>
  );
}

StackRouter.propTypes = StackRouterExtend.propTypes = {
  children: PropTypes.node,
};
