import PropTypes from 'prop-types';
import { forwardRef, Fragment } from 'react';
import { ViewGlobalStyle } from '../ViewElements/ViewGlobalStyle';
import { ViewElementAnimation } from '../ViewElements/ViewElementAnimation';

export const ViewComponent = forwardRef(
  ({ duration: $duration, delay: $delay, viewType: $viewType, ...props }, ref) => {
    return (
      <Fragment>
        <ViewGlobalStyle />
        <ViewElementAnimation ref={ref} {...props} $duration={$duration} $delay={$delay} $viewType={$viewType} />
      </Fragment>
    );
  }
);

ViewComponent.propTypes = {
  duration: PropTypes.number,
  delay: PropTypes.number,
  viewType: PropTypes.string,
};
