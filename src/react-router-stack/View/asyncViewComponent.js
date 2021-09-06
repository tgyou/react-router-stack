import { asyncComponent } from 'react-async-component';
import { View } from './View';

export function asyncViewComponent({
  resolve,
  componentProps,
  LoadingComponent = asyncViewComponent.LoadingComponent,
  ErrorComponent = asyncViewComponent.ErrorComponent,
  WrapperComponent = View,
}) {
  const Component = asyncComponent({
    resolve,
    LoadingComponent,
    ErrorComponent,
  });

  return props => (
    <WrapperComponent {...componentProps}>
      <Component {...props} />
    </WrapperComponent>
  );
}
