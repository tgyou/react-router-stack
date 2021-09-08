import { StackRoute, StackRouter, StackSwitch } from 'react-router-stack';
import { ViewComponentSpring, viewConfig, asyncViewComponent } from 'react-router-stack/View';

import { AsyncError, AsyncLoader } from './AsyncUtils';

import Home from './Home';
import Subpage from './Subpage';
import NotFound from './NotFound';

function App() {
  return (
    <StackRouter>
      <StackSwitch unmountOnExit={false} duration={400} delay={50}>
        <StackRoute exact path="/" component={Home} />
        <StackRoute path="/subpage" component={Subpage} />
        <StackRoute path="/nextpage" component={Nextpage} />
        <StackRoute component={NotFound} />
      </StackSwitch>
    </StackRouter>
  );
}

export default App;

// set global view component.
viewConfig.component = ViewComponentSpring;

// set global async side components.
asyncViewComponent.LoadingComponent = AsyncLoader;
asyncViewComponent.ErrorComponent = AsyncError;

// create async component
const Nextpage = asyncViewComponent({
  resolve: () => import('./Nextpage'),
  // componentProps: { type: BTT },
  // LoadingComponent: () => <Fragment>Loading...</Fragment>,
  // ErrorComponent: ({ error }) => <Fragment>{error.message}</Fragment>,
});
